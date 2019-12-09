const {app, BrowserWindow, ipcMain} = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');
const {autoUpdater} = require('electron-updater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    minWidth: 500,
    height: 620,
    minHeight: 500,
    center: true,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js',
    },
  });
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    setInterval(() => {
      console.log('check update');
      mainWindow.webContents.send('update_available');
    }, 10000);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    setInterval(() => {
      console.log('check update');
      autoUpdater.checkForUpdates();
    }, 20000);
  }
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', event => {
  event.sender.send('app_version', {version: app.getVersion()});
});

autoUpdater.on('update-available', () => {
  console.log('update-available');
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  console.log('update-downloaded');
  mainWindow.webContents.send('update_downloaded');
});
autoUpdater.on('error', message => {
  alert('There was a problem updating the application');
  console.error('There was a problem updating the application');
  console.error(message);
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
