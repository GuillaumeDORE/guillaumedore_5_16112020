fetch("http://localhost:3000/API/cameras")
.then(function(response){
    return response.json();
})
.then(function(products){
    const producthtml = document.getElementById("products")
    for(product of products){
        console.log(product)
        producthtml.innerHTML += `
        <div class="col-12 col-lg-4">
                <div class="card text-center border-dark shadow">
                    <img src="${product.imageUrl}" alt="camera vintage" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>                        
                        <a class="btn btn-info" href="pages/cam1.html" role="button">Info produit</a>
                    </div>
                </div>
            </div>
        `
    }
})