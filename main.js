// Clase Usuario con sus metodos
class Usuario {
    constructor(nombre, categorias) {
        this.nombre = nombre
        this.categorias = categorias
        this.gastoTotal = this.sumarGastoTotal(categorias)
    }

    sumarCategoria(clave, valor) {            
        let nuevaCategoria = {}
        nuevaCategoria[clave] = valor
        this.categorias.push(nuevaCategoria)
        this.gastoTotal = this.sumarGastoTotal(this.categorias)
        console.log(this.categorias)
    }

    sumarGastoCat(clave, valor) {
        for (let categoria of this.categorias) {
            if (categoria.hasOwnProperty(clave)) {
                categoria[clave] += valor
                break
            }
        }
        this.gastoTotal = this.sumarGastoTotal(this.categorias)
    }

    sumarGastoTotal(categorias) {
        let suma = 0

        for (let categoria of categorias) {
            suma += Object.values(categoria)[0]
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


let datos = JSON.parse(localStorage.getItem("usuario")) || ''

if(datos === '') {
    mostrarInicio()
}else {
    usuario = new Usuario(datos.nombre, datos.categorias)
    mostrarMenu()
}

function mostrarInicio() {
    contenedor.innerHTML = `<h3>Ingresa tu nombre</h3>
                            <input id="nombre" placeholder="Nombre">
                            <button id="btn">Guardar nombre</button>`

    document.getElementById('btn').addEventListener('click', guardarNombre)
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
    usuario = new Usuario(nombre, [])
    guardarLocalStorage("usuario", JSON.stringify(usuario))
    mostrarMenu()
}

function mostrarMenu() {
    contenedor.innerHTML = `<h3>Bienvenido, ${usuario.nombre}!</h3>
                            <p>Elija una de las opciones para avanzar</p>
                            <p>Gastos Totales: $ ${usuario.gastoTotal}</p>
                            <button id="verCat">Ver Categorías</button>
                            <button id="agregarCat">Agregar categoría nueva</button>
                            <button id="agregarGasto">Agregar gasto nuevo</button>`

    document.getElementById('verCat').addEventListener('click', verCategorias)
    document.getElementById('agregarCat').addEventListener('click', agregarCategoria)
    document.getElementById('agregarGasto').addEventListener('click', agregarGasto)

}

function verCategorias() {
    let categorias = usuario.categorias
    let categoriasHTML = ''

    if (categorias.length === 0) {
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
        for (let categoria of categorias) {
            for (let clave in categoria) {
                categoriasHTML += `<p>${clave}: $ ${categoria[clave]}</p>`
            }
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
            guardarLocalStorage("usuario", JSON.stringify(usuario))

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
    let categorias = usuario.categorias
    let categoriasSelectHTML = `<option value="">Categorias</option>`
    
    for (let categoria of categorias) {
        for (let clave in categoria) {
            categoriasSelectHTML += `<option value="${clave}">${clave}</option>`
        }
    }

    contenedor.innerHTML = `<h3>Agregar gasto nuevo</h3>
                            <p>Ingrese los siguientes datos para agregar un nuevo gasto</p>
                            <select id="categoriasSelect">${categoriasSelectHTML}</select>
                            <input id="gastoNuevo" placeholder="Gasto">
                            <button id="crearGastoBtn">Crear gasto</button><br>
                            <button id="volver">Volver</button>`



    document.getElementById('crearGastoBtn').addEventListener('click', function() {
        let categoriaSeleccionada = document.getElementById('categoriasSelect').value
        let gastoNuevo = parseInt(document.getElementById('gastoNuevo').value)

        if (categoriaSeleccionada != '' && !isNaN(gastoNuevo)) {
            usuario.sumarGastoCat(categoriaSeleccionada, gastoNuevo)
            guardarLocalStorage("usuario", JSON.stringify(usuario))

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
            })
        }
    })
    document.getElementById('volver').addEventListener('click', mostrarMenu)
}


function guardarLocalStorage(clave,valor) {
    localStorage.setItem(clave, valor)
}