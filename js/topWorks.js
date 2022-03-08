const topWorksList = document.querySelector(".galery-main .list")
let topWorksJSON
topWorksJson()

function topWorksJson() {
	// fetch("/json/services.json")
	fetch("/json/topWorks.json")
		.then(response => response.json())
		.then(json => {
			topWorksJSON = json

			for (var i = 0; i < json.length; i++) {
				topWorksList.innerHTML += `
				<div class="list__item" tabindex="0" data-index="${i}" >
						<img src="${json[i].img}" alt="${json[i].name}">
						<div class="cont">
							<h2 class="name">${json[i].name}</h2>
							<p class="price">${json[i].price.value}${json[i].price.currency}.</p>
							<p class="date">${json[i].date}</p>
						</div>
					</div>
				`
			}


			const worksItems = topWorksList.querySelectorAll(".list__item")
			for (let i = 0; i < worksItems.length; i++) {
				worksItems[i].addEventListener('click', showPopupTopWorks)
			}
			// topWorksList.addEventListener("click", function (event) { // навешиваем один обработчик на родительский элемент
			// 	console.log(worksItems.indexOf(event.target)); // в свойстве `target` будет содержаться непосредственно тот элемент, по которому кликнули
			// });
		})
}


function showPopupTopWorks() {
	// console.log(this.dataset.index);
	// console.log(this);
	showPopup(topWorksJSON, this.dataset.index)

}