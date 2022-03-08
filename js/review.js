const reviewsButton = document.querySelector(".reveal")
const reviewsList = document.querySelector(".reviews__list")
function reviewsAdd() {
	fetch("/json/reviews.json")
		.then(response => response.json())
		.then(json => {
			// console.log(json)
			if (json.length - numberReviews >= 4) c = 4
			else c = json.length - numberReviews
			// console.log(numberReviews, c);
			for (let i = 0; i < c; i++) {
				numberReviews++
				// console.log(json[i]);
				reviewsList.innerHTML += `
			<div class="reviews__item" tabindex="0">
			<img src="${json[numberReviews - 1].IMGwork}" alt="Стрижка">
				<img src="${json[numberReviews - 1].IMGresponse}" alt="Відгук">
			</div>`
			}
			if (json.length <= numberReviews) {
				reviewsButton.style.display = 'none'
				return
			}
		});

}

let numberReviews = 0
reviewsAdd()
reviewsButton.addEventListener("click", reviewsAdd)


