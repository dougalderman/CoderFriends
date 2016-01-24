var express = require('express'),
    expressSession = require('express-session'),
    passport = require('passport'),
    githubStrategy = require('passport-github').Strategy,
    config = require('./config.js');

var gitCtrl = require('./controllers/gitCtrl.js');

var following_new = '';

var app = express(),
    port = 6320;

app.use(express.static(__dirname + '/../public'));
app.use(expressSession(config.express)); // use separate config file for secret
app.use(passport.initialize());
app.use(passport.session());

passport.use(new githubStrategy(
  config.github, function(token, refreshToken, profile, done) {
      var following = profile._json.following_url;
      var endUrl = following.indexOf('{');
      following_new = following.slice(0, endUrl);
      return done(null, profile);
}));

 app.use(function(req, res, next) {
      res.locals.following = following_new;
      next();
});

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
		next();
	}
    else {
        return res.status(403).send('Not logged in');
    }
}



app.get('/api/github/following', requireAuth, gitCtrl.getFollowing); 

app.listen(port, function() {
    console.log('Server is running on port ' + port);
})

