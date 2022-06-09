const { SlashCommandBuilder } = require("@discordjs/builders");
const data = require('../data.js')
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("See the list of commands"),
    async execute(interaction){
        allow = data.allowed(interaction.member._roles,data.roles())
        allow2 = data.allowed2(interaction);
        if (allow.length != 0 || allow2 != 0)
        {
            await interaction.deferReply();
			const embed = new MessageEmbed()
            .setColor('#FFD6D1')
            .setTitle('List of commands')
            .addFields([
                {name: `/bridge `, value: '```Shows the cost of bridging per nft```' },
				{name: `/fights `, value: '```Shows the number of fights that has happened for the past hour on every chain we are on```' },
				{name: `/max (level of character) (level of character to be burned) `, value: '```Shows the number of characters to be burned to max a specific character```' },
            ])
			try{
				await interaction.editReply({embeds:[embed]});
			}
			catch(err){
				console.log("help command \n" + err)
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