import type {BrowserWindow} from 'electron/main';

export function attachInspectShortcut(win: BrowserWindow) {
	function inspect() {
		void win.webContents.devToolsWebContents?.executeJavaScript('DevToolsAPI.enterInspectElementMode()');
	}

	win.webContents.on('before-input-event', (_, input) => {
		if (!input.isAutoRepeat && input.type === 'keyDown' && input.control && input.shift && input.key.toLowerCase() === 'c') {
			if (!win.webContents.isDevToolsOpened()) {
				win.webContents.once('devtools-opened', inspect);
				win.webContents.openDevTools({mode: 'undocked'});
				return;
			}

			inspect();
		}
	});
}
