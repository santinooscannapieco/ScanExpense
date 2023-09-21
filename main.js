// Datos de cuenta ya creada
let usuario1 = "cuenta1"
let contraseña1 = "123"


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
                    alert("No responde la pregunta" )
                    break
                case null:
                    flujo = "salir"
                    break
            }
            break
        case "signIn":
            alert("registrate")
            arraySignIn = signIn()
            flujo = "logIn"
            break
        case "logIn":
            alert("inicia sesion")
            arrayLogIn = logIn()
            
            respuesta = chequeoCuentas(arrayLogIn[0],arrayLogIn[1])
            if (respuesta == true) { flujo = "bienvenido"}else { flujo = "eleccion 1"}
            break
        case "bienvenido":
            alert("Bienvenido " + arrayLogIn[0])
            flujo = "salir"
            break
        
    }
}while (flujo != "salir")
