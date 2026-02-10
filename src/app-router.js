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
    loginHandler,
    signupHandler
} from "./app-handlers.js";


//Formato de rutas : "/notes" + ruta

router.get("/", homeHandler);
router.get("/categories/:id", categoryHandler);
router.get("/categories/:categoryId/products/:productId", productHandler);
router.post("/cart/add/:categoryId/:productId", addProductHandler);
router.get("/cart", cartHandler);
router.get("/checkout", checkoutHandler);
router.post("/orderConfirmation", orderHandler);
router.get("/about",aboutHandler);
router.get("/login",loginHandler);
router.get("/signup",signupHandler);


export  default router;