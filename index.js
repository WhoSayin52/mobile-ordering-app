import { menuArray } from './data.js'

const menuSection = document.querySelector('section.menu');
const orderSection = document.querySelector('section.order');
const selectedItems = document.querySelector('section.order .selected-items')
const totalPrice = document.querySelector('section.order .total .total-price')

let selectedItemsArr = getSelectedItemsArr(menuArray);
let totalItemCount = 0;

document.addEventListener('click', (event) => {
	console.log(event)
	if (event.target.className === 'item-add-button') {
		addItem(event.target.dataset.id);
	}

	if (event.target.className === 'selected-item-remove-button') {
		removeItem(event.target.dataset.id)
	}

	if (event.target.className === 'complete-order-button') {

	}
})

render(menuArray)

function render(items = menuArray) {
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

	processOrderHTML();
}

function removeItem(itemID) {
	if (itemID == undefined) {
		throw new Error("ERROR: undefined arguments")
	}

	--selectedItemsArr[itemID].count;
	--totalItemCount;

	processOrderHTML();
}

function processOrderHTML() {
	selectedItems.innerHTML = selectedItemsArr.map((item) => {
		if (item.count > 0) {
			return createSelectedItemHTML(item)
		}
	}).join('')

	totalPrice.textContent = `${selectedItemsArr.reduce((total, curr) => {
		return total += curr.price * curr.count;
	}, 0)}$`

	if (totalItemCount > 0) {
		orderSection.style.display = 'flex';
	}
	else {
		orderSection.style.display = 'none'
	}

	render(menuArray)
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
