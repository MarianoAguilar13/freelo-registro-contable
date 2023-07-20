import { Router } from "../node_modules/@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/ingresar-clientes", component: "ingresar-clientes-page" },
  { path: "/ingresar-pago", component: "ingresar-pago-page" },
  { path: "/editar-clientes", component: "editar-clientes-page" },
]);
