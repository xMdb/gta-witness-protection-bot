require('dotenv').config();
import chalk = require('chalk');
import { Client, Intents, Message } from 'discord.js';
const bot: Client = new Client({
   allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
   intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
});

bot.on('ready', () => {
   console.log(chalk.greenBright('Success! Discord bot is now online.'));
   bot.user!.setActivity('DarkViperAU', {
      type: 'WATCHING',
   });
});

bot.on('guildCreate', (guild) => {
   console.log(
      chalk.greenBright(`New guild joined: "${guild.name}" (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
   );
});

bot.on('guildDelete', (guild) => {
   console.log(chalk.greenBright(`Bot removed from: "${guild.name}" (id: ${guild.id})`));
});

const names: string[] = [
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

const endings: string[] = [
   'in witness protection',
   'is still in witness protection',
   'is in witness protection',
   'was in witness protection',
   'has witness protection',
];

function tellPersonTheyAreWrong(message: any) {
   return message.channel.send('Witness protection for what?! No one was convicted of anything!');
}

bot.on('messageCreate', (message) => {
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

process.on('uncaughtException', (err) => console.error(err)).on('unhandledRejection', (err) => console.error(err));

// —— Login the bot
bot.login(process.env.BOT_TOKEN);
