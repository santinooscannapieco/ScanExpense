// Clase Usuario con sus metodos
class Usuario {
    constructor(username, password, categorias) {
        this.username = username
        this.password = password
        this.categorias = categorias
        this.gastoTotal = this.sumarGastoTotal(categorias)
    }

    sumarCategoria(clave, valor) {            
        let nuevaCategoria = {}
        nuevaCategoria[clave] = valor
        this.categorias.push(nuevaCategoria)
        this.gastoTotal = this.sumarGastoTotal(this.categorias)
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

let users
let usuario
let contenedor = document.createElement('div')
contenedor.id = 'contenedor'
document.body.appendChild(contenedor)

let traerUsuario = JSON.parse(localStorage.getItem("usuarioLoggeado")) || ''

if ( traerUsuario === '' ) {
    mostrarInicio()
} else {
    usuario = new Usuario(traerUsuario.username, traerUsuario.password, traerUsuario.categorias)
    mostrarMenu()
}

console.log(traerUsuario)

function mostrarInicio() {
    contenedor.innerHTML = `<h1>BIENVENIDO</h1>
                            <button id="logIn">logIn</button>
                            <button id="signIn">signIn</button>`

    // Creo los eventos
    document.getElementById("logIn").addEventListener("click", logIn)
    document.getElementById("signIn").addEventListener("click", signIn)
}

function signIn() {
    contenedor.innerHTML = `<h3>Completá el formulario para crear tu cuenta</h3>
                            <input id="username" placeholder="Nombre" required>    
                            <input id="password" placeholder="Password" required>

                            <button id="botonRegistrar">Registrarme</button>
                            <button id="botonVolver">Volver</button>`

    document.getElementById("botonRegistrar").addEventListener("click", crearCuenta)
    document.getElementById("botonVolver").addEventListener("click", mostrarInicio)
}

function crearCuenta() {
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    // Comprobar si ya existe un usuario con el mismo nombre
    users = JSON.parse(localStorage.getItem('users')) || []
    let existingUser = users.find(function(user) {
        return user.username === username
    })

    if (existingUser) {
        mostrarAlert('error', 'El usuario ya existe. Por favor, elige otro nombre de usuario.', 1000)
        return
    } else if (username && password){
        // Si el usuario no existe, lo registramos
        usuario = new Usuario(username, password, [], 0)
        guardarLocalStorage('usuarioLoggeado', JSON.stringify(usuario))

        users.push(usuario)

        guardarLocalStorage('users', JSON.stringify(users))
        mostrarMenu()
        mostrarAlert('success', `Felicitaciones ${usuario.username} se completó tu registro`, 1000)
    } else {
        mostrarAlert('warning', 'Completa los campos', 1000)
    }
}


function logIn() {
    contenedor.innerHTML =  `<h3>Inicie sesión con su cuenta existente</h3>
                            <input id="loginUsername" placeholder="Nombre" required>
                            <input id="loginPassword" placeholder="Password" required>
          
                            <button id="botonLogIn">Iniciar sesión</button>
                            <button id="botonVolver">Volver</button>`

    document.getElementById("botonLogIn").addEventListener("click", chequearCuenta)
    document.getElementById("botonVolver").addEventListener("click", mostrarInicio)
}

function chequearCuenta() {
    let loginUsername = document.getElementById('loginUsername').value
    let loginPassword = document.getElementById('loginPassword').value

    // Obtener usuarios almacenados en localStorage
    users = JSON.parse(localStorage.getItem('users')) || []
    let loggedInUser = users.find(function(user) {
        return user.username === loginUsername && user.password === loginPassword
    })

    if (loggedInUser) {
        usuario = new Usuario(loggedInUser.username, loggedInUser.password, loggedInUser.categorias)
        guardarLocalStorage('usuarioLoggeado', JSON.stringify(usuario))
        //console.log('Usuario actual:', usuario)
        mostrarMenu()
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: 'Inicio de sesión exitoso.'
          });
        //mostrarAlert('success', 'Inicio de sesión exitoso.', 1000)
    } else if (loginUsername && loginPassword){
        mostrarAlert('error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.', 0)
    } else {
        mostrarAlert('warning', 'Completa los campos', 1000)
    }
}

function mostrarMenu() {
    contenedor.innerHTML = `<h3>Bienvenido, ${usuario.username}!</h3>
                            <p>Elija una de las opciones para avanzar</p>
                            <p>Gastos Totales: $ ${usuario.gastoTotal}</p>
                            <button id="verCat">Ver Categorías</button>
                            <button id="agregarCat">Agregar categoría nueva</button>
                            <button id="agregarGasto">Agregar gasto nuevo</button>
                            <button id="cerrarSesion">Cerrar sesión</button>`

    document.getElementById('verCat').addEventListener('click', verCategorias)
    document.getElementById('agregarCat').addEventListener('click', agregarCategoria)
    document.getElementById('agregarGasto').addEventListener('click', agregarGasto)
    document.getElementById('cerrarSesion').addEventListener('click', () => {
        localStorage.removeItem('usuarioLoggeado')
        mostrarInicio()
        // mostrarAlert('question', 'Seguro queres salir', 0)
    })
}

function verCategorias() {
    let categorias = usuario.categorias
    let categoriasHTML = ''

    if (categorias.length === 0) {
        mostrarAlert('warning', 'No tenes categorias creadas', 1000)
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

        let categoriasGuardadas = usuario.categorias
        let existingCategorias = categoriasGuardadas.find( function(c) {
            return c[nombreCat] !== undefined
        })

        if (existingCategorias) {
            mostrarAlert('warning', 'Esa categoria ya existe', 1000)
            return
        }

        if (nombreCat && !isNaN(gastoCat)) {
            usuario.sumarCategoria(nombreCat, gastoCat)
            guardarLocalStorage('usuarioLoggeado', JSON.stringify(usuario))

            mostrarMenu()
        } else {
            mostrarAlert('warning', 'Completá todos los campos por favor', 1000)
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
            guardarLocalStorage('usuarioLoggeado', JSON.stringify(usuario))
            mostrarMenu()
        }else {
            mostrarAlert('warning', 'Los datos ingresados no son válidos', 1000)
        }
    })
    document.getElementById('volver').addEventListener('click', mostrarMenu)
}

function guardarLocalStorage(clave,valor) {
    localStorage.setItem(clave, valor)

    let users = JSON.parse(localStorage.getItem('users')) || []
    let indexUsuarioLoggeado = users.findIndex( function(user) {
        return user.username === usuario.username
    })
    
    console.log('index', indexUsuarioLoggeado)

    if (indexUsuarioLoggeado !== -1) {
        users[indexUsuarioLoggeado].categorias = usuario.categorias
        users[indexUsuarioLoggeado].gastoTotal = usuario.gastoTotal

        localStorage.setItem('users', JSON.stringify(users))
    } else {
        console.error('no encontramos usuario')
    }
}

function mostrarAlert(icono, texto, tiempo) {
    if (tiempo != 0) {
        Swal.fire({
            icon: icono,
            text: texto,    
            timer: tiempo,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false
        })
    }else {
        Swal.fire({
            icon: icono,
            text: texto,
        })
    }
    
}