import {auth,db} from './firebase.js';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {collection,addDoc,onSnapshot,doc,setDoc,getDoc} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const adminEmail='admin@gmail.com';
let cart=[];

window.registerUser=async()=>{
 const email=emailEl('email').value,password=emailEl('password').value;
 const cred=await createUserWithEmailAndPassword(auth,email,password);
 await setDoc(doc(db,'usuarios',cred.user.uid),{email,rol:email===adminEmail?'admin':'cliente'});
 alert('Registrado');
}
window.loginUser=async()=>{
 const email=emailEl('email').value,password=emailEl('password').value;
 await signInWithEmailAndPassword(auth,email,password);
}
function emailEl(id){return document.getElementById(id)}

onAuthStateChanged(auth, async(user)=>{
 const ub=document.getElementById('userBox');
 if(user){
   ub.innerHTML=`${user.email} <button onclick="logoutUser()">Salir</button>`;
   const snap=await getDoc(doc(db,'usuarios',user.uid));
   const rol=snap.exists()?snap.data().rol:'cliente';
   document.getElementById('adminPanel').classList.toggle('hidden',rol!=='admin');
 } else {
   ub.innerHTML='';
   document.getElementById('adminPanel').classList.add('hidden');
 }
});

window.logoutUser=()=>signOut(auth);

window.addProduct=async()=>{
 await addDoc(collection(db,'ropa'),{nombre:emailEl('pn').value,precio:Number(emailEl('pp').value)});
}

onSnapshot(collection(db,'ropa'),(qs)=>{
 const box=document.getElementById('products'); box.innerHTML='';
 qs.forEach(d=>{
   const p=d.data();
   box.innerHTML+=`<div class='card'><b>${p.nombre}</b><p>$${p.precio}</p><button onclick='addCart(${JSON.stringify(p).replace(/"/g,'&quot;')})'>Comprar</button></div>`;
 });
});

window.addCart=(p)=>{cart.push(p);renderCart();}
function renderCart(){document.getElementById('cart').innerHTML=cart.map(x=>x.nombre+' $'+x.precio).join('<br>')}
window.checkout=async()=>{
 const user=auth.currentUser;
 if(!user){alert('Inicia sesión');return;}
 await addDoc(collection(db,'pedidos'),{usuario:user.email,items:cart,fecha:new Date().toISOString()});
 cart=[];renderCart();alert('Pedido guardado');
}
