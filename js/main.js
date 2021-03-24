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
	const scrollLinks = document.querySelectorAll('a.scroll-link' );

		for(const scrollLink of scrollLinks) {
				scrollLink.addEventListener('click',  e => {
							e.preventDefault();
							const id = scrollLink.getAttribute('href');
							document.querySelector(id).scrollIntoView({
									behavior: 'smooth',
									block: 'start',
					})
			});
		}
	}


		// Goods

const viewAll = document.querySelectorAll('.view-all');
const navigationLink = document.querySelectorAll('.navigation-link:not(.view-all)');
const longGoodsList = document.querySelector('.long-goods-list');
const showClothing = document.querySelectorAll('.show-clothing');
const showAccessories = document.querySelectorAll('.show-accessories');


const getGoods = async () => {
	const result = await fetch('db/db.json');
if(!result.ok) {
	throw `Ошибка: ${result.status}`
}
return result.json();
}

const createCard = ({ label, name, id, price, img, description }) => {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';


	card.innerHTML = `
  	<div class="goods-card">
		  ${label ?
			`<span class="label">${label}</span>` : '' }
			<img src="db/${img}" alt="${name}" class="goods-image">
			<h3 class="goods-title">${name}</h3>
			<p class="goods-description">${description}</p>
			<button class="button goods-card-btn add-to-cart" data-id="${id}">
					<span class="button-price">$${price}</span>
			</button>
    </div>
	`;

	return card;
};


const renderCards = data => {
	longGoodsList.textContent = '';
	const cards = data.map(createCard)
	longGoodsList.append(...cards)
	document.body.classList.add('show-goods')
}

const showAll = e => {
	e.preventDefault()
	getGoods().then(renderCards)
}

viewAll.forEach(elem => {
	elem.addEventListener('click', showAll)
});


const filterCards = (field, value) => {
	getGoods()
	.then(data => {
			return data.filter( good => {
				return good[field] === value;
			});
	})
	.then(renderCards);
};
navigationLink.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value)
	})
});


showClothing.forEach(i => {
	i.addEventListener('click', e  => {
		e.preventDefault();
		filterCards('category', 'Clothing');
	});
});

showAccessories.forEach(i => {
	i.addEventListener('click', e  => {
		e.preventDefault();
		filterCards('category', 'Accessories');
	});
});
