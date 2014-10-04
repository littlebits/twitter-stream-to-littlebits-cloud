var cloud = require('littlebits-cloud-http').defaults({
  access_token: 'our chosen account api access token'
})

var util = require('util'),
 twitter = require('twitter')

var twit = new twitter({
  consumer_key: 'XXX',
  consumer_secret: 'XXX',
  access_token_key: 'XXX',
  access_token_secret: 'XXX'
})

var mentions_duration = 1000
var retweet_duration = 3000


var twitter_users = [
  { handle: '@littlebits',
    cloudBit: 'aaa' }
    ,
  { handle: '@stresslimit',
    cloudBit: 'bbb' }
    ,
  { handle: '@LabourNY',
    cloudBit: 'ccc' }
]

// build a comma-separated list of terms to track
var handles = twitter_users.map( function (u) { return u.handle } ).join(',')
// console.log(handles)

// open the stream to twitter api
twit.stream( 'statuses/filter', { track: handles }, function( stream ) {
  stream.on( 'data', function( data ) {
    // console.log( util.inspect( data ) )

    // mentions
    twitter_users
      .filter( is_mention, data )
      .map( trigger_cloudBit, { duration_ms: mentions_duration } )

    // retweets
    twitter_users
      .filter( is_retweet, data )
      .map( trigger_cloudBit, { duration_ms: retweet_duration } )

  })
})


// parse data object for user in text
function is_mention( user ) {
  // "this" is our returned data
  return new RegExp( user.handle ).test( this.text )
}
// parse data object for user in retweet.user
function is_retweet( user ) {
  // "this" is our returned data
  return this.retweeted_status != null ? new RegExp( user.handle.substr(1) ).test( this.retweeted_status.user.screen_name ) : false
}

// send to cloudBit output
function trigger_cloudBit( user ) {  
  // console.log( 'triggering', user.handle )
  cloud.output({
    device_id: user.cloudBit,
    duration_ms: this.duration_ms
  })
}
