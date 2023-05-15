const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const db = require('../../db');

module.exports = {
  name: "occard",
  description: "Look an OC's profile card!",
  alwaysEph: false,
  options: [
    { name: 'user', description: 'OC Owner', type: 6, required: true },
    { name: 'ocname', description: "OC's name", type: 3, required: true },
  ],
  
  run: async (client, interaction) => {
    
    let xUser = interaction.options?.get("user")?.user;
    const users = await db.find('Collection', { id: xUser.id });

    if(users.length === 0)
    { return interaction.followUp("The user you provided doesn't have a profile card!"); }
    let user = users[0];
    
    let ocName = interaction.options.get("ocname").value;
    // const thumbnail = interaction.options?.get("thumbnail")?.value || "N/A";
    // const bio = interaction.options?.get("bio")?.value || "N/A";
    
    console.log(user.OCs);
    const collator = new Intl.Collator('en-US', { sensitivity: 'base' });

    for (let key in user.OCs) {
      if (collator.compare(key, ocName) === 0) {   
        const embed = new EmbedBuilder()
        .setTitle(key)
        .setDescription("**_" + user.OCs[key].bio + "_**")
        .setColor('#dc1f56')
        .setFooter({ text: `OC by ${xUser.tag}`, iconURL: `${xUser.displayAvatarURL()}` })
        if(user.OCs[key].thumbnail != "N/A") { 
          embed.setImage(`${user.OCs[key].thumbnail}`) 
        }
        
        return interaction.followUp({ embeds: [embed] });
      }
    }

    interaction.followUp("I couldn't find an OC named ' " + ocName + "', please try again!");
  },
};
