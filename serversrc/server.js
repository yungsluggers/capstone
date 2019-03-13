const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = 3000;
const helmet = require('helmet');
const { exec } = require('child_process');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
});

//pre-flight requests
app.options('*', function(req, res) {
	res.send(200);
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	/* eslint-disable no-console */
	console.log('server running');
});

app.get('/', (req, res) => {
	res.status(200);
	res.json({hello: 'hi'});
	res.end();
})

app.post('/', (req, res) => {

	var id = req.body.id;
    var data = req.body.data;
	
	exec(`./darknet classifier one_label cfg/imagenet1k.data cfg/darknet19.cfg darknet19.weights ${id} ${data}`, (err, stdout, stderr) => {
	  if (err) {
	    res.json({ err: err, stderr: stderr});
	    res.end();
	  }

	  res.status(200);

	  console.log(`${stdout}`);
	  res.json({ score: stdout });
	  res.end();
	});
	
});



module.exports = server;