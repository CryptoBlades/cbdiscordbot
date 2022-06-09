const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const data = require('../data.js')
const Web3 = require('web3');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fights")
        .setDescription("To know how many fight transactions were made the past hour"),
    async execute(interaction){
        allow = data.allowed(interaction.member._roles,data.roles());
        allow2 = data.allowed2(interaction);
        if (allow.length != 0 || allow2 != 0)
        {
            await interaction.deferReply();
            var bsc_web3 = new Web3('https://bsc-dataseed1.defibit.io/')
            var heco_web3 = new Web3('https://http-mainnet.hecochain.com')
            var okex_web3 = new Web3('https://exchainrpc.okex.org/')
            var poly_web3 = new Web3('https://polygon-rpc.com/') 
            var avax_web3 = new Web3('https://api.avax.network/ext/bc/C/rpc')
			var aurora_web3 = new Web3('https://mainnet.aurora.dev')
            var bsc_cryptoblades_contract =  new bsc_web3.eth.Contract(data.cryptoblades_abi(), data.contract_address("bsc"))
            var heco_cryptoblades_contract =  new heco_web3.eth.Contract(data.cryptoblades_abi(), data.contract_address("heco"))
            var oec_cryptoblades_contract =  new okex_web3.eth.Contract(data.cryptoblades_abi(), data.contract_address("oec"))
            var poly_cryptoblades_contract =  new poly_web3.eth.Contract(data.cryptoblades_abi(), data.contract_address("poly"))
            var avax_cryptoblades_contract =  new avax_web3.eth.Contract(data.cryptoblades_abi(), data.contract_address("avax"))
			var aurora_cryptoblades_contract = new aurora_web3.eth.Contract(data.cryptoblades_abi(), data.contract_address("aurora"))
            var bsc = await bsc_cryptoblades_contract.methods.vars(2).call();
            var heco = await heco_cryptoblades_contract.methods.vars(2).call();
            var oec = await oec_cryptoblades_contract.methods.vars(2).call();
            var poly = await poly_cryptoblades_contract.methods.vars(2).call();
            var avax = await avax_cryptoblades_contract.methods.vars(2).call();
			var aurora = await aurora_cryptoblades_contract.methods.vars(2).call();
            var total = String(parseInt(bsc) + parseInt(heco) + parseInt(oec) + parseInt(poly) + parseInt(avax) + parseInt(aurora));
            const embed = new MessageEmbed()
            .setColor('#FFD6D1')
            .setTitle('Fights of the hour')
            .addFields([
                {name: `<:BSC:943177255771856946> BSC`, value: '```' + `${bsc}` + '```',inline: false},
                {name: `<:HECO:918895291460108359> HECO`, value: '```' + `${heco}` + '```',inline: false},
                {name: `<:OEC:918895344643874887> OEC`, value: '```' + `${oec}` + '```',inline: false},
                {name:`<:POLY:918899600914518026> POLY`, value: '```' + `${poly}` + '```',inline: false},
                {name:`<:AVAX:918895655722831913> AVAX`, value: '```' + `${avax}` + '```',inline: false},
				{name:'<:AURORA:968542683167604746> AURORA',value: '```' + `${aurora}` + '```',inline: false},
                {name:`<:levino:902656292655595580> TOTAL`, value: '```' + `${total}` + '```',inline: false}
            ])
			
            try{
				await interaction.editReply({embeds:[embed]});
			}
			catch(err){
				console.log("fights command \n" + err)
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

