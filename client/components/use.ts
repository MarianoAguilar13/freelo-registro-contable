export async function useGetClients() {
  const fetchApi = fetch("http://localhost:3000/api/clients", {
    method: "GET",

    headers: {
      "content-type": "application/json",
    },
  });

  try {
    console.log("En el use");

    const res = await fetchApi;
    //console.log("nombre del usuario: ", resultado.name);
    const resultado = await res.json();

    return resultado;
  } catch (r) {
    console.log("El error fue: ");

    console.log(r);
  }
}
