const fetch = require('node-fetch')


async function profileCard (userID) {
  const card = 'https://bs.slime.kr/static/img/user/' + userID + '.png'

  const response = await fetch(card)

  if (!response.ok) {
    return 'unable to find user.'
  }
  
  return response
}

module.exports = { profileCard }
