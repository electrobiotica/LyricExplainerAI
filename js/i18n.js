async function cambiarIdioma(idioma) {
  try {
    const res = await fetch(`lang/${idioma}.json`);
    const diccionario = await res.json();
    document.documentElement.lang = idioma;

    document.querySelectorAll("[data-trad]").forEach(el => {
      const clave = el.getAttribute("data-trad");
      if (diccionario[clave]) el.innerText = diccionario[clave];
    });

    // También actualiza los placeholders si hay data-placeholder
    document.querySelectorAll("[data-placeholder]").forEach(el => {
      const clave = el.getAttribute("data-placeholder");
      if (diccionario[clave]) el.placeholder = diccionario[clave];
    });

  } catch (e) {
    console.error("Error al cargar idioma:", e);
  }
}
