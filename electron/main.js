const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

let mainWindow;

// Check if .git exists
function isGitInitialized() {
  return fs.existsSync(path.join(process.cwd(), '.git'));
}

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

  // Check if Git is installed first
  exec('git --version', (err) => {
    if (err) {
      dialog.showErrorBox('Git Not Found', 'Git is not installed on this computer. Please install Git from https://git-scm.com/ to use this app.');
      return;
    }

    if (!isGitInitialized()) {
      // Show Setup Wizard
      mainWindow.loadFile(path.join(__dirname, 'views', 'setup.html'));
    } else {
      // Already set up, load CMS
      loadCMS();
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  createMenu();
}

function loadCMS() {
  // Load the local Next.js server
  const loadURL = () => {
    mainWindow.loadURL('http://localhost:3000/keystatic').catch(() => {
        console.log('Waiting for Next.js server...');
        setTimeout(loadURL, 1000);
    });
  };
  loadURL();
}

// Handle Git Setup from UI
ipcMain.on('setup-git', (event, repoUrl) => {
  console.log('Setting up git for:', repoUrl);

  // 1. git init
  exec('git init', (err) => {
    if (err) return event.reply('setup-error', 'Failed to initialize Git: ' + err.message);

    // 2. git remote add origin
    exec(`git remote add origin ${repoUrl}`, (err) => {
       // If remote exists, try set-url instead
       if (err && err.message.includes('exists')) {
         exec(`git remote set-url origin ${repoUrl}`, (err) => {
            if (err) return event.reply('setup-error', 'Failed to set remote: ' + err.message);
            finishSetup(event);
         });
       } else if (err) {
         return event.reply('setup-error', 'Failed to add remote: ' + err.message);
       } else {
         finishSetup(event);
       }
    });
  });
});

function finishSetup(event) {
  // 3. git branch -M main
  exec('git branch -M main', (err) => {
    if (err) console.warn('Branch rename failed (maybe empty repo?):', err.message);

    // 4. git pull (optional, might fail if repo is empty, but that's ok)
    exec('git pull origin main', (err) => {
       // Success! Now switch view to CMS
       loadCMS();
    });
  });
}

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
            if (!isGitInitialized()) {
               dialog.showMessageBox(mainWindow, {
                 type: 'error',
                 title: 'Not Connected',
                 message: 'You are not connected to GitHub. Restart the app to set it up.'
               });
               return;
            }

            const { response } = await dialog.showMessageBox(mainWindow, {
              type: 'question',
              buttons: ['Cancel', 'Publish Now'],
              title: 'Confirm Publish',
              message: 'This will save your changes and push them to the live website. Are you sure?',
            });

            if (response === 1) { // "Publish Now" clicked
              publishChanges();
            }
          }
        }
      ]
    },
    {
      label: 'Settings',
      submenu: [
        {
          label: 'Reset GitHub Connection',
          click: async () => {
            const { response } = await dialog.showMessageBox(mainWindow, {
              type: 'warning',
              buttons: ['Cancel', 'Reset Connection'],
              title: 'Reset GitHub Connection',
              message: 'This will remove the current GitHub link. You will need to enter the repository URL again. Are you sure?',
            });

            if (response === 1) { // "Reset" clicked
               // Remove .git folder (dangerous, but effectively resets connection for this use case)
               // Better: just remove remote? No, user might want to switch repos entirely.
               // Safer: Just delete .git/config or the whole .git folder if we assume this folder is transient.
               // Since this is a "simple GUI", deleting .git allows re-init.
               const gitPath = path.join(process.cwd(), '.git');
               fs.rm(gitPath, { recursive: true, force: true }, (err) => {
                  if (err) {
                    dialog.showErrorBox('Error', 'Failed to reset connection: ' + err.message);
                  } else {
                    dialog.showMessageBox(mainWindow, { message: 'Connection reset. Restarting setup...' });
                    mainWindow.loadFile(path.join(__dirname, 'views', 'setup.html'));
                  }
               });
            }
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'View Local Blog (Preview)',
          click: () => {
            mainWindow.loadURL('http://localhost:3000');
          }
        },
        {
          label: 'View Admin (CMS)',
          click: () => {
            mainWindow.loadURL('http://localhost:3000/keystatic');
          }
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function publishChanges() {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Publishing...',
    message: 'Publishing in progress. Please wait...',
    buttons: [],
  });

  const command = 'git add . && git commit -m "Update content via Desktop App" && git push origin main';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);

      // Handle "nothing to commit" gracefully
      if (stdout.includes('nothing to commit')) {
         dialog.showMessageBox(mainWindow, {
          type: 'info',
          title: 'Already Up-to-Date',
          message: 'No changes found to publish.',
        });
        return;
      }

      dialog.showMessageBox(mainWindow, {
        type: 'error',
        title: 'Publish Failed',
        message: `Error publishing changes:\n${error.message}\n\nMake sure you have internet access and Git is configured.`,
      });
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Success!',
      message: 'Changes published successfully! The live site will update in a few minutes.',
    });
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
