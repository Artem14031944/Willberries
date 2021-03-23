const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

// Cart 

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const modalClose = document.querySelector('.modal-close');
const modal = document.querySelector('#modal-cart');

const openModal = () => {
	modalCart.classList.add('show');
	return modal.style.display = 'flex'
}

const closeModal = () => {
	modalCart.classList.remove('show');
	return modal.style.display = 'none'
}

buttonCart.addEventListener('click', openModal);
modalClose.addEventListener('click',closeModal);
window.addEventListener('click', e => {
  if(e.target == modal) {
   return modal.style.display = 'none'
  }})


	// Scroll smooth

{
	const scrollLinks = document.querySelectorAll('a.scroll-link');

	for(let i = 0; i < scrollLinks.length; i++) {
			scrollLinks[i].addEventListener('click',  e => {
						e.preventDefault();
						const id = scrollLinks[i].getAttribute('href');
						document.querySelector(id).scrollIntoView({
								behavior: 'smooth',
								block: 'start',
					})
			});
			console.log(111)
	}

	}
