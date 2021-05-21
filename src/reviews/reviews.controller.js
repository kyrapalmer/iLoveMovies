const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    res.json({ data: await service.list() });
}

async function update(req, res, next) {
    const { reviewId } = req.params;
    res.json({ data: await service.update(reviewId) });
}

async function destroy(req, res, next) {
    await service.delete(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: asyncErrorBoundary(update),
    delete: destroy,
}