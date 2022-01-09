import dotenv from 'dotenv';

import { Intents, Client } from 'discord.js';

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
  console.log({ message });

  if (message.content === 'ping') {
    message.reply('pong!');
  }
});

client.login(process.env.CLIENT_TOKEN);
