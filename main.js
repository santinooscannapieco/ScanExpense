// Clase Usuario con sus metodos
class Usuario {
    constructor(username, password, categorias, gastos) {
        this.username = username
        this.password = password
        this.categorias = categorias
        this.gastoTotal = this.sumarGastoTotal(categorias)
        this.gastos = gastos
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

        this.guardarGastos(clave, valor)
    }

    sumarGastoTotal(categorias) {
        let suma = 0

        for (let categoria of categorias) {
            suma += Object.values(categoria)[0]
        }
        return suma
    }
    restarGasto() {    }

    guardarGastos(clave, valor) {
        let nuevoGasto = {}
        nuevoGasto[clave] = valor
        this.gastos.push(nuevoGasto)
    }

    obtenerCategorias() {
        return this.categorias
    }
}

/*          TRAER PRECIO DOLAR
let url = 'https://v6.exchangerate-api.com/v6/6eed10f6e4f651030ac76430/latest/USD'
fetch(url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        //pantallaDivisas(json)
    })
*/

let users
let usuario
let contenedor = document.createElement('div')
contenedor.id = 'contenedor'
document.body.appendChild(contenedor)

let traerUsuario = JSON.parse(localStorage.getItem("usuarioLoggeado")) || ''

traerUsuario === '' ? ( mostrarInicio() ) : ( usuario = new Usuario(traerUsuario.username, traerUsuario.password, traerUsuario.categorias, traerUsuario.gastos), mostrarMenu() )

console.log(traerUsuario)

function mostrarInicio() {
    contenedor.innerHTML = `<header id="header">
                                <img src="./img/logo_transparent.png" alt="" id="logo">
                                <div id="container-logInSignIn">
                                    <button id="btnLogIn">INICIAR SESIÓN</button>
                                    <button id="btnSignIn">REGÍSTRATE AHORA</button>
                                </div>
                            </header>
                            <div id="info-index">
                                <h1 id="titulo-index">Bienvenido a ScanExpence</h1>
                                <p id="texto-principal-index">Gestiona tus finanzas de manera sencilla y eficiente con ScanExpence. Nuestra plataforma te ofrece la herramienta perfecta para llevar un registro detallado de tus gastos, proporcionándote un control total sobre tus finanzas personales.</p>
                                <div id="container-texto-secundario-index"> 
                                    <div id="texto-secundario-index">
                                        <h2>Registro Fácil de Gastos</h2>
                                        <p>Nos enorgullece ofrecer un proceso de registro de gastos que es tan sencillo como útil. Olvídate de tediosas formas y complicados procedimientos; hemos diseñado una interfaz amigable que te permite ingresar tus gastos de manera rápida y eficiente. Ya sea que estés comprando comestibles, pagando facturas mensuales o registrando gastos inesperados, nuestro sistema simplifica el proceso. Solo necesitas unos pocos clics para ingresar la información esencial, como la cantidad gastada, la fecha y una breve descripción</p>
                                    </div>
                                    <img src="./img/primer-plano-persona-casa.jpg" alt="" id="img-index-horizontal">
                                </div>
                                <div id="container-texto-secundario-index"> 
                                    <img src="./img/mujer-joven-gafas-calcula-facturas.jpg" alt="" id="img-index-horizontal">
                                    <div id="texto-secundario-index">
                                        <h2>Categorización Inteligente:</h2>
                                        <p>Entendemos que organizar tus gastos puede ser un desafío. Es por eso que hemos implementado la Categorización Inteligente, una característica diseñada para simplificar y agilizar la gestión de tus finanzas personales. Cuando registras un gasto, nuestro sistema utiliza algoritmos avanzados para analizar la información y asignar automáticamente una categoría relevante.</p>
                                    </div>
                                </div>
                                <div id="container-texto-secundario-index"> 
                                    <div id="texto-secundario-index">
                                        <h2>Análisis Visual:</h2>
                                        <p>Creemos en la importancia de comprender tus finanzas de un vistazo. Es por eso que hemos incorporado una potente herramienta de Análisis Visual, diseñada para transformar tus datos financieros en representaciones gráficas claras y significativas. Una vez que hayas registrado tus gastos, nuestro sistema genera gráficos interactivos que visualizan tus patrones de gasto de manera intuitiva. Esta característica no solo hace que la gestión financiera sea más accesible, sino que también te empodera para tomar decisiones informadas. Ya sea planificando ahorros, ajustando tu presupuesto o estableciendo metas financieras, el Análisis Visual de ScanExpence te proporciona la claridad que necesitas para alcanzar el control total de tus finanzas. <b>¡Regístrate ahora y descubre el poder de visualizar tu camino hacia el éxito financiero!</b></p>
                                    </div>
                                    <img src="./img/oficinistas-graficos.jpg" alt="" id="img-index-vertical">
                                </div>
                            </div>
                            <footer id="footer">
                                <div id="container-texto-footer">
                                    <p>info@scanexpence.com.ar</p>
                                    <p>soporte@scanexpence.com.ar</p>
                                    <p>+54 9 11 3549-5743</p>
                                </div>
                                <div id="container-texto-footer">
                                    <a href="">Terminos y condiciones</a>
                                    <a href="">Politica de privacidad</a>
                                </div>
                            </footer>`

    // Creo los eventos
    document.getElementById("btnLogIn").addEventListener("click", logIn)
    document.getElementById("btnSignIn").addEventListener("click", signIn)
}

