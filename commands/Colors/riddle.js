const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  name: "riddle",
  description: "Guess the colour by the riddle!",
  alwaysEph: false,
  run: async (client, interaction, fromRandom, req) => {
    const riddles = [
      { riddle: "I'm the color of the clear sky, and I'm the color of sapphire. What color am I?", answer: "Blue" },
      { riddle: "I'm the color of a piece of paper, and I'm the color of a polar bear. What color am I?", answer: "White" },
      { riddle: "I'm the color of a bunch of grapes, and I'm the color of a plum. What color am I?", answer: "Purple" },
      { riddle: "I'm the color of a Granny Smith apple, and I'm the color of a lime. What color am I?", answer: "Green" },
      { riddle: "I'm a color that doesn't rhyme with 'go' and I'm the color of stop signs. What color am I?", answer: "Red" }
    ];
    const riddle = riddles[Math.floor(Math.random() * riddles.length)];
    const embed = new EmbedBuilder()
      .setDescription(`You have 30 seconds\n**__"${riddle.riddle}"__**`)
      .setTitle(`**${interaction.user.username}**, solve the riddle!`)
      .setColor(`#ffff`)
    interaction.followUp({ embeds: [embed] });

    //console.log(role);
    const msg_filter = m => m.author.id === interaction.user.id;
    interaction.channel.awaitMessages({
      filter: msg_filter,
      time: 30000,
      errors: ["time"],
      max: 1
    }).then(async (collected) => {

      if (collected.first().content.toLowerCase().includes(riddle.answer.toLowerCase())) {
        interaction.followUp("<@" + interaction.user.id + ">, <:CZ_AdvAgree:1059097827873128448> Correct answer! It was **" + riddle.answer + "**, you won the game!!");
      } else {
        interaction.followUp("<:CZ_AdvDisagree:1059097830939176980> Wrong answer! It was **" + riddle.answer + "**");
      }
    }).catch((err) => {
      interaction.followUp("Time's up! The answer was **" + riddle.answer + "**");
      console.log(err)
      console.log(interaction.user.id)
    });
  },
};