import Command from "./command.js";

export default class extends Command {
	name = 'ping';

	async execute(message, ...args){
		await message.reply('Pong!');
	}
}