import { getCategories , GetCart,saveCart,saveOrder} from "./utils.js";


// Handlers
export async function homeHandler(_req, res) {
  const categories = await getCategories();
  res.render("index", {categories :categories});
}

export async function categoryHandler(req, res) {
  const categories = await getCategories();
  const categoryId = Number(req.params.id);
  const category = categories.find((c) => c.id === categoryId);
  res.render("category", { category: category, products:category.products });
}
export async function productHandler(req, res) {
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
export async function addProductHandler(req, res) {
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
export async function cartHandler(_req, res) {
  const cart = await GetCart();
   const initialValue = 0 ;
  const total = cart.reduce((accumulator,product) => {
    return accumulator + product.price;
  },initialValue);
  res.render("cart", { cart ,total});
}
export async function checkoutHandler(_req, res) {
  const checkout = await GetCart();
  const initialValue = 0;
  const total = checkout.reduce((accumulator, product) => {
    // return accumulator + (product.price * (product.quantity || 1));
    return accumulator + product.price 
  }, initialValue);

   res.render("checkout", { checkout,total});
}
export async function orderHandler(req, res) {
  // 1. Verificar si req.body existe (por seguridad)
  if (!req.body || !req.body.nombre) {
    return res.status(400).send("Faltan datos en el formulario");
  }

  const cart = await GetCart();
  const total = cart.reduce((acc, prod) => acc + prod.price, 0);

  const nuevaOrden = {
    id: Date.now(),
    fecha: new Date().toLocaleString(),
    cliente: {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      telefono: req.body.telefono,
      direccion: `${req.body.direccion}, ${req.body.ciudad}, ${req.body.pais}`,
    },
    items: cart,
    total: total,
  };

  await saveOrder(nuevaOrden);
  await saveCart([]); // Limpiamos carrito

  res.render("orderConfirmation", { orderId: nuevaOrden.id });
}
export async function  aboutHandler(req, res) {
  res.render("about");
}