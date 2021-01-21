class Product {
  constructor(id, name, price, description, imageUrl, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
  }
}

class BasketManager {
  addProduct(product) {
    //si le produit n'est pas défini dans le localStorage on le créé
    if (localStorage.getItem('products') === null) {
      localStorage.setItem('products', JSON.stringify([product]));
    }
    //sinon on l'ajoute
    else {
      const products = JSON.parse(localStorage.getItem('products'));
      const produitFiltre = products.filter((test) => test.id == product.id);

      //si c'est le meme produit on additionne
      if (produitFiltre.length > 0) {
        produitFiltre[0].quantity++;
      }
      // sinon on rajoute le produit au tableau
      else {
        products.push(product);
      }

      // on sauvegarde les données
      localStorage.setItem('products', JSON.stringify(products));
    }
  }
}

let params = (new URL(document.location)).searchParams
let id = params.get('id')
let panier = new BasketManager();

// Affichage dynamique de la page produit en fonction du produit selectionner sur la page d'accueil
fetch(`http://localhost:3000/API/cameras/${id}`)
  .then(response => response.json())
  .then(function (pageProduit) {
    const camerahtml = document.getElementById("camera");
    camerahtml.innerHTML = `
<div class="col">
    <div class="card d-block w-100">
        <img src="${pageProduit.imageUrl}" alt="camera vintage" class="img-fluid">
        <div class="card-body px-5 mx-5">
            <h5 class="card-title">${pageProduit.name}</h5>
            <p class="card-tex">Prix: ${(pageProduit.price / 100)}€</p>
            <p class="card-text">${pageProduit.description}</p>
            <div class="dropup">
                <button class="btn btn-secondary dropdown-toggle my-3" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Choix de lentille
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div id="lenses">
                    </div>
                </div>
            </div>
            <a class="btn btn-success" href="#" id='ajoutPanier' role="button">Ajouter au panier</a>
        </div>
    </div>
</div>`
    const lenseFragment = document.getElementById('lenses')
    for (lense of pageProduit.lenses) {
      lenseFragment.innerHTML += `
    <a class="dropdown-item" href="#">${lense}</a>`;/*Affichage des lentilles de camera  */
    }

    // Ajout au panier 
    const ajoutPanier = document.getElementById('ajoutPanier');
    ajoutPanier.addEventListener('click', function (event) {
      event.preventDefault();
      const product = new Product(pageProduit._id, pageProduit.name, pageProduit.price, pageProduit.description, pageProduit.imageUrl, 1);
      panier.addProduct(product);
    })
  })
