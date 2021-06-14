const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//LIST
async function list(req, res, next) {
  const queryResult = await service.list(req.query.is_showing);
  res.json({ data: queryResult });
}

//READ
async function read(req, res, next) {
  const { movieId } = req.params;
  const queryResult = await service.read(movieId);
  if (queryResult.length === 0) {
    next({ status: 404, message: `Movie (${movieId}) cannot be found.` });
  } else {
    res.json({ data: queryResult[0] });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
};
