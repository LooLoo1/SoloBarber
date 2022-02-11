function showPopup(json, index) {

	if (!json[index].img && !json[index].imgList) {
		return false
	}

	document.body.classList.add("noscroll")
	if (document.querySelector('.popup') === null) {
		let pop = document.createElement('div')
		pop.className = "popup";
		document.body.append(pop)
	}

	const popupEl = document.querySelector('.popup')
	// console.log(popupEl);
	let imgList = date = arrows = list = ''

	// console.log(json[index]);
	if (json[index].date) {
		date = `<p class="date">${json[index].date}</p>`
	}
	if (json[index].img) {
		imgList = `<div class="popup__slider">
			<img class="popup__slider-item active" src="${json[index].img}" alt="${json[index].name}">
		</div>`
	}
	if (json[index].imgList) {
		// console.log(json[index].imgList.length);
		if (json[index].imgList.length > 1) {
			arrows = `<div class="arrows">
				<div class="arrows__item prev" tabindex="0"></div>
				<div class="arrows__item next" tabindex="0"></div>
			</div>`
			popupEl.classList.add('list')
		}
		imgList = `<div class="popup__slider">`
		for (let i = 0; i < json[index].imgList.length; i++) {
			let active = (i == 0) ? `active` : ``
			imgList += `<img class="popup__slider-item ${active}" src="${json[index].imgList[i]}" onClick="reSize(this)" alt="${json[index].name}-${i}">`
		}
		imgList += `</div>`
	} else {
		popupEl.classList.remove('list')
	}

	popupEl.innerHTML = `
		${imgList}
		<h2 class="name visible" onClick="disappearance(this)">${json[index].name}</h2>
		<p class="price" data-currency="${json[index].price.currency}.">${json[index].price.value}</p>
		${date}
		${arrows}
		<button class="close"></button>
`
	popupEl.querySelector('.close').addEventListener('click', () => {
		popupEl.classList.remove('visible')
		popupEl.classList.add('hidden')
		document.body.classList.remove("noscroll")
	})

	if (json[index].imgList && json[index].imgList.length > 1) {
		let imgListEl = popupEl.querySelectorAll('.popup__slider .popup__slider-item')
		let numberActive = 0
		popupEl.querySelector('.arrows .arrows__item.prev').addEventListener('click', () => {
			numberActive -= 1
			changeSlider()
		})
		popupEl.querySelector('.arrows .arrows__item.next').addEventListener('click', () => {
			numberActive += 1
			changeSlider()
		})
		function changeSlider() {
			numberActive = numberActive >= imgListEl.length ? 0 : numberActive
			numberActive = numberActive < 0 ? imgListEl.length - 1 : numberActive
			imgListEl.forEach(e => {
				e.classList.remove('active')
			})
			imgListEl[numberActive].classList.add('active')
		}
	}



	setTimeout(() => {
		popupEl.classList.add('visible')
		popupEl.classList.remove('hidden')

	}, 1)
}

function disappearance(e) {
	setTimeout(() => {
		e.classList.toggle('visible')
		e.classList.toggle('hidden')
	}, 1)
}


function reSize(e) {
	setTimeout(() => {
		// e.classList.toggle('visible')
		e.classList.toggle('re-size')
	}, 1)
}