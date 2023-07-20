import { Router } from "../../../node_modules/@vaadin/router";
import { state } from "../../state";

class Home extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="containerHome">
      <h1 class="titleHome">Registro Contable</h1>
      <div class="containerEleccion">
        <h3 class="containerEleccionTitle">Seleccione el metodo de busqueda</h3>
        <div class="containerEleccionBotones">
          <button class="botonEleccion botonPorNombre">Por Nombre</button>
          <button class="botonEleccion botonPorExpediente">
            Por Expediente
          </button>
        </div>
      </div>
      <div class="containerForm containerFormName">
        <form class="formNameSearch formSearch">
          <label class="containerInput">
            Nombre y Apellido
            <div class="containerInputButton">
              <input class="formInput" type="text" name="name" id="name" placeholder="Ingrese Nombre" />
              <button class="formButton">Buscar</button>
            </div>
          </label>
        </form>
      </div>
      <div class="containerForm containerFormExpediente">
        <form class="formExpedienteSearch formSearch">
          <label class="containerInput">
            N° Expediente
            <div class="containerInputButton">
              <input class="formInput" type="text" name="expediente" id="expediente" placeholder="Ingrese expediente" />
              <button class="formButton">Buscar</button>
            </div>
          </label>
        </form>
      </div>
      <div class="tableHome">
        <div class="tableHomeCabecera">
          <div class="tableHomeCabeceraCelda">
            <p class="tableHomeCabeceraCeldaText">Nombre y Apellido</p>
          </div>
          <div class="tableHomeCabeceraCelda">
            <p class="tableHomeCabeceraCeldaText">Expediente / IPP</p>
          </div>
          <div class="tableHomeCabeceraCelda">
            <p class="tableHomeCabeceraCeldaText">Deuda Total</p>
          </div>
          <div class="tableHomeCabeceraCelda">
            <p class="tableHomeCabeceraCeldaText">Pago Parcial</p>
          </div>
          <div class="tableHomeCabeceraCelda">
            <p class="tableHomeCabeceraCeldaText">Saldo pendiente</p>
          </div>
          <div class="tableHomeCabeceraCelda">
            <p class="tableHomeCabeceraCeldaText">
            <button class="tableButton">Ingresar Nuevo Cliente</button>
            </p>
          </div>
        </div>
        <div class="containerClients">
        </div>
      </div>
    </div>
        `;

    let style = document.createElement("style");
    style.innerHTML = `
            .containerHome {
              color: white;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              text-align: center;
              width: 100%;
              font-family: var(--poppins);
            }
            
            .titleHome {
              font-size: 36px;
            }
            
            .tableHome {
              display: flex;
              width: 1200px;
              flex-direction: column;
              justify-content: center;
              column-gap: 20px;
              margin-top: 30px;
            }
            
            .tableHomeCabecera {
              display: flex;
              width: 100%;
              height: 80px;
              font-size: 18px;
              font-weight: 700;
              flex-direction: row;
              justify-content: space-between;
              background-color: rgb(189,183,107) ;
            }
            
            .tableHomeCabeceraCelda {
              display: flex;
              width: 16%;
              height: 100%;
              align-content: center;
              text-align: center;
              justify-content: center;
            }
            
            .tableHomeCabeceraCeldaText {
              text-align: center;
              align-self: center;
            }
            
            .containerForm {
            }
            
            .formSearch {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              width: 800px;
              height: 80px;
            }
            
            .containerInput {
              display: flex;
              font-weight: bold;
              flex-direction: column;
              justify-content: center;
              align-items: start;
              width: 300px;
              height: 100%;
            }
            
            .containerInputButton {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 300px;
              height: 40px;
            }
            
            .formInput {
              width: 200px;
              border: solid 1px black;
              border-radius: 5px;
              font-size: 14px;
              height: 30px;
              border: rgb(198,240,143) 3px outset;
              border-radius: 4px;
            }
            
            .formButton {
              width: 80px;
              height: 25px;
              background-color: rgb(198,240,143);
              border-radius: 4px;
              color: black;
              font-size: 12px;
              font-weight: 700;
              border-radius: 5px;
              border: black 1px solid;
            }

            .containerEleccion {
              display: flex;
              height: 100px;
              width: 400px;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            
            .containerEleccionTitle {
              font-size: 18px;
              font-weight: 700;
            }
            
            .containerEleccionBotones {
              display: flex;
              flex-direction: row;
              width: 300px;
              justify-content: space-between;
              align-items: center;
            }
            
            .botonEleccion {
              color: black;
              width: 120px;
              height: 30px;
              background-color: rgb(198,240,143);
              border-radius: 4px;
              font-size: 12px;
              font-weight: 700;
              border: black 1px solid;
            }

            .containerFormName{
              display:none;
            }

            .containerFormExpediente{
              display:none;
            }

            .tableButton{
              width: 140px;
              height: 40px;
              background-color: rgb(198,240,143);
              border-radius: 4px;
              color: black;
              font-size: 12px;
              font-weight: 700;
              border: black 1px solid;
            }
              
                  `;
    this.appendChild(style);

    this.addListeners();
  }

  addListeners() {
    const botonPorNombre = document.querySelector(".botonPorNombre") as any;
    const botonPorExpediente = document.querySelector(
      ".botonPorExpediente"
    ) as any;
    const botonNuevoCliente = document.querySelector(".tableButton") as any;

    const containerName = document.querySelector(".containerFormName") as any;
    const containerExpediente = document.querySelector(
      ".containerFormExpediente"
    ) as any;

    const formNameSearch = document.querySelector(".formNameSearch") as any;

    const formExpedienteSearch = document.querySelector(
      ".formExpedienteSearch"
    ) as any;

    botonPorNombre.addEventListener("click", (e) => {
      e.preventDefault();
      /*
      containerName.style.display = "initial";
        containerExpediente.style.display = "none";
        */
      if (containerName.style.display == "none") {
        containerName.style.display = "initial";
        containerExpediente.style.display = "none";
      } else {
        if (containerName.style.display == "initial") {
          containerName.style.display = "none";
          containerExpediente.style.display = "none";
        } else {
          containerName.style.display = "initial";
          containerExpediente.style.display = "none";
        }
      }
    });

    botonPorExpediente.addEventListener("click", (e) => {
      e.preventDefault();

      if (containerExpediente.style.display == "none") {
        containerExpediente.style.display = "initial";
        containerName.style.display = "none";
      } else {
        if (containerExpediente.style.display == "initial") {
          containerExpediente.style.display = "none";
          containerName.style.display = "none";
        } else {
          containerExpediente.style.display = "initial";
          containerName.style.display = "none";
        }
      }
      /*
      containerName.style.display = "none";
      containerExpediente.style.display = "initial";*/
    });

    botonNuevoCliente.addEventListener("click", (e) => {
      e.preventDefault();

      Router.go("/ingresar-clientes");

      /*
      containerName.style.display = "none";
      containerExpediente.style.display = "initial";*/
    });

    formNameSearch.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = e.target.name.value;

      const container = document.querySelector(".containerClients") as any;

      const res = await state.getClientePorName(name);

      if (res == "ok") {
        const arrayClients = state.getState().resultsClients;

        console.log("todos los clientes: ", arrayClients);
        //reseteo si ya tiene un child dentro
        container.innerHTML = "";

        for (const client of arrayClients) {
          const newClient = document.createElement("div");

          newClient.innerHTML = `
    <collection-row class="newChild" id="${client.id_cliente}" nombre="${client.nombre}" expediente="${client.expediente}" pagado="${client.pagoparcial}" deudaTotal="${client.deudatotal}"></collection-row>
    `;

          container.appendChild(newClient);
        }
      } else {
        alert(res);
      }
    });

    formExpedienteSearch.addEventListener("submit", async (e) => {
      e.preventDefault();

      const expediente = e.target.expediente.value;

      const container = document.querySelector(".containerClients") as any;

      const res = await state.getClientePorExpediente(expediente);

      if (res == "ok") {
        const arrayClients = state.getState().resultsClients;

        //agrego las cards pets
        for (const client of arrayClients) {
          const newClient = document.createElement("div");
          //"id", "name", "location", "picURL"

          newClient.innerHTML = `
    <collection-row class="newChild" id="${client.id_cliente}" nombre="${client.nombre}" expediente="${client.expediente}" pagado="${client.pagoparcial}" deudaTotal="${client.deudatotal}"></collection-row>
    `;

          // const newPet = newCardPet(pet.id, pet.picURL, pet.name, pet.location);

          container.innerHTML = "";
          container.appendChild(newClient);
        }
      } else {
        alert(res);
      }
    });
  }
}
customElements.define("home-page", Home);
