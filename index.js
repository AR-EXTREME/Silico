// === index.js === const { Client, GatewayIntentBits } = require('discord.js'); require('dotenv').config(); const express = require('express');

const app = express(); app.get('/', (req, res) => res.send('Silico is alive!')); app.listen(3000, () => console.log('Express server is running'));

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.once('ready', () => { console.log(Logged in as ${client.user.tag}); });

client.on('messageCreate', async message => { 
  if (message.author.bot) return;

if (message.content === '!ping') { 
  message.reply('Pong! 🏓');
} else if (message.content === '!silico') { 
  message.reply("I'm Silico – your silicon therapist and LeetCode motivator 💻✨");
} else if (message.content.startsWith('!motivate')) { 
  const motivators = [ 'One more bug closer to perfection.', '200 problems? You’re just getting started.', 'Chess Elo 2000? Your future self already did it.', 'Don’t compare. Create.', ]; const random = motivators[Math.floor(Math.random() * motivators.length)]; message.reply(random);
} 
  });

client.login(process.env.TOKEN);

