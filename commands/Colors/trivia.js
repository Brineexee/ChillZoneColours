const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
  name: "trivia",
  description: "Guess the colour name!",
  alwaysEph: false,
  run: async (client, interaction, fromRandom, req) => {
    let x = JSON.parse(fs.readFileSync('./colors.json'));
    let keys = Object.keys(x);
    let role = await getRole(keys, interaction);
    hex = role.color.toString(16).padStart(6, '0');
    
    const embed = new EmbedBuilder()
      .setDescription(`You have 30 seconds`)
      .setTitle(`**${interaction.user.username}**, guess the color!`)
      .setImage(`https://singlecolorimage.com/get/${hex}/512x512`)
      .setColor(`#${hex}`)
    interaction.followUp({ embeds: [embed] });

    //console.log(role.name);
    const msg_filter = m => m.author.id === interaction.user.id;
    interaction.channel.awaitMessages({
        filter: msg_filter,
        time: 30000,
        errors: ["time"],
        max: 1
    }).then(async (collected) => {
      
      if(collected.first().content.toLowerCase() == role.name.toLowerCase())
      {
        interaction.followUp("<:CZ_AdvAgree:1059097827873128448> Correct answer! It was **" + role.name + "**, you won the game!!");
      }else { interaction.followUp("<:CZ_AdvDisagree:1059097830939176980> Wrong answer! It was **" + role.name + "**"); }
    }).catch((err) => {
      interaction.followUp("Time's up! The colour was **" + role.name + "**"); 
      console.log(err)
    });
  },
};

async function getRole(keys, interaction)
{
  const role = await interaction.guild.roles.cache.find(role => role.name.toLowerCase() == keys[Math.floor(Math.random() * keys.length)].toLowerCase());
  if(role == null) { return getRole(keys, interaction); }
  return role;
}