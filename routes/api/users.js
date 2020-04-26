//bring in express
const express = require('express');
//to use express router, use variable
const router = express.Router();
//bring in gravatar package
const gravatar = require('gravatar');
//bring in bcryptjs
const bcrypt = require('bcryptjs');
//bring in to help with validation
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route    POST api/users
//@desc     Register user
//@access   Public (if token is needed to access route)

//send user data to this route
//console log req.body bc thats the object of data that will be sent to route
//sets validation and handles response
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include valid email address').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  //async await
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //see if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //get users gravatar, pass in email, pass in options: s size, r rating, d default
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      //create an instance of a user, pass in object with fields
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      //return jsonwebtoken so that user can be logged in right away
      res.send('User registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
