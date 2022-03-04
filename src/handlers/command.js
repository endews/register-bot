const { readdirSync } = require("fs");
const { resolve } = require("path");

module.exports = (client) => {
    readdirSync(resolve(__dirname, "../commands/")).forEach((dir) => {
        const commands = readdirSync(
            resolve(__dirname, `../commands/${dir}/`)
        ).filter((f) => f.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                console.log(file, "✅");
            } else {
                console.log(file, "❌");
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
        }
    });
};