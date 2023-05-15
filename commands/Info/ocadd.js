const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const db = require('../../db');

module.exports = {
  name: "ocadd",
  description: "Add an OC to your CZ profile card (MAX: 10)",
  alwaysEph: false,
  options: [
    { name: 'name', description: "Your OC's name", type: 3, required: true, max_length: 50 },
    { name: 'thumbnail', description: '[OPTIONAL]', type: 11, required: false },
    { name: 'bio', description: '[OPTIONAL]', type: 3, required: false, max_length: 120 }
  ],
  
  run: async (client, interaction) => {
    
    let UserId = interaction.user.id;
    const users = await db.find('Collection', { id: interaction.user.id });
    
    if(users.length === 0)
    {
      console.log("New User");
      const embed = new EmbedBuilder()
      .setTitle("New profile card!")
      .setDescription("Since it's your first time using profile cards, I made one just for you! You can check it out with </account:1089340997164601485> or check out other user's cards with the same command!")
      .setColor('#461b48')
      return interaction.followUp({ embeds: [embed] });
    }

    let ocName = interaction.options.get("name").value;
    const thumbnail = interaction.options?.get("thumbnail")?.attachment.url || "N/A";
    const bio = interaction.options?.get("bio")?.value || "N/A";

    const update = {
      [`OCs.${ocName}`]: {
        thumbnail: thumbnail,
        bio: bio
      }
    };
    
    
    let user = users[0];

    if(user.OCs.length >= 10)
    {
      return interaction.followUp("You have reached the maximum amount (10) of OCs you can currently add in your account!");
    }
    if(user.OCs.hasOwnProperty(ocName))
    {
      return interaction.followUp(`You already have an OC named "${ocName}" in your profile card! Please choose a different name or update the existing OC.`);
    }
    console.log(user.OCs);
    
    await db.update('Collection', { id: user.id }, update);

    const embed = new EmbedBuilder()
    .setTitle("Updated " + interaction.user.tag + "'s profile card!")
    .setDescription("Check it out with </account:1089551725062541322>!")
    .setColor('#dc1f56')
    
    interaction.followUp({ embeds: [embed] });
  },
};
