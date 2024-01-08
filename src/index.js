require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

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
  if (msg.content.toLowerCase().startsWith("!fen")) {
    const msgArray = msg.content.split(' ');
    const turn = msgArray[2] == 'w' ? 'White to move' : 'Black to move';
    const emb = new EmbedBuilder()
      .setColor(0xBE4B57)
      .setTitle(turn)
      .setImage(`https://fen2png.com/api/?fen=${msgArray[1]}%20${msgArray[2]}%20-%20-%20-&raw=true`);
    msg.reply({ embeds: [emb] });
  }
});

client.login(process.env.TOKEN);
