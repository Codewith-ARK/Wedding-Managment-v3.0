const pug = require("pug");
const path = require("path");

let adminHTMl = {};

function renderAdminHmlFile(fileName) {
  return pug.renderFile(
    path.join(__dirname, "..", "views", "template", "admin", fileName)
  );
}

adminHTMl.adminDashboard = () =>{
  return renderAdminHmlFile("dashboard.pug");
}

adminHTMl.renderAdminView = () => {
  return renderAdminHmlFile("venues.pug");
};

adminHTMl.addVenue = () => {
  return renderAdminHmlFile('addVenue.pug')
}

adminHTMl.editVenue = () => {
  return renderAdminHmlFile('editVenue.pug')
}

adminHTMl.deleteVenue = ()=>{
  return renderAdminHmlFile('deleteVenue.pug')
}
module.exports = adminHTMl;
