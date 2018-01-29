/*
 *  ModuleLoader, modificated for YAE - dkranke
 */

var yae = []
yae.installedModules = []
yae.import = function (moduleName) {
	getJSON("yae_modules/" + moduleName + "/package.json", (err, data) => {
		if (data) {
			for (var i in data.require) {
				var mdl = data.require[i];
				if (!yae.installedModules.includes(mdl)) {
					yae.import(mdl);
				}
			}
			for (var i in data.scripts) {
				var url = "yae_modules/" + moduleName + "/" + data.scripts[i];
				loadScript(url);
			}
			yae.installedModules.push(moduleName);
		} else {
			console.log("ERROR: Can't import / find module '" + moduleName + "'", err);
		}
	});
}

yae.import("yae-designer");
yae.import("font-awesome");


function loadScript(url) {
	var script = document.createElement('script');
	script.src = url;
	script.async = false;
	document.head.appendChild(script);
}

function loadStylesheet(url) {
	var stylesheet = document.createElement('link');
	stylesheet.rel = "stylesheet";
	stylesheet.href = url;
	document.head.appendChild(stylesheet);
}

// Stolen from https://stackoverflow.com/a/35970894
function getJSON(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = () => {
		var status = xhr.status;
		if (status == 200) {
			callback(null, xhr.response);
		} else {
			callback(status);
		}
	};
	xhr.send();
};

function get(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'text';
	xhr.onload = () => {
		var status = xhr.status;
		if (status == 200) {
			callback(null, xhr.response);
		} else {
			callback(status);
		}
	};
	xhr.send();
};
