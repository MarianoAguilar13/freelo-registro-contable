import { Router } from "../../../node_modules/@vaadin/router";
import { state } from "../../state";

class IngresarPago extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const currentState = state.getState();
    const nombre = currentState.clientCargarPago.nombre;

    this.innerHTML = `
            <div class="contenedorForm">
                <h3 class="formTitle">Agregar Pago a ${nombre}</h3>
                <form class="form">
                    <div class="formFieldset">
                        <input class="formInput" id="pagoInput" name="pago" type="text" placeholder="Insertar monto..." />
                    </div>
                    <div class="formButtonSection">
                        <button class="formButton">Enviar</button>
                    </div>
                </form>
            </div>
        `;

    let style = document.createElement("style");
    style.innerHTML = `
                .contenedorForm {
                    display: flex;
                    flex-direction: column;
                    padding: 82px 33px;
                    color: whitesmoke;
                    font-family: "Poppins", sans-serif;
                    justify-content: center;
                    align-items: center;
                    font-weight: 400;
                }
                
                .formTitle {
                    font-size: 32px;
                    margin: 0;
                    margin-bottom: 40px;
                    font-weight: 400;
                    font-family: "Montserrat", sans-serif;
                }
                
                .form {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: flex-end;
                    height: 100px;
                }
                
                .formFieldset {
                    display: flex;
                    flex-direction: column;
                    width: 220px;
                    margin-right: 40px;
                }
                
                
                .formLabel {
                    font-size: 13px;
                    margin-top: 22px;
                    margin-bottom: 10px;
                }
                
                .formInput {
                    width: 100%;
                    height: 45px;
                    border: rgb(198,240,143) 5px outset;
                    border-radius: 4px;
                    font-size: 16px;
                }
                
                .formButton {
                    width: 100%;
                    height: 45px;
                    background-color: rgb(198,240,143);
                    border-radius: 4px;
                    color: black;
                    font-size: 16px;
                    margin-top: 20px;
                }
                
                .formButtonSection {
                    width: 100px;
                }
                
              
                  `;
    this.appendChild(style);

    this.addListeners();
  }

  addListeners() {
    const form = document.querySelector(".form") as any;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const pago = parseFloat(e.target.pago.value);
      const currentState = state.getState();
      const id = parseInt(currentState.clientCargarPago.id);

      console.log("id: ", id, "  pago: ", pago);

      if (isNaN(pago)) {
        alert("El pago ingresado no es un número");
      } else {
        const respuesta = await state.agregarPago(id, pago);

        if (respuesta == "ok") {
          alert("El nuevo pago se ingresó correctamente");
          Router.go("/");
        } else {
          alert(respuesta);
        }
      }
    });
  }
}
customElements.define("ingresar-pago-page", IngresarPago);
