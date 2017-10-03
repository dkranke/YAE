/*
 *  Basic webserver with a file-index system - dkranke
 */

// IMPORTS
var express = require("express");
var app = express();
var http = require("http").Server(app);
var fs = require("fs");

// GLOBALS
var root_path = "public/";

// APP
// Serve all files from a specific directory
app.use(express.static(root_path));
// If a file couldn't be found or '.index' was called
app.get('*', (req, res) => {
	var relative_path = req.path.endsWith("/.index") ? req.path.substring(0, req.path.length - 6) : req.path;
	var full_path = root_path + relative_path;

	var parent_index = relative_path.endsWith('/') ? relative_path.lastIndexOf('/', 1) : relative_path.lastIndexOf('/');
	var parent_path = relative_path.substring(0, parent_index + 1);

	if (full_path.endsWith('/')) {
		generateIndex(full_path, relative_path, parent_path, res);
	} else {
		console.log(req.connection.remoteAddress + " attempted to reach '" + req.path + "', but the file doesn't exist.");

		generate404(relative_path, parent_path, res);
	}
});

// Open a web-server at port 80
http.listen(80, function () {
	console.log('Web-server startet on *:80\n')
});

// Generate a index-page
function generateIndex(full_path, relative_path, parent_path, res) {
	fs.readdir(full_path, (err, files) => {
		console.log(err)
		var response = "<html><head><title>";
		response += "Index of localhost" + relative_path;
		response += "</title></head><body>";
		response += "<h1>Index of localhost" + relative_path + "</h1>";
		response += "<ul style='list-style-type: none;'>";
		response += "<li style='line-height: 1.5em'><a href='" + parent_path + "'>..</a></li>";
		if (files) {
			files.forEach(function (file) {
				response += "<li style='line-height: 1.5em'><a href='" + file + "'>" + file + "</a></li>";
			});
		}
		response += "</ul>";
		if (err) {
			if (err.code == "ENOENT") {
				response += "ERROR: No such file or directory";
			} else {
				response += "ERROR: An error occured: " + err.code;
			}
		}
		response += "</body></html>";
		res.send(response);
	});
}

// Generate a 404-page
function generate404(relative_path, parent_path, res) {
	var response = "<html><head><title>";
	response += "404 - File '" + relative_path + "' not found!";
	response += "</title></head><body>";
	response += "<h1>404 - File not found!</h1>";
	response += "The URL '" + relative_path + "' was not found on this server.<br>";
	response += "You may want to visit the <a href='" + parent_path + ".index'>file-index</a> to check that the path is correct.";
	response += "</body></html>";
	res.send(response);
}
