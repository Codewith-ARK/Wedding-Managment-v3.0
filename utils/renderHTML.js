const pug = require('pug')
const path = require('path')

function renderHtmlFile(fileName){
  return pug.renderFile(path.join(__dirname,'..','views','template',fileName));
}

function renderDashboard(){
  return renderHtmlFile('dashboard.pug');
}

function renderUserVenues(){
  return renderHtmlFile('venues.pug');
}

module.exports = {renderDashboard, renderUserVenues};