const axios = require('axios')


async function profileCard (userID) {
  const card = 'https://bs.slime.kr/static/img/user/' + userID + '.png'
  
  const data = await axios.get(card, { responseType: 'arraybuffer' })
    .catch(function (error) {
      if (error.response) {
        return 'unable to find user.'
      }
    })

  return data
}

module.exports = { profileCard }
