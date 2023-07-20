const API_BASE_URL = "http://localhost:3000";

const state = {
  data: {
    //los clientes encontrados en la base de datos
    resultsClients: [],

    //son los datos de una pet, para cargarlas en la parte del edit

    clientEdit: {
      nombre: "",
      expediente: "",
      deudaTotal: "",
      pagoParcial: "",
      id: "",
    },

    clientCargarPago: {
      id: "",
    },
  },

  listeners: [],

  init() {},

  //devuelve la data del ultimo state
  getState() {
    return this.data;
  },

  subscribe(callback: (any) => any) {
    // recibe callbacks para ser avisados posteriormente
    this.listeners.push(callback);
  },

  setState(newState) {
    // modifica this.data (el state) e invoca los callbacks
    this.data = newState;
    //cb de callback
    //cada vez que se modifica el state se ejecutan los cb suscriptos
    for (const cb of this.listeners) {
      cb();
    }
  },

  async getClientePorName(name: string) {
    const currentState = this.getState();

    const fetchApi = fetch(API_BASE_URL + "/api/search/for-name?name=" + name, {
      method: "GET",

      headers: {
        "content-type": "application/json",
      },
    });

    try {
      const res = await fetchApi;

      const clientes = await res.json();

      if (clientes[0]) {
        currentState.resultsClients = clientes;

        state.setState(currentState);

        return "ok";
      } else {
        currentState.resultsClients = null;

        state.setState(currentState);

        return clientes.error;
      }
    } catch (r) {
      currentState.resultsClients = null;

      state.setState(currentState);

      console.log("este es el erro: ", r);

      return r;
    }
  },

  async getClientePorExpediente(expediente: string) {
    const currentState = this.getState();

    const fetchApi = fetch(
      API_BASE_URL + "/api/search/for-expediente?expediente=" + expediente,
      {
        method: "GET",

        headers: {
          "content-type": "application/json",
        },
      }
    );

    try {
      const res = await fetchApi;

      const clientes = await res.json();

      if (clientes[0]) {
        currentState.resultsClients = clientes;

        state.setState(currentState);

        return "ok";
      } else {
        currentState.resultsClients = null;

        state.setState(currentState);

        return clientes.error;
      }
    } catch (r) {
      currentState.resultsClients = null;

      state.setState(currentState);

      console.log("este es el erro: ", r);

      return r;
    }
  },

  async crearCliente(
    nombre: string,
    expediente: string,
    deudaTotal: number,
    pagoParcial: number
  ) {
    const fetchApi = fetch(API_BASE_URL + "/api/create-client", {
      method: "post",

      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        nombre,
        expediente,
        deudaTotal,
        pagoParcial,
      }),
    });

    try {
      const res = await fetchApi;

      const respuesta = await res.json();

      if (respuesta.error) {
        return respuesta.error;
      } else {
        return "ok";
      }
    } catch (r) {
      console.log("este es el error: ", r);

      return r;
    }
  },

  async agregarPago(id: number, pago: number) {
    const fetchApi = fetch(API_BASE_URL + "/api/agregar-pago", {
      method: "post",

      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        id,
        pago,
      }),
    });

    try {
      const res = await fetchApi;

      const respuesta = await res.json();

      if (respuesta.error) {
        return respuesta.error;
      } else {
        return "ok";
      }
    } catch (r) {
      console.log("este es el error: ", r);

      return r;
    }
  },

  async editarCliente(
    nombre: string,
    expediente: string,
    deudaTotal: number,
    pagoParcial: number,
    id: number
  ) {
    const fetchApi = fetch(API_BASE_URL + "/api/edit-client", {
      method: "post",

      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        nombre,
        expediente,
        deudaTotal,
        pagoParcial,
        id,
      }),
    });

    try {
      const res = await fetchApi;

      const respuesta = await res.json();

      if (respuesta.error) {
        return respuesta.error;
      } else {
        return "ok";
      }
    } catch (r) {
      console.log("este es el error: ", r);

      return r;
    }
  },
};
export { state };
