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
    // autoUpdater.checkForUpdates();
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    // autoUpdater.checkForUpdates();
    // setInterval(() => {
    //   autoUpdater.checkForUpdates();
    // }, 300000); // check every 5 minutes
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

autoUpdater.on('update-available', info => {
  mainWindow.webContents.send('update_available', info);
});
autoUpdater.on('download-progress', data => {
  mainWindow.webContents.send('download_progress', data);
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});
autoUpdater.on('error', err => {
  mainWindow.webContents.send('error', err);
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall(true, true);
});
