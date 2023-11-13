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

let users
let usuario

logIn()

function logIn() {
    document.getElementById("btnVolver").addEventListener("click", () => { window.location.href = "../index.html" })
    document.getElementById("btnIniciarSesion").addEventListener("click", () => {
        chequearCuenta()
    })
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
          })
          Toast.fire({
            icon: "success",
            title: 'Inicio de sesión exitoso.'
          })

          

        
        window.location.href = "./inicio.html"
    } else if (loginUsername && loginPassword){
        mostrarAlert('error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.', 0)
    } else {
        mostrarAlert('warning', 'Completa los campos', 1000)
    }
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