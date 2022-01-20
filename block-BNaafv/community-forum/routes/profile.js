var express = require('express');

var router = express.Router();

router.get('/:username', async (req, res, next) => {
    var id = req.params.username;
    res.status(201).json({ user });
})

module.exports = router;