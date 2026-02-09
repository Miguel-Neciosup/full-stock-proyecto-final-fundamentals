import express from "express";
//Configurar router
const router = express.Router();
import {
    homeHandler,
    categoryHandler,
    productHandler,
    addProductHandler,
    cartHandler,
    checkoutHandler,
    orderHandler,
    aboutHandler,
} from "./app-handlers.js";


//Formato de rutas : "/notes" + ruta

router.get("/", homeHandler);
router.get("/categories/:id", categoryHandler);
router.get("/products/:id", productHandler);
router.post("/cart/add/:id", addProductHandler);
router.get("/cart", cartHandler);
router.get("/checkout", checkoutHandler);
router.post("/orderConfirmation", orderHandler);
router.get("/about",aboutHandler);


export  default router;