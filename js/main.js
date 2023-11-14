class Usuario {
    constructor(username, password, categorias, gastos, moneda) {
        this.username = username
        this.password = password
        this.categorias = categorias
        this.gastoTotal = this.sumarGastoTotal(categorias)
        this.gastos = gastos
        this.moneda = moneda
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

let usuario

let traerUsuario = JSON.parse(localStorage.getItem("usuarioLoggeado")) || ''

traerUsuario === '' ? ( mostrarInicio() ) : ( usuario = new Usuario(traerUsuario.username, traerUsuario.password, traerUsuario.categorias, traerUsuario.gastos), window.location.href = "./pages/inicio.html" )

function mostrarInicio() {
    document.getElementById("btnLogIn").addEventListener("click", () => { window.location.href = "./pages/iniciar-sesion.html" })
    document.getElementById("btnSignIn").addEventListener("click", () => { window.location.href = "./pages/registro.html" })
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
        users[indexUsuarioLoggeado].moneda = usuario.moneda

        localStorage.setItem('users', JSON.stringify(users))
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