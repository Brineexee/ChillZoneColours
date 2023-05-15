const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "colorlist",
  description: "Leads you to where the colorlist channel is at.",
  alwaysEph: false,
  run: async (client, interaction) => {
    interaction.followUp("<:CZ_ChillSparkles:1060566755723989023> You can find the **server's color list** in <#710245916254142567>");
  },
};
