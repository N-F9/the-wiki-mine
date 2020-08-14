const wiki = require('wikijs').default
const fs = require('fs')
const request = require('request')

const utils = require('./utils')

module.exports = {
  photos(f, name) {
    for (const photo of f) {
      const file = `./pages/${utils.fsFriendly(name)}/photos/${photo.substring(photo.lastIndexOf("/") + 1)}`
      request(photo).pipe(fs.createWriteStream(file))
    }
  },
  tables(f, name) {
    let completedTable = ''
    for (const table of f) {
      let header = {
        completed: false,
        text: '| ',
        counter: 0
      }
      let content = ''
      for (const item of table) {
        content += '| '
        for (const i in item) {
          if (!header.completed) {
            header.text += `${i} | `
            header.counter++
            if (header.counter == Object.keys(item).length) {
              header.completed = true
              if (header.completed) {
                header.text += `\n| ${'--- | '.repeat(header.counter)}`
              }
            }
          }
          content += `${item[i]} | `
        }
        content += '\n'
      }
      completedTable += header.text + '\n'
      completedTable += content + '\n'
    }
    fs.writeFileSync(`./pages/${utils.fsFriendly(name)}/tables.md`, completedTable)
  },
  info(f, name) {
  },
  links(f, name) {
  },
  summary(f, name) {
  },
  content(f, name) {
  },
  categories(f, name) {
  },
  references(f, name) {
  },
}