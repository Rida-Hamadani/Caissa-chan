const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is now online.`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.content == "haro") {
    msg.reply("hello " + msg.author.globalName);
  }
});

client.login(TOKEN);
