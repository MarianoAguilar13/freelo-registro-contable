import { pool } from "./dbconenction";

export const getClientes = async () => {
  try {
    const allClients = await pool.query("select * from clientes");

    return allClients.rows;
  } catch (error) {
    console.log(error);

    return "No se realizo la busqueda";
  }
};

export const getClientForName = async (name: string) => {
  try {
    const allClients = await pool.query(
      "SELECT * FROM clientes WHERE UPPER(nombre) LIKE '%" +
        name.toUpperCase() +
        "%'"
    );

    if (allClients.rows) {
      return allClients.rows;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getClientForExpediente = async (expediente: string) => {
  try {
    const allClients = await pool.query(
      "SELECT * FROM clientes WHERE expediente = '" + expediente + "'"
    );

    if (allClients.rows) {
      return allClients.rows;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const creatClient = async (
  nombre: string,
  expediente: string,
  deudaTotal: number,
  pagoParcial: number
) => {
  const text =
    "INSERT INTO clientes(nombre, expediente, deudatotal, pagoparcial) VALUES($1, $2, $3, $4)";
  const values = [nombre, expediente, deudaTotal, pagoParcial];

  try {
    const res = await pool.query(text, values);

    return true;
  } catch (error) {
    console.log("error del catch", error);

    return false;
  }
};

export const agregarPago = async (id: number, pago: number) => {
  try {
    const resPago = await pool.query(
      "SELECT pagoparcial FROM clientes WHERE id_cliente = " + id
    );

    const pagoParcial = resPago.rows[0].pagoparcial;

    console.log(pagoParcial);

    const newPagoParcial = pagoParcial + pago;

    const res = await pool.query(
      "UPDATE clientes SET pagoparcial = " +
        newPagoParcial +
        " WHERE id_cliente = " +
        id +
        ""
    );

    console.log(res);
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const editClient = async (
  nombre: string,
  expediente: string,
  deudaTotal: number,
  pagoParcial: number,
  id: number
) => {
  const text =
    "UPDATE clientes SET nombre = $1, expediente = $2, deudatotal = $3 , pagoparcial = $4 WHERE id_cliente = $5";
  const values = [nombre, expediente, deudaTotal, pagoParcial, id];

  try {
    const res = await pool.query(text, values);
    console.log("res controllers: ", res);
    return true;
  } catch (error) {
    console.log("error del catch", error);

    return false;
  }
};
