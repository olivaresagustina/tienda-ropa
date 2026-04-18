import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ropaRef = collection(db, "ropa");

// CREATE
window.guardarRopa = async () => {

let prenda = document.getElementById("prenda").value;
let categoria = document.getElementById("categoria").value;
let precio = document.getElementById("precio").value;
let stock = document.getElementById("stock").value;

await addDoc(ropaRef,{
prenda,
categoria,
precio,
stock
});

alert("Producto guardado");

mostrarRopa();
};

// READ
async function mostrarRopa(){

let lista = document.getElementById("listaRopa");
lista.innerHTML = "";

const datos = await getDocs(ropaRef);

datos.forEach((docu)=>{

let ropa = docu.data();

lista.innerHTML += `
<li>
${ropa.prenda} - ${ropa.categoria} - $${ropa.precio} - Stock: ${ropa.stock}

<button onclick="eliminarRopa('${docu.id}')">Eliminar</button>

<button onclick="editarRopa(
'${docu.id}',
'${ropa.prenda}',
'${ropa.categoria}',
'${ropa.precio}',
'${ropa.stock}'
)">Editar</button>

</li>
`;

});

}

// DELETE
window.eliminarRopa = async(id)=>{

await deleteDoc(doc(db,"ropa",id));

alert("Producto eliminado");

mostrarRopa();

}

// UPDATE
window.editarRopa = async(id,prenda,categoria,precio,stock)=>{

let nuevaPrenda = prompt("Prenda",prenda);
let nuevaCategoria = prompt("Categoría",categoria);
let nuevoPrecio = prompt("Precio",precio);
let nuevoStock = prompt("Stock",stock);

await updateDoc(doc(db,"ropa",id),{

prenda:nuevaPrenda,
categoria:nuevaCategoria,
precio:nuevoPrecio,
stock:nuevoStock

});

alert("Producto actualizado");

mostrarRopa();

}

mostrarRopa();