import { Router } from "../../../node_modules/@vaadin/router";
import { state } from "../../state";

class IngresarCliente extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="contenedorForm">
                <h3 class="formTitle">Nuevo Cliente</h3>
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
                    color: whitesmoke;
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
                    border-radius: 6px;
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
                console.log(
                  "name: ",
                  nombre,
                  "  expediente: ",
                  expediente,
                  "  deuda total: ",
                  deudaTotal,
                  "  pago parcial: ",
                  pagoParcial
                );

                const respuesta = await state.crearCliente(
                  nombre,
                  expediente,
                  deudaTotal,
                  pagoParcial
                );

                if (respuesta == "ok") {
                  alert(
                    "El nuevo cliente se ingreso correctamente a la base de datos"
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
customElements.define("ingresar-clientes-page", IngresarCliente);
