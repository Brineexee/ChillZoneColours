const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "pins",
  description: "Check pins command!",
  alwaysEph: false,
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("Hey! Please make sure to check pins before and/or after asking a question")
      .setDescription(`You might find out that the answer to your question has already been given to you or another user in the past!`)
      .setTimestamp()
      .setImage("https://cdn.discordapp.com/attachments/808012399923691530/1053083442125996143/image.png")
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`       });
    interaction.followUp({ embeds: [embed] });
  },
};
