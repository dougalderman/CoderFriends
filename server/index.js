var express = require('express'),
    expressSession = require('express-session'),
    passport = require('passport'),
    githubStrategy = require('passport-github').Strategy,
    config = require('./config.js');

var gitCtrl = require('./controllers/gitCtrl.js')

var app = express(),
    port = 6320;


app.use(express.static(__dirname + '/../public'));
app.use(expressSession(config.express)); // use separate config file for secret
app.use(passport.initialize());
app.use(passport.session());

passport.use(new githubStrategy(
  config.github, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(obj, done) {
    done(null, obj);
})


app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/#/home',
    failureRedirect: '/#/'
}));
app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/#/');
});

var requireAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/#/');
}

app.get('/api/github/following', requireAuth, gitCtrl.getFollowers); 

app.listen(port, function() {
    console.log('Server is running on port ' + port);
})

