const note_handler = require('./NoteClass');
const http = require('http');
const url = require('url');
const qs_mod = require('querystring');
 
const hostname = '127.0.0.1';
const port = process.env.PORT || 5000
const server = http.createServer((req,res) => {
	let q = url.parse(req.url, true);
	if (q.pathname === '/') {
		note_handler.getAllNotes(res);
	}else if (q.pathname !== '/' && req.method === 'POST') {
		console.log('sc')
		let postdata = "";
	    req.on("data", (chunk) => {
	    	postdata += chunk.toString();
	    	// console.log(postdata);
	    });
	    	
	    if (q.pathname === '/create') {
		    req.on("end", () => {
		    	let data = qs_mod.parse(postdata);
				note_handler.createNote(res,data['name'],data['content']);
		    })
		}else if (q.pathname === '/delete') {
		    req.on("end", () => {
		    	let data = qs_mod.parse(postdata);
				note_handler.deleteNote(res,data['name']);
		    })
		}else if (q.pathname === '/rename') {
		    req.on("end", () => {
		    	let data = qs_mod.parse(postdata);
				note_handler.renameNote(res,data['name'],data['new_name']);
		    })
		}else if (q.pathname === '/update') {
		    req.on("end", () => {
		    	let data = qs_mod.parse(postdata);
				note_handler.updateNote(res,data['name'],data['content']);
		    })
		}else if (q.pathname === '/view') {
			req.on("end", () => {
		    	let data = qs_mod.parse(postdata);
				note_handler.getNoteContent(res,data['name']);
		    })
		}
	}
	
	else {
		res.end('Invalid Request');
	}
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
