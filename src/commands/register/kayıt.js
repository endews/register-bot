const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json");

module.exports = {
    name: "kayıt",
    description: "testing command",
    aliases: ["register", "k", "isim"],
    roles: ["948524560028958740"],
    run: async (client, message, args) => {
        let at =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);

        if (!at)
            return message.channel.send(
                "Lütfen kayıt olacak kullanıcıyı etiketleyiniz"
            );

        if (at.id === message.guild.ownerId) return;

        let isimler =
            args[1].charAt(0).replace("i", "İ").toLocaleUpperCase() +
            args[1].slice(1).toLocaleLowerCase();

        if (!isimler)
            return message.channel.send(
                "Lütfen kayıt olacak kullanıcının ismini giriniz"
            );

        const data = await fetch(`https://api.genderize.io/?name=${isimler}`).then(
            (x) => x.json()
        ); //``

        if (data.gender === "female") {
            await at.roles.add(config.roles.female);
            await at.setNickname(`${config.tag} | ${isimler}`);
            await db.add(`regs.${message.author.id}`, 1);
            const emebd = new MessageEmbed()
                .setColor("#2f3136")
                .setAuthor({ name: "Harika!" })
                .setTimestamp()
                .setDescription(
                    `\`\`${at.user.tag}\`\` Kullanıcısı \`\`${
                        message.author.tag
                    }\`\` tarafından **Kız** olarak kayıt edildi \n\nBununla beraber \`\`${
                        message.author.tag
                    }\`\` Kullanıcısının **${db.fetch(
                        `regs.${message.author.id}`
                    )}** Teyiti oldu`
                );
            await message.channel.send({ embeds: [emebd] });
        } else if (data.gender === "male") {
            await at.roles.add(config.roles.male);
            await at.setNickname(`${config.tag} | ${isimler}`);
            await db.add(`regs.${message.author.id}`, 1);
            const emebds = new MessageEmbed()
                .setColor("#2f3136")
                .setAuthor({ name: "Harika!" })
                .setTimestamp()
                .setDescription(
                    `\`\`${at.user.tag}\`\` Kullanıcısı \`\`${
                        message.author.tag
                    }\`\` tarafından **Erkek** olarak kayıt edildi \n\nBununla beraber \`\`${
                        message.author.tag
                    }\`\` Kullanıcısının **${db.fetch(
                        `regs.${message.author.id}`
                    )}** Teyiti oldu`
                );
            await message.channel.send({ embeds: [emebds] });
        } else {
            await message.channel.send("Böyle bir isim bulamadım");
        }
    },
};
