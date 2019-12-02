# Fenestron Project Template
This is a project template for getting a new Fenestron app bootstrapped quickly and easily. Right now this template is a provided as a repo that you clone and then start using to build your app. We'd like to eventually offer a preset or plugin via Vue CLI that you can install, but that's a little way's off. This repo contains a perfectly valid and normal Vue CLI project.

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
Installation is simply a matter of cloning this project and then making it your own:
1. Clone this repo
2. Remove the git repo: `rmdir .git /S`
3. Init your own: `git init`
4. Change the package name and version in `package.json`
5. Install: `npm install`
6. Delete this README

## What's In The Box
Here's what you will have after installing and getting set up:
* A standard Vue CLI project
* Electron building and bootstrapping thanks to electron-builder and vue electron builder
* Fenestron UI, our front end framework for Windows 10 apps on Electron and Vue
* Pug for nicer templates
* Vue Dev Tools
* Electron pre-configured for sane defaults and better Windows 10 integration
* VueX and Vue Router pre-configured
* Windows 10 user preferences in your VueX store
* Typography and iconography via Office Fabric UI Core
* StandardJS linting
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


## FAQ
* Q: Why do I need Visual Studio Community?
    * A: Electron Builder needs it to compile an EXE from your app

* Q: Do I have to use Visual Studio Community for development or can I use VS Code or some other editor?
    * A: You never have to touch Visual Studio, we only need it for its build tools.

* Q: Does this provide access to native Windows code?
    * A: No. You have 2 options if you want to include native Windows code in your app. You can use Node FFI to wrap around Win32. Or you can include a background headless UWP app and communicate with that. Future versions of this template will have documentaiton and code in place to help with these, but we're not there yet.

* Q: You have `webSecurity` set to off in your Electron config. That's bad. You're bad. Why did you do that?
    * A: We believe that the tradeoff of not having to fight with CORS is worth the small risk that having webSecurity off incurs. The `webSecutiy` option enables and disables CORS. CORS makes sense in a web app but doesn't in a desktop app resulting in your fighting with CORS for no real benefit. The primary protection CORS offers you is ensuring you don't execute code from a remote host you shouldn't. That's laudible. But for a desktop app its not really a major concern. Make sure you don't include or execute any Javascript from a remote host and only install dependencies through Node modules and you'll be at no greater risk of remote code execution or malicious code than you would be in any other desktop app development environment. So long a you only use HTTP requests for talking to APIs, you don't eval anything you get back, and you don't ever include code from a remote source you are in no more danger than you would be with any other app development environment. We are open to having our minds changed on this, but for now this seems to win the cost/benefit argument. If you are uncomfortable with this you can change `webSecurity` to true and then set up a proxy when you want to use HTTP requests.

* Q. Can I submit my app made with this to the Window Store?
    * A. Yes, but with some extra effort. You need to convert it to an appx package first. Future versions of this template will include more information and documentation on that. For now, just search for "electron windows store."

# Known Issues
Vue Dev Tools doesn't work in Electron with Windows 10 dark mode enabled. Weird, right? [See this issue](https://github.com/electron/electron/issues/19468)

This template ships with dev tools enabled because the benefit of dev tools far outweighs dark mode support. Disable dark mode to work on this until that issue is closed.