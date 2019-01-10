const co = require('co');
const Nightmare = require('nightmare');

co(function * (){
    yield Nightmare({show: true})
    //   .goto('https://sports.tef.or.jp/user/view/user/mypIndex.html')
        .goto('https://sports.tef.or.jp/user/view/user/homeIndex.html')
    //   .type('input#srchtxt', 'nightmarejs')
      .click('#login')
      .wait(5000)
      .type('input#userid', '14077')
      .type('input#passwd', '1192')
      .type('input#doLogin', 'ログイン')
  });
