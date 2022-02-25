const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();


router.get('/', loginController.login_index);
router.post('/',  loginController.login_to_dashboard);
router.post('/:id', loginController.login_update_post);
router.get('/:id', loginController.login_details);

module.exports = router;
