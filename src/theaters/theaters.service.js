const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//LIST
function list() {
    return knex("theaters").select("*");
}

//GET
function getMovies(theater) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where("t.theater_id", "=", theater.theater_id);
}


function listMovieById(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("t.*", "m.movie_id")
        .where("m.movie_id", "=", movie_id);
}

module.exports = {
    list,
    listMovieById,
    getMovies
}
