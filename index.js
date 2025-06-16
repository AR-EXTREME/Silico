require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { OpenAI } = require('openai');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

client.once('ready', () => {
  console.log(`Silico is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith("!ask")) return;

  const userInput = message.content.slice(4).trim();

  if (!userInput) {
    return message.reply("Ask me something after `!ask` 😤");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are Silico, a witty, sarcastic, emotional, and helpful AI therapist and friend." },
        { role: "user", content: userInput }
      ]
    });

    const reply = response.choices[0].message.content;
    message.reply(reply);
  } catch (err) {
    console.error(err);
    message.reply("Something went wrong 💀");
  }
});

client.login(process.env.DISCORD_TOKEN);
