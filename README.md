<p align="center"><img src=".bin/images/fenestronLogo.jpg" alt="Fenestron logo"></a></p>


# Fenestron Project Template
This is a project template for getting a new [Fenestron](https://github.com/adamrdrew/fenestron-ui) app bootstrapped quickly and easily. Right now this template is a provided as a repo that you clone and then start using to build your app. We'd like to eventually offer a preset or plugin via Vue CLI that you can install, but that's a little way's off. This repo contains a perfectly valid and normal Vue CLI project.

There is nothing new or novel in this template that you couldn't do yourself. The hard work was done by the wonderful Electron, Vue, and Electron Vue Builder communities along with all of the other people who have contributed to the projects we're pulling in here. The only thing we've done is tweak the output of the Vue Electron Builder project creation script to include Fenestron UI, a basic example UI built on Fenestron UI, and some project defaults and config that we recommend for a Fenestron app. Other than Fenestron UI nothing here is original work; this template is simply a convenience to help get going faster.

## Requirements
We're going to assume you're working on Windows. Most everything here is cross platform but we're targeting Windows. You can't use WSL for this, at least not as of this writing, you need to have Node, NPM, etc installed in Windows.
* [Node](https://nodejs.org/en/download/) 12.x
* NPM
* Vue CLI installed globally
* Vue CLI Service installed globally
* [Windows Build Tools](https://www.npmjs.com/package/windows-build-tools)
* [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/)
* Git

## Installation
Installation is simply a matter of cloning this project and running setup:
1. Clone this repo
2. Run the setup script and provide a name for your app:

```
> npm run setup mycoolappname
```
*Note: The app name you provide will be used in package.json, so you need to provide a name that obeys those naming conventions. All lowercase, no spaces, etc.*

The setup script removes the template files like readme and license, renames the app, creates a new git repo, and installs deps. When setup is done you can get to developing!

## What's In The Box
Here's what you will have after installing and getting set up:
* A standard Vue CLI project
* Electron building and bootstrapping thanks to electron-builder and vue electron builder
* [Fenestron UI](https://github.com/adamrdrew/fenestron-ui), a front end framework for Windows 10 apps on Electron and Vue
* Pug for nicer templates
* Vue Dev Tools
* Electron pre-configured for sane defaults and better Windows 10 integration
* VueX and Vue Router pre-configured
* Windows 10 user preferences in your VueX store
* Typography and iconography via Office Fabric UI Core
* StandardJS linting
* Electron IPC Helper
* A basic Hello World Fenestron app

## Running and Building
Run your app with dev tools:

```
npm run electron:serve
```
Build an executable and installer:
```
npm run electron:build
```
## Next Steps
Head over to the [Fenestron UI](https://github.com/adamrdrew/fenestron-ui) repo to learn more about Fenestron UI. There you can learn all about the various components that come with Fenestron UI and how to use them in your app.

Have fun!

## FAQ
* Q: Why do I need Visual Studio Community?
    * A: Electron Builder needs it to compile an EXE from your app

* Q: Do I have to use Visual Studio Community for development or can I use VS Code or some other editor?
    * A: You never have to touch Visual Studio, we only need it for its build tools.

* Q: Does this provide access to native Windows code?
    * A: No. You have 2 options if you want to include native Windows code in your app. You can use Node FFI to wrap around Win32. Or you can include a background headless UWP app and communicate with that. Future versions of this template will have documentaiton and code in place to help with these, but we're not there yet.

* Q. Can I submit my app made with this to the Window Store?
    * A. Yes, but with some extra effort. You need to convert it to an appx package first. Future versions of this template will include more information and documentation on that. For now, just search for "electron windows store."

## Known Issues
Vue Dev Tools doesn't work in Electron with Windows 10 dark mode enabled. Weird, right? [See this issue](https://github.com/electron/electron/issues/19468) This template ships with dev tools enabled because the benefit of dev tools far outweighs dark mode support. Disable dark mode to work on this until that issue is closed.

## Native Deps
If you need to use a module that has to be compiled, like sqlite / sqlite3, you have to do a little more leg work. You not only need Visual Studio installed, you need to have MSVC v140 installed. It's the Visual Studio 2015 dev kit / tools. Don't Panic. You don't need to go find some old installer or something. You can get what you need from Visual Studio 2019. Open the "Visual Studio Installer" and select "Modify" for 2019. Click on "Desktop Development with C++" and then scroll through the options on the right until you find MSVC v140. Click "Modify" in the lower right and it will install.

After that you have to remember to run `npm run postinstall` after you install a native dependency. So, after you install sqlite3 for example:

```
> npm install --save sqlite3 
> npm run postinstall
```

That postinstall task will use electron-builder to rebuild the module for Electron. Your hint that you are running into the problems this section tells you how to solve is if your app crashes on start complaining that it can't find some dep you know you installed, or bombing out with node-gyp errors.

### Modules That Load Native Deps
You may run into a situation where you install a module that loads a native module. For example, if you use Sequelize with SQLite3 then the `sequelize` module will load the `sqlite3` module itself rather than you load it manually. This may result in an error like the following:

```
Error: Please install sqlite3 package manually
    at ConnectionManager._loadDialectModule (webpack:///./node_modules/sequelize/lib/dialects/abstract/connection-manager.js?:81:15)
    at new ConnectionManager (webpack:///./node_modules/sequelize/lib/dialects/sqlite/connection-manager.js?:22:21)        at new SqliteDialect (webpack:///./node_modules/sequelize/lib/dialects/sqlite/index.js?:14:30)
    at new Sequelize (webpack:///./node_modules/sequelize/lib/sequelize.js?:324:20)
```

To resolve this create a `vue.config.js` file and add the following:

```javascript
module.exports = {
    pluginOptions: {
      electronBuilder: {
        externals: ['sequelize']
      }
    }
  }
```

In this case we're externalizing the `sequelize` module; put whatever module is calling you problems in there.

## Links
* [Vue CLI](https://cli.vuejs.org/)
* [Electron](https://electronjs.org/)
* [Vue CLI Plugin Electron Builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/)
* [Windows Build Tools](https://www.npmjs.com/package/windows-build-tools)
* [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/)
* [Node](https://nodejs.org/en/download/)
* [Electron IPC Helper](https://github.com/adamrdrew/electron-ipc-helper)

## Future Inclusion
These are links to things we haven't included yet but are considering in the future:
* [VueX Electron](https://github.com/vue-electron/vuex-electron) - Note: This isn't included yet, but I'm considering it going forward. Need to play with it first.
* [NEDB](https://github.com/louischatriot/nedb) - Popular Javascript database
* [Vue Testing](https://vue-test-utils.vuejs.org/)