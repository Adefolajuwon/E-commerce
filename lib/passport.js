require('dotenv').config();
const passport = require('passport');

const { User } = require('../schemas/userSchema');
const passportInstance = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_AUTH_OPTIONS = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: 'http://localhost:8000/api/auth/google/callback',
};

// passportInstance.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			callbackURL: 'http://localhost:8000/api/auth/google/callback',
// 		},
// 		function (issuer, profile, cb) {
// 			cb(null, profile);
// 		}
// 	)
// );

// passportInstance.serializeUser(function (user, cb) {
// 	cb(null, user.id);
// });

// passportInstance.deserializeUser(function (id, cb) {
// 	cb(null, id);
// });
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:8000/api/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});
passportInstance.deserializeUser(function (id, done) {
	null, id;
});
module.exports = { passport };
