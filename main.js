alert(`La página es para que el usuario registre sus gastos diarios
Usuarios disponibles:
cuenta1 123
cuenta2 047`)

// Clase Usuario con sus metodos
class Usuario {
    constructor(nombre, password, categorias, gastos) {
        this.nombre = nombre
        this.password = password
        this.categorias = categorias
        this.gastoTotal = gastos
        
    }

    sumarCategoria(newCategoria) {
        this.categorias.push(newCategoria)
        console.log(this.categorias)
    }
    restarCategoria() {    }

    sumarGasto(newGasto) {
        this.gastoTotal += newGasto
    }
    restarGasto() {    }
}


// Datos de cuentas ya creada
const cuenta1 = new Usuario("cuenta1", "123", ["Comida", "Regalos"], 20152)
const cuenta2 = new Usuario("cuenta2", "047", ["Salidas", "Ropa"], 52000)


// Funciones
function signIn() {
    let usuarioNuevo = prompt("Ingrese un usuario")
    let contraseñaNueva = prompt("Ingrese una contraseña")

    return new Usuario(usuarioNuevo, contraseñaNueva, [], 0)
}
function logIn() {
    let usuarioIngresado = prompt("Ingrese su usuario")
    let contraseñaIngresada = prompt("Ingrese su contraseña")
    return [ usuarioIngresado, contraseñaIngresada ]
}
function chequeoCuentas(usuarioIngresado, contraseñaIngresada) {
    if (usuarioIngresado === cuenta1.nombre && contraseñaIngresada === cuenta1.password) {
        user = cuenta1
        return [ true, user ]
    }else if(usuarioIngresado === cuenta2.nombre && contraseñaIngresada === cuenta2.password) {
        user = cuenta2
        return [ true, user ]
    }else {
        return [ false ]
    }


    /* else if(usuarioIngresado === arraySignIn.nombre && contraseñaIngresada === arraySignIn.password){
        
    } */
}

let flujo = "eleccion 1"
let usuarioIngresado
let contraseñaIngresada
let usuario2
let contraseña2
let respuesta
let arraySignIn
let arrayLogIn

let user

do {
    switch (flujo) {
        case "eleccion 1":
            // Elegir entre iniciar sesión o registrarse
            let eleccion1 = prompt("Elegir 1 o 2\n1. Registrarse\n2. Iniciar sesion")
            switch (eleccion1) {
                case "1":
                    flujo = "signIn"
                    break
                case "2":
                    flujo = "logIn"
                    break
                default:
                    alert("No responde la pregunta")
                    break
                case null:
                    flujo = "salir"
                    break
            }
            break
        case "signIn":
            /* alert("Ingresá los siguientes datos para registrarte")
            arraySignIn = signIn() 
            flujo = "logIn" */

            alert("Todavía no está disponible hacer un nuevo registro")

            flujo = "eleccion 1"
            break
        case "logIn":
            alert("Ingresá los siguientes datos para inicia sesion")
            arrayLogIn = logIn()
            
            // Mando usuario ingresado y contraseña ingresada y recibo en respuesta[0] si la cuenta existe y en respuesta[1] el usuario con todos los datos
            respuesta = chequeoCuentas(arrayLogIn[0], arrayLogIn[1])
            if (respuesta[0] == true) {
                flujo = "bienvenido"
            }else { 
                alert("El usuario y contraseña no coinciden") 
                flujo = "eleccion 1"
            }
            user = respuesta[1]
            break
        case "bienvenido":
            alert("Bienvenido " + user.nombre)
            flujo = "eleccion 2"
            break
        case "eleccion 2":
            let eleccion2 = prompt(`Elegí que queres hacer ${user.nombre} \n1. Ver mis gastos\n2. Agregar nueva categoria\n3. Agregar nuevo gasto\n4. Cerrar sesión\n5. Salir`)

            switch(eleccion2) {
                case "1":
                    // Ver gastos x categorias
                    alert("$" + user.gastoTotal)
                    break
                case "2":
                    // Ver categorias
                    // Agregar categorias nuevas
                    cadena = user.categorias.join("\n")
                    newCategoria = prompt( cadena )

                    if (newCategoria != "" && newCategoria != null) {
                        user.sumarCategoria(newCategoria)
                    }else {
                        alert("No completaste el campo")
                    }
                    break
                case "3":
                    // Agregar gasto nuevo
                    // PROXIMA ENTREGA: AGREGAR QUE EL GASTO SE PONGA A UNA CATEGORIA ESPECÍFICA
                    newGasto = parseInt(prompt("Agregar gasto nuevo"))
                    console.log(newGasto)
                    if(newGasto > 0 && newGasto < 500000) {
                        user.sumarGasto(newGasto)
                    }else {
                        alert("Ese monto no está disponible")
                    }
                    break
                case "4":
                    // cerrar sesion
                    flujo = "eleccion 1"
                    break
                case "5":
                    // salir
                    flujo = "salir"
                    break
                default:
                    alert("No responde la pregunta")
                    break
                case null:
                    flujo = "salir"
                    break
            }
        break
        case "salir":
            //alert("¿Seguro que queres salir?")
            break
    }
}while (flujo != "salir")