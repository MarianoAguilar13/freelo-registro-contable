import { Router } from "../../node_modules/@vaadin/router";
import { state } from "../state";
import { useGetClients } from "./use";

export function init() {
  class CollectionRow extends HTMLElement {
    //estos son los atributos que voy a estar obsevando su cambios
    static get observedAttributes() {
      return ["id", "nombre", "expediente", "pagado", "deudaTotal"];
    }

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      // Always call super first in constructor
      super();
      this.render();
    }

    render() {
      this.shadow.innerHTML = `
      <div class="tableHomeRow">
        <div class="tableHomeRowCelda">
          <p class="tableHomeRowCeldaText cellName"></p>
        </div>
        <div class="tableHomeRowCelda">
          <p class="tableHomeRowCeldaText cellExpediente"></p>
        </div>
        <div class="tableHomeRowCelda">
          <p class="tableHomeRowCeldaText cellDeudaTotal"></p>
        </div>
        <div class="tableHomeRowCelda">
          <p class="tableHomeRowCeldaText cellPagado"></p>
        </div>
        <div class="tableHomeRowCelda">
          <p class="tableHomeRowCeldaText cellAdeudado"></p>
        </div>
        <div class="tableHomeRowCelda">
          <div class="containerButtons">
            <button class="buttonEdit buttonRow">Editar</button>
            <button class="buttonAgregarPago buttonRow">Pago +</button>
          </div>
        </div>
      </div>
    `;

      const style = document.createElement("style");

      style.innerHTML = `
      .tableHomeRow {
        display: flex;
        width: 100%;
        height: 60px;
        font-size: 14px;
        font-family: var(--poppins);
        flex-direction: row;
        justify-content: space-between;
        color: black;
        background-color: rgb(176,181,188);
        border-top: 2px black solid;
      }
      
      .tableHomeRowCelda {
        display: flex;
        width: 16%;
        height: 100%;
        align-content: center;
        text-align: center;
        justify-content: center;
        flex-direction: column;
        align-content: center;
  
      }
      
      .tableHomeRowCeldaText {
        text-align: center;
      
      }  
      
      .buttonRow {
        width: 60px;
        height: 25px;
        background-color: rgb(198,240,143);
        border-radius: 4px;
        color: black;
        font-size: 12px;
        font-weight: 700;
        border: black 1px solid;
      }

      .containerButtons{
        display: flex;
        width: 100%;
        height: 100%;
        align-content: center;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }
        `;

      //Ese display none, podria tener otro nombre describiendo a partir de que window size afecta. EL DE ARRIBA
      this.shadow.appendChild(style);
      //Escuchador de eventos
      this.addListeners();
    }

    addListeners() {
      // "id", "nombre", "expediente", "pagado", "deudaTotal"
      //guardo los elementos que voy a modificar con los atributos
      //pasdos por parametro
      /*
      nombre: "",
      expediente: "",
      deudaTotal: "",
      pagoParcial: "",
      id: "",*/

      const id = this.getAttribute("id");
      const nombre = this.getAttribute("nombre");
      const expediente = this.getAttribute("expediente");
      const deudaTotal = this.getAttribute("deudaTotal");
      const pagoParcial = this.getAttribute("pagado");

      const nameEl = this.shadow.querySelector(".cellName") as any;
      nameEl.textContent = this.getAttribute("nombre");

      const expedienteEl = this.shadow.querySelector(".cellExpediente") as any;
      expedienteEl.textContent = this.getAttribute("expediente");

      const pagadoEl = this.shadow.querySelector(".cellPagado") as any;
      pagadoEl.textContent = this.getAttribute("pagado");

      const deudaTotalEl = this.shadow.querySelector(".cellDeudaTotal") as any;
      deudaTotalEl.textContent = this.getAttribute("deudaTotal");

      const adeudado =
        parseFloat(deudaTotalEl.textContent) - parseFloat(pagadoEl.textContent);

      const adeudadoEl = this.shadow.querySelector(".cellAdeudado") as any;
      adeudadoEl.textContent = adeudado;

      //cuando hacer click en el boton de la card va hacia la pag
      //donde completara el formulario para reportar
      const botonEdit = this.shadow.querySelector(".buttonEdit") as any;
      const botonPago = this.shadow.querySelector(".buttonAgregarPago") as any;
      botonEdit.addEventListener("click", async (e) => {
        e.preventDefault();

        /*
        Aca deberia agregarlo al state para que lo muestre en la proxima
        page y poder modificar los datos con el componente de esa page
        luego redirigirnos a esa page
        */

        const currentState = state.getState();
        currentState.clientEdit.id = id;
        currentState.clientEdit.nombre = nombre;
        currentState.clientEdit.expediente = expediente;
        currentState.clientEdit.deudaTotal = deudaTotal;
        currentState.clientEdit.pagoParcial = pagoParcial;
        state.setState(currentState);

        Router.go("/editar-clientes");
      });

      botonPago.addEventListener("click", async (e) => {
        e.preventDefault();

        /*
        Aca deberia agregarlo al state para que lo muestre en la proxima
        page y poder modificar los datos con el componente de esa page
        luego redirigirnos a esa page
        */
        const currentState = state.getState();
        currentState.clientCargarPago.id = id;
        currentState.clientCargarPago.nombre = nombre;
        state.setState(currentState);

        Router.go("/ingresar-pago");
      });
    }
  }

  customElements.define("collection-row", CollectionRow);
}
