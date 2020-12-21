let params = (new URL(document.location)).searchParams
let id = params.get('id')

fetch(`http://localhost:3000/API/cameras/${id}`)
.then(response => response.json())
.then( function (pageProduit){
    console.log(pageProduit)
    const camerahtml = document.getElementById("camera")
    camerahtml.innerHTML = `
    <div class="col">
        <div class="card d-block w-100">
            <img src="${pageProduit.imageUrl}" alt="camera vintage" class="img-fluid">
            <div class="card-body px-5 mx-5">
                <h5 class="card-title">${pageProduit.name}</h5>
                <p class="card-tex">Prix: ${(pageProduit.price /100)}€</p>
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
                <a class="btn btn-success" href="panier.html" role="button">Ajouter au panier</a>
            </div>
        </div>
    </div>`
    console.log(pageProduit.lenses)
    const lenseFragment = document.getElementById('lenses')
    for( lense of pageProduit.lenses){
        lenseFragment.innerHTML += `
        <a class="dropdown-item" href="#">${lense}</a>`
    }
})
