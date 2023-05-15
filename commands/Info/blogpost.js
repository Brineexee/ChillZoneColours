const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  name: "blogpost",
  description: "Automatic summarization of the latest YS blogpost",
  alwaysEph: false,
  run: async (client, interaction) => {
    const MEANINGCLOUD_API_KEY = "bb3b8fa59549a92aba773ff7b23eafaf";
    const MEANINGCLOUD_URL = 'https://api.meaningcloud.com/summarization-1.0';
    
    const WORDPRESS_RSS_URL = 'https://yanderedev.wordpress.com/feed';
    axios.get(WORDPRESS_RSS_URL)
    .then(response => {
      const $ = cheerio.load(response.data, { xmlMode: true });
      const latestPostUrl = $('item').eq(0).find('link').text();
  
      axios.get(MEANINGCLOUD_URL, {
        params: {
          key: MEANINGCLOUD_API_KEY,
          url: latestPostUrl,
          sentences: 6,
          'doc-title': 'Latest Blog Post Summary'
        }
      }).then(response => {
        const summary = response.data.summary;
        const sentences = summary.replace(/\. /g, ".\n");

        const embed = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`${$('item').eq(0).find('title').text()} - Automatic Summarization`)
          .setDescription(sentences)
          .setTimestamp()
          .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.followUp({ embeds: [embed] });
      }).catch(error => {
        console.error(error);
      });
    })
  .catch(error => {
    console.error(error);
  });
  },
};
