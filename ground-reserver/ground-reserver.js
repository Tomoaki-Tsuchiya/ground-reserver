const rpn = require('request-promise-native');
const cheerio = require('cheerio');
const tough = require('tough-cookie');
const _ = require('lodash');

var cookiejar = rpn.jar();

var onStatus302 = function(base_uri, redir_uri) {
    var unique_key_array = _.split(redir_uri, '?');
    var unique_key = unique_key_array[1];

    var sessionid_array = _.split(unique_key_array[0],';');
    var sessionid = sessionid_array[1];

    var new_uri = base_uri /** + ';' + sessionid */ + '?' + unique_key;
    return new_uri;
};
var testVar = "Hello play.js";

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

    // return new Promise.resolve(result);
}, (error) => {
    console.log('Error!; ', error);
    console.log('Cookie: ', typeof(cookiejar));
    console.log('redir_url: ', error.response.headers.location);

    var newUri = onStatus302(options.uri, error.response.headers.location);
    console.log('new_uri: ', newUri);
    var opts = {
        method: 'POST',
        // uri: 'https://sports.tef.or.jp/user/view/user/homeIndex.html',
        uri: newUri,
        resolveWithFullResponse: true,
        jar: cookiejar
    }
    return rpn(opts)
// });
}).then((result) => {
    console.log('Redirect Success!!');
}, (err) => {
    console.log('status; ', err.statusCode);
    console.log('Redirect Error!!')
});