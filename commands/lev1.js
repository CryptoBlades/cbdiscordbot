const { SlashCommandBuilder } = require("@discordjs/builders");
const data = require('../data.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lev1")
        .setDescription("Lev's Custom Message 1"),
    async execute(interaction){
        allow = data.allowed(interaction.member._roles,data.roles())
        allow2 = data.allowed2(interaction);
        if (allow.length != 0 || allow2 != 0)
        {
            await interaction.deferReply();
            await interaction.editReply(`
Welcome back friend.(beep boop):robot:

Please check <#895526411320844288>
If you plan to bridge, please check <#833234292392853514> to see the earnings on some chains. 
You could ideally check <#868536973936169031> where you can find some commands to use in <#833235142046384129> to see your potential earnings in other chains.
The bridge guide can be found on our youtube which is linked in <#833233464865849394> And to ensure more information on the chains you can check <#890815192265555988> <#901127758321696768> <#895533778850684928> <#918323463792517140>
Thank you so much! :heart:`);
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