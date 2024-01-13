require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const { validateFen } = require("chess.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  client.user.setActivity("Chess");
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().startsWith("!fen")) {
    const msgArray = msg.content.split(" ");
    const emb = new EmbedBuilder();
    const { ok, error } = validateFen(
      msgArray[1] + " " + msgArray[2] + " - - 0 1"
    );
    if (
      msgArray.length < 3 ||
      !ok ||
      !(msgArray[2] == "w" || msgArray[2] == "b")
    ) {
      emb
        .setColor(0xbe4b57)
        .setTitle("Invalid FEN")
        .setURL(
          "https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation"
        )
        .setDescription("burunya! " + error);
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
