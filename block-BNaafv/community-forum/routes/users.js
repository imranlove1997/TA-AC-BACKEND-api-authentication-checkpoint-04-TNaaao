var express = require('express');
var router = express.Router();
var User = require('../models/user');
var auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/', auth.verifyToken ,(req, res, next) => {
  res.json({ welcome: 'Hello' })
})

router.post('/resgister', async (req, res, next) => {
  var { username, email, password } = req.body;
  if(!username || !email || !password) {
    res.status(400).json({ error: 'Username/Email & Password required' });
  }
  try {
    var user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
})

router.post('/login', async (req, res, next) => {
  var {email , password } = req.body;
    if(!email || !password ) {
      return res.status(400).json({ error: "Email/Password Required" });
    }
  try {
    var user = User.findOne({ email });
    if(!user) {
      return res.status(400).json({ error: "User is not registered" });
    }
    var result = await user.verifyPassword(password);
    if(!result) {
      return res.status(400).json({ error: "Password is incorrect" });
    }
    var token = await user.tokenSign();
    res.json({ user: user.tokenValidate(token) });
  } catch (error) {
    next(error);
  }
})

module.exports = router;
