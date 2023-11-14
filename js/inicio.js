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

/*          TRAER PRECIO DOLAR            */
let url = 'https://v6.exchangerate-api.com/v6/6eed10f6e4f651030ac76430/latest/USD'
let divisaSeleccionada

let gastoTotalUsuario
let gastosUsuario

fetch(url)
    .then((response) => response.json())
    .then((json) => {
        const { conversion_rates: { ARS } } = json

        document.getElementById('divisas-btn').addEventListener('click', () => {
            divisaSeleccionada = document.getElementById('divisas').value

            switch (divisaSeleccionada) {
                case 'USD':
                    if (usuario.moneda === 'ARS') {
                        usuario.gastoTotal = parseFloat( (usuario.gastoTotal / ARS).toFixed(2) )
                        usuario.moneda = 'USD'

                        let monedaActual = document.getElementById('moneda-actual')
                        monedaActual.innerHTML = `${usuario.moneda}`

                        gastoTotalUsuario = document.getElementById('gastoTotal')
                        gastoTotalUsuario.innerHTML = `${usuario.gastoTotal}`


                        gastos = usuario.gastos
                        gastosHTML = ''
            
                        if(gastos.length !== 0) {
                            for (let gasto of gastos) {
                                for (let clave in gasto) {
                                    gasto[clave] = parseFloat( (gasto[clave] / ARS).toFixed(2) )
                                    gastosHTML += `<div id="container-cat-gasto"><p>${clave}: </p><p>$ ${gasto[clave]}</p></div>`
                                }
                            }
                        }
                        usuario.gastos = gastos
                        gastosUsuario = document.getElementById('gastos')
                        gastosUsuario.innerHTML = `${gastosHTML}`


                        categorias = usuario.categorias
                        if(categorias.length !== 0) {
                            for (let categoria of categorias) {
                                for (let clave in categoria) {
                                    categoria[clave] = parseFloat( (categoria[clave] / ARS).toFixed(2) )
                                }
                            }
                        }
                        usuario.categorias = categorias

                        guardarLocalStorage('usuarioLoggeado', JSON.stringify(usuario))
                    }
                    break
                case 'ARS':
                    if (usuario.moneda === 'USD') {
                        usuario.gastoTotal = parseInt(usuario.gastoTotal * ARS )
                        usuario.moneda = 'ARS'

                        let monedaActual = document.getElementById('moneda-actual')
                        monedaActual.innerHTML = `${usuario.moneda}`
                        
                        gastoTotalUsuario = document.getElementById('gastoTotal')
                        gastoTotalUsuario.innerHTML = `${usuario.gastoTotal}`

                        gastos = usuario.gastos
                        gastosHTML = ''
            
                        if(gastos.length !== 0) {
                            for (let gasto of gastos) {
                                for (let clave in gasto) {
                                    gasto[clave] = parseInt(gasto[clave] * ARS)
                                    gastosHTML += `<div id="container-cat-gasto"><p>${clave}: </p><p>$ ${gasto[clave]}</p></div>`
                                }
                            }
                        }

                        usuario.gastos = gastos
                        gastosUsuario = document.getElementById('gastos')
                        gastosUsuario.innerHTML = `${gastosHTML}`


                        categorias = usuario.categorias
                        if(categorias.length !== 0) {
                            for (let categoria of categorias) {
                                for (let clave in categoria) {
                                    categoria[clave] = parseInt(categoria[clave] * ARS)
                                }
                            }
                        }
                        usuario.categorias = categorias

                        guardarLocalStorage('usuarioLoggeado', JSON.stringify(usuario)) 
                    }
                    break
            }
        })

        
    
    })

let traerUsuario = JSON.parse(localStorage.getItem("usuarioLoggeado")) || ''

let usuario = new Usuario(traerUsuario.username, traerUsuario.password, traerUsuario.categorias, traerUsuario.gastos, traerUsuario.moneda)

mostrarMenu()

function mostrarMenu() {
    document.getElementById('btnVerCat').addEventListener('click', () => { window.location.href = "./ver-categorias.html" })
    document.getElementById('btnAgregarCat').addEventListener('click', () => { window.location.href = "./agregar-categoria.html" })
    document.getElementById('btnAgregarGasto').addEventListener('click', () => { window.location.href = "./agregar-gasto.html" })
    document.getElementById('btnCerrarSesion').addEventListener('click', () => {        
        confirm('¿Seguro queres salir?') && (localStorage.removeItem('usuarioLoggeado'), window.location.href = "../index.html")
    })

    let monedaActual = document.getElementById('moneda-actual')
    monedaActual.innerHTML = `${usuario.moneda}`

    let gastos = usuario.gastos
    let gastosHTML = ''

    gastos.reverse()

    if(gastos.length !== 0) {
        for (let gasto of gastos) {
            for (let clave in gasto) {
                gastosHTML += `<div id="container-cat-gasto"><p>${clave}: </p><p>$ ${gasto[clave]}</p></div>`
            }
        }
    }

    let nombreUsuario = document.getElementById('nombre')
    nombreUsuario.innerHTML = `${usuario.username}`

    gastoTotalUsuario = document.getElementById('gastoTotal')
    gastoTotalUsuario.innerHTML = `${usuario.gastoTotal}`

    gastosUsuario = document.getElementById('gastos')
    gastosUsuario.innerHTML = `${gastosHTML}`
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



