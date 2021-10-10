import dotenv from "dotenv";
// import config from './config.json';
import mongoose from 'mongoose';
import { Client, Intents } from "discord.js";
import { EventHandler } from './handlers/event-handler.js';
import { CommandHandler } from './handlers/command-handler.js';
import Deps from './utils/deps.js';
dotenv.config({ path: '.env' });

export const client = Deps.add(Client, new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
]}));

// client.config = config;
client.config = { "prefix" : "!" };

await mongoose.connect(process.env.MONGODB_URI, {
	// useUnifiedTopology: true, //default true
	// useFindAndModify: true, //for v6 not support, default false
	// useCreateIndex: true, //for v6 not support, default true
	// useNewUrlParser: true, //default true
}, (error) => {
	(error) ? console.log(`Failed to connect MongoDB database\nReason : ${error.message}`) : console.log("Connected to MongoDB database");
})

// const conn = await mongoose.createConnection(process.env.MONGODB_URI).asPromise();
// console.log(conn.readyState);
Deps.get(EventHandler).init();
client.login(process.env.DISCORD_BOT_TOKEN);