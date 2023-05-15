const client = require("../index");
const { Collection, ButtonInteraction } = require("discord.js");

const { translate } = require('bing-translate-api');

let globalCMDs = ["ping", "account", "occard", "pins"];
let chs = ["794526704508076032", "794438983291502642", "807203869032710175"];
let eph;
const variations = [
  "chill-zone-colors",
  "cz colors",
  "cz colours",
  "chill zone colors",
  "chill zone colours",
  "chillzone colors",
  "chillzone colours",
  "cz color",
  "cz colour",
  "chill zone color",
  "chill zone colour",
  "chillzone color",
  "chillzone colour",
  // add more variations here as needed
];
client.on("messageDelete", (message) => {
  if (message.author.bot) return;

  if(message.channel.id == "860016178382766080")
  {
    console.log("A poll was deleted by " + message.author.tag);
    // message.author.send("Seems like you deleted a poll!");
  }
});

client.on("messageCreate", (message) => {
  if(message.channel.id == "794438983291502642" && !message.author.bot)
  {
    translate(message.content, null, 'en').then(res => {
      if(res.translation == null) { return; }
      if(res.language.from != "en") { message.reply(res.translation + " - " + res.language.score * 100 + "\% of accuracy"); }
    }).catch(err => {
      console.error(err);
    }); 
  }
    
  if (variations.some(v => message.content.toLowerCase().replace(" ", "-") == (v.replace(" ", "-")))) {
    message.react("<:CZ_PinkuHeart:1059922014766387310>");
  }
  if(message.channel.id == "860016178382766080")
  { console.log("A poll was posted by " + message.author.tag); }
});

client.on("interactionCreate", async (interaction) => {

  // Slash Command Handling
  if (interaction.isChatInputCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd.alwaysEph) {
      if (chs.includes(interaction.channel.id) == false) {
        eph = (globalCMDs.includes(interaction.commandName.toLowerCase()) == false);
      } else { eph = false; }
    } else { eph = true; }

    await interaction.deferReply({ ephemeral: (eph) }).catch(() => { });

    if (!cmd)
      return interaction.followUp({ content: "An error has occurred " });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);
    if (cmd.name == "request") { cmd.run(client, interaction, false, ''); }
    else { cmd.run(client, interaction, args); }
  }

  if (interaction.isButton()) {
    eph = chs.includes(interaction.channel.id) == false;
    await interaction.deferReply({ ephemeral: (eph) }).catch(() => { });
    let command;
    switch(interaction.customId.toString().toLowerCase())
    {
      default:
        command = client.slashCommands.get("request");
        if (command) command.run(client, interaction, true, interaction.customId.toString().toLowerCase());
      break;
    }
  }

  // Context Menu Handling
  if (interaction.isContextMenuCommand()) {
    const command = client.slashCommands.get(interaction.commandName);
    
    if (!command.alwaysEph) {
      if (chs.includes(interaction.channel.id) == false) {
        eph = (globalCMDs.includes(interaction.commandName.toLowerCase()) == false);
      } else { eph = false; }
    } else { eph = true; }
    await interaction.deferReply({ ephemeral: eph });
    if (command) command.run(client, interaction);
  }  
});
