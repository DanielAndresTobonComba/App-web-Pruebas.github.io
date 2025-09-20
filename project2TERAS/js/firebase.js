// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection , addDoc , doc, setDoc , getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALTRZJmDYRSKZVrEWhdyUrRAcaoCHI6WY",
  authDomain: "data-base-paga-tu-factura.firebaseapp.com",
  projectId: "data-base-paga-tu-factura",
  storageBucket: "data-base-paga-tu-factura.appspot.com",
  messagingSenderId: "1096077144976",
  appId: "1:1096077144976:web:502ff303d3145dad12f915"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); // Pass 'app' to getFirestore

export const guardar = (codigoFactura , proveedor , servicio) => {
  //addDoc(collection(db, "datos"), {codigoFactura , proveedor , servicio})

   setDoc(doc(db, servicio, codigoFactura), {
    Empresa: proveedor,
    Pagada: false})    
}

export const obtenerDatos = (servicio) => getDocs(collection(db , servicio))

export const actualizar = (id , nuevoValor , servicio) => updateDoc(doc(db, servicio, id) , nuevoValor)


//Obtener un documento especifico 
/* export const buscar = (codigoFactura, proveedor, servicio ) => {
  //addDoc(collection(db, 'Factura' ), { codigoFactura, proveedor });

// Add a new document in collection "Factura" 
//Crear un documento con un id propia
  setDoc(doc(db, "Factura", codigoFactura), {
  Empresa: proveedor,
  Fecha: "CA",
  Pagada: false
}); 


  leer(codigoFactura , proveedor , servicio)

}

async function leer(codigoFac , proveedor , servicio) {

  const docRef = doc(db, servicio, proveedor);
  const docSnap = await getDoc(docRef);

  const data = docSnap.data();

  console.log(data)

  const cod = data['codigoFactura'] 
  //const FechaPago = data['FechaPago']
  const pagado = data["Pagado"]

  console.log(data, cod , pagado) 

  if(cod == codigoFac && pagado == false){
    alert("Factura encontrada y pagada")

     setDoc(doc(db, servicio, proveedor), {
      codigoFactura: codigoFac,
      Pagada: true
    });

  }else if (cod == codigoFac && pagado == true){
    alert("La factura ya esta paga")
    
  }else {
    alert("La factura no existe")
  }


  for (const field in data) {
    const value = data[field];
    console.log(`${field}: ${value}`);
  }
  
    
  
}
 */

