import * as cors from "../node_modules/cors";
import * as express from "../node_modules/express";
import {
  getClientes,
  getClientForName,
  getClientForExpediente,
  creatClient,
  agregarPago,
  editClient,
} from "./controllersBe";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("dist"));

app.get("/api/clients", async (req, res) => {
  const respuesta = await getClientes();
  res.json(respuesta);
});

app.get("/api/search/for-name", async (req, res) => {
  const name = req.query.name;

  const respuesta = await getClientForName(name);

  if (respuesta[0]) {
    res.json(respuesta);
  } else {
    res.json({
      error:
        "No se encontró ningún cliente de acuerdo a los criterios de busqueda",
    });
  }
});

app.get("/api/search/for-expediente", async (req, res) => {
  const expediente = req.query.expediente;

  const respuesta = await getClientForExpediente(expediente);
  if (respuesta[0]) {
    res.json(respuesta);
  } else {
    res.json({
      error: "No se encontró ningún cliente con el expediente ingresado",
    });
  }
});

app.post("/api/create-client", async (req, res) => {
  const { nombre, expediente, deudaTotal, pagoParcial } = req.body;

  //pictureDataURL esta dentro del body, pero no se extrae en una
  //variable porque es un string muy largo
  if (nombre && expediente && deudaTotal && pagoParcial) {
    const respuesta = await creatClient(
      nombre,
      expediente,
      deudaTotal,
      pagoParcial
    );

    //Si la respuesta es true, entonces devuelve true al front
    if (respuesta) {
      res.json(respuesta);
    } else {
      //sino significa que algun dato esta duplicado(el expediente) o tuvo un error
      res.json({
        error: "Algunos de los datos estan duplicados o tiene algún error",
      });
    }
  } else {
    res.json({ error: "Falto ingresar datos obligatorios" });
  }
});

app.post("/api/agregar-pago", async (req, res) => {
  const { id, pago } = req.body;

  //pictureDataURL esta dentro del body, pero no se extrae en una
  //variable porque es un string muy largo
  if (id && pago) {
    const respuesta = await agregarPago(id, pago);

    //si la respuesta existe envio al front el id de la publicacion de la pet
    if (respuesta) {
      res.json(respuesta);
    } else {
      //sino algo ocurrio con la dataImagen
      res.json({
        error: "No se pudo realizar la actualización del pago",
      });
    }
  } else {
    res.json({ error: "Falto ingresar datos obligatorios" });
  }
});

app.post("/api/edit-client", async (req, res) => {
  const { nombre, expediente, deudaTotal, pagoParcial, id } = req.body;

  //pictureDataURL esta dentro del body, pero no se extrae en una
  //variable porque es un string muy largo
  if (nombre && expediente && deudaTotal && pagoParcial && id) {
    const respuesta = await editClient(
      nombre,
      expediente,
      deudaTotal,
      pagoParcial,
      id
    );

    //Si la respuesta es true, entonces devuelve true al front
    if (respuesta) {
      res.json(respuesta);
    } else {
      //sino significa que algun dato esta duplicado(el expediente) o tuvo un error
      res.json({
        error: "Algunos de los datos estan duplicados o tiene algún error",
      });
    }
  } else {
    res.json({ error: "Falto ingresar datos obligatorios" });
  }
});

app.listen(port, () => {});
