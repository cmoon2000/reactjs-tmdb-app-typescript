import * as React from 'react';
import SearchBox from './search';
import Card from './card';

export interface IAppState {
	movieID: number;
	original_title: string;
	tagline: string;
	overview: string;
	homepage: string;
	poster: string;
	production: Array<{ name: string }>;
	production_countries: Array<{ name: string }>;
	genre: Array<{ name: string }>;
	release: string;
	vote: string | number;
	runtime: number;
	revenue: string | number;
	backdrop: string;
}

class App extends React.Component<any, IAppState> {
	constructor(props: any) {
		super(props);

		this.state = {
			movieID: 157336 // set initial load movie - Interstellar
		} as any;
	}
	render() {
		return (
			<div>
				<SearchBox fetchMovieID={this.fetchMovieID.bind(this)} />
				<Card data={this.state} />
			</div>
		);
	}

	fetchApi(url: string) {

		fetch(url)
			.then(res => {
				return res.json();
			})
			.then((data: any) => {
				// update state with API data
				this.setState({
					movieID: data.id,
					original_title: data.original_title,
					tagline: data.tagline,
					overview: data.overview,
					homepage: data.homepage,
					poster: data.poster_path,
					production: data.production_companies,
					production_countries: data.production_countries,
					genre: data.genres,
					release: data.release_date,
					vote: data.vote_average,
					runtime: data.runtime,
					revenue: data.revenue,
					backdrop: data.backdrop_path
				});
			});

		// .catch(err => console.log('Movie not found!'));
	}

	// the api request function
	fetchMovieID(movieID: string) {
		const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`;
		this.fetchApi(url);
	}

	componentDidMount() {
		const url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`;
		this.fetchApi(url);

		//========================= BLOODHOUND ==============================//
		const options = {
			datumTokenizer: function(datum: any): string[] {
				return Bloodhound.tokenizers.whitespace(datum.value)
			},
			// queryTokenizer: (query: string) => string[]
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716',
				filter: function(movies: any) {
					// Map the remote souce JSON aray to a JavaScript object array
					return $.map(movies.results, function(movie) {
						return {
							value: movie.original_title, // search original title
							id: movie.id // get ID of movie simultaniously
						};
					});
				}
			}
		};
		let suggests = new Bloodhound(options);
		suggests.initialize(); // initialise bloodhound suggestion engine

		//========================= TYPEAHEAD ==============================//
		// Instantiate the Typeahead UI
		$('.typeahead').typeahead({
			hint: true,
			highlight: true,
			minLength: 2
		}, {
			source: (suggests as any).ttAdapter()
		})
		.on('typeahead:selected', function(this: App, _obj: any, datum: any) {
			this.fetchMovieID(datum.id);
		}.bind(this));
	}
}

export default App;