import started from 'electron-squirrel-startup';
import {app, BrowserWindow, ipcMain, Menu, net, protocol} from 'electron/main';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {attachInspectShortcut} from './inspect.ts';

if (started) app.quit();

const scheme = 'app';

protocol.registerSchemesAsPrivileged([{
	scheme,
	privileges: {
		standard: true,
		codeCache: true
	}
}]);

app.setAppUserModelId('example.app');
Menu.setApplicationMenu(null);

app.on('window-all-closed', () => {
	if (process.platform === 'darwin') return;
	app.quit();
});

function createWindow() {
	const win = new BrowserWindow({
		width: 1024,
		height: 800,
		show: false,
		webPreferences: {
			preload: path.join(import.meta.dirname, 'preload.js'),
			devTools: import.meta.env.DEV
		}
	});

	win.once('ready-to-show', () => {
		win.show();
	});

	ipcMain.on('message', (_, message: string) => {
		console.log(`message received in main ("${message}")`);
		win.webContents.send('message', 'from main');
	});

	// listen to CmdOrCtrl+SHIFT+C keyboard shortcut
	if (import.meta.env.DEV) attachInspectShortcut(win);

	void win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL || 'app://renderer/index.html');
}

void app.whenReady().then(() => {
	// handle custom protocol
	protocol.handle(scheme, request => {
		const {host, pathname} = new URL(request.url);
		if (host !== 'renderer') throw new Error('Invalid host.');

		const allowedPath = path.join(import.meta.dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}`);
		const requestedPath = path.join(allowedPath, pathname);
		const relativePath = path.relative(allowedPath, requestedPath);

		if (
			relativePath.startsWith('..') ||
			path.isAbsolute(relativePath)
		) throw new Error('Invalid request.');

		return net.fetch(pathToFileURL(requestedPath).toString());
	});

	createWindow();

	app.on('activate', () => {
		if (!BrowserWindow.getAllWindows().length) createWindow();
	});
});
