const div = document.querySelector(".hamburgerAbout");
div.style.display = "none";
const error = document.querySelector(".food-error").innerHTML
//error.style.display = "none";

		
/*let menuPrice = document.querySelector(".menu-price").innerHTML;
let foodPrice = document.querySelector(".food-price")..value;
let quantity = document.querySelector(".food-quantity").value;
let error = document.querySelector(".error").innerHTML;
*/	
function foodPrice() {		
	let menuPrice = document.querySelector(".menu-price").innerHTML;
	let foodPrice = document.querySelector(".food-price");
	let quantityValue = document.querySelector(".food-quantity").value;
	let quantity = document.querySelector(".food-quantity");

 	foodPrice.value = (menuPrice * quantityValue);
	
	
	if (quantityValue <= 0) {
		 foodPrice.value = menuPrice; 
	} 
 	else {
		quantity.style.border = "none";
	}
}

function navBar() {
	const div = document.querySelector(".hamburgerMenu");
	const hamburger = document.querySelector(".hamburger");
	const iconClose = document.querySelector(".fa-times");

		iconClose.style.display = "inline-block";
		
		div.style.right = "0";
}



function navBarClose() {
	const div = document.querySelector(".hamburgerMenu");
	const hamburger = document.querySelector(".hamburger");
	const iconClose = document.querySelector(".fa-times");
	
		div.style.right = "-450px";
}


function product1() {
	const product1 = document.querySelector(".product1");
	const product2 = document.querySelector(".product2");
	const product3 = document.querySelector(".product3");
	const product4 = document.querySelector(".product4");
	const product = document.querySelector(".product-1");
	product.style.display = "none";
	product1.style.display = "block";
	product2.style.display = "none";
	product3.style.display = "none";
	product4.style.display = "none";
}

function product2() {
	const product1 = document.querySelector(".product1");
	const product2 = document.querySelector(".product2");
	const product3 = document.querySelector(".product3");
	const product4 = document.querySelector(".product4");
	const product = document.querySelector(".product-1");
	product.style.display = "none";
	product2.style.display = "block";
	product1.style.display = "none";
	product3.style.display = "none";
	product4.style.display = "none";
}
function product3() {
	const product1 = document.querySelector(".product1");
	const product2 = document.querySelector(".product2");
	const product3 = document.querySelector(".product3");
	const product4 = document.querySelector(".product4");
	const product = document.querySelector(".product-1");
	product.style.display = "none";
	product3.style.display = "block";
	product1.style.display = "none";
	product2.style.display = "none";
	product4.style.display = "none";
}
function product4() {
	const product1 = document.querySelector(".product1");
	const product2 = document.querySelector(".product2");
	const product3 = document.querySelector(".product3");
	const product4 = document.querySelector(".product4");
	const product = document.querySelector(".product-1");
	product.style.display = "none";
	product4.style.display = "block";
	product1.style.display = "none";
	product3.style.display = "none";
	product2.style.display = "none";
}

function plus() {
	const zero = document.querySelector(".zero");
	zero.value = Number(zero.value) + 1;
		
	let menuPrice = document.querySelector(".menu-price").innerHTML;
	let foodPrice = document.querySelector(".food-price");
	let quantityValue = document.querySelector(".food-quantity").value;
	let quantity = document.querySelector(".food-quantity");

 	foodPrice.value = (menuPrice * quantityValue);
	
	 if (quantityValue <= 0) {
		foodPrice.value = menuPrice; 
   } 
	else {
	   quantity.style.border = "none";
   }
}

function minus() {
	
	const zero = document.querySelector(".zero");
	zero.value = Number(zero.value) - 1;
	if (zero.value <= 0) {
		zero.value = 0;
	}
		
	let menuPrice = document.querySelector(".menu-price").innerHTML;
	let foodPrice = document.querySelector(".food-price");
	let quantityValue = document.querySelector(".food-quantity").value;
	let quantity = document.querySelector(".food-quantity");

 	foodPrice.value =  (menuPrice * quantityValue);
	
	 if (quantityValue <= 0) {
		foodPrice.value = menuPrice; 
   } 
	else {
	   quantity.style.border = "none";
   }
}

function addToCart() {
	const zero = document.querySelector(".zero");
	const cartImg2 = document.querySelector(".cart-img2");
	const cartImg = document.querySelector(".cart-img");
	zero.innerHTML = Number(zero.innerHTML);
	zero.innerHTML.style.position = "absolute";
	cartImg2.style.position = "relative";
	cartImg2.style.display = "block";
	cartImg.style.display = "none";
}