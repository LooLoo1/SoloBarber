const sliderList = ['/IMG/Bg-img.png',
	'/IMG/Web-site_bg/3U4A8150-min.jpg',
	'/IMG/Web-site_bg/AdobeStock_132121537_копия-min.jpg',
	'/IMG/Web-site_bg/barber-like-ad-768x417-min.jpg',
	'/IMG/Web-site_bg/barber-shop-main-bg-min.jpg',
	'/IMG/Web-site_bg/d8ac3781-how-to-start-a-barber-shop-in-8-steps-min.jpg',
	'/IMG/Web-site_bg/generic-barber-shop-and-whiskey-2-min.jpg',
	'/IMG/Web-site_bg/shutterstock_629193110-802x454-min.jpg'
]

const sliderConteiner = document.querySelector('.slider')
let slide
let numSlide = 0

if (!localStorage.getItem('BG-img')) {
	localStorage.setItem('BG-img', 0)
	slide = 0
} else {
	slide = localStorage.getItem('BG-img')
}

sliderConteiner.innerHTML += `<img class="slider__item active" src="${sliderList[slide]}" alt="Bg-img">`
sliderConteiner.innerHTML += `<img class="slider__item " src="${sliderList[nextNumberArr(slide, sliderList)]}" alt="Bg-img">`

let slidernction = setInterval(() => {
	slide = nextNumberArr(slide, sliderList)
	localStorage.setItem('BG-img', slide)
	numSlide = nextNumberArr(numSlide, sliderList)

	if (sliderConteiner.children.length <= sliderList.length - 1) {
		sliderConteiner.innerHTML += `<img class="slider__item" src="${sliderList[nextNumberArr(slide, sliderList)]}" alt="Bg-img">`
	}

	let slideList = sliderConteiner.querySelectorAll('*')
	setTimeout(() => {
		for (let i = 0; i < slideList.length; i++) {
			slideList[i].classList.remove('active')

		}
	}, 1)
	setTimeout(() => { slideList[numSlide].classList.add('active') }, 1)

}, 10000);



function nextNumberArr(n, list) {
	n = Number(n)
	return (n + 1 >= list.length) ? 0 : n + 1

}
