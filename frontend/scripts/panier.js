const panier = JSON.parse(localStorage.getItem('products'));
const tableau = document.getElementById("tableau-panier");
let prixTotal = 0
for (let i = 0; i < panier.length; i++ ){
    let produit = panier[i];
    tableau.innerHTML += `
    <tr>
        <th scope="row">${1+i}</th>
        <td>${produit.name} </td>
        <td> ${produit.quantity}</td>
        <td> ${(produit.price)/100} €</td>
        <td>${produit.quantity*((produit.price)/100)} €</td>
    </tr>`
    prixTotal = prixTotal += produit.quantity*((produit.price)/100)
}
tableau.innerHTML += `   
<tr>
<th scope="row"></th>
<td class="text-right px-5" colspan="3"> Prix total:</td>
<td> ${prixTotal}€ </td>
</tr>`
