const electron = require('electron');
const ipcMain = electron.ipcMain
const shell = electron.shell
const Menu = electron.Menu
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow;


Menu.setApplicationMenu(Menu.buildFromTemplate([]))

function createWindow() {
	mainWindow = new BrowserWindow({ width: 940, height: 700, webPreferences : {
		nodeIntegration : true, preload: __dirname + '/preload.js'
	} });
	
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

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

ipcMain.on('show-image', (event, args) => {
	shell.openExternal(args)
})