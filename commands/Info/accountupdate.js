const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const db = require('../../db');

module.exports = {
  name: "accountupdate",
  description: "Update your CZ profile card",
  alwaysEph: false,
  options: [
    { name: 'bio', description: '[OPTIONAL]', type: 3, required: false, max_length: 150 },
    { name: 'timezone', description: '[OPTIONAL]', type: 3, required: false, 
     choices:[  { name: 'GMT-12 | CET-11 | International Date Line West', value: 'GMT-12' },  { name: 'GMT-11 | CET-10 | Midway Island', value: 'GMT-11' },  { name: 'GMT-10 | CET-9 | Honolulu', value: 'GMT-10' },  { name: 'GMT-9 | CET-8 | Anchorage', value: 'GMT-9' },  { name: 'GMT-8 | CET-7 | Los Angeles', value: 'GMT-8' },  { name: 'GMT-7 | CET-6 | Denver', value: 'GMT-7' },  { name: 'GMT-6 | CET-5 | Mexico City', value: 'GMT-6' },  { name: 'GMT-5 | CET-4 | New York', value: 'GMT-5' },  { name: 'GMT-4 | CET-3 | Santiago', value: 'GMT-4' },  { name: 'GMT-3 | CET-2 | São Paulo', value: 'GMT-3' },  { name: 'GMT-2 | CET-1 | Mid-Atlantic', value: 'GMT-2' },  { name: 'GMT-1 | CET | Azores', value: 'GMT-1' },  { name: 'GMT+0 | CET+1 | London', value: 'GMT+0' },  { name: 'GMT+1 | CET+2 | Rome', value: 'GMT+1' },  { name: 'GMT+2 | CET+3 | Cairo', value: 'GMT+2' },  { name: 'GMT+3 | CET+4 | Moscow', value: 'GMT+3' },  { name: 'GMT+4 | CET+5 | Dubai', value: 'GMT+4' },  { name: 'GMT+5 | CET+6 | Karachi', value: 'GMT+5' },  { name: 'GMT+6 | CET+7 | Dhaka', value: 'GMT+6' },  { name: 'GMT+7 | CET+8 | Bangkok', value: 'GMT+7' },  { name: 'GMT+8 | CET+9 | Hong Kong', value: 'GMT+8' },  { name: 'GMT+9 | CET+10 | Tokyo', value: 'GMT+9' },  { name: 'GMT+10 | CET+11 | Sydney', value: 'GMT+10' },  { name: 'GMT+11 | CET+12 | Solomon Islands', value: 'GMT+11' },  { name: 'GMT+12 | CET+13 | Auckland', value: 'GMT+12' }],
    },
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
    let user = users[0];
    
    let bio = interaction.options?.get("bio")?.value || user.bio || "No Bio.";
    const timezone = interaction.options?.get("timezone")?.value || user.timezone || "NS";

    const update = {
      bio: bio,
      timezone: timezone
    };
    
    
    await db.update('Collection', { id: user.id }, update);

    const embed = new EmbedBuilder()
    .setTitle("Updated " + interaction.user.tag + "'s profile card!")
    .setDescription("Check it out with </account:1089551725062541322>!")
    .setColor('#dc1f56')
    
    interaction.followUp({ embeds: [embed] });
  },
};
