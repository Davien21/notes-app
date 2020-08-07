let search_btn = document.querySelector('#seach-btn')
let new_btn = document.querySelector('#new-btn')
let search_input = document.querySelector('input#note-input')
let note_table = document.querySelector('table#note-table');
let note_tbody = note_table.querySelector('tbody');

let url = 'http://127.0.0.1:5000/';
 
handle_note_display(url)

function make_note_list (note_arr) {
	note_tbody.innerHTML = '';
	note_arr.forEach( function(note, index) {
		note_tbody.innerHTML += note_row(formatTitle(note),index);
	});
	let del_btns = document.querySelectorAll('button.del');
	del_btns.forEach( (btn) => btn.onclick = () => deleteNote(btn,note_arr) );
}
let formatTitle = (title) => {
	title = title.charAt(0).toUpperCase() + title.slice(1);
	title = title.replace('.txt','');
	return title;
}
function handle_note_display (url) {
	fetch(url)
	  .then(response => response.json())
	  .then(content => {
	  	make_note_list(content.data);
	  	search_input.oninput = (e) => searchNotes(e.target.value,content.data);
	  })
	  .catch(err => alert(`There seems to be an Error:\n${err}`));
}

new_btn.onclick = () => {
	window.location.href = "./note-view.html?a=create";
}
function searchNotes (string,note_arr) {
	let filtered_arr = note_arr.filter( (topic) => topic.toLowerCase().includes(string.toLowerCase()) );
	make_note_list(filtered_arr);
}


let note_row = (note_obj,index) => {
	let html = 
	`
		<tr class="">
			<td class="name">${note_obj}</td>
			<td class="d-flex flex-wrap">
				<div class="col mb-2 mb-md-0">
					<button class="btn btn-success  btn-block paper-box-shadow" onclick ="view(this)">View</button>
				</div>
				<div class="col">
					<button class="btn btn-danger btn-block paper-box-shadow del" >Delete</button>
				</div>
			</td>

		</tr>
	`;
	return html;
}
function deleteNote (btn,note_arr) {
	let btn_row = btn.closest('tr');
	let note_name = btn_row.querySelector('td.name');
	note_name = note_name.innerText.toLowerCase();

	let del_note = note_arr.find((note)=>note.toLowerCase() === `${note_name}.txt`);
	del_request(del_note)
}
function del_request (name) {
	const del_form = new FormData();
	del_form.append('name', name);
	fetch(`${url}delete`, {
	    method: 'POST', // *GET, POST, PUT, DELETE, etc.
	    headers: {
	        "Content-Type": "application/x-www-form-urlencoded",
	    },
	    body: del_form // body data type must match "Content-Type" header
	 })
	.then (res => (res.json()))
	.then (data => console.log(data))
	.catch(err => alert(`There seems to be an Error:\n${err}`));
}
 