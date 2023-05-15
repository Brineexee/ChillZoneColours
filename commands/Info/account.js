const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const db = require('../../db');

module.exports = {
  name: "account",
  description: "Check your CZ profile card here!",
  alwaysEph: false,
  options: [
    { name: 'user', description: '[OPTIONAL]', type: 6, required: false, },
  ],
  run: async (client, interaction) => {
    let UserId = interaction.options?.get("user")?.user.id || interaction.user.id;
    let xUser = interaction.options?.get("user")?.user || interaction.user;
    
    const users = await db.find('Collection', { id: UserId });
    if(users.length === 0 && UserId == interaction.user.id)
    {
      console.log("New User");
      user = {
        id: UserId,
        bio: "No Bio.",
        timezone: `Not specified`,
        OCs: { }
      }
    
      const result = await db.insertOne('Collection', user);
      
      const embed = new EmbedBuilder()
      .setTitle("New profile card!")
      .setDescription("Since it's your first time using profile cards, I made one just for you! You can check it out with </account:1089340997164601485> or check out other user's cards with the same command!")
      .setColor('#461b48')
      return interaction.followUp({ embeds: [embed] });
    }else if(users.length === 0 && UserId != interaction.user.id)
    { return interaction.followUp("The user doesn't have a profile card!"); }
    
    user = users[0];
    
    const embed = new EmbedBuilder()
      .setColor('#dc1f56')
      .setTitle(`${xUser.username}'s Profile Card`)
      .setThumbnail(`${xUser.displayAvatarURL()}`)
      .addFields(
        { name: 'BIO', value: user.bio, inline: false },
        { name: 'ID', value: user.id, inline: true },
        { name: 'Timezone', value: user.timezone, inline: true },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
    if (Object.keys(user.OCs).length > 0) {
      embed.addFields({ name: 'OCs - ' + Object.keys(user.OCs).length, value: "** **", inline: false })
      for (const [ocName, ocData] of Object.entries(user.OCs)) {
        const ocThumbnail = ocData.thumbnail || 'N/A';
        const ocBio = ocData.bio || 'N/A';
        embed.addFields({name: ocName, value: `[OC Photo](${ocThumbnail})\n"_${ocBio}_"`, inline: true});
      }
    }
    
    interaction.followUp({ embeds: [embed] });
  },
};
