const { Client, Collection, Intents } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const { resolve } = require("path");

const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents });

client.commands = new Collection();
client.aliases = new Collection();

client.conf = require('./config.json');

client.categories = fs.readdirSync(resolve(__dirname, "./src/commands/"));

config({
    path: `${__dirname}/.env`,
});

["command"].forEach((handler) => {
    require(`./src/handlers/${handler}`)(client);
});

fs.readdir(resolve(__dirname, "./src/events/"), (err, files) => {
    if (err) return console.error;
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const evt = require(`./src/events/${file}`);
        let evtName = file.split(".")[0];

        console.log(evtName, "✅");
        client.on(evtName, evt.bind(null, client));
    });
});

client.login(process.env.TOKEN).catch(err => console.log(err));