import {MakerSquirrel} from '@electron-forge/maker-squirrel';
import {FusesPlugin} from '@electron-forge/plugin-fuses';
import type {ForgeConfig} from '@electron-forge/shared-types';
import {FuseV1Options, FuseVersion} from '@electron/fuses';

export default {
	packagerConfig: {asar: true},
	makers: [new MakerSquirrel()],
	plugins: [{
		name: '@electron-forge/plugin-vite',
		config: {
			build: [{
				entry: 'ts/node/main.ts',
				config: 'vite.main.config.ts'
			}, {
				entry: 'ts/node/preload.ts',
				config: 'vite.preload.config.ts'
			}],
			renderer: [{
				name: 'main_window',
				config: 'vite.renderer.config.ts'
			}]
		}
	}, new FusesPlugin({
		version: FuseVersion.V1,
		strictlyRequireAllFuses: true,
		[FuseV1Options.RunAsNode]: false,
		[FuseV1Options.EnableCookieEncryption]: true,
		[FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
		[FuseV1Options.EnableNodeCliInspectArguments]: false,
		[FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
		[FuseV1Options.OnlyLoadAppFromAsar]: true,
		[FuseV1Options.LoadBrowserProcessSpecificV8Snapshot]: false,
		[FuseV1Options.GrantFileProtocolExtraPrivileges]: false
	})]
} satisfies ForgeConfig;
