const urlBase = "https://memes-api.grye.org";

export const obtenerMemes = async (sort, pagina, cantidad) => {
  try {
    const url = `${urlBase}/memes/?sort_by=${sort}&page=${pagina}&limit=${cantidad}`;
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

export const autenticar = async (usuario, contraseña) => {
  try {
    const respuesta = await fetch(`${urlBase}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: usuario,
        password: contraseña,
      }).toString(),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Usuario o contraseña incorrectos"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const registrar = async (usuario, contraseña) => {
  try {
    const respuesta = await fetch(`${urlBase}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: usuario,
        password: contraseña,
      }).toString(),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al registrar usuario"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const subirMeme = async (token, titulo, descripcion, imagen) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para subir un meme."];
    }

    const url = `${urlBase}/memes/?title=${encodeURIComponent(
      titulo,
    )}&description=${encodeURIComponent(descripcion)}`;

    const dataFormulario = new FormData();


    if (imagen) {
      if (imagen instanceof File) {
        dataFormulario.append("file", imagen);
      } else {
        const respuesta = await fetch(imagen);
        const archivoBlob = await respuesta.blob();
        dataFormulario.append("file", archivoBlob, "meme.jpg");
      }
    } else {
      return [null, "No se proporcionó una imagen para subir."];
    }

    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: dataFormulario,
    });

    if (!respuesta.ok) {
      return [null, "Error al subir meme"];
    }

    return ["Meme subido con éxito!", null];
  } catch (error) {
    return [null, error.message || "Error al subir meme"];
  }
};

export const likeMeme = async (token, memeId) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para dar like a un meme."];
    }

    const url = `${urlBase}/memes/${memeId}`;

    const respuesta = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const { likes } = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al dar like a meme"];
    }

    return [likes, null];
  } catch (error) {
    return [null, error.message || "Error al subir meme"];
  }
};