const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const fs = require("fs");

module.exports = {
  name: "colorinfo",
  description: "Get informations about colors from our list!",
  options: [{ name: 'color', description: 'Colour name', type: 3, required: true }],
  alwaysEph: false,
  run: async (client, interaction) => {
    let color = interaction.options.get("color").value;
    const role = await interaction.guild.roles.cache.find(role => role.name.toLowerCase() == color.toLowerCase());
    if (role == null) { return interaction.followUp("I couldn't find the role you've written! Please try again.") }
    let x = JSON.parse(fs.readFileSync('./colors.json'));
    if (!x.hasOwnProperty(color.toLowerCase())) {
      return interaction.followUp("This command works only with colour roles! You can find our list at <#710245916254142567>");
    }
    let usersRole = role.members.map(users => users.user.username);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('primary')
          .setLabel('Request Role!')
          .setCustomId(color)
          .setStyle(ButtonStyle.Primary),
      );
    const embed = new EmbedBuilder()
      .setColor(`#${role.color.toString(16).padStart(6, '0')}`)
      .setTitle("Color " + color)
      .setThumbnail(`https://singlecolorimage.com/get/${role.color.toString(16).padStart(6, '0')}/512x512`)
      .addFields(
        { name: `${usersRole.length} users have this colour!`, value: '** **', inline: true },
        { name: 'HEX Value', value: `#${role.color.toString(16).padStart(6, '0')}`, inline: true },
        { name: 'Want this colour?', value: `Click the button below!`, inline: false },
      )
      .setDescription(`**Users with this colour:**\n${truncateString(usersRole.join(", "), 250)}`)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed], components: [row] });
  },
};

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
