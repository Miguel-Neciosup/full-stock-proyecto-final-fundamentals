import path from "path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export  async function getCategories() {
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
export async function GetCart() {
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
export async function saveCart(content) {
  try {
     await writeFile(path.join(__dirname, "cart.json"), JSON.stringify(content, null, 2));
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
export async function saveOrder(order) {
  try {
    const ruta = path.join(__dirname, "orders.json");
    let ordenes = [];
    try {
      const contenido = await readFile(ruta, "utf8");
      ordenes = JSON.parse(contenido);
    } catch (e) {
      // Si el archivo no existe, empezamos con un array vacío
      ordenes = [];
    }
    ordenes.push(order);
    await writeFile(ruta, JSON.stringify(ordenes, null, 2));
  } catch (error) {
    console.log("Error al guardar orden:", error.message);
  }
}