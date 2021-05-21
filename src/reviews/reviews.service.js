const knex = require("../db/connection");

function list() {
    return knex("reviews").select("*");
}

function update(reviewId, updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .update(updatedReview, "*")
}

function destroy(reviewId) {
    return knex("reviews")
        .where({ review_id: reviewId })
        .del();
}

module.exports = {
    list,
    update,
    delete: destroy,
}