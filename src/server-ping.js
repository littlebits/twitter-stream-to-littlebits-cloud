var http = require('http')
var ping_port = process.env.PORT || 80



module.exports = http.createServer(function(request, response){
  if ( request.url !== '/ping' ) return
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end("hello world")
}).listen(ping_port, function(){
  console.log('Ping server listening at: %j', ping_port)
})
