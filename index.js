import dotenv from 'dotenv';

import { Intents, Client, MessageEmbed } from 'discord.js';

dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ['MESSAGE', 'CHANNEL'],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  switch (message.content) {
    case 'ping':
      message.reply('pong!');
      break;
    case 'roles':
      {
        const guild =
          message.id !== null
            ? client.guilds.cache.find((guild) => guild.id === message.guildId)
            : null;

        if (guild == null) {
          message.reply("You can't have a role outside of a guild");
          return;
        }
        const userRolesInGuild = guild.roles.cache
          .filter((role) =>
            role.members.some((member) => member.id === message.author.id)
          )
          .map((urig) => ({
            name: urig.name,
            value: urig.permissions.toArray().join(', '),
          }));

        const roleEmbed = new MessageEmbed();
        roleEmbed
          .setTitle(`Current roles for ${message.author.username}`)
          .setFields(userRolesInGuild)
          .setImage(message.author.avatarURL({ size: 600 }))
          .setTimestamp(new Date());

        message.reply({ embeds: [roleEmbed] });
      }
      break;
  }
});

client.login(process.env.CLIENT_TOKEN);
