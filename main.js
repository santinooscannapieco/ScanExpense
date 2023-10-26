// Clase Usuario con sus metodos
class Usuario {
    constructor(nombre, categorias) {
        this.nombre = nombre
        this.categorias = categorias
        this.gastoTotal = this.sumarGasto(categorias)
    }

    sumarCategoria(clave, valor) {
        if (this.categorias.hasOwnProperty(clave)) {
            this.categorias[clave] += valor
        } else {
            this.categorias[clave] = valor
        }
        this.gastoTotal = this.sumarGasto(this.categorias)
        console.log(this.categorias)
    }

    sumarGasto(categorias) {
        let suma = 0

        for (let clave in categorias) {
            if (categorias.hasOwnProperty(clave)) {
                suma += categorias[clave]
            }
        }
        return suma
    }
    restarGasto() {    }

    obtenerCategorias() {
        return this.categorias
    }
}

let usuario
let contenedor = document.createElement('div')
contenedor.id = 'contenedor'
document.body.appendChild(contenedor)

function mostrarInicio() {
    contenedor.innerHTML = `<h3>Ingresa tu nombre</h3>
                            <input id="nombre" placeholder="Nombre">
                            <button id="btn">Guardar nombre</button>`

    document.getElementById('btn').addEventListener('click', guardarNombre)
}

function mostrarMenu() {
    contenedor.innerHTML = `<h3>Bienvenido, ${usuario.nombre}!</h3>
                            <p>Elija una de las opciones para avanzar</p>
                            <p>Gastos Totales: ${usuario.gastoTotal}</p>
                            <button id="verCat">Ver Categorías</button>
                            <button id="agregarCat">Agregar categoría nueva</button>
                            <button id="agregarGasto">Agregar gasto nuevo</button>`

    document.getElementById('verCat').addEventListener('click', verCategorias)
    document.getElementById('agregarCat').addEventListener('click', agregarCategoria)
    document.getElementById('agregarGasto').addEventListener('click', agregarGasto)

}

function guardarNombre() {
    const nombre = document.getElementById('nombre').value

    if(nombre === "") {
        Swal.fire({
            icon: 'warning',
            text: 'Completá el campo con tu nombre',
            timer: 2000,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false
        })
        return
    }

    console.log(nombre)
    usuario = new Usuario(nombre, {})
    mostrarMenu()
}

function verCategorias() {
    let categorias = usuario.obtenerCategorias()
    let categoriasHTML = ''

    if (Object.keys(categorias).length === 0) {
        Swal.fire({
            icon: 'warning',
            text: 'No tenes categorias creadas',
            timer: 2000,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false
        })
        return
    } else {
        for (let categoria in categorias) {
            categoriasHTML += `<p>${categoria}: ${categorias[categoria]}</p>`
        }
    }

    contenedor.innerHTML = `<h3>Categorías</h3>${categoriasHTML}<br>
                            <button id="volver">Volver</button>`

    document.getElementById('volver').addEventListener('click', mostrarMenu)
}

function agregarCategoria() {
    contenedor.innerHTML = `<h3>Agregar categoría</h3>
                            <p>Ingrese los siguiente datos para crear una categoía nueva</p>
                            <input id="nombreCat" placeholder="Categoría">
                            <input id="gastoCat" placeholder="gasto">
                            <button id="crearCatBtn">Crear categoría</button><br>
                            <button id="volver">Volver</button>`

    document.getElementById('crearCatBtn').addEventListener('click', function() {
        let nombreCat = document.getElementById('nombreCat').value
        let gastoCat = parseInt(document.getElementById('gastoCat').value)

        // Itero las categorias para no crear 2 categorias con el mismo nombre
        for (let categoria in usuario.categorias){
            if(categoria === nombreCat) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Esa categoria ya existe',
                    timer: 2000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    showConfirmButton: false
                })
                return
            }
        }

        if (nombreCat && !isNaN(gastoCat)) {
            usuario.sumarCategoria(nombreCat, gastoCat)
            mostrarMenu()
        } else {
            Swal.fire({
                icon: 'warning',
                text: 'Completá todos los campos por favor',
                timer: 2000,
                timerProgressBar: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: false
            })
        }
    })

    document.getElementById('volver').addEventListener('click', mostrarMenu)
}

function agregarGasto() {
    let categorias = usuario.obtenerCategorias()
    let categoriasSelectHTML = `<option value="">Categorias</option>`
    
    for (let categoria in categorias) {
        categoriasSelectHTML += `<option value="${categoria}">${categoria}</option>`
    }

    contenedor.innerHTML = `<h3>Agregar gasto nuevo</h3>
                            <p>Ingrese los siguientes datos para agregar un nuevo gasto</p>
                            <select id="categoriasSelect">${categoriasSelectHTML}</select>
                            <input id="gastoNuevo" placeholder="Gasto">
                            <button id="crearGastoBtn">Crear gasto</button><br>
                            <button id="volver">Volver</button>`;



    document.getElementById('crearGastoBtn').addEventListener('click', function() {
        let categoriaSeleccionada = document.getElementById('categoriasSelect').value
        let gastoNuevo = parseInt(document.getElementById('gastoNuevo').value)

        if (categoriaSeleccionada != '' && !isNaN(gastoNuevo)) {
            usuario.sumarCategoria(categoriaSeleccionada, gastoNuevo)
            mostrarMenu()
        }else {
            Swal.fire({
                icon: 'warning',
                text: 'Los datos ingresados no son válidos',
                timer: 2000,
                timerProgressBar: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: false
            });
        }
    });

    document.getElementById('volver').addEventListener('click', mostrarMenu)
}

mostrarInicio()