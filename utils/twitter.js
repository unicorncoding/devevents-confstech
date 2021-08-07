console.time("initializing twitter");
const Twit = require("twit");
const { countryName, countryEmoji } = require("./geo");
const { isFuture, prettyRange, dayjs } = require("./dates");
const { topics: allTopics } = require("./topics");

const config = {
  consumer_key: process.env.twitter_consumer_key || "none",
  consumer_secret: process.env.twitter_consumer_secret || "none",
  access_token: process.env.twitter_access_token || "none",
  access_token_secret: process.env.twitter_access_secret || "none",
};
const twitter = new Twit(config);

console.timeEnd("initializing twitter");
module.exports.tweet = (event) => {
  if (!event.id) {
    throw new Error("Cannot tweet event without id");
  }

  const status = [
    ...[
      what(event),
      about(event),
      location(event),
      `🗓 ${prettyRange(event.startDate, event.endDate)}`,
      price(event),
      cfpOrUndefined(event),
      retweetPlease(event),
      "",
      callToAction(event),
    ],
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  return twitter
    .post("statuses/update", { status })
    .catch((e) =>
      console.error(new Error(`Tweeting of ${event.name} failed: ${e}`))
    );
};

function price({ free }) {
  if (free) {
    return "💰 FREE";
  } else {
    return "💰 PAID";
  }
}

function retweetPlease({ twitter }) {
  if (twitter) {
    return `\n❤️ Retweet to support! @${twitter}`;
  } else {
    return "\n❤️ Retweet to support!";
  }
}

function what({ name }) {
  return `🆕 ${name}`;
}

function about({ topics, category }) {
  const [mainTopic] = topics;
  return `ℹ️ ${allTopics[mainTopic].name} ${category}`;
}

function cfpOrUndefined({ cfpEndDate }) {
  if (isFuture(cfpEndDate)) {
    const timeLeft = dayjs(cfpEndDate).fromNow(true);
    return `📢 ${timeLeft} to submit a talk`;
  } else {
    return undefined;
  }
}

function location({ city, countryCode }) {
  if (countryCode === "ON") {
    return "🌍 Online";
  } else {
    const name = countryName(countryCode);
    const emoji = countryEmoji(countryCode);
    return `${emoji} ${city}, ${name}`;
  }
}

function callToAction({ id }) {
  return `More information: https://dev.events/conferences/${id}`;
}
