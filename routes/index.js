module.exports = (app) => {
  app.use("/api/events/search", require("./search"));
  app.use("/api/events/fetch", require("./fetchOne"));
  app.use("/api/events/og", require("./og.js"));
  app.use("/api/admin", require("./admin"));
  app.use("/api/bootstrap", require("./bootstrap"));
  app.use("/api/rss", require("./rss"));
  app.use("/api/sitemap", require("./sitemap"));
  app.use("/api/events/new", require("./add"));
};
