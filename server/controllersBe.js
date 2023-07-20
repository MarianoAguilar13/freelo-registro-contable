"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editClient = exports.agregarPago = exports.creatClient = exports.getClientForExpediente = exports.getClientForName = exports.getClientes = void 0;
const dbconenction_1 = require("./dbconenction");
const getClientes = async () => {
    try {
        const allClients = await dbconenction_1.pool.query("select * from clientes");
        return allClients.rows;
    }
    catch (error) {
        console.log(error);
        return "No se realizo la busqueda";
    }
};
exports.getClientes = getClientes;
const getClientForName = async (name) => {
    try {
        const allClients = await dbconenction_1.pool.query("SELECT * FROM clientes WHERE UPPER(nombre) LIKE '%" +
            name.toUpperCase() +
            "%'");
        if (allClients.rows) {
            return allClients.rows;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getClientForName = getClientForName;
const getClientForExpediente = async (expediente) => {
    try {
        const allClients = await dbconenction_1.pool.query("SELECT * FROM clientes WHERE expediente = '" + expediente + "'");
        if (allClients.rows) {
            return allClients.rows;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getClientForExpediente = getClientForExpediente;
const creatClient = async (nombre, expediente, deudaTotal, pagoParcial) => {
    const text = "INSERT INTO clientes(nombre, expediente, deudatotal, pagoparcial) VALUES($1, $2, $3, $4)";
    const values = [nombre, expediente, deudaTotal, pagoParcial];
    try {
        const res = await dbconenction_1.pool.query(text, values);
        return true;
    }
    catch (error) {
        console.log("error del catch", error);
        return false;
    }
};
exports.creatClient = creatClient;
const agregarPago = async (id, pago) => {
    try {
        const resPago = await dbconenction_1.pool.query("SELECT pagoparcial FROM clientes WHERE id_cliente = " + id);
        const pagoParcial = resPago.rows[0].pagoparcial;
        console.log(pagoParcial);
        const newPagoParcial = pagoParcial + pago;
        const res = await dbconenction_1.pool.query("UPDATE clientes SET pagoparcial = " +
            newPagoParcial +
            " WHERE id_cliente = " +
            id +
            "");
        console.log(res);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.agregarPago = agregarPago;
const editClient = async (nombre, expediente, deudaTotal, pagoParcial, id) => {
    const text = "UPDATE clientes SET nombre = $1, expediente = $2, deudatotal = $3 , pagoparcial = $4 WHERE id_cliente = $5";
    const values = [nombre, expediente, deudaTotal, pagoParcial, id];
    try {
        const res = await dbconenction_1.pool.query(text, values);
        console.log("res controllers: ", res);
        return true;
    }
    catch (error) {
        console.log("error del catch", error);
        return false;
    }
};
exports.editClient = editClient;
