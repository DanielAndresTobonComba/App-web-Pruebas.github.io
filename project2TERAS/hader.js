

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });

  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
      closeAllModals();
    }
  });

   // Your script code here
   let miInput = document.getElementById('codigoFactura');
   let icono = document.getElementById('iconoFactura');
   let mensaje = document.getElementById('parraFactura');
   let boton = document.getElementById('botonConsultar');
   
   miInput.addEventListener('input', function () {

       let valorInput = miInput.value.trim(); // Eliminar espacios al inicio y al final
       let longitudTexto = valorInput.length;
   
       // Expresión regular para verificar si hay espacios en blanco
       let tieneEspacios = /\s/.test(valorInput);
   
       // Modificar clases según la longitud del texto y la validación de espacios
       if (longitudTexto >= 1 && !tieneEspacios) {
           miInput.classList.remove('is-danger');
           miInput.classList.add('is-success');
   
           icono.className = 'fas fa-check';
   
           mensaje.classList.remove('is-danger');
           mensaje.classList.add('is-success');
           mensaje.textContent = 'Referencia válida.';
   
           boton.removeAttribute('disabled');
       } else {
           miInput.classList.remove('is-success');
           miInput.classList.add('is-danger');
   
           icono.className = 'fas fa-exclamation-triangle';
   
           mensaje.classList.remove('is-success');
           mensaje.classList.add('is-danger');
   
           if (tieneEspacios) {
               mensaje.textContent = 'La referencia no debe contener espacios.';
           } else {
               mensaje.textContent = 'Número de referencia inválido.';
           }
   
           boton.setAttribute('disabled', 'true');
       }
   });

});

  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
        deshabilitar(); //para eliminar factura despues de haberla mostrado
      }
    });



