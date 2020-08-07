/*Movie Store Class by Chidiebere Ekennia*/
class MovieStore {
	constructor () {
		this.movie_array = movie_array;
		this.store_owner = 'Chidiebere Ekennia'
	}
	getMovieArray () {
		return this.movie_array;
	}
	searchMoviesByString (string) {
		string = string.toLowerCase();
		let movie_array = this.movie_array;
		let filtered_array = [];

		movie_array.forEach(function(movie_obj) {

			let values_array = Object.values(movie_obj);

			values_array.forEach(function(value) {

				value = value.toLowerCase();
				
				if (value.includes(string) && !filtered_array.includes(movie_obj)) {

					filtered_array.push(movie_obj);

				}

			});

		});

		return filtered_array;
	}
}

