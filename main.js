

const precioUnitario=32000
const precioLista=35000
const stockMedidaCubiertas=['225/65/17', '225/70/15','265/10/16','195/70/15', '205/65/16']

let nombreApellido=''
let dni=0

let datosCliente=[
    {
    nombreApellido: 'PEPE PEREZ',
    dni: 12718765
    },
    {
    nombreApellido: 'SAMUEL JACKSON',
    dni: 9764312
    },
    {
        nombreApellido: 'ROQUE PEREZ',
        dni: 2764312
    }
]
let medidaCubiertas=''
let cantidadCubiertas=0
let formaPago=0
let descuentoUnPago=0
let usuarioRegistrado=false
let pedidoCompleto

// Function login usuario
const userLogin = (nombreYapellido, documentoIdentidad) => {
    for(let i=0;i<datosCliente.length;i++){
        if(datosCliente[i].dni===documentoIdentidad && datosCliente[i].nombreApellido===nombreYapellido){
            alert(`¡Bienvenido nuevamente, estimado ${nombreYapellido}!  Gracias por volver a elegirnos`)
            usuarioRegistrado=true  // cambia de false a true para indicar que los datos del usuario están en datosCliente
            return usuarioRegistrado // retorna true para poder seguir con el IF del bucle do-while
        } else if (datosCliente[i].dni===documentoIdentidad && datosCliente[i].nombreApellido!=nombreYapellido){
            alert(`¡El cliente con DNI ${documentoIdentidad} ya existe con el nombre y apellido ${datosCliente[i].nombreApellido}!  Por favor, verificar los datos ingresados`)
        }
    }
}

// function constructora pedido
function pedido(nombreApellido, dni, cantidadCubiertas, medidaCubiertas, formaPago) {
    this.nombreApellido=nombreApellido
    this.dni=dni
    this.cantidadCubiertas=cantidadCubiertas
    this.medidaCubiertas=medidaCubiertas
    this.formaPago=formaPago
    this.resultadoCompra=function () {
        let cuadroCompra=document.createElement("DIV")
        cuadroCompra.innerHTML=`<h2>Datos de su compra</h2><p>Nombre y apellido: ${this.nombreApellido}</p>DNI: ${this.dni}<p>Cantidad de cubiertas: ${this.cantidadCubiertas}</p>Medida de cubiertas: ${this.medidaCubiertas}<p>Forma de pago: ${this.formaPago}</p><p><strong>Total a pagar: </strong>${this.formaPago} pago(s) de $${pago(parseInt(formaPago))} (Descuento incluído de $${descuentoUnPago})</p>`
        document.querySelector('#contenedor').append(cuadroCompra)
    }
}

// Function para pago
function pago(cantCuotas) {
    if(cantCuotas>12){  // Control por si se ingresa más de 12 pagos
        alert('El plan de cuotas es válido sólo hasta 12 pagos.')
        precioTotal='No válido - Intente nuevamente'
    } else if(cantCuotas>1){  // Si es mayor a 1 cuota, automáticamente calcula pago de 2 a 12 cuotas sin interés a precio lista, según ingrese el user
        precioTotal=(precioLista*cantidadCubiertas)/cantCuotas
    } else if (cantidadCubiertas<=0){
        alert('Por favor, ingrese un número valido de cantidad de cubiertas') // Control por si se ingresa una cantidad = o < a cero
    } else{  //  Una cuota o pago efectivo con 5% de descuento
        descuentoUnPago=(precioUnitario*cantidadCubiertas*0.05)
        precioTotal=(precioUnitario*cantidadCubiertas)-descuentoUnPago
    }

    return precioTotal
}

do{
    // Pedido de datos al user
    
    nombreApellido=prompt('Nombre y apellido: ').toUpperCase()  // Transforma el prompt a uppercase para evitar duplicados por distintas formas de ingreso
    dni=parseInt(prompt('DNI: '))
    
    userLogin(nombreApellido, dni)  // Function login

    if (usuarioRegistrado){  // si usuarioRegistrado es true, sigue con el proceso de compra
        cantidadCubiertas=parseInt(prompt('Cantidad cubiertas: '))
        if (cantidadCubiertas >= 10) {  // Si quiero comprar 10 o más, pide preguntar por stock
            alert('Por favor, consulte stock antes de continuar')
            break
        }
        medidaCubiertas=prompt('Medida (ingresar con este formato: 225/65/17): ')
        if (!stockMedidaCubiertas.includes(medidaCubiertas)){
            alert('Disculpe, actualmente no contamos con stock de la medida solicitada')  //  Verifica en el array de stock de medidas de cubiertas si existe la medida solicitada
            break
        }
        formaPago=prompt('Formas de pago: \n * Efectivo o 1 pago, ingrese "1" (5% descuento) \n * Precio lista hasta 12 cuotas sin interés (ingrese de 2 a 12 cuotas): ')

        // Nueva compra
        const compra=new pedido(nombreApellido, dni, cantidadCubiertas, medidaCubiertas, formaPago)

        // Resultado de la compra en pantalla
        compra.resultadoCompra()

        pedidoCompleto=prompt('¿Realizar nueva compra? (SI/NO): ')
        descuentoUnPago=0  // Reset a cero del descuento para que no aparezca el valor que quedó en memoria si hubo descuento por un pago
        usuarioRegistrado=false  // reset usuarioRegistado
    } else{
        let opcionRegistro=parseInt(prompt("Usuario no encontrado, puede registrarse temporalmente para comprar. \nRegistrarse (1) / No registrarse (2): "))  // si no se encuentra el usuario (false) en el array, pide registrarse temporalmente
        switch (opcionRegistro) {
            case 1:
                datosCliente.push({"nombreApellido": nombreApellido, "dni": dni})
                console.log(datosCliente)
                alert(`Bienvenido ${nombreApellido}, por favor vuelva a ingresar con sus datos`)
                pedidoCompleto="SI" // Le paso el valor "SI" para que no saga del bucle y no se borren los datos temporales
                break;
            default:
                pedidoCompleto="NO"  //  Acá asigno "NO" a pedidoCompleto para prevenir que quede siempre pidiendo los datos si me olvide del usuario que puse o me equivoque en los datos y no quiero seguir
                break;
        }
    }

} while (pedidoCompleto.toUpperCase() != "NO" && pedidoCompleto.length != 0 )  //  Uso toUpperCase para salir del bucle si el user emplea "NO" o "no".  También sale dejando el campo vacío (length = 0)

