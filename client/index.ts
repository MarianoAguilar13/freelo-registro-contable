import "./pages/home/index";
import "./pages/ingresar-cliente/index";
import "./pages/ingresar-pago/index";
import "./pages/editar-datos/index";
import "./router";
import { state } from "./state";

import { init as initCollectionRow } from "./components/collection-row";

(function () {
  initCollectionRow();

  /*
  state.init();
  if (localStorage.getItem("Token") == undefined) {
    localStorage.setItem("Token", "Hola");
  } else {
    
    localStorage.setItem("Token", "Hola");
    
  }*/
})();
