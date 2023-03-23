// allows to access the envioronment variables
require("dotenv").config();

// console.log(process.env.TOKEN);

// Class and Object Destructuring
const { Client, WebhookClient } = require("discord.js");
const prefix = "$";

// making an instance of the class
// Client is the main hub for interacting with discord API

const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});

const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN
);

// registering an event
client.on("ready", () => {
  // client has user properties
  console.log(`${client.user.tag} has logged in.`);
});

// // setting up some basic responses from the bot
client.on("message", async (message) => {
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

    if (CMD_NAME === "kick") {
      if (message.member.hasPermission("KICK_MEMBERS")) {
        return message.reply("Dont have permission to kick that user !");
      }
      if (args.length === 0) {
        return message.reply("Please Provide an ID");
      }
      const member = message.guild.members.cache.get(args[0]);
      // console.log(member);

      if (member) {
        // member.kick() returns a promise
        member
          .kick()
          .then((member) =>
            message.channel.send(`${member} was kicked from the Server !`)
          )
          .catch((err) =>
            message.channel.send("I don't have that permission :( ")
          );
      } else {
        message.channel.send("Member Not Found ");
      }
      message.channel.send("Kicked the User");
    } 
    else if (CMD_NAME === "ban") {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        return message.reply(
          "You don't have the permission to Ban that user !"
        );
      }

      if (args.length === 0) {
        return message.reply("Provide an ID");
      }

      // message.guild.members.ban(args[0]).catch((err) => {
      //   console.log(err);
      // });

      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send("Banned the User");
      } catch (error) {
        console.log(error);
        message.channel.send("No Permissions or User is not Found !");
      }
    } 
    
    else if (CMD_NAME === "announce") {
      console.log(args);
      const msg = args.join(" ");
      console.log(msg);
      webhookClient.send(msg);
    }
  }

  if (msg === "Hello") {
    // message.reply("Hello");
    message.channel.send("Hello");
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  // getting the member from the guild
  console.log("Hello");
  const member = reaction.message.guild.members.cache.get(user.id);
  const { name } = reaction.emoji;
  if (reaction.message.id == "1088522787842445363") {
    switch (name) {
      case "🍎":
        member.roles.add("1088516208179028090");
        break;

      case "🐍":
        member.roles.add("1088516250092720249");
        break;
    }
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  // getting the member from the guild
  console.log("Hello");
  const member = reaction.message.guild.members.cache.get(user.id);
  const { name } = reaction.emoji;
  if (reaction.message.id == "1088516556801183927") {
    switch (name) {
      case "🍎":
        member.roles.remove("1088516208179028090");
        break;

      case "🐍":
        member.roles.remove("1088516250092720249");
        break;

      case "🍌":
        break;
    }
  }
});

client.login(process.env.TOKEN);
