import express from "express";
import router from "./app-router.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));

app.use("/", router);
//leer el Json
// Router
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

