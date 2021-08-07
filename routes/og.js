console.time("initializing og");
const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const { fetchOne } = require("../utils/datastore");
const { prettyRange } = require("../utils/dates");

console.timeEnd("initializing og");

function doubleEscape(txt) {
  return encodeURIComponent(encodeURIComponent(txt));
}

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const {
      name,
      country,
      city,
      free,
      startDate,
      endDate,
      category,
      topics: [mainTopic],
    } = await fetchOne(id);
    const { topics } = require("../utils/topics");
    const topicName = topics[mainTopic].name;

    const imageDomain = "https://res.cloudinary.com/eduardsi/image/upload";
    const imageTemplate = free
      ? "devevents_free_new_q66uza.png"
      : "devevents_paid_new_gmoqyo.png";
    const title = name;

    const subtitle =
      country === "Online"
        ? `${topicName} ${category}, Online`
        : `${topicName} ${category} in ${city}, ${country}`;
    const superSubtitle = prettyRange(startDate, endDate);
    const image =
      imageDomain +
      "/w_1000,c_fit,co_white,l_text:Lato_80_bold:" +
      doubleEscape(title) +
      ",g_north_west,x_100,y_100" +
      "/w_1000,c_fit,co_white,l_text:Lato_40:" +
      doubleEscape(subtitle) +
      ",g_north_west,x_100,y_360" +
      "/w_1000,c_fit,co_white,l_text:Lato_40_bold:" +
      doubleEscape(superSubtitle) +
      ",g_north_west,x_100,y_430" +
      "/" +
      imageTemplate;

    const markup = `<html>
    <head>
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:site" content="@dev_events">
      <meta name="twitter:creator" content="@dev_events">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${subtitle}">
      <meta name="twitter:image" content="${image}">
    </head>
    <body>
    </body>
  </html>`;

    res.send(markup);
  })
);

module.exports = router;
