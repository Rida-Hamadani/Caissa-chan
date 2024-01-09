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

const regex = new RegExp("/^([1-8PNBRQK]+/){7}[1-8PNBRQK]+$/gim");

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().startsWith("!fen")) {
    const msgArray = msg.content.split(" ");
    const emb = new EmbedBuilder();
    if (msgArray.length < 3 || regex.test(msgArray[2])) {
      emb
        .setColor(0xbe4b57)
        .setTitle("Invalid FEN")
        .setURL(
          "https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation"
        )
        .setDescription("Please enter a valid Fen, burunya!");
    } else {
      const turn = msgArray[2] == "w" ? "White to move" : "Black to move";
      emb
        .setColor(0xbe4b57)
        .setTitle(turn)
        .setImage(
          `https://fen2png.com/api/?fen=${msgArray[1]}%20${msgArray[2]}%20-%20-%20-&raw=true`
        );
    }
    msg.reply({ embeds: [emb] });
  }
});

client.login(process.env.TOKEN);
