import { readdirSync } from 'fs';

export class CommandHandler {
	commands = new Map();
	
	async init(){
		const fileNames = readdirSync('./src/handlers/commands');
		for (const name of fileNames) {
			const { default: Command } = await import(`./commands/${name}`);
			const command = new Command();
			if(!command.name) continue;

			this.commands.set(command.name, command);
		}
		console.log(`${fileNames.length - 1} commands were loaded.`);
	}

	async handle(prefix, message){
		try{
			const [cmd, ...args] = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g);

			const command = this.commands.get(cmd.toLowerCase()) || this.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
			if (!command) return;

			await command.execute(message, args);
		}
		catch (error) {
			await message.reply(`⚠${error.message}`)
		}
	}
}