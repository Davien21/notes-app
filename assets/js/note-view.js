let note_form = document.querySelector('form.note-form')
let title_input = document.querySelector('input[name=name]');
let note_content = document.querySelector('textarea[name=content]');
let action_btn = document.querySelector('button#action');
let err_span = document.querySelector('.err');

let url = 'http://127.0.0.1:5000/';

let query = window.location.search.slice(1);
query = query.split('=')[1];

if (query === 'create') {
	handle_create_query()
}
function handle_create_query () {
	action_btn.innerText = 'Create New Note';
	action_btn.onclick = () => {
		let title = title_input.value.trim();
		let content = note_content.value.trim();
		create_request(title,content);
	};
}
function handle_creation (title) {
	alert(`${title}\nwas successfully created`);
	window.location.href = './'

}
function create_request (title,content) {
	if (title === '' || content === '') {
		return err_span.innerText = 'Fill both Title and Note contents';
	} 
	let body = {
		name: title,
		content: content
	}
	// let create_form = new FormData(note_form);
	console.log(body)

	fetch(`https://cors-anywhere.herokuapp.com/${url}create`, {
	    method: 'post', // *GET, POST, PUT, DELETE, etc.
	    headers: {
	        "Content-Type": "application/json",
	    },
	    body: JSON.stringify(body) // body data type must match "Content-Type" header
	})
	.then (res => (res.json()))
	.then (data => console.log(data))
	.catch(err => alert(`There seems to be an Error:\n${err}`));
}