// Création tableau récapitulatif du panier
const panier = JSON.parse(localStorage.getItem('products'));
const tableau = document.getElementById("tableau-panier");
const formulaire = document.getElementById("formulaire"); 
let prixTotal = 0;
let productsIdArray = [];

const afficherFormulaire = function(){
    formulaire.style.display = "block";
}

const masquerFormulaire = function(){
    formulaire.style.display = "none";
}

const affichageTableau = function(){
    if (panier != null){
        afficherFormulaire();
        for (let i = 0; i < panier.length; i++) {
            let produit = panier[i];
            tableau.innerHTML += `
            <tr>
                <th scope="row">${1 + i}</th>
                <td>${produit.name} </td>
                <td> ${produit.quantity}</td>
                <td> ${(produit.price) / 100} €</td>
                <td>${produit.quantity * ((produit.price) / 100)} €</td>
            </tr>`;
            prixTotal = prixTotal += produit.quantity * ((produit.price) / 100);
            productsIdArray.push(panier[i].id);
        }
        tableau.innerHTML += `   
        <tr>
        <th scope="row"></th>
        <td class="text-right px-5" colspan="3"> Prix total:</td>
        <td> ${prixTotal}€ </td>
        </tr>`;
    }else {
        masquerFormulaire();
        tableau.innerHTML += `
        <tr><td colspan="5">
            <div class="alert alert-danger" role="alert">
            Votre pannier est vide!
            </div>
        </td></tr>`;
    }
}
affichageTableau();


// Fonction de vérification d'un champ du fomulaire avec un regex
const isValidInput = function (inputField, regex, invalidMessage) {
    const small = inputField.nextElementSibling;

    if (regex.test(inputField.value)) {
        small.innerHTML = 'Valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        inputField.style.borderColor = 'green';
        return true;
    } else if (!regex.test(inputField.value)) {
        small.innerHTML = invalidMessage;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        inputField.style.borderColor = 'red';
        return false;
    }
}

// Envoi du formulaire au back
const sendForm = function () {
    // Création de l'input , du regex et du message d'erreur pour chaque champs du formulaire
    const firstNameRegExp = new RegExp("^([A-Za-z]+)[' -]?([A-Za-z]+)$", "g");
    const firstNameImput = document.getElementById('prenom');
    const firstNameInvalidMessage = 'Invalide, ne peut contenir que des lettres ( seul un tiret, espace ou apostrophe autorisé)';
    
    const lastNameRegExp = new RegExp("^([A-Za-z]+)[' -]?([A-Za-z]+)$", "g");
    const lastNameImput = document.getElementById('nom');
    const lastNameInvalidMessage = 'Invalide, ne peut contenir que des lettres ( seul un tiret, espace ou apostrophe autorisé)';
    
    const adressRegExp = new RegExp("^([0-9]+) ([a-zA-Z,\. '-]+)$", "g");
    const adressImput = document.getElementById('adresse');
    const adressInvalidMessage = 'Invalide, doit commencer par le numéro de rue puis la rue';
    
    const cityRegExp = new RegExp("^([A-Za-z]+)[' -]?([A-Za-z]+)$", "g");
    const cityImput = document.getElementById('ville');
    const cityInvalidMessage = 'Invalide, ne peut contenir que des lettres ( seul un tiret, espace ou apostrophe autorisé)';
    
    const emailRegExp = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$', 'i');
    const emailImput = document.getElementById('email');
    const emailInvalidMessage = 'Invalide, doit correspondre à une adresse email valide';

    let isValidFirstName = isValidInput(firstNameImput, firstNameRegExp, firstNameInvalidMessage);
    let isValidLastName = isValidInput(lastNameImput, lastNameRegExp, lastNameInvalidMessage);
    let isValidAdress = isValidInput(adressImput, adressRegExp, adressInvalidMessage);
    let isValidCityName = isValidInput(cityImput, cityRegExp, cityInvalidMessage);
    let isValidEmail = isValidInput(emailImput, emailRegExp, emailInvalidMessage);

    let formContact = {};

    if (isValidFirstName && isValidLastName && isValidAdress && isValidCityName && isValidEmail && panier != null) {
        formContact = {
            firstName: firstNameImput.value.trim(),
            lastName: lastNameImput.value.trim(),
            address: adressImput.value.trim(),
            city: cityImput.value.trim(),
            email: emailImput.value.trim()
        };
        fetch('http://localhost:3000/API/cameras/order', {
            method: 'POST',
            body: JSON.stringify({ contact: formContact, products: productsIdArray }),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('orderId', JSON.stringify([data.orderId]));
            localStorage.setItem('totalPrice', JSON.stringify([prixTotal]));
            window.location.href = "confirmation.html";
        })
        .catch (function(error){
            console.log(error);
        })
    }else{
        console.error("Erreur lors de la confirmation");
    }
};
const confirmer = document.getElementById('confirmer');
confirmer.addEventListener('click', function (e) {
    e.preventDefault();
    sendForm();
})