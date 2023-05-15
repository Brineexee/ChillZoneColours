//Original Template: https://github.com/GreenScreen410/discord.js-v14-template/blob/main/index.js
require("dotenv").config();
const { Client, Collection } = require("discord.js");

const keepAlive = require("./server.js");
const client = new Client({ intents: 3276799 });
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();

require("./handler")(client);

keepAlive();
client.login(process.env.TOKEN);