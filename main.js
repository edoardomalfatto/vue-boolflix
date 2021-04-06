Vue.config.devtools = true;

var root = new Vue({
    el: '#app',
    data: {
        searchedFilm: "",
        searchResult: []
    },
    methods: {
        searchFilm: function() {
            this.searchResult = [];
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=df59ca4f93077e59f74858e7b9ae9776&page=1&include_adult=false&language=IT', { params: { query: this.searchedFilm } })
                .then((response) => {
                    response.data.results.forEach(film => {
                        this.searchResult.push(film);
                    });
                })
        }
    }
});