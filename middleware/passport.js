const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

const UserModel = require("../models/users");

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password"
		},
		function(username, password, cb) {
			//Assume there is a DB module pproviding a global UserModel
			return UserModel.findOne({ username, password })
				.then(user => {
					if (!user) {
						return cb(null, false, {
							message: "Incorrect username or password."
						});
					}

					return cb(null, user, {
						message: "Logged In Successfully"
					});
				})
				.catch(err => {
					return cb(err);
				});
		}
	)
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: CONFIG.jwt_encryption
		},
		function(jwtPayload, cb) {
			//find the user in db if needed
			return UserModel.findOne({ username: jwtPayload.username })
				.then(user => {
					return cb(null, user);
				})
				.catch(err => {
					return cb(err);
				});
		}
	)
);
