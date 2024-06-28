const pug = require("pug");
const path = require("path");

function renderHtmlFile(fileName, data) {
  return pug.renderFile(
    path.join(__dirname, "..", "views", "template", fileName),
    { venue: data }
  );
}

function renderDashboard() {
  return renderHtmlFile("dashboard.pug");
}

function renderUserVenues(data) {
  return renderHtmlFile("venues.pug", data);
}

function renderReservations() {
  return renderHtmlFile("reservations.pug");
}

function renderUserProfile() {
  return renderHtmlFile("profile.pug");
}

function renderVenue(data) {
  return renderHtmlFile("viewVenue.pug", data);
}
module.exports = {
  renderDashboard,
  renderUserVenues,
  renderReservations,
  renderUserProfile,
  renderVenue,
};
