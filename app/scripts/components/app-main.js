"use strict";
const React = require("react");
const search_1 = require("./search");
const card_1 = require("./card");
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieID: 157336
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(search_1.default, { fetchMovieID: this.fetchMovieID.bind(this) }),
            React.createElement(card_1.default, { data: this.state })));
    }
    fetchApi(url) {
        fetch(url)
            .then(res => {
            return res.json();
        })
            .then((data) => {
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
    }
    fetchMovieID(movieID) {
        const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`;
        this.fetchApi(url);
    }
    componentDidMount() {
        const url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`;
        this.fetchApi(url);
        const options = {
            datumTokenizer: function (datum) {
                return Bloodhound.tokenizers.whitespace(datum.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716',
                filter: function (movies) {
                    return $.map(movies.results, function (movie) {
                        return {
                            value: movie.original_title,
                            id: movie.id
                        };
                    });
                }
            }
        };
        let suggests = new Bloodhound(options);
        suggests.initialize();
        $('.typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 2
        }, {
            source: suggests.ttAdapter()
        })
            .on('typeahead:selected', function (_obj, datum) {
            this.fetchMovieID(datum.id);
        }.bind(this));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
