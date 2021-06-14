const knex = require("../db/connection");

//DELETE
async function destroy(reviewId) {
  return knex("reviews")
    .where({ review_id: reviewId }).del();
}

//LIST
async function list(movie_id) {
  return knex("reviews")
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(setCritic)));
}

//READ
async function read(reviewId) {
  return knex("reviews")
    .where({ review_id: reviewId }).first();
}

//MIDDLEWARE
async function readCritic(critic_id) {
  return knex("critics")
    .where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

//UPDATE
async function update(review) {
    return knex("reviews")
      .select("*")
      .where({ review_id: review.review_id })
      .update(review, "*")
      .then(() => read(review.review_id))
      .then(setCritic);
  }

module.exports = {
  delete: destroy,
  list,
  read,
  update,
};
