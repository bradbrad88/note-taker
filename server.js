const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "public")));
app.use(routes);

app.listen(PORT, () => console.log("Server listening on port: %o", PORT));
