const urlBase = "https://memes-api.grye.org";

export const obtenerMemes = async (pagina, cantidad) => {
  try {
    const url = `${urlBase}/memes/?page=${pagina}&limit=${cantidad}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    if (!respuesta.ok || !Array.isArray(data)) {
      return [null, "Error al obtener memes"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};