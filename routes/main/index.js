var express = require('express');
var router = express.Router();

router.use('/main', require('./main'));
router.use('/level', require('./level'));
//router.use('/quiz', require('./quiz'));


module.exports = router;
