const rpn = require('request-promise-native');
const cheerio = require('cheerio');
const tough = require('tough-cookie');
const _ = require('lodash');

var cookiejar = rpn.jar();

var onStatus302 = function(base_uri, redir_uri, jsessionid) {
    var unique_key_array = _.split(redir_uri, '?');
    var unique_key = unique_key_array[1];

    var sessionid_array = _.split(jsessionid,/=\;/);
    var sessionid = sessionid_array[2];

    var new_uri = base_uri + ';jsessionid=' + sessionid + '?' + unique_key;
    return new_uri;
};

var options = {
    method: 'POST',
    // uri: 'https://sports.tef.or.jp/user/view/user/homeIndex.html',
    uri: 'https://sports.tef.or.jp/user/view/user/mypIndex.html',
    resolveWithFullResponse: true,
    jar: cookiejar
};

rpn(options).then((result) => {
    console.log('Access Success!! ', result);
    console.log('StatusCode: ', result.statusCode);
    console.log('Cookie: ', cookiejar);
}, (error) => {
    console.log('Error!; ', error);
    console.log('Cookie: ', typeof(cookiejar));
    console.log('redir_url: ', error.response.headers.location);
    
    var jsessionid = cookiejar["JSESSIONID"];

    console.log('sessionid:', jsessionid);

    var newUri = onStatus302(options.uri, error.response.headers.location, jsessionid);
    console.log('new_uri: ', newUri);
    // var options = {
    //     method: 'POST',
    //     // uri: 'https://sports.tef.or.jp/user/view/user/homeIndex.html',
    //     uri: 'https://sports.tef.or.jp/user/view/user/mypIndex.html',
    //     resolveWithFullResponse: true,
    //     jar: cookiejar
    // }
})