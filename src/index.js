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

client.on("messageCreate", async (msg) => {
  const emb = new EmbedBuilder();

  if (msg.author.bot) return;
  if (msg.mentions.has(client.user.id)) {
    if (msg.content.includes("@here") || msg.content.includes("@everyone") || msg.type == "REPLY") return;
    emb
      .setColor(0xbe4b57)
      .setTitle("Caissa-chan Help")
      .setDescription('`!fen`\nCreates an image of a chess diagram from its FEN record\n\nExample:\n`!fen rnbqk2r/pp2b1pp/2p1pn2/3p1p2/2PP4/1P3NP1/P3PPBP/RNBQ1RK1 b kq - 0 7`');
    msg.reply({ embeds: [emb] });
  }
  if (msg.content.toLowerCase().startsWith("!fen")) {
    const msgArray = msg.content.replace(/\n+/g, " ").replace(/\s+/g, " ").split(" ");
    const fen = msgArray[1] + " " + msgArray[2] + " - - 0 1";
    const { ok, error } = validateFen(fen);
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
          `https://chess.com/dynboard/?fen=${msgArray[1]}%20${msgArray[2]}%20-%20-%20-&board=green&piece=neo&size=3&coordinates=Outside`
        );
    }
    msg.reply({ embeds: [emb] });
  }
});

client.login(process.env.TOKEN);
