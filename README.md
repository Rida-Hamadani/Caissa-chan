# Caissa-chan

This is a simple discord bot that converts [FEN](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) into an image.

To get started, add Caissa-chan to your Discord server and then send a message on the server in the following format:

`!FEN rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b`

The bot will respond with an image of the chessboard, displaying the position indicated by the provided FEN, and announcing whose turn it is.

Also it will tell you when and why a FEN is not valid.

This bot was originally made for the discord server, The Chess Loft.

# Acknowledgements

This bot uses [chessdotcom](https://chess.com/dynboard) for generating images and [chess.js](https://www.npmjs.com/package/chess.js) for FEN validation.
