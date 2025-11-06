import { menuArray } from './data.js'

const menuSection = document.querySelector('section.menu');

function createItemHTML(item) {
	const { name, ingredients, id, price, emoji } = item;
	return `
		<div class="item-card flex-row">
			<div class="item flex-row">
				<div class="item-icon">${emoji}</div>
				<div class="item-data flex-col">
					<h2 class="item-name">${name}</h2>
					<p class="item-ingredients">${ingredients.join(', ')}</p>
					<h3 class="item-price">${price}</h3>
				</div>
			</div>
			<button class="item-add-button" data-id="${id}">+</button>
		</div>`
}

function render(items = menuArray) {
	menuSection.innerHTML = items.map((item) => {
		return createItemHTML(item)
	}).join('')
}

render(menuArray)
