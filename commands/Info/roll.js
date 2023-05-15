const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "roll",
  description: "Roll a dice!",
  options: [{ name: 'sides', description: 'OPTIONAL: Sides value', type: 3, required: false }],
  alwaysEph: false,
  run: async (client, interaction) => {
    let num = Math.floor(Math.random() * 6) + 1;
    if(interaction.options.get("sides"))
    {
      let x = parseInt(interaction.options.get("sides").value.toLowerCase());
      num = Math.floor(Math.random() * x) + 1;
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FFFFFF")
      .setTitle("Dice rolled!")
      .setDescription(`Result: **${num}**!`)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
  },
};
