import express, { json } from "express";
import {
	usersReadOne,
	nightsCreate,
	nightsDeleteOne,
	nightsUpdateOne,
	usersLogin,
	usersSignup,
} from "./src/api/data_controller.js";
import { fileURLToPath } from "url";
import path from "path";
const app = express();

//TODO: Find out what port these should be
const port = 8080;

// find path to directory
const dir = path.dirname(fileURLToPath(import.meta.url));

//Make CORS not an issue
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS",
	);

	next();
});

//Handle Requests forwarded from Angular
app.use(json());

// serve static web pages from vite build path
app.use(express.static(path.join(dir, "dist")));

//Sanity check
app.get("/api/", (req, res) => {
	res.json({ message: "Base API works" });
});

//Get the routes taken care of
app.get("/api/:userid", usersReadOne);
app.post("/api/:userid/:nightid", nightsCreate);
app.delete("/api/:userid/:nightid", nightsDeleteOne);
app.put("/api/:userid/:nightid", nightsUpdateOne);
app.get("/users/:username/:password", usersLogin);
app.post("/users", usersSignup);

// fall back route
app.get("*", (req, res) => {
	res.sendFile(path.join(dir, "dist", "index.html"));
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
