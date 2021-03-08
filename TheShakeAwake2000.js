const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

	const taggedUser = message.mentions.members.first();
	if (!message.content.startsWith(config.prefix) || message.author.bot || !taggedUser) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (command === 'shake') {
        if (taggedUser.voice.channel){
    	    message.channel.send(`Now shakeing: ${message.mentions.users.first()}`);

            if (!message.guild.channels.cache.find(channel => channel.name === config.name)) {
                message.guild.channels.create(config.name, { type: 'voice' });
            }

            var Shakes = config.baseShake

            if (!isNaN(args[1]) && args[1] < config.maxShake && args[1] > 0) {
    	        Shakes = args[1];
            }

            shakeChannel = message.guild.channels.cache.find(channel => channel.name === config.name)
            originChannel = taggedUser.voice.channel

            for (i=0; i < Shakes; i++) {
                taggedUser.voice.setChannel(shakeChannel);
                taggedUser.voice.setChannel(originChannel);
                if (taggedUser.voice.channel !== originChannel) {
                    break;
                }
            }
            message.channel.send(`${message.mentions.users.first()} Hopefully shook awake`);
        } else {
            message.channel.send(`${message.mentions.users.first()} is not connected to a Voice channel`);
        }
    }
});

client.login(config.token);
