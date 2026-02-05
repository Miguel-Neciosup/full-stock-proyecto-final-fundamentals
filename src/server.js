import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";
import { readFile ,writeFile} from "node:fs/promises";
// import { isArrayBuffer } from "node:util/types";
// import { json } from "node:stream/consumers";
// import { get } from "node:http";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static("assets"));

//leer el Json

async function getCategories() {
  try {
    const content = await readFile(
      path.join(__dirname, "categories.json"),
      "utf8",
    );
    return JSON.parse(content);
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

//Obtener datos del Carrito

async function GetCart() {
  try {
    const content = await readFile(path.join(__dirname, "cart.json"), "utf8",
    );
    return JSON.parse(content);
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// get = obtener
// set = escribir

async function saveCart(content) {
  try {
     await writeFile(path.join(__dirname, "cart.json"), JSON.stringify(content, null, 2));
  } catch (error) {
    console.log(error.message);
    return null;
  }
}


// Handlers
async function homeHandler(req, res) {
  const categories = await getCategories();
  res.render("index" , {categories :categories});
}

async function categoryHandler(req, res) {
  const categories = await getCategories();
  const categoryId = Number(req.params.id);
  const category = categories.find((c) => c.id === categoryId);
  res.render("category", { category: category, products:category.products });
}

async function productHandler(req, res) {
  const categories = await getCategories();
  const productId = Number(req.params.id);
  let product = null;
 for ( const category of categories){

  product = category.products.find((p) =>p.id ===
  productId);
  if(product) break;
 }
 res.render("product", { product})
}


async function addProductHandler(req, res) {
  const cart = await  GetCart();
  const categories = await getCategories();
  const productId = Number(req.params.id);
    let product = null;
 for ( const category of categories){

  product = category.products.find((p) =>p.id ===
  productId);
  if(product) break;
 }
 cart.push(product);
 saveCart(cart);
 res.redirect(303,"/cart"); 

}


async function cartHandler(_req, res) {
  const cart = await GetCart();
   const initialValue = 0 ;
  const total = cart.reduce((accumulator,product) => {
    return accumulator + product.price;
  },initialValue);
  res.render("cart", { cart ,total});
}


  

// Router
app.get("/", homeHandler);
  app.get("/categories/:id", categoryHandler);
app.get("/products/:id", productHandler);
app.post("/cart/add/:id", addProductHandler);
app.get("/cart", cartHandler);




app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Listar todas las categorias
// Ver detalle de una categoria
