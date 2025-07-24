function limpiarFormato(texto) {
  return texto.replace(/\*\*(.*?)\*\*/g, '$1').replace(/---+/g, '').trim();
}

function exportarTexto() {
  const contenido = document.getElementById('interpretacion-exportada').innerText;
  const limpio = limpiarFormato(contenido);
  const blob = new Blob(["🎵 Análisis generado por Lyric Explainer\n\n" + limpio], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'analisis_letra.txt';
  link.click();
}

function exportarPDF() {
  const contenido = document.getElementById('interpretacion-exportada');
  const contenedor = document.createElement('div');
  contenedor.innerHTML = `
    <div class="pdf-header">🎵 Análisis generado por Lyric Explainer</div>
    <div class="pdf-content">${contenido.innerHTML}</div>
    <div class="pdf-footer">https://lyricexplainer.web.app</div>
  `;
  html2pdf().set({
    margin: 15,
    filename: 'analisis_letra.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(contenedor).save();
}

function copiarTexto() {
  const contenido = document.getElementById('interpretacion-exportada').innerText;
  navigator.clipboard.writeText(contenido).then(() => alert("Texto copiado"));
}
