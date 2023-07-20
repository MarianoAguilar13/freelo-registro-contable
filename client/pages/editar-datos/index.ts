import { Router } from "../../../node_modules/@vaadin/router";
import { state } from "../../state";

class EditarCliente extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="contenedorForm">
                <h3 class="formTitle">Editar Cliente</h3>
                <form class="form">
                <div class="formFieldset">
                    <label class="formLabel" for="nombreInput">NOMBRE Y APELLIDO</label>
                    <input class="formInput" id="nombreInput" name="nombre" type="text" />
                </div>
                <div class="formFieldset">
                    <label class="formLabel" for="expedienteInput">EXPEDIENTE</label>
                    <input
                    class="formInput"
                    id="expedienteInput"
                    name="expediente"
                    type="text"
                    />
                </div>
                <div class="formFieldset">
                    <label class="formLabel" for="deudaTotalInput">DEUDA TOTAL</label>
                    <input
                    class="formInput"
                    id="deudaTotalInput"
                    name="deudaTotal"
                    type="text"
                    />
                </div>
                <div class="formFieldset">
                    <label class="formLabel" for="pagoParcialInput">PAGO PARCIAL</label>
                    <input
                    class="formInput"
                    id="pagoParcialInput"
                    name="pagoParcial"
                    type="text"
                    />
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
                    color: white;
                    font-family: "Poppins", sans-serif;
                    justify-content: center;
                    align-items: center;
                    font-weight: 400;
                }
                
                .formTitle {
                    font-size: 32px;
                    margin: 0;
                    margin-bottom: 10px;
                    font-weight: 400;
                    font-family: "Montserrat", sans-serif;
                }
                
                .form {
                    width: 310px;
                }
                
                @media (min-width: 769px) {
                    .form {
                    min-width: 356px;
                    }
                }
                
                .formFieldset {
                    display: flex;
                    flex-direction: column;
                }
                
                @media (min-width: 769px) {
                    .contenedorForm {
                    align-self: flex-start;
                    }
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
                    margin-top: 60px;
                }
                
                .formButtonSection {
                    width: 310px;
                }
                
                @media (min-width: 769px) {
                    .formButtonSection {
                    width: 356px;
                    }
                }  
                  `;
    this.appendChild(style);

    this.addListeners();
  }

  addListeners() {
    const form = document.querySelector(".form") as any;

    const currentState = state.getState();
    //aca guardo el id del state, que es el id del cliente al editar
    const id = parseInt(currentState.clientEdit.id);

    //expedienteInput deudaTotalInput pagoParcialInput
    const nombreEl = document.getElementById("nombreInput") as any;
    nombreEl.value = currentState.clientEdit.nombre;

    const expedienteEl = document.getElementById("expedienteInput") as any;
    expedienteEl.value = currentState.clientEdit.expediente;

    const deudaTotalEl = document.getElementById("deudaTotalInput") as any;
    deudaTotalEl.value = currentState.clientEdit.deudaTotal;

    const pagoParcialEl = document.getElementById("pagoParcialInput") as any;
    pagoParcialEl.value = currentState.clientEdit.pagoParcial;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const expediente = e.target.expediente.value;
      const nombre = e.target.nombre.value;
      const deudaTotal = parseFloat(e.target.deudaTotal.value);
      const pagoParcial = parseFloat(e.target.pagoParcial.value);

      if (nombre.length >= 8) {
        if (expediente.length >= 6) {
          if (isNaN(deudaTotal)) {
            alert("La deuda total ingresada no es un número");
          } else {
            if (isNaN(pagoParcial)) {
              alert("El pago parcial ingresada no es un número");
            } else {
              if (pagoParcial < deudaTotal) {
                const respuesta = await state.editarCliente(
                  nombre,
                  expediente,
                  deudaTotal,
                  pagoParcial,
                  id
                );

                if (respuesta == "ok") {
                  alert(
                    "Los datos se han actualizado correctamente en la base de datos"
                  );
                  Router.go("/");
                } else {
                  alert(respuesta);
                }
              } else {
                alert(
                  "La deuda total no puede ser menor al pago parcial ingresado"
                );
              }
            }
          }
        } else {
          alert(
            "El expediente ingresado esta vacio o es menor a 6 caracteres, ingrese nuevamente un expediente valido"
          );
        }
      } else {
        alert(
          "El nombre ingresado esta vacio o es menor a 8 caracteres, ingrese nuevamente un nombre valido"
        );
      }
    });
  }
}
customElements.define("editar-clientes-page", EditarCliente);
