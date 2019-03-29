'use strict';

const DATA_SRC = {
    github: 'https://api.github.com/repos/bbc/gef-docs/contributors'
};

const path = require( 'path' );
const fs = require( 'fs' );
const DATA_DIR = path.join( __dirname, '../src/_data' );
const dataFile = path.join( DATA_DIR, '/contributors.json' );
const request = require( 'request' );
const dataUrl = DATA_SRC.github;
const apiToken = process.env.GITHUB_APITOKEN;

if (!apiToken) {
    throw '# [ERROR] Missing required env variable GITHUB_APITOKEN.'
}
 
console.log( '# [INFO] Fetching new contributor data.' );

request.get( {
    uri: 'https://api.github.com/repos/bbc/gef-docs/contributors',
    method: 'GET', 
    json: true,
    headers: {
        Authorization: 'token ' + apiToken,
        'User-Agent': 'node-request'
    }
}, ( err, res, data ) => {
    if ( err || res.statusCode !== 200 ) {
        console.log( '# [ERROR] ' + res.statusCode, err );
    } else {
        let niceData = data.map(contributor => { return {name: contributor.login, avatar: contributor.avatar_url, url: contributor.html_url }; });
        
        fs.writeFile( dataFile, JSON.stringify(niceData, null, 4), function( err ) {
            if ( err ) {
                console.log( '# [ERROR] ', err );
            }
            else {
                console.log( '# [INFO] Updated contributor data.' );
            }
        } );
    }
} );