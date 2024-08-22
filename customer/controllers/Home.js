
let carouselData = [];
window.renderCarouselProduct = async function () {

    let htmlString = ''
    let carouselInner = document.querySelector('#banner-hero-carousel .carousel-inner');
    
    const response = await fetch('https://shop.cyberlearn.vn/api/Product');
    carouselData = await response.json();
    
    for(let product of carouselData.content){
        
        htmlString +=`
            <div class="carousel-item ${product.id === 1 ? 'active' : ''}">
                <div class="container">
                    <div class="row">
                        <div class="mx-auto col-md-8 col-lg-6">
                            <img class="img-fluid" src="${product.image}" alt="">
                        </div>
                        <div class="col-lg-6 mb-0 d-flex align-items-center">
                            <div class="text-align-left align-self-center">
                                <h1 class="h1 text-capitalize">${product.name}</h1>
                                <p>
                                ${product.shortDescription}
                                </p>
                                <a class="primary-btn" href="/detail.html?productID=${product.id}">Buy now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    if(carouselInner){
        carouselInner.innerHTML = htmlString;
    }

    return htmlString;
}
renderCarouselProduct();


let arrProduct = [];
window.renderFeaturedProduct = async function () {

    let htmlString = ''
    let productContainer = document.querySelector('#featured-product .product-list');
    
    const response = await fetch('https://shop.cyberlearn.vn/api/Product');
    arrProduct = await response.json();
    
    for(let product of arrProduct.content){
        htmlString +=`
            <div class="col-12 col-md-4 mb-4">
                <div class="card h-100">
                    <a href="shop-single.html">
                        <img src="${product.image}" class="card-img-top" alt="...">
                    </a>
                    <div class="card-body">
                        <h4><a href="shop-single.html" class="card-name">${product.name}</a></h4>
                        <p class="card-text">
                            ${product.shortDescription}
                        </p>
                    </div>
                    <div class="card-meta">
                        <a href="/detail.html?productID=${product.id}">
                            Buy now
                        </a>
                        <span>${product.price} $</span>
                    </div>
                </div>
            </div>
        `
    }
    if(productContainer){
        productContainer.innerHTML = htmlString;
    }

    if(arrProduct.length <= 0) {   
        document.querySelector('#ketQuaTimKiem').className = 'alert alert-success mt-2';
        document.querySelector('#ketQuaTimKiem').innerHTML = `Không có sản phẩm nào`;
    } 
    return htmlString;
}
renderFeaturedProduct();

