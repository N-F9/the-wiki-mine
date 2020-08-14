const wiki = require('wikijs').default
const fs = require('fs')

const components = require('./components/components')
const utils = require('./components/utils')

utils.createFolder('./pages')

const createPage = (name) => {

  utils.createFolder(`./pages/${utils.fsFriendly(name)}`)
  utils.createFolder(`./pages/${utils.fsFriendly(name)}/photos`)

  wiki()
    .page(name)
    .then(page => {
      page.images().then(c => { components.photos(c, name) }).catch(console.log)
      page.tables().then(c => { components.tables(c, name) }).catch(console.log)
      page.info().then(c => { components.info(c, name) }).catch(console.log)
      page.links().then(c => { components.links(c, name) }).catch(console.log)
      page.summary().then(c => { components.summary(c, name) }).catch(console.log)
      page.content().then(c => { components.content(c, name) }).catch(console.log)
      page.categories().then(c => { components.categories(c, name) }).catch(console.log)
      page.references().then(c => { components.references(c, name) }).catch(console.log)
    })
    .catch(console.log)

}

// wiki().random(1).then(([item]) => createPage(item)).catch(console.log)

// This is for testing purposes
createPage('2018_President_of_the_Senate_of_the_Czech_Republic_election')