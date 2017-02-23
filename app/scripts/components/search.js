"use strict";
const React = require("react");
const TMDBLogo = 'https://www.themoviedb.org/assets/static_cache/27b65cb40d26f78354a4ac5abf87b2be/images/v4/logos/powered-by-rectangle-green.svg';
class SearchBox extends React.Component {
    handleChange(event) {
        event.target.select();
    }
    render() {
        return (React.createElement("div", { className: "col-xs-12 search-container nopadding" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-xs-12 col-sm-6 col-lg-5" },
                    React.createElement("a", { href: "./", title: "ReactJS TMDb Movie Search" },
                        React.createElement("img", { src: TMDBLogo, className: "logo", alt: "The Movie Database" }))),
                React.createElement("div", { className: "col-xs-12 col-sm-6 col-lg-7" },
                    React.createElement("form", { className: "searchbox" },
                        React.createElement("label", null,
                            React.createElement("input", { ref: "search suggestion", onClick: this.handleChange, className: "searchbox__input typeahead form-control", type: "text", placeholder: "Search Movie Title...", id: "q" })))))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchBox;
