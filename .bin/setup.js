/*
This is the Fenestron Template new project init script.
This script is intended for single use. It should have
removed itself after setup. If it didn't would you mind
being a dear and reporting an issue? ❤ A
*/

const fs = require('fs')
const readline = require('readline')
const exec = require('child_process').exec

const appName = process.argv[2]

// I originally used replace-in-file but then I realized I shouldn't
// use any dependencies for this, so I wrote this lil class
class Replace {
  substring (opts) {
    var contents = fs.readFileSync(opts.file).toString()
    if (contents.indexOf(opts.from) === -1) return
    const res = contents.replace(opts.from, opts.to)
    fs.writeFileSync(opts.file, res, (err) => {
      if (err) throw err
    })
  }
}

// Same story as above. I originaly included shelljs but realized I
// shouldn't use deps, so this responds to the same method
class Shell {
  exec (cmd) {
    return exec(cmd, (err, stdout, stderr) => {
      if (err) throw err
    })
  }
}

class Tasks {
  deleteReadMe () {
    fs.unlinkSync('README.md')
    console.log('Setup: README deleted. 📑')
  }

  deleteLicense () {
    fs.unlinkSync('LICENSE')
    console.log('Setup: LICENESE deleted. ⚖')
  }

  changeAppName () {
    if ( typeof(appName) === 'undefined' ) {
      console.log("Setup: Please provide an app name. 📛")
      process.exit(1)
    }
    const replace = new Replace()
    replace.substring({
      file: 'package.json',
      from: 'fenestron-template',
      to: appName
    })
  }

  safetyCheck () {
    const shibboleth = 'git@github.com:adamrdrew/fenestron-template.git'
    const gitConfig = fs.readFileSync('.git/config').toString()
    if (gitConfig.indexOf(shibboleth) === -1) {
      throw new Error("Git config doesn't look like the Fenestron Template. Not running to avoid doing damage.")
    }
  }

  deleteGit () {
    fs.rmdirSync('.git', {recursive: true})
    console.log('Setup: Template git repo deleted. 🗂')
  }

  initGit () {
    const shell = new Shell()
    shell.exec('git init & git add -A & git commit -am "Fenestron Template: Init"')
    console.log('Setup: Git repo initialized. 🗃')
  }

  installDeps (callback) {
    const shell = new Shell()
    console.log('Setup: Installing deps... ⛓')
    shell.exec('npm install', callback)
    
  }

  deleteMyself () {
    fs.rmdirSync('.bin', {recursive: true})
    console.log('Setup: Deleting setup resources. ♻')
  }

}

const tasks = new Tasks()
try {
  tasks.safetyCheck()
  tasks.changeAppName()
  tasks.deleteGit()
  tasks.deleteLicense()
  tasks.deleteReadMe()
  tasks.deleteMyself()
  tasks.initGit()
  tasks.installDeps((err) => {
    if (err) throw err
    console.log("Setup: Done. Thank you for flying Fenestron. ✈")
    process.exit(0)
  })
} catch (err) {
  console.log(`Setup: Something went wrong:\n${err}`)
  process.exit(1)
}
