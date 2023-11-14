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
                        usuario.gastoTotal = parseFloat( (usuario.gastoTotal * ARS).toFixed(2) )
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
                        if(categorias.length !== 0) {
                            for (let categoria of categorias) {
                                for (let clave in categoria) {
                                    categoria[clave] = parseFloat( (categoria[clave] * ARS).toFixed(2) )
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

agregarCategoria()

function agregarCategoria() {
    document.getElementById('btnInicio').addEventListener('click', () => { window.location.href = "./inicio.html" })
    document.getElementById('btnVerCat').addEventListener('click', () => { window.location.href = "./ver-categorias.html" })
    document.getElementById('btnAgregarGasto').addEventListener('click', () => { window.location.href = "./agregar-gasto.html" })
    document.getElementById('btnCerrarSesion').addEventListener('click', () => {        
        confirm('¿Seguro queres salir?') && (localStorage.removeItem('usuarioLoggeado'), window.location.href = "../index.html")
    })

    let monedaActual = document.getElementById('moneda-actual')
    monedaActual.innerHTML = `${usuario.moneda}`

    document.getElementById('crearCatBtn').addEventListener('click', function() {
        let nombreCat = document.getElementById('nombreCat').value
        let gastoCat = parseInt(document.getElementById('gastoCat').value)

        let categoriasGuardadas = usuario.categorias
        let existingCategorias = categoriasGuardadas.find( function(c) {
            return c[nombreCat] !== undefined
        })

        if (existingCategorias) {
            mostrarAlert('warning', 'Esa categoria ya existe', 1500)
            return
        }

        if (nombreCat && !isNaN(gastoCat)) {
            usuario.sumarCategoria(nombreCat, gastoCat)
            guardarLocalStorage('usuarioLoggeado', JSON.stringify(usuario))

            mostrarAlert('success', 'Categoría agregada correctamente', 2000)
        } else {
            mostrarAlert('warning', 'Completá todos los campos por favor', 1500)
        }
    })    
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