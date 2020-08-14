const wiki = require('wikijs').default
const fs = require('fs')
const chalk = require('chalk')

module.exports = {
  log(m) {
    console.log(chalk.blue('WIKI') + chalk.gray(' » ') + chalk.white(m))
  },
  createFolder(n) {
    if (!fs.existsSync(n)) {
      fs.mkdirSync(n)
    }
  },
  fsFriendly(f) {
    return f.replace(/\:|\>|\<|\"|\\|\/|\||\?|\*/g, '').replace(/  +|\s/g, '_').replace(/_+$/g, '')
  }
}