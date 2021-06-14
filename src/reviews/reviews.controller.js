const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({
    status: 404,
    message: `Review cannot be found.`,
  });
}

async function destroy(req, res, next) {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204).json("?");
}

async function list(req, res, next) {
    const { movieId } = req.params;
  const queryResult = await service.list(movieId);
  res.json({ data: queryResult });
}

async function update(req, res, next) {
  
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const cr = await service.update(updatedReview);
  //reorganize query result to match test needs
  const data = {
    "review_id": cr.review_id, 
    "content": cr.content,
    "score": cr.score,
    "critic_id": cr.critic_id,
    "movie_id": cr.movie_id,
    "created_at": cr.critic.created_at,
    "updated_at": cr.critic.updated_at,
    "critic": {
      "preferred_name": cr.critic.preferred_name,
      "surname": cr.critic.surname,
      "organization_name": cr.critic.organization_name,
    }
  };
  res.json({ data: data });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};


