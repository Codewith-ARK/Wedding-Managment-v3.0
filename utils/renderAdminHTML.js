const pug = require("pug");
const path = require("path");

let adminHTMl = {};

function renderAdminHmlFile(fileName, data) {
  return pug.renderFile(
    path.join(__dirname, "..", "views", "template", "admin", fileName),
    { venues: data }
  );
}

adminHTMl.adminDashboard = () => {
  return renderAdminHmlFile("dashboard.pug");
};

adminHTMl.renderAdminView = (data) => {
  return renderAdminHmlFile("venues.pug", data);
};

adminHTMl.addVenue = () => {
  return renderAdminHmlFile("addVenue.pug");
};

adminHTMl.editVenue = (data) => {
  return renderAdminHmlFile("editVenue.pug", data);
};

adminHTMl.deleteVenue = () => {
  return renderAdminHmlFile("deleteVenue.pug");
};
module.exports = adminHTMl;
