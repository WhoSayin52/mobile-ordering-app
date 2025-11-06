import { menuArray } from './data.js'

const menuSection = document.querySelector('section.menu');
const orderSection = document.querySelector('section.order');
const selectedItems = document.querySelector('section.order .selected-items')
const totalPrice = document.querySelector('section.order .total .total-price')
const creditCardPayFormOverlay = document.querySelector('.card-details-form-overlay')
const creditCardPayForm = document.querySelector('form.card-details-form')
const thankYouText = document.querySelector('.thank-you-text')

let selectedItemsArr = getSelectedItemsArr(menuArray);
let totalItemCount = 0;

renderItems(menuArray)

document.addEventListener('click', (event) => {
	if (event.target.classList.contains('item-add-button')) {
		addItem(event.target.dataset.id);
	}
	else if (event.target.classList.contains('selected-item-remove-button')) {
		removeItem(event.target.dataset.id)
	}
	else if (event.target.classList.contains('complete-order-button')) {
		creditCardPayFormOverlay.style.display = "flex"
	}
	else if (event.target == creditCardPayFormOverlay) {
		creditCardPayFormOverlay.style.display = "none"
	}
})

creditCardPayForm.addEventListener('submit', (event) => {
	event.preventDefault();

	creditCardPayFormOverlay.style.display = "none";
	thankYouText.style.display = "block";

	selectedItemsArr.forEach((item) => {
		item.count = 0;
	});
	totalItemCount = 0;

	creditCardPayForm.reset();

	renderOrder()
})

function renderItems(items = menuArray) {
	menuSection.innerHTML = items.map((item) => {
		return createItemHTML(item)
	}).join('')
}

function createItemHTML(item) {
	const { name, ingredients, id, price, emoji } = item;
	return `
		<div class="item-card flex-row">
			<div class="item flex-row">
				<div class="item-icon">${emoji}</div>
				<div class="item-data flex-col">
					<h2 class="item-name">${name}</h2>
					<p class="item-ingredients">${ingredients.join(', ')}</p>
					<h3 class="item-price">${price}$</h3>
				</div>
			</div>
			<button class="item-add-button" data-id="${id}">+</button>
		</div>`
}

function createSelectedItemHTML(item) {
	const { id, name, price, count } = item;
	return `
	<div id="item${id}" class="selected-item flex-row">
		<div class=" flex-row">
				<h2>${name} x ${count}</h2>
				<button class="selected-item-remove-button" data-id="${id}">remove</button>
		</div>
		<h3>${price}$</h3>
	</div>`
}

function addItem(itemID) {
	if (itemID == undefined) {
		throw new Error("ERROR: undefined arguments")
	}

	++selectedItemsArr[itemID].count;
	++totalItemCount;

	renderOrder();
}

function removeItem(itemID) {
	if (itemID == undefined) {
		throw new Error("ERROR: undefined arguments")
	}

	--selectedItemsArr[itemID].count;
	--totalItemCount;

	renderOrder();
}

function renderOrder() {
	selectedItems.innerHTML = selectedItemsArr.map((item) => {
		if (item.count > 0) {
			return createSelectedItemHTML(item)
		}
	}).join('')

	totalPrice.textContent = `${selectedItemsArr.reduce((total, curr) => {
		return total += curr.price * curr.count;
	}, 0)}$`

	if (totalItemCount > 0) {
		thankYouText.style.display = "none";
		orderSection.style.display = 'flex';
	}
	else {
		orderSection.style.display = 'none'
	}
}

function getSelectedItemsArr(menuArr) {
	return menuArr.map((item) => {
		return {
			id: item.id,
			name: item.name,
			price: item.price,
			count: 0
		}
	})
}
