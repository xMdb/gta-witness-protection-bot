require('dotenv').config();
const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const consola = require('consola');
const bot = new Client({
   allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
   intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

bot.once(Events.ClientReady, () => {
   consola.success(`${bot.user.username} is now online!`);
   bot.user.setActivity('DarkViperAU', {
      type: ActivityType.Watching,
   });
});

bot.on(Events.GuildCreate, (guild) => {
   consola.info(`New guild joined: "${guild.name}" (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

bot.on(Events.GuildDelete, (guild) => {
   consola.info(`Bot removed from: "${guild.name}" (id: ${guild.id})`);
});

const names = [
   'Micheal',
   'Michael',
   'De Santa',
   'Townley',
   'Michael De Santa',
   'Micheal De Santa',
   'Michael De Santo',
   'Micheal De Santo',
   'Micheal Townley',
   'Michael Townley',
   'Micheal Townly',
   'Michael Townly',
   'M',
   'Mikey',
   'Mikey De Santa',
   'Mr De Santa',
   'Mr. De Santa',
   'Sugar Tits',
   'Michele',
   'Slick',
   'MT',
   'Mr De Santo',
   'Mr. De Santo',
   'Mr DS',
   'Mr. DS',
   'The Sneaky Dude',
];

const endings = [
   'in witness protection',
   'is still in witness protection',
   'is in witness protection',
   'was in witness protection',
   'has witness protection',
];

function tellPersonTheyAreWrong(message) {
   message.reply('Witness protection for what?! No one was convicted of anything!');
   consola.info(`⭐ Bot was used.`);
   consola.info(`Message sent in "${message.guild.name}" (${message.guild.memberCount}). In response to "${message.content}".`);
}

bot.on(Events.MessageCreate, (message) => {
   if (message.author.bot) return;
   for (const name in names) {
      for (const ending in endings) {
         if (
            message.content.toLowerCase().includes(names[name].toLowerCase()) &&
            message.content.toLowerCase().includes(endings[ending].toLowerCase())
         )
            return tellPersonTheyAreWrong(message);
      }
   }
});

process.on('uncaughtException', (err) => consola.error(err)).on('unhandledRejection', (err) => consola.error(err));

// —— Login the bot
bot.login(process.env.BOT_TOKEN);
