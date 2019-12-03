/*
This is the Fenestron Template new project init script.
This script is intended for single use. If you stumbled upon it in
your repo you are welcome to delete it :)
*/

const fs = require('fs')
const readline = require('readline')
const exec = require('child_process').exec

const appName = process.argv[2]

// I originally used replace-in-file but then I realized I shouldn't
// use any dependencies for this, so I wrote this method to respond
// to the sync method
class Replace {
  sync (opts) {
    var contents = fs.readFileSync(opts.files, (err) => {
      if (err) throw err
    })
    if (contents.indexOf(opts.from) === -1) return
    const res = contents.replace(opts.from, opts.to)
    fs.writeFileSync(opts.files, res, (err) => {
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
  deleteGit () {
    fs.rmdir('.git', (err) => {
      if (err) throw err
      console.log('.git deleted')
    })
  }

  deleteReadMe () {
    fs.unlinkSync('README.md')
    console.log('README deleted')
  }

  deleteLicense () {
    fs.unlinkSync('LICENSE')
    console.log('LICENESE deleted')
  }

  changeAppName () {
    if ( typeof(appName) === 'undefined' ) {
      console.log("Please provide an app name")
      process.exit(1)
    }
    const replace = new Replace()
    replace.sync({
      files: 'package.json',
      from: 'app-name-before-setup',
      to: appName
    })
  }

  safetyCheck () {
    const shibboleth = 'git@github.com:adamrdrew/fenestron-template.git'
    const gitConfig = fs.readFileSync('.git/config').toString()
    if (gitConfig.indexOf(shibboleth) === -1) {
      throw new Error("Git config doesn't look like the Fenestron Template. Not running to avoid doing damage.")
    }
    fs.rmdirSync('.git', {recursive: true})
    console.log('template git repo deleted')
  }

  initGit () {
    const shell = new Shell()
    shell.exec('git init ; git add -A ; git commit -am "Fenestron Template: Init"')
    console.log('git initialized')
  }

  installDeps () {
    const shell = new Shell()
    shell.exec('npm install')
    console.log('deps installed')
  }

  deleteMyself () {
    fs.rmdirSync('.bin', (err) => {
      if (err) throw err
    })
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
  tasks.installDeps()
} catch (err) {
  console.log(`Something went wrong:\n${err}`)
  process.exit(1)
}
