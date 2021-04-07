Vue.config.devtools = true;

var root = new Vue({
    el: '#app',
    data: {
        countrycode: "en",
        searchedFilm: "",
        searchResult: [],
        flagUrls: {
            it: "https://www.countryflags.io/it/flat/64.png",
            fr: "https://www.countryflags.io/fr/flat/64.png",
            en: "https://www.countryflags.io/us/flat/64.png",
            es: "https://www.countryflags.io/es/flat/64.png",
            de: "https://www.countryflags.io/de/flat/64.png"
        }
    },
    methods: {
        searchFilm: function() {
            this.searchResult = [];
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=df59ca4f93077e59f74858e7b9ae9776&page=1&include_adult=false&language=IT', { params: { query: this.searchedFilm } })
                .then((response) => {
                    response.data.results.forEach(film => {
                        film.vote_average = Math.ceil(parseInt(film.vote_average / 2));
                        this.searchResult.push(film);
                    });
                })
            axios.get('https://api.themoviedb.org/3/search/tv?api_key=df59ca4f93077e59f74858e7b9ae9776&page=1&include_adult=false&language=IT', { params: { query: this.searchedFilm } })
                .then((response) => {
                    response.data.results.forEach(tvserie => {
                        tvserie.vote_average = Math.ceil(parseInt(tvserie.vote_average / 2));
                        this.searchResult.push(tvserie);
                        console.log(this.searchResult)
                    });
                })
        },
        getFlag(language) {
            return this.flagUrls[language];
        },
        getPosterImage(image) {
            return ("https://image.tmdb.org/t/p/w342/" + image);
        }
    }
});


//se film.original language non è incluso nell'array di bandiere che ho allora metti una stringa predefinita