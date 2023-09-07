const http = require('node:http');
const fs = require('node:fs');

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 5000;

const server = http.createServer();

server.on('request', (req, res) => {
	if (req.url === '/') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <script type="module" src="./scripts/index.js"></script>
                </head>
                <body>
                    <h1>Hello World!</h1>
                    <div id="root">
                        <button type="button" id="btn">
                            Click Me
                        </button>
                    </div>
                </body>
            </html>
        `);
	} else if (req.url === '/scripts/index.js') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/javascript');
		res.end(fs.readFileSync('./scripts/index.js'));
	} else if (req.url === '/html') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(`<p>Swapped with SSR'd content!</p>`);
	}
});

server.listen(port, hostname);
