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

let traerUsuario = JSON.parse(localStorage.getItem("usuarioLoggeado")) || ''

let usuario = new Usuario(traerUsuario.username, traerUsuario.password, traerUsuario.categorias, traerUsuario.gastos)

mostrarMenu()

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

    let nombreUsuario = document.getElementById('nombre')
    nombreUsuario.innerHTML = `${usuario.username}`

    let gastoTotalUsuario = document.getElementById('gastoTotal')
    gastoTotalUsuario.innerHTML = `${usuario.gastoTotal}`

    let gastosUsuario = document.getElementById('gastos')
    gastosUsuario.innerHTML = `${gastosHTML}`

    document.getElementById('btnCerrarSesion').addEventListener('click', () => {        
        confirm('¿Seguro queres salir?') && (localStorage.removeItem('usuarioLoggeado'), window.location.href = "../index.html")
    })


    document.getElementById('btnVerCat').addEventListener('click', () => { window.location.href = "./ver-categorias.html" })
    document.getElementById('btnAgregarCat').addEventListener('click', () => { window.location.href = "./agregar-categoria.html" })
    document.getElementById('btnAgregarGasto').addEventListener('click', () => { window.location.href = "./agregar-gasto.html" })
    
}