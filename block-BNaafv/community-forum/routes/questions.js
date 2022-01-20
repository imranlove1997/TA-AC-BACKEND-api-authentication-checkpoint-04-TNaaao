var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');

router.use(auth.verifyToken);


module.exports = router;