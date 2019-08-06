var http = require ("http");
var express = require ("express");
var cors = require ("cors");
var path = require ("path");
var glob = require ("glob");
// var chalk = require ("chalk");
var bodyParser = require ("body-parser");

const app = express();
app.server = http.createServer(app);
const io = require('socket.io').listen(app.server);
// Socket
// require("./socket")(io);
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Upload')));
// app.use("/admins", express.static(path.join(__dirname, 'adminPanel')));
// app.get('/admins/*', (req, res) => {
//     res.sendFile(`${__dirname}/adminPanel/index.html`);
// })
 app.use(cors());
// require('./helpers/bindHelpers')();
const responseHandler = require('./Middlewares/responseHandler')
app.use('/', responseHandler);
let initRoutes = () => {
	// including all routes
	glob("./Routes/*.js", {cwd: path.resolve("./")}, (err, routes) => {
		if (err) {
			console.log("Error occured including routes");
			return;
		}
		routes.forEach((routePath) => {
			require(routePath).getRouter(app); // eslint-disable-line
		});
		//cron.reminder();
		console.log("included " + routes.length + " route files");
	});

		app.use("/web", express.static(path.join(__dirname, '..', 'dist', 'web')));
		app.get('/web/*', (req, res) => {
			res.sendFile(path.join(__dirname, '..', 'dist', 'web', 'index.html'));
		})
}
initRoutes(app);
const port = process.env.PORT || 3002;

app.server.listen(port);
console.log("Started on port " + port);