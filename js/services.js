const servicesList = document.querySelector(".services .list")
let servicesJSON
servicesJson()

function servicesJson() {
	fetch("/SoloBarber/json/services.json")
		.then(response => response.json())
		.then(json => {
			servicesJSON = json
			let subName = discount = ''
			for (var i = 0; i < json.length; i++) {
				subName = discount = ''
				if (json[i].subName) {
					subName = `<span class="description">${json[i].subName}</span></p>`
				}
				if (json[i].discount) {
					discount = `<span class="discount">Знижка</span>`
				}

				servicesList.innerHTML += `
				<label class="list__item" tabindex="0" for="serv-${i}" data-index="${i}">
					<p class="name">${json[i].name} ${subName}</p>
					${discount}
					<span class="price" data-currency="${json[i].price.currency}.">${json[i].price.value}</span>
				</label>	
				`
			}


			const servicesItems = servicesList.querySelectorAll(".list__item")
			for (let i = 0; i < servicesItems.length; i++) {
				servicesItems[i].addEventListener('click', showPopupServices)
			}

		})
}


function showPopupServices() {
	// console.log(this.dataset.index);
	// console.log(this);
	showPopup(servicesJSON, this.dataset.index)
}