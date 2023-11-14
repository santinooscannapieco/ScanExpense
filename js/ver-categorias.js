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


let url = 'https://v6.exchangerate-api.com/v6/6eed10f6e4f651030ac76430/latest/USD'
let divisaSeleccionada

let gastoTotalUsuario
let gastosUsuario
let gastos
let categorias

fetch(url)
    .then((response) => response.json())
    .then((json) => {
        const { conversion_rates: {  ARS } } = json

        document.getElementById('divisas-btn').addEventListener('click', () => {
            divisaSeleccionada = document.getElementById('divisas').value

            switch (divisaSeleccionada) {
                case 'USD':
                    if (usuario.moneda === 'ARS') {
                        usuario.gastoTotal = parseFloat( (usuario.gastoTotal / ARS).toFixed(2) )
                        usuario.moneda = 'USD'

                        let monedaActual = document.getElementById('moneda-actual')
                        monedaActual.innerHTML = `${usuario.moneda}`

                        gastos = usuario.gastos
                        gastosHTML = ''

                        if(gastos.length !== 0) {
                            for (let gasto of gastos) {
                                for (let clave in gasto) {
                                    gasto[clave] = parseFloat( (gasto[clave] / ARS).toFixed(2) )
                                }
                            }
                        }
                        usuario.gastos = gastos

                        categorias = usuario.categorias
                        let categoriasHTML = ''
                        if(categorias.length !== 0) {
                            for (let categoria of categorias) {
                                for (let clave in categoria) {
                                    categoria[clave] = parseFloat( (categoria[clave] / ARS).toFixed(2) )
                                    categoriasHTML += `<div id="container-cat-gasto"><p>${clave}:</p><p>$ ${categoria[clave]}</p></div>`
                                }
                            }
                        }
                        usuario.categorias = categorias
                        let categoriasUsuario = document.getElementById("categorias")
                        categoriasUsuario.innerHTML = `${categoriasHTML}`

                        guardarLocalStorage('usuarioLoggeado', JSON.stringify(usuario))
                    }
                    break
                case 'ARS':
                    if (usuario.moneda === 'USD') {
                        usuario.gastoTotal = parseFloat( (usuario.gastoTotal * ARS, 2).toFixed(2) )
                        usuario.moneda = 'ARS'

                        let monedaActual = document.getElementById('moneda-actual')
                        monedaActual.innerHTML = `${usuario.moneda}`

                        gastos = usuario.gastos
            
                        if(gastos.length !== 0) {
                            for (let gasto of gastos) {
                                for (let clave in gasto) {
                                    gasto[clave] = parseFloat( (gasto[clave] * ARS).toFixed(2) )
                                }
                            }
                        }
                        usuario.gastos = gastos


                        categorias = usuario.categorias
                        let categoriasHTML = ''
                        
                        if(categorias.length !== 0) {
                            for (let categoria of categorias) {
                                for (let clave in categoria) {
                                    categoria[clave] = parseFloat( (categoria[clave] * ARS).toFixed(2) )
                                    categoriasHTML += `<div id="container-cat-gasto"><p>${clave}:</p><p>$ ${categoria[clave]}</p></div>`
                                }
                            }
                        }
                        usuario.categorias = categorias

                        let categoriasUsuario = document.getElementById("categorias")
                        categoriasUsuario.innerHTML = `${categoriasHTML}`

                        guardarLocalStorage('usuarioLoggeado', JSON.stringify(usuario)) 
                    }
                    break
            }
        })
    })



let traerUsuario = JSON.parse(localStorage.getItem("usuarioLoggeado")) || ''

let usuario = new Usuario(traerUsuario.username, traerUsuario.password, traerUsuario.categorias, traerUsuario.gastos, traerUsuario.moneda)

verCategorias()

function verCategorias() {
    document.getElementById('btnInicio').addEventListener('click', () => { window.location.href = "./inicio.html" })
    document.getElementById('btnAgregarCat').addEventListener('click', () => { window.location.href = "./agregar-categoria.html" })
    document.getElementById('btnAgregarGasto').addEventListener('click', () => { window.location.href = "./agregar-gasto.html" })
    document.getElementById('btnCerrarSesion').addEventListener('click', () => {        
        confirm('¿Seguro queres salir?') && (localStorage.removeItem('usuarioLoggeado'), window.location.href = "../index.html")
    })

    let monedaActual = document.getElementById('moneda-actual')
    monedaActual.innerHTML = `${usuario.moneda}`

    let categorias = usuario.categorias
    let categoriasHTML = ''

    if (categorias.length === 0) {
        mostrarAlert('warning', 'No tenes categorias creadas', 1000)
        return
    } else {
        for (let categoria of categorias) {
            for (let clave in categoria) {
                categoriasHTML += `<div id="container-cat-gasto"><p>${clave}:</p><p>$ ${categoria[clave]}</p></div>`
            }
        }
    }

    let categoriasUsuario = document.getElementById("categorias")
    categoriasUsuario.innerHTML = `${categoriasHTML}`
}

function guardarLocalStorage(clave,valor) {
    localStorage.setItem(clave, valor)

    let users = JSON.parse(localStorage.getItem('users')) || []
    let indexUsuarioLoggeado = users.findIndex( function(user) {
        return user.username === usuario.username
    })

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