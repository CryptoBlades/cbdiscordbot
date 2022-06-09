const { SlashCommandBuilder } = require("@discordjs/builders");
const data = require('../data.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lev2")
        .setDescription("Lev's Custom Message 2"),
    async execute(interaction){
        allow = data.allowed(interaction.member._roles,data.roles())
        allow2 = data.allowed2(interaction);
        if (allow.length != 0 || allow2 != 0)
        {
            await interaction.deferReply();
            await interaction.editReply(`
(beep boop):robot:
:fire: :moneybag: **FOR THOSE WHO HAVE RETURNED, MAKE SURE THE CHECK OUT https://discord.com/invite/cryptobladeskingdoms  TO BUY SOME CHEAP NEW 5 STARS WHILE U GOT THE CHANCE** :fire: :moneybag:
Get them while it last
**Weapons have risen from 2.2 skill to nearly 4 skill**. The prices keep going up for your 5 star weapons. Make sure to purchase them while you can! You will regret not doing so when the price pumps up!
if you have issues buying weapons (Gas errors) please go to <#844228004078026823> and follow the steps the staff team provides`);
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