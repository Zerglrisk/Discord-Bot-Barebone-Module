import Event from './event.js';
import { client } from '../../index.js';
import { CommandHandler } from '../command-handler.js';
import Deps from '../../utils/deps.js';
import { Guilds } from '../../data/guilds.js';

export default class extends Event{
	on = 'messageCreate';

	constructor(){
		super();
		this.commandHandler = Deps.get(CommandHandler);
		this.guilds = Deps.get(Guilds);
	}

	async invoke(message){
		if(!message.guild || message.author.bot) return;
		const savedGuild = await this.guilds.get(message.guild.id);
		const prefix = savedGuild.prefix;
		if(!message.content.toLowerCase().startsWith(prefix)) {
			return;
		}

		return this.commandHandler.handle(prefix, message);
	}
}