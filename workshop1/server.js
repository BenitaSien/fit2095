let http = require('http');

http.createServer(function (request, response) {

    let url = request.url;
    let string = ""
    switch(url) {
        case '/sem':
            string = "Its S2 2021";
            break;
            default:
                string = ""
                break;

    }
    response.writeHead(200);

    response.write(string);

    response.end();

}).listen(8080);
