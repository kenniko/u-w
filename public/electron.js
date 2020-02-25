const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const {autoUpdater} = require('electron-updater');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    minWidth: 500,
    height: 600,
    minHeight: 500,
    center: true,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
    },
  });

	// and load the index.html of the app.
	if (isDev) {
		mainWindow.loadURL('http://localhost:8181');
    autoUpdater.checkForUpdates();
		mainWindow.webContents.openDevTools();
	} else {
		const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true,
		});
		mainWindow.loadURL(startUrl);
		autoUpdater.checkForUpdates();
	}

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
