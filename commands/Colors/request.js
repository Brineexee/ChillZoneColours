const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "request",
  description: "Request a colour",
  options: [{ name: 'color', description: 'Colour name', type: 3, required: true }],
  alwaysEph: false,
  run: async (client, interaction, fromRandom, req) => {
    let x = JSON.parse(fs.readFileSync('./colors.json'));
    let y = (fromRandom == false ? interaction.options.get("color").value.toLowerCase() : req);
    if(y.startsWith("level")) { return interaction.followUp("I'm sorry but I can't give level roles! In order to get them you need to talk with other users in the chats")}
    if (x.hasOwnProperty(y)) {
      await ClearColors(x, y, interaction).then(result => {
        if (y == "clear") { return interaction.followUp("Colors cleaned!"); }
        let role = interaction.guild.roles.cache.get(x[y]);
        interaction.member.roles.add(role).catch((err) => { interaction.followUp(err.toString()); })
  
        const embed = new EmbedBuilder().setDescription(`**${interaction.user.username}**, here is your colour role, enjoy!`).setTitle("Colour " + y + " applied to " + interaction.user.username + "!").setColor(`#${role.color.toString(16).padStart(6, '0')}`).setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
  
        interaction.followUp({ embeds: [embed] });
      });
    } else { interaction.followUp("I couldn't find the role you've written! Please try again.") }
  },
};

var ClearColors = (json, NewColor, interaction) =>
  new Promise((resolve, reject) => {
    if(NewColor != "event attenders" && NewColor != "brantsteele contestants") {
      let keys = Object.keys(json), roles = interaction.member.roles;
      for (var i = 1; i < keys.length; i++) { 
        if(roles.cache.has(json[keys[i]]) && (json[keys[i]] != "594572813940293693" && json[keys[i]] != "774706469735104573" && json[keys[i]] != "885492162555433000")) { 
           roles.remove(json[keys[i]]);
           console.log(interaction.user.username + " - Removed " + json[keys[i]]);
        }
      }
    }
    resolve("Cleaned colours");
});