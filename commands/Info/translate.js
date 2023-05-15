const { EmbedBuilder } = require("discord.js");
const translate = require('translate');

module.exports = {
  name: "translate",
  description: "Translate command for #multi-language-general!",
  options: [{ name: 'message', description: 'Message to translate', type: 3, required: true }, { name: 'language', description: 'Language code (Example: en)', type: 3, required: true }],
  alwaysEph: true,
  run: async (client, interaction) => {
    await translate(interaction.options.get("message").value, interaction.options.get("language").value).then(res => {
      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("Translation complete!")
        .setDescription(`Translation: **${res}**\n__Original Text: ${interaction.options.get("message").value}__`)
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
      interaction.followUp({ embeds: [embed] });
      console.log(res)
    }).catch(err => {
      interaction.followUp("Invalid text or language format!");
    })
  },
};
