
const socket = io(); 
const btnAgregar = document.getElementById("btnAgregar")
const btnEliminar = document.getElementById("btnEliminar")

btnAgregar.addEventListener('click', () => {
   
    const prod = {title: title.value, description: description.value, code: code.value, price: price.value, stock: stock.value, category: category.value, thumbnail: thumbnail.value, status: true}

    socket.emit('agregarProducto', prod);


   
});

socket.on('mostrarProducto', (mensaje)=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${mensaje}`,
            showConfirmButton: false,
            timer: 1500
          })
          
          window.alert(`${mensaje}`);

    
})


btnEliminar.addEventListener('click', () => {
    
    const codeInput = document.getElementById('code').value

    socket.emit('eliminarProducto', codeInput);
    
  


});

socket.on("mostrarEliminado",   (mensaje)=>{
    
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${mensaje}`,
        showConfirmButton: false,
        timer: 3000 
    });

    
})

window.addEventListener('DOMContentLoaded', event => {

 
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
       if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            document.body.classList.toggle('sb-sidenav-toggled');
        }

        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
