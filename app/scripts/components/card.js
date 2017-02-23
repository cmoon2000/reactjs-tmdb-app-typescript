"use strict";
const React = require("react");
const numeral = require("numeral");
class Card extends React.Component {
    render() {
        let data = this.props.data;
        let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster, production = data.production, genres = data.genre, totalRevenue = data.revenue, productionList = nestedDataToString(production), noData = '-', genresList = nestedDataToString(genres);
        if (data.vote === 'undefined' || data.vote === 0) {
            data.vote = noData;
        }
        else {
            data.vote = data.vote + ' /  10';
        }
        if (totalRevenue === 'undefined' || totalRevenue === 0) {
            totalRevenue = noData;
        }
        else {
            totalRevenue = numeral(data.revenue).format('($0,0');
        }
        return (React.createElement("div", { className: "col-xs-12 cardcont nopadding" },
            React.createElement("div", { className: "meta-data-container col-xs-12 col-md-8 push-md-4 col-lg-7 push-lg-5" },
                React.createElement("h1", null, data.original_title),
                React.createElement("span", { className: "tagline" }, data.tagline),
                React.createElement("p", null, data.overview),
                React.createElement("div", { className: "additional-details" },
                    React.createElement("span", { className: "genre-list" }, genresList),
                    React.createElement("span", { className: "production-list" }, productionList),
                    React.createElement("div", { className: "row nopadding release-details" },
                        React.createElement("div", { className: "col-xs-6" },
                            " Original Release: ",
                            React.createElement("span", { className: "meta-data" }, data.release)),
                        React.createElement("div", { className: "col-xs-6" },
                            " Running Time: ",
                            React.createElement("span", { className: "meta-data" },
                                data.runtime,
                                " mins")),
                        React.createElement("div", { className: "col-xs-6" },
                            " Box Office: ",
                            React.createElement("span", { className: "meta-data" }, totalRevenue)),
                        React.createElement("div", { className: "col-xs-6" },
                            " Vote Average: ",
                            React.createElement("span", { className: "meta-data" }, data.vote))))),
            React.createElement("div", { className: "poster-container nopadding col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-7" },
                React.createElement("img", { id: "postertest", className: "poster", src: posterIMG }))));
    }
    componentDidUpdate() {
        document.body.style.backgroundImage = 'url(' + 'https://image.tmdb.org/t/p/original' + this.props.data.backdrop + ')';
    }
}
function nestedDataToString(nestedData) {
    let nestedArray = [], resultString;
    $.each(nestedData, function (_indexInArray, item) {
        nestedArray.push(item.name);
    });
    resultString = nestedArray.join(', ');
    return resultString;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Card;
