function toggleModo() {
  const body = document.getElementById('body');
  body.classList.toggle('light');
  body.classList.toggle('dark');
}

function analizar() {
  const texto = document.getElementById('input').value.trim();
  const output = document.getElementById('interpretacion-exportada');
  const loading = document.getElementById('loading');

  if (!texto) return alert("Por favor ingresá una letra.");

  output.innerHTML = "";
  loading.classList.remove("hidden");

  fetch("/lyric", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ letra: texto })
  })
  .then(res => res.json())
  .then(data => {
    output.innerHTML = data.respuesta || "Sin respuesta.";
  })
  .catch(err => {
    output.innerHTML = "❌ Error inesperado: " + err.message;
  })
  .finally(() => loading.classList.add("hidden"));
}
