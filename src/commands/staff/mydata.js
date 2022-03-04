const {MessageEmbed} = require("discord.js")
const db = require('quick.db')

module.exports = {
    name: "mydata",
    description: "Kayıt verileriniz",
    aliases: ["stats", "stat", "md", "teyits"],
    roles: ["948524560028958740"],
    run: async (client, message, args) => {
        let usr = message.mentions.members.first() || message.author;

        let mydb = db.fetch(`regs.${usr.id}`)

        const emr = new MessageEmbed()
            .setColor("#2f3136")
            .setAuthor({name: `${usr.user.username} Kullanıcısının herhangi bir teyit verisi bulunmadı`})

        if (!mydb) return message.channel.send({embeds: [emr]})

        const er = new MessageEmbed()
            .setColor("#2f3136")
            .setAuthor({name: `${message.author.tag} Kullanıcısının verileri:`})
            .setDescription(`\`\`Toplam Teyit:\`\` ${mydb}`)
            .setTimestamp()

        message.channel.send({embeds: [er]})
    }
}