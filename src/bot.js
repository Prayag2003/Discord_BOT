// allows to access the envioronment variables
require("dotenv").config();

// console.log(process.env.TOKEN);

// Class and Object Destructuring
const { Client } = require("discord.js");
const prefix = "$";

// making an instance of the class
// Client is the main hub for interacting with discord API

const client = new Client();

// registering an event
client.on("ready", () => {
  // client has user properties
  console.log(`${client.user.tag} has logged in.`);
});

// // setting up some basic responses from the bot
client.on("message", (message) => {
  // if the author is a bot
  const msg = message.content;
  if (message.author.bot) return;

  console.log(`[${message.author.tag}] : ${msg}`);

  // if the author is itself a bot
  if (message.author.bot) {
    return;
  }

  // Syntax of Command
  // $cmd cmd_argument
  if (msg.startsWith(prefix)) {
    // to find which command we passed
    // const CMD_NAME = msg.substring(prefix.length);
    // const [CMD_NAME, ...args] = msg.trim().substring(prefix.length).split(" ");

    // removes white spaces in between
    // REGEX for white spaces
    const [CMD_NAME, ...args] = msg
      .trim()
      .substring(prefix.length)
      .split(/\s+/);
    // console.log(CMD_NAME);
    // console.log(args);
    console.log(CMD_NAME);
    console.log(args);

    if (CMD_NAME === "kick") {
      message.channel.send("Kicked the User");
    } 
    // else if (CMD_NAME === "ban") {
    //   message.channel.send("Ban the User");
    // }
  }

  if (msg === "Hello" || msg === "hello") {
    // message.reply("Hello");
    message.channel.send("Hello");
  }
});

client.login(process.env.TOKEN);
