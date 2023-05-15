const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "level",
  description: "Server levels",
  alwaysEph: false,
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor("#7289da")
      .setTitle("Server levels!")
      .setDescription("Hello!\nWe're excited to introduce a new feature on our server that allows users to unlock certain perks as they reach higher levels. These perks are designed to reward our most active and engaged users, and we hope they will add an extra level of fun and enjoyment to your experience on the server.\n\nHere's a breakdown of the perks that are currently available:\n**Level 3:** Access to the 'rant and vent' channel, where you can let off steam and share your thoughts and feelings with others.\n**Level 5:** The ability to post photos in the channels.\n**Level 15:** The 'regular' role.\n**Level 25:** Download access to certain resources and files shared on the server.\n\nWe will be adding more perks in the future, so be on the lookout for updates! In the meantime, we encourage you to check out the <#659024558220640317> channel and the <#594573372206219264> channel to stay up-to-date on all the latest news and information on the server.\nThanks for being a part of our community!")
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
  },
};
