/**
 *  pm2 startOrRestart .\start.config.js
*/
module.exports = {
  apps : [{
    name: 'jamsapi',
    script: 'npm',
    args: 'start'
  }],
  env: {
    url: 'http://jams.myventana.com/'
  }
}
