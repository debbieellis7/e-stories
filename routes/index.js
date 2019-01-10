const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');



// Index Page Route
router.get('/', ensureGuest, (req, res) => {
	res.render('index/welcome');
});

// Dashboard Page Route
router.get('/dashboard', ensureAuthenticated, (req, res) => {
	Story.find({user:req.user.id})
		.then(stories => {
			res.render('index/dashboard', {
				stories: stories
			});
		});
});

// About Page Route
router.get('/about', (req, res) => {
	res.render('index/about');
});

module.exports = router;