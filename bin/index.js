#!/usr/bin/env node

const chalk = require('chalk')
const Eris = require('eris')
const saberprofile = require('../lib/saberprofile')

// setup text colors for different statuses
const ok = chalk.bold.cyan

const bad = chalk.bold.red

const link = chalk.underline.green

// get discord bot token from environmental variable
const token = process.env.DISCORD_TOKEN

if (token == null) {
  console.log(bad('no discord token found as an environmental variable. please set it as DISCORD_TOKEN.'))
}

// init bot
const bot = new Eris.CommandClient(token, {}, {
  name: 'saberprofile-bot',
  description: 'a bot for getting stats from saberscore',
  owner: 'g3tchoo#0001',
  prefix: '!'
})

bot.on('ready', async () => {
  console.log(ok('connected to discord!'))
})

// !saberprofile command
bot.registerCommand('saberprofile', async function (msg, args) {
  console.log('got a profileCard request from ' + link(msg.author.username))

  const text = args.join(' ')

  if (args.length === 0) {
    return 'you need to enter a saberscore id.'
  }

  const response = await saberprofile.profileCard(text)
  
  if (typeof(response) === 'string') {
    console.log(bad('profileCard was unable to find a user with the ID ' + text))
    return 'unable to find user.'
  }

  const profile = Buffer.from(response.data)
  console.log(ok('profileCard downloaded!'))
  
  bot.createMessage(msg.channel.id, 'here you go!', { file: profile, name: text + '.png' })
  return
}, {
  // help section for command
  aliases: ['saberProfile', 'Saberprofile', 'SaberProfile', 'scoresaber', 'Scoresaber', 'ScoreSaber', 'card'],
  description: 'gets your scoresaber card',
  fullDescription: 'use this command to get a profile card of your beatsaber stats from scoresaber',
  usage: '<text>',
  invalidUsageMessage: 'syntax error! please enter the command followed by the beatsaber id.'
})

// !stop command
bot.registerCommand('stop', (msg, args) => {
  console.log('got a disconnect request from ' + link(msg.author.username))

  if (args === 'reconnect') {
    bot.disconnect({ reconnect: true })
  } else {
    bot.createMessage(msg.channel.id, 'goodbye!')
    console.log(bad('disconnecting...'))
    bot.disconnect()
  }
}, {
  // check to see if the command is coming from me (or you if you want to change the user ID!)
  requirements: {
    userIDs: ['746501080409702461']
  },
  hidden: true,
  permissionMessage: 'you dont own me! dont try to turn me off.'
})

// connect the bot
bot.connect()
