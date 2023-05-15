const fs = require("fs");

module.exports = {
  name: "random",
  description: "I'll choose a random colour from my list for you!",
  alwaysEph: false,
  run: async (client, interaction) => {
    let x = JSON.parse(fs.readFileSync('./colors.json'));
    const command = client.slashCommands.get("request");
    let keys = Object.keys(x);
    if (command) command.run(client, interaction, true, keys[Math.floor(Math.random() * keys.length)]);
  },
};