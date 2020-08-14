const wiki = require('wikijs').default
const fs = require('fs')
const request = require('request')

const utils = require('./utils')

module.exports = {
  photos(f, name) {
    for (const photo of f) {
      const file = `./pages/${utils.fsFriendly(name)}/photos/${photo.substring(photo.lastIndexOf("/") + 1)}`
      request.head(photo, (err, res, body) => {
        request(photo)
          .pipe(fs.createWriteStream(file))
          .on('close', () => {})
      })
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
    fs.promises.writeFile(`./pages/${utils.fsFriendly(name)}/tables.md`, completedTable)
  },
  info(f, name) {
    fs.promises.writeFile(`./pages/${utils.fsFriendly(name)}/info.json`, JSON.stringify(f))
  },
  summary(f, name) {
    fs.promises.writeFile(`./pages/${utils.fsFriendly(name)}/summary.md`, f)
  },
  content(f, name) {
    let formatedContent = `# ${name.toUpperCase()}\n\n`
    for (const item of f) {
      formatedContent += `## ${item.title.toUpperCase()}\n${(item.content != '') ? `${item.content}\n` : ``}\n`
      if (item.items != undefined) {
        for (const subItem of item.items) {
          formatedContent += `### ${subItem.title.toUpperCase()}\n${(subItem.content != '') ? `${subItem.content}\n` : ``}\n`
          if (subItem.items != undefined) {
            for (const subsubItem of subItem.items) {
              formatedContent += `#### ${subsubItem.title.toUpperCase()}\n${(subsubItem.content != '') ? `${subsubItem.content}\n` : ``}\n`
            }
          }
        }
      }
    }
    fs.promises.writeFile(`./pages/${utils.fsFriendly(name)}/content.md`, formatedContent)
  },
  references(f, name) {
    let formatedReferences = ''
    for (const link of f) {
      const newLink = link.substring(link.indexOf('//')+2).substring(0, link.substring(link.indexOf('//')+2).indexOf('/'))
      formatedReferences += `[${newLink}](${link})\n`
    }
    fs.promises.writeFile(`./pages/${utils.fsFriendly(name)}/references.md`, formatedReferences)
  },
}