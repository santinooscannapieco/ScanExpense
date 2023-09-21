alert("La idea de la página es que se utilice para registrar los gastos diarios del usuario")

// Datos de cuenta ya creada
let usuario1 = "cuenta1"
let contraseña1 = "123"
let gastosTotales1 = 20152

// Funciones
function signIn() {
    let usuarioNuevo = prompt("Ingrese un usuario")
    let contraseñaNueva = prompt("Ingrese una contraseña")
    return [ usuarioNuevo, contraseñaNueva ]
}
function logIn() {
    let usuarioIngresado = prompt("Ingrese su usuario")
    let contraseñaIngresada = prompt("Ingrese su contraseña")
    return [ usuarioIngresado, contraseñaIngresada ]
}
function chequeoCuentas(usuarioIngresado, contraseñaIngresada) {
    let respuesta
    if ((usuarioIngresado == usuario1 && contraseñaIngresada == contraseña1) || (usuarioIngresado == arraySignIn[0] && contraseñaIngresada == arraySignIn[1])) {
        return respuesta = true
    }else {
        return respuesta = false
    }
}

let flujo = "eleccion 1"
let usuarioIngresado
let contraseñaIngresada
let usuario2
let contraseña2
let respuesta
let arraySignIn

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
            alert("Ingresá los siguientes datos para registrarte")
            arraySignIn = signIn()
            flujo = "logIn"
            break
        case "logIn":
            alert("Ingresá los siguientes datos para inicia sesion")
            arrayLogIn = logIn()
            
            respuesta = chequeoCuentas(arrayLogIn[0],arrayLogIn[1])
            if (respuesta == true) {
                 flujo = "bienvenido"
            }else { 
                alert("El usuario y contraseña no coinciden") 
                flujo = "eleccion 1"
            }
            break
        case "bienvenido":
            alert("Bienvenido " + arrayLogIn[0])
            flujo = "eleccion 2"
            break
        case "eleccion 2":
            let eleccion2 = prompt("Elegí que queres hacer\n1. Ver mis gastos\n2. Agregar nueva categoria\n3. Agregar nuevo gasto\n4. Cerrar sesión\n5. Salir")

            switch(eleccion2) {
                case "1":
                    // Ver gastos x categorias
                    alert("Hasta ahí tengo profe")
                    break
                case "2":
                    // Agregar categorias nuevas
                    alert("Hasta ahí tengo profe")
                    break
                case "3":
                    // agregar gasto nuevo
                    alert("Tengo hasta ahí profe")
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
            }
        break
        case "salir":
            //alert("¿Seguro que queres salir?")
            break
    }
}while (flujo != "salir")
