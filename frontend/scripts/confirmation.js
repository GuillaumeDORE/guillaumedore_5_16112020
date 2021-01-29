// affichage du numero de commande
const orderId = JSON.parse(localStorage.getItem('orderId'));
const idCommande = document.getElementById('order_Id');
idCommande.innerText +=` ${orderId}`;

// Affichage du prix total
const totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
const prixTotal = document.getElementById('total_Price');
prixTotal.innerText +=` ${totalPrice}€`;


localStorage.clear();