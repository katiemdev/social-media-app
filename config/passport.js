const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const passport = require("passport");

/**
 * Sign in using Email and Password.
 */
module.exports = function (passport) {
	passport.use(
		new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
			User.findOne({ email: email.toLowerCase() }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, { msg: `Email ${email} not found.` });
				}
				if (!user.password) {
					return done(null, false, {
						msg:
							"Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
					});
				}
				user.comparePassword(password, (err, isMatch) => {
					if (err) {
						return done(err);
					}
					if (isMatch) {
						return done(null, user);
					}
					return done(null, false, { msg: "Invalid email or password." });
				});
			});
		})
	);

	/* In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session. */

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
