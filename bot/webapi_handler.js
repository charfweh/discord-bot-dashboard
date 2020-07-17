const discord = require("discord.js")
const bot = new discord.Client()
const {token} = require("../config.json")
bot.on("ready",()=>{
  console.log("im ready")
})
function userhit(userResponse){
  bot.channels.cache.get('730731531428954172').send(`User authorize with ${userResponse.username}#${userResponse.discriminator}`)
}
function checkguild(member_id,guilds){
  owner_guilds = []
  bot_guilds = []
  invitebot_guilds = []
  guilds.forEach((item, i) => {
    if(item.owner == true){
      owner_guilds.push({"name":item.name,"id":item.id})
      if(bot.guilds.cache.get(item.id)){
        bot_guilds.push({"name":item.name,"id":item.id})
      }
      if(!bot.guilds.cache.get(item.id)){
        invitebot_guilds.push({"name":item.name,"id":item.id})
      }
    }
  });
  console.log("owner guilds",owner_guilds,"bot mutual guilds",bot_guilds)
  console.log(member_id)
  return {bot_guilds,invitebot_guilds}
}

function manageguild(g_id){
  let guild = bot.guilds.cache.get(g_id)
  if(guild){
    let memberCount = guild.memberCount
    let guildname = guild.name
    let iconurl = guild.iconURL()
    let owner = guild.owner.displayName
    let id = guild.id
    return {memberCount,guildname,iconurl,owner,id}
  }
  return "You dont share mutual guild with the bot"
}

//parse the channels from POST request
async function modifyguild(channels,g_id){
    let c = channels[0].split(',')
    editguild = bot.guilds.cache.get(g_id)
    c.forEach((item, i) => {
      editguild.channels.create(item,"text")
    });
    return "success"
}

bot.login(token)
module.exports =  {userhit,manageguild,checkguild,modifyguild};
