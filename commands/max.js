const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const data = require('../data.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("max")
        .setDescription("To know how many characters you need to burn to max a target character")
        .addIntegerOption(option => option.setName('targetlevel').setDescription('The level of the character you will upgrade').setRequired(true))
        .addIntegerOption(option => option.setName('burnlevel').setDescription('The level of characters you will burn').setRequired(true)),
    async execute(interaction){
        allow = data.allowed(interaction.member._roles,data.roles());
        allow2 = data.allowed2(interaction);
        if (allow.length != 0 || allow2 != 0)
        {
            await interaction.deferReply();
            const targetlevel = interaction.options.getInteger('targetlevel');
            const burnlevel = interaction.options.getInteger('burnlevel');
            const charpower = (1000+(targetlevel-1)*10)*(Math.floor((targetlevel-1)/10)+1)
            const bonusMax = charpower*3
            const burnpower = (1000+((burnlevel-1)*10))*(Math.floor((burnlevel-1)/10)+1)
            const embed = new MessageEmbed()
            .setColor('#FFD6D1')
            .setTitle('Maxing a character')
            .addFields([
                {name: `Level`, value: '```' + `${targetlevel}` + '```' },
                {name: `Base Power`, value: '```' + `${charpower}` + '```'},
                {name: `Total Max Power`, value: '```' + `${charpower + bonusMax}` + '```'},
                {name: `\u200b`, value: `\u200b`},
                {name:`AT LEAST `, value: '```' + `${Math.ceil(bonusMax/burnpower)}`  + '```', inline: true},
                {name: `LEVEL`, value: '```' + `${burnlevel}`  + '```', inline: true}
            ])

            try{
				await interaction.editReply({embeds:[embed]});
			}
			catch(err){
				console.log("max command \n" + err)
				await interaction.editReply("An error occured while executing that command. Please contact strawberry_koko");
			}
        }
        else
        {
            interaction.reply({
                content: "Bot Commands only work in <#833235142046384129>",
			    ephemeral: true
            })
        }
    }
}

