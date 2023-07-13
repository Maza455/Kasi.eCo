// Import the authentication middleware
const { verifyToken } = require('../middlewares/authJwt.js');

router.post('/signup', controller.createTrader); // ADD TRADER

router.post('/signin', controller.signin); // ADD TRADER


// Protected route - Get a trader's profile
router.get('/profile', verifyToken, (req, res) => {
  // Access the authenticated trader's ID from req.decodedToken

  // Retrieve the trader's profile from the database based on traderId
  // Your implementation goes here

  res.json({ message: 'Protected route - Trader profile' });
});

// Other trader routes...
// Your implementation goes here

module.exports = router;
