const percySnapshot = require('@percy/webdriverio');
module.exports = [{
    name: 'My form',
    url: 'http://localhost:8080/form',
    waitForSelector: '.form-loaded',
    execute() {
      document.querySelector('.name').value = 'Name Namerson';
      document.querySelector('.email').value = 'email@domain.com';
    },
    additionalSnapshots: [{
      suffix: ' - submitting',
      execute() {
        document.querySelector('.submit').click();
      }
    }, {
      suffix: ' - after submit',
      waitForSelector: '.form-submitted'
    }]
  }]