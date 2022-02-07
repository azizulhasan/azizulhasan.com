const express = require('express');
const heroController = require('../controllers/heroController');

const router = express.Router();

router.get('/create', heroController.hero_create_get);
router.get('/', heroController.hero_index);
router.post('/',  heroController.hero_create_post);
router.get('/:id', heroController.hero_details);
router.delete('/:id', heroController.hero_delete);

module.exports = router;
