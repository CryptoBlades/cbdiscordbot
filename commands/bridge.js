const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const data = require('../data.js')
const Web3 = require('web3');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bridge")
        .setDescription("To know how much bridging cost iks"),
    async execute(interaction){
        allow = data.allowed(interaction.member._roles,data.roles());
        allow2 = data.allowed2(interaction);
        if (allow.length != 0 || allow2 != 0)
        {
            await interaction.deferReply();
            const bnbcost = 0.00266185
            var usdbnbcost =await data.BNBtoUSD();
            const skillcost = 0.1
            var usdskillcost = await data.SKILLtoUSD();
            var value1 = (usdbnbcost*bnbcost)
            var value2 = (skillcost*usdskillcost)
            const embed = new MessageEmbed()
            .setColor('#FFD6D1')
            .setTitle('Bridging cost')
            .setFooter({text:'The value above is per NFT,\n you can only bridge 1 NFT at a time.'})
            .addFields([
                {name: `BNB cost: `, value: '```' + `${bnbcost.toFixed(3)}`+' BNB/$'+`${value1.toFixed(3)}`+' USD' + '```' },
                {name: `SKILL cost: `, value:  '```' + `${skillcost.toFixed(3)}`+' SKILL/$'+`${value2.toFixed(3)}`+' USD' + '```' },
                {name: `TOTAL cost: `, value:  '```' + `$${(value1+value2).toFixed(3)}`+' USD' + '```' }
            ])
            
            try{
				await interaction.editReply({embeds:[embed]});
			}
			catch(err){
				console.log("bridge command \n" + err)
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

