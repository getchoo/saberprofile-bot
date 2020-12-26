const fetch = require('node-fetch')

async function profileCard (userID) {
  const card = 'https://bs.slime.kr/static/img/user/' + userID + '.png'

  const resp = await fetch(card)

  if (resp.status !== 200) {
    console.log('error! status code: ' + resp.statusCode)
    return 'cant find user.'
  } if (resp.status === undefined) {
    console.log('error! status code: ' + resp.statusCode)
    return 'cant find user.'
  } if (resp.status === 200) {
    console.log('got profile card!')
    return card
  }
}

module.exports = { profileCard }
