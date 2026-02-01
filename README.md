# [Electron.js](https://www.electronjs.org/) example project using Typescript, Electron Forge, Vite (with rolldown), Vue (with vapor mode), ESLint, Stylelint

This Electron example project should run with
- [Node.js 25.x (Current)](https://nodejs.org/en/download/current)
- [Vite 8](https://vite.dev/blog/announcing-vite8-beta) (using [rolldown](https://rolldown.rs/) as a bundler)
- [Vue](https://vuejs.org/) 3.6 using [vapor mode](https://github.com/vuejs/core/blob/minor/CHANGELOG.md)

It uses some of the security recommendations that are not the default like
- custom protocol to load local resources
- strict settings for [Electron fuses](https://www.electronjs.org/docs/latest/tutorial/fuses)

It should also
- lint source files with [ESLint](https://eslint.org/) (incl. [strict type checking](https://typescript-eslint.io/users/configs/#strict-type-checked))
- [Stylelint](https://stylelint.io/) for CSS files
- make sure that the renderer process is not polluted by Node.js types (and vice versa - the main processs has no DOM types)
- uses [process specific imports](https://www.electronjs.org/docs/latest/tutorial/process-model#process-specific-module-aliases-typescript) of the Electron package
- not need other source file extensions other than `.ts` (e.g. `.mts` or `.cjs` and the transpiled `.js` files needed by electron)
- support `type: "module"` in package.json
- correctly import CommonJS modules like [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup)

No guarantee that I missed something, but it seems the bundle is built as expected and the rolldown bundler seems to make it pretty fast.
