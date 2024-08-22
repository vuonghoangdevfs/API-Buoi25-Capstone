
let productDetailData = [];
window.onload = async function(){
    let productDetailHtml = '';
    let relatedProductHTML = '';
    let productSizeHtml = '';
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get('productID');
    let productDetail = document.querySelector('#product-detail');
    let relatedProduct = document.querySelector('#related-product .product-list');

    if(productID){
        const response = await fetch(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${productID}`);
        productDetailData = await response.json();

        if(productDetailData.content){
            for(let size of productDetailData.content.size){
                productSizeHtml += `<li>${size}</li>`;
            }
            productDetailHtml += `
                <div class="container py-5">
                    <div class="row py-3">
                        <div class="col-lg-4">
                            <div class="product-image">
                                <a>
                                    <img src="${productDetailData.content.image}" alt="" />
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="product-info">
                                <h3 class="product-title mb-2">${productDetailData.content.name}</h3>
                                <p class="product-desc">${productDetailData.content.description}</p>
                                <h4 class="available-size">Available size</h4>
                                <ul class="product-size">
                                    ${productSizeHtml}
                                </ul>
                                <h4 class="product-price mb-4">${productDetailData.content.price} $</h4>
                                <div class="product-quantity mb-3">
                                    <span class="up">+</span>
                                        <input type="text" value="1">
                                    <span class="down">-</span>
                                </div>
                                <button class="primary-btn add-to-cart">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            for(let product of productDetailData.content.relatedProducts){
                relatedProductHTML += `
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

            if(productDetail){
                productDetail.innerHTML = productDetailHtml;
            }

            if(relatedProduct){
                relatedProduct.innerHTML = relatedProductHTML;
            }
        }
    }
}