function signIn() {
    contenedor.innerHTML = `<h3>Completá el formulario para crear tu cuenta</h3>
                            <input id="username" placeholder="Nombre" required>    
                            <input id="password" placeholder="Password" required>

                            <button id="btnRegistrar">Registrarme</button>
                            <button id="btnVolver">Volver</button>`

    document.getElementById("btnRegistrar").addEventListener("click", crearCuenta)
    document.getElementById("btnVolver").addEventListener("click", mostrarInicio)
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
        usuario = new Usuario(username, password, [], [])
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
          
                            <button id="btnLogIn">Iniciar sesión</button>
                            <button id="btnVolver">Volver</button>`

    document.getElementById("btnLogIn").addEventListener("click", chequearCuenta)
    document.getElementById("btnVolver").addEventListener("click", mostrarInicio)
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
        usuario = new Usuario(loggedInUser.username, loggedInUser.password, loggedInUser.categorias, loggedInUser.gastos)
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
    let gastos = usuario.gastos
    let gastosHTML = ''

    if(gastos.length !== 0) {
        for (let gasto of gastos) {
            for (let clave in gasto) {
                gastosHTML += `<p>${clave}: $ ${gasto[clave]}</p>`
            }
        }
    }
    contenedor.innerHTML = `<h3>Bienvenido, ${usuario.username}!</h3>
                            <p>Elija una de las opciones para avanzar</p>
                            <p>Gastos Totales: $ ${usuario.gastoTotal}</p>
                            ${gastosHTML}
                            <button id="btnVerCat">Ver Categorías</button>
                            <button id="btnAgregarCat">Agregar categoría nueva</button>
                            <button id="btnAgregarGasto">Agregar gasto nuevo</button>
                            <button id="btnCerrarSesion">Cerrar sesión</button>`

    document.getElementById('btnVerCat').addEventListener('click', verCategorias)
    document.getElementById('btnAgregarCat').addEventListener('click', agregarCategoria)
    document.getElementById('btnAgregarGasto').addEventListener('click', agregarGasto)
    document.getElementById('btnCerrarSesion').addEventListener('click', () => {        
        confirm('¿Seguro queres salir?') && (localStorage.removeItem('usuarioLoggeado'), mostrarInicio())
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
        users[indexUsuarioLoggeado].gastos = usuario.gastos

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