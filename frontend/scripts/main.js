// Affichage dynamique des produits sous forme de carte 
fetch("http://localhost:3000/API/cameras")
.then(function (response) {
    return response.json();
})
.then(function (products) {
    const producthtml = document.getElementById("products")
    for (product of products) {
        producthtml.innerHTML += `
    <div class="col-12 col-lg-4 my-3" id="${product._id}">
            <div class="card text-center border-dark shadow">
                <img src="${product.imageUrl}" alt="camera vintage" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>                        
                    <a class="btn btn-info" href="pages/detail.html?id=${product._id}" role="button">Info produit</a>
                </div>
            </div>
        </div>
    `
    }
})
