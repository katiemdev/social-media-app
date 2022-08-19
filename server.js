const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/database");

/******** ROUTES *********/
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");

//******* .ENV FILE *********
require("dotenv").config({ path: "./config/.env" });

// ******* PASSPORT CONFIG ************
require("./config/passport")(passport);

//******ACCESS TO DB *********
connectDB();

// ******* SET VIEW ENGINE ************
app.set("view engine", "ejs");

// ****** STATIC FILES **********
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use forms for put / delete
app.use(methodOverride("_method"));

app.use(
	session({
		secret: "keyboard cat hi hi hi",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

// ***** PASSPORT MIDDLEWARE ********
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

app.use("/", mainRoutes);
app.use("/posts", postRoutes);

// ****** LISTENING FOR SERVER *******
app.listen(process.env.PORT, () => {
	console.log("Server is running, you better catch it!");
});
