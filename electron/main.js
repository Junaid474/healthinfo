const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // For simple IPC if needed
    },
    title: 'Health Blog Admin',
  });

  // Load the local Next.js server
  const loadURL = () => {
    mainWindow.loadURL('http://localhost:3000/keystatic').catch(() => {
        console.log('Waiting for Next.js server...');
        setTimeout(loadURL, 1000);
    });
  };

  // Try to load immediately
  loadURL();

  createMenu();
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
  // Run git commands to push changes
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
