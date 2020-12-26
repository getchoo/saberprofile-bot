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

const bot = new Eris.CommandClient(token, {}, {
  name: 'saberprofile-bot',
  description: 'a bot for getting stats from saberscore',
  owner: 'g3tchoo#0001',
  prefix: '!'
})

bot.on('ready', async () => {
  console.log(ok('connected to discord!'))
})

bot.registerCommand('saberprofile', async function (msg, args) {
  console.log('got a profileCard request from ' + link(msg.author.username))

  const text = args.join(' ')

  if (args.length === 0) {
    return 'you need to enter a saberscore id.'
  }

  const profile = saberprofile.profileCard(text)

  return profile
}, {
  aliases: ['saberProfile', 'Saberprofile', 'SaberProfile', 'scoresaber', 'Scoresaber', 'ScoreSaber', 'card'],
  description: 'gets your scoresaber card',
  fullDescription: 'use this command to get a profile card of your beatsaber stats from scoresaber',
  usage: '<text>',
  invalidUsageMessage: 'syntax error! please enter the command followed by the beatsaber id.'
})

bot.registerCommand('stop', (msg, args) => {
  console.log('got a disconnect request from ' + link(msg.author.username))

  if (args === 'reconnect') {
    bot.disconnect({ reconnect: true })
  } else {
    console.log(bad('disconnecting...'))
    bot.disconnect()
  }
}, {
  requirements: {
    userIDs: ['746501080409702461']
  },
  hidden: true,
  permissionMessage: 'you dont own me! dont try to turn me off.'
})

bot.connect()
