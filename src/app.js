var config = require('./config')
var util = require('util')
var twitter = require('twitter')
var twit = new twitter( config.twitter )
var cloud = require('littlebits-cloud-http').defaults( config.cloud )



var app = module.exports = {

  // open the stream to twitter api
  init: function() {
    twit.stream( 'statuses/filter', { track: app.handles( config.twitter_users ) }, function( stream ) {
      stream.on( 'data', function( data ) {
        // console.log( util.inspect( data ) )
        console.log('got a tweet')

        // mentions
        config.twitter_users
          .filter( app.is_mention, data )
          .map( app.trigger_cloudBit, { duration_ms: config.mentions_duration } )

        // retweets
        config.twitter_users
          .filter( app.is_retweet, data )
          .map( app.trigger_cloudBit, { duration_ms: config.retweet_duration } )

      })
      // stream.on( 'error', function() {
      //   app.init()
      // })
      // stream.on( 'end', function() {
      //   app.init()
      // })
    })
  },

  // build a comma-separated list of terms to track
  handles: function( users ) {
    var track = users.map( function (u) { return u.handle } ).join(',')
    console.log(track)
    return track
  },

  // parse data object for user in text
  is_mention: function( user ) {
    // "this" is our returned data
    return new RegExp( user.handle ).test( this.text )
  },
  // parse data object for user in retweet.user
  is_retweet: function( user ) {
    // "this" is our returned data
    return this.retweeted_status != null ? new RegExp( user.handle.substr(1) ).test( this.retweeted_status.user.screen_name ) : false
  },

  // send to cloudBit output
  trigger_cloudBit: function( user ) {
    console.log( 'triggering', user.handle, user.cloudBit, 'for', this.duration_ms, 'ms' )
    cloud.output({
      device_id: user.cloudBit,
      duration_ms: this.duration_ms
    })
  }

}
