const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const bcrypt = require('bcryptjs');

let mainWindow;

// Configuration File Path (store password hash)
const CONFIG_FILE = path.join(app.getPath('userData'), 'config.json');

// --- Helper Functions ---

function isGitInitialized() {
  return fs.existsSync(path.join(process.cwd(), '.git'));
}

function loadConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function hasPassword() {
  const config = loadConfig();
  return !!config.passwordHash;
}

function verifyPassword(password) {
  const config = loadConfig();
  if (!config.passwordHash) return false;
  return bcrypt.compareSync(password, config.passwordHash);
}

function setPassword(password) {
  const config = loadConfig();
  const salt = bcrypt.genSaltSync(10);
  config.passwordHash = bcrypt.hashSync(password, salt);
  saveConfig(config);
}

// --- Main Window & App Lifecycle ---

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // For simple IPC
    },
    title: 'Health Blog Admin',
    show: false, // Hide initially
  });

  // Flow:
  // 1. Check Git -> If missing, Setup Wizard
  // 2. Check Password -> If missing or not logged in, Login Screen
  // 3. If all good -> CMS

  checkPrerequisites();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  createMenu();
}

function checkPrerequisites() {
   exec('git --version', (err) => {
    if (err) {
      dialog.showErrorBox('Git Not Found', 'Git is not installed. Please install Git to use this app.');
      return;
    }

    if (!isGitInitialized()) {
      mainWindow.loadFile(path.join(__dirname, 'views', 'setup.html'));
    } else {
      // Git is good, check password
      // For now, always require login on start
      mainWindow.loadFile(path.join(__dirname, 'views', 'login.html'));
    }
  });
}

function loadCMS() {
  const loadURL = () => {
    // Open directly to Keystatic Admin Panel
    mainWindow.loadURL('http://localhost:3000/keystatic').catch(() => {
        console.log('Waiting for Next.js server...');
        setTimeout(loadURL, 1000);
    });
  };
  loadURL();
}

// --- IPC Handlers ---

// Git Setup
ipcMain.on('setup-git', (event, repoUrl) => {
  exec('git init', (err) => {
    if (err) return event.reply('setup-error', 'Failed to init Git: ' + err.message);
    exec(`git remote add origin ${repoUrl}`, (err) => {
       if (err && err.message.includes('exists')) {
         exec(`git remote set-url origin ${repoUrl}`, (err) => {
            if (err) return event.reply('setup-error', 'Failed to set remote: ' + err.message);
            finishSetup();
         });
       } else if (err) {
         return event.reply('setup-error', 'Failed to add remote: ' + err.message);
       } else {
         finishSetup();
       }
    });
  });
});

function finishSetup() {
  exec('git branch -M main', (err) => {
    exec('git pull origin main', (err) => {
       // After Git setup, go to Login (setup mode)
       mainWindow.loadFile(path.join(__dirname, 'views', 'login.html'));
    });
  });
}

// Password Handling
ipcMain.on('check-password-status', (event) => {
  event.reply('password-status', hasPassword());
});

ipcMain.on('set-password', (event, password) => {
  setPassword(password);
  loadCMS();
});

ipcMain.on('verify-password', (event, password) => {
  if (verifyPassword(password)) {
    loadCMS();
  } else {
    event.reply('login-error');
  }
});

// --- Menu & Publishing ---

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    },
    {
      label: 'Publish',
      submenu: [
        {
          label: 'Publish to Live Site',
          accelerator: 'CmdOrCtrl+P',
          click: async () => {
            if (!isGitInitialized()) return;
            const { response } = await dialog.showMessageBox(mainWindow, {
              type: 'question',
              buttons: ['Cancel', 'Publish Now'],
              title: 'Confirm Publish',
              message: 'This will save your changes and push them to the live website.',
            });
            if (response === 1) publishChanges();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'View Live Site (Preview)',
          click: () => {
             // We can try to guess the URL or just open localhost for now
             mainWindow.loadURL('http://localhost:3000');
          }
        },
        {
           label: 'Back to Admin Panel',
           click: () => mainWindow.loadURL('http://localhost:3000/keystatic')
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'toggleDevTools' }
      ]
    },
    {
      label: 'Settings',
      submenu: [
        {
          label: 'Change Password',
          click: async () => {
             const { response } = await dialog.showMessageBox(mainWindow, {
                type: 'warning',
                buttons: ['Cancel', 'Change Password'],
                title: 'Change Password',
                message: 'You will need to set a new password on the next screen.',
             });

             if (response === 1) {
                const config = loadConfig();
                delete config.passwordHash;
                saveConfig(config);
                mainWindow.loadFile(path.join(__dirname, 'views', 'login.html'));
             }
          }
        },
        {
          label: 'Reset GitHub Connection',
          click: async () => {
            const { response } = await dialog.showMessageBox(mainWindow, {
              type: 'warning',
              buttons: ['Cancel', 'Reset Connection'],
              title: 'Reset Connection',
              message: 'This will disconnect from GitHub. You will need to setup again.',
            });

            if (response === 1) {
               const gitPath = path.join(process.cwd(), '.git');
               fs.rm(gitPath, { recursive: true, force: true }, (err) => {
                  mainWindow.loadFile(path.join(__dirname, 'views', 'setup.html'));
               });
            }
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function publishChanges() {
  dialog.showMessageBox(mainWindow, { type: 'info', title: 'Publishing...', message: 'Please wait...', buttons: [] });
  const command = 'git add . && git commit -m "Update content" && git push origin main';
  exec(command, (error, stdout) => {
    if (error) {
      // Ignore "nothing to commit" errors
      if (stdout && stdout.includes('nothing to commit')) {
         dialog.showMessageBox(mainWindow, { type: 'info', title: 'Success', message: 'Published successfully! (No new changes)' });
         return;
      }
      dialog.showMessageBox(mainWindow, { type: 'error', title: 'Error', message: error.message });
      return;
    }
    dialog.showMessageBox(mainWindow, { type: 'info', title: 'Success', message: 'Published successfully!' });
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
