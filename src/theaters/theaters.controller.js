const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//LIST
async function list(req, res, next) {
    const { movieId } = req.params;
    if (movieId === undefined) {
        const theaters = await service.list();
        const dataArray = theaters.map(async (theater) => {
            return { ...theater, movies: await service.getMovies(theater) };
        });
        const data = Promise.all(dataArray);
        res.json({ data });
    } else {
        const movie_id = Number(movieId);
        const theaters = await service.listMovieById(movie_id);
        res.json({ data: theaters });
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
}
