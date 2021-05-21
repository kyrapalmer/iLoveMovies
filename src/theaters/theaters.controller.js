const service = require("./theaters.service");




async function list(req, res, next) {
    const result = await service.list();
    console.log(result);
    res.json({  });
}

module.exports = {
    list,
}