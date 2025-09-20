import { guardar, obtenerDatos, actualizar } from './firebase.js'

window.addEventListener("DOMContentLoaded", async () => {

})




function showCustomAlert() {
    document.getElementById('customAlert').style.display = 'flex';
}

function hideCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
    location.reload()
}


/* let arregloLuz = ["Codensa", "Enel"]
let arregloAgua = ["Metropolitana", "Codensa"]
let arregloGas = ["Terpel", "Enel"] */

let arregloLuz = [{ "Codensa": { "link": "https://colombochilena.com/public/uploads/2015/12/logo-codensa.jpg" } }, { "Enel": { "link": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Enel_Group_logo.svg/1024px-Enel_Group_logo.svg.png" } }]

let arregloAgua = [{ "Metropolitana": { "link": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Logo_Metropolitane_Italia.svg" } }, { "Codensa": { "link": "https://colombochilena.com/public/uploads/2015/12/logo-codensa.jpg" } }]

let arregloGas = [{ "Terpel": { "link": "https://portalcolombia.terpel.com/static/images/terpel_logo_og.png" } }, { "Enel": { "link": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Enel_Group_logo.svg/1024px-Enel_Group_logo.svg.png" } }]

//PARA LA CONSULTA
let facturaCard = document.querySelector('.facturaCard')
const habilitar = () => facturaCard.classList.remove('probando')
const deshabilitar = () => facturaCard.classList.add('probando')
document.querySelector('.prueba').addEventListener("click", deshabilitar)

let cod = ""
let periodo = ""
let direccion = ""
let logo = ""
let valor = ""


//Variables globales 
let link = ""
let etiquetaImg = ""


const campoServicios = document.getElementById("tipoServicio")
const botonPagar = document.getElementById("botonPagar")
const botonConsultar = document.getElementById("botonConsultar")
const cerrarConsulta = document.getElementById("cerrarConsulta")
const cerrarDatosFactura = document.getElementById("cerrarDatosFactura")
const botonOk = document.getElementById("botonOk")


botonOk.addEventListener("click", async () => {
    hideCustomAlert()
})



cerrarConsulta.addEventListener("click", async () => {

    let contCodConsulta = document.getElementById("codigoFactura")
    contCodConsulta.value = ""


})

cerrarDatosFactura.addEventListener("click", async () => {


    let contenedorCodigo = document.getElementById("numeroFactura")
    let contenedorPeriodo = document.getElementById("periodoFacturado")
    let contenedorDirrec = document.getElementById("direccionDomicilio")
    let contenedorLogo = document.getElementById("logoEmpresa")
    let contenedorPagar = document.getElementById("totalPagar")


    contenedorCodigo.textContent = ""
    contenedorPeriodo.textContent = ""
    contenedorDirrec.textContent = ""
    contenedorPagar.textContent = ""
    contenedorLogo.innerHTML = ""


    deshabilitar()








})




campoServicios.addEventListener("click", async () => {

    let tipoServicio = document.getElementById("tipoServicio").value

    let opciones = ""

    let contenedor = document.getElementById("seccionProveedores")

    if (tipoServicio == "Agua") {

        for (const dato of arregloAgua) {
            // Obtener las llaves y valores de cada objeto
            for (const [llave, valor] of Object.entries(dato)) {
                console.log("Llave:", llave);
                console.log("Valor:", valor.link);
                opciones += ` <option>${llave}</option> `

            }
        }


        /* arregloAgua.forEach(empresa => {

            opciones += ` <option>${empresa}</option> `

        }) */


    } else if (tipoServicio == "Luz") {


        for (const dato of arregloLuz) {
            // Obtener las llaves y valores de cada objeto
            for (const [llave, valor] of Object.entries(dato)) {
                console.log("Llave:", llave);
                console.log("Valor:", valor.link);
                opciones += ` <option>${llave}</option> `

            }
        }

        /* arregloLuz.forEach(empresa => {

            opciones += ` <option>${empresa}</option> `

        }) */


    } else if (tipoServicio == "Gas") {


        for (const dato of arregloGas) {
            // Obtener las llaves y valores de cada objeto
            for (const [llave, valor] of Object.entries(dato)) {
                console.log("Llave:", llave);
                console.log("Valor:", valor.link);
                opciones += ` <option>${llave}</option> `

            }
        }

        /* arregloGas.forEach(empresa => {

            opciones += ` <option>${empresa}</option> `

        }) */

    }

    contenedor.innerHTML = opciones
})


botonConsultar.addEventListener("click", async (e) => {




    let tipoServicio = document.getElementById("tipoServicio").value
    let proveedor = document.getElementById("seccionProveedores").value
    let codigoFactura = document.getElementById("codigoFactura").value



    let existe = false

    console.log(tipoServicio, proveedor, codigoFactura)


    if (tipoServicio == "Agua") {

        for (const dato of arregloAgua) {
            // Obtener las llaves y valores de cada objeto
            for (const [llave, valor] of Object.entries(dato)) {
                if (llave == proveedor) {
                    link = valor.link
                    console.log("Llave:", llave);
                    console.log("Valor:", valor.link);
                }


            }
        }

    } else if (tipoServicio == "Luz") {

        for (const dato of arregloLuz) {
            // Obtener las llaves y valores de cada objeto
            for (const [llave, valor] of Object.entries(dato)) {
                if (llave == proveedor) {
                    link = valor.link
                    console.log("Llave:", llave);
                    console.log("Valor:", valor.link);
                }

            }
        }

    } else if (tipoServicio == "Gas") {

        for (const dato of arregloGas) {
            // Obtener las llaves y valores de cada objeto
            for (const [llave, valor] of Object.entries(dato)) {
                if (llave == proveedor) {
                    link = valor.link
                    console.log("Llave:", llave);
                    console.log("Valor:", valor.link);
                }
            }
        }

    }

    const datosObtenidos = await obtenerDatos(tipoServicio);

    datosObtenidos.forEach(async doc => {

        const datosFac = doc.data();

        let contenedorCodigo = document.getElementById("numeroFactura")
        let contenedorPeriodo = document.getElementById("periodoFacturado")
        let contenedorDirrec = document.getElementById("direccionDomicilio")
        let contenedorLogo = document.getElementById("logoEmpresa")
        let contenedorPagar = document.getElementById("totalPagar")
        let contenedorEstado = document.getElementById("estadoFactura")
        let botonPagar = document.getElementById("botonPagar")
        let etiquetaEstado = ""

        if (doc.id == codigoFactura && datosFac["Empresa"] == proveedor) {

            cod = doc.id
            periodo = datosFac["mesFact"]
            direccion = datosFac["direccion"]
            logo = datosFac["mesFact"]
            valor = datosFac["totalPago"]

            let estado = datosFac["Pagada"] ? "Pagado" : "Pendiente";
            if (estado == "Pendiente"){

                botonPagar.removeAttribute('disabled')
                etiquetaEstado = ` <p style="color: red;">${estado}</p>`
            } else {
                botonPagar.setAttribute('disabled', "true")
                etiquetaEstado = ` <p style="color: green;">${estado}</p>`
            }
            etiquetaImg = `
            <figure class="image is-128x128">
                <img class="logoEmpresa" src="${link}" alt="Logo de la empresa">
            </figure>`



            console.log("DATOS A FACTURA", cod, periodo, direccion, logo, valor);
            console.log(datosFac);
            console.log("Factura encontrada");



            contenedorCodigo.textContent = cod
            contenedorPeriodo.textContent = periodo
            contenedorDirrec.textContent = direccion
            contenedorPagar.textContent = new Intl.NumberFormat('es-MX').format(valor)
            contenedorLogo.innerHTML = etiquetaImg
            contenedorEstado.innerHTML = etiquetaEstado


            existe = true
            habilitar()
        }

    })


    if (existe === false) {
        deshabilitar()
        alert("La factura no existe o los datos son incorrectos")
    }

    e.preventDefault()

})

botonPagar.addEventListener("click", async (e) => {

    let tipoServicio = document.getElementById("tipoServicio").value
    let proveedor = document.getElementById("seccionProveedores").value
    let codigoFactura = document.getElementById("codigoFactura").value

    let existe = false


    e.preventDefault()


    if (codigoFactura == "" || proveedor == "" || tipoServicio == "") {
        alert("Datos invalidos")
        return

    } else {

        const datosObtenidos = await obtenerDatos(tipoServicio);

        datosObtenidos.forEach(async doc => {

            const datosFac = doc.data();

            if (doc.id == codigoFactura && datosFac["Empresa"] == proveedor) {
                console.log("ID:", doc.id);
                console.log(datosFac);
                console.log("Factura encontrada");
                existe = true

                if (!datosFac.Pagada) {
                    try {
                        await actualizar(doc.id, {
                            //Aqui solo es necesario colocar lo datos a modificar no todo el objeto de nuevo
                            Pagada: true,
                        }, tipoServicio);
                        showCustomAlert()

                        console.log("Factura pagada");




                    } catch (error) {
                        console.error("Error al actualizar la factura:", error);

                    }
                } else {
                    console.log("La factura ya está pagada");

                }
            }
        })

        if (!existe)
            alert("La factura no existe")

    }









    /* 

    //datos(codigoFactura , proveedor , servicio) 

    

    

     */



})

