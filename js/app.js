const ui = new UI();

const buscardor = document.querySelector('.form-control');

document.addEventListener('DOMContentLoaded', () => {
  ui.mostrarEstablecimientos();
})

buscardor.addEventListener('input', () => {
  if (buscardor.value.length > 3) {
    ui.obtenerSugerencias(buscardor.value);
  }

  if (buscardor.value === '') {
    ui.mostrarEstablecimientos();
  }
})