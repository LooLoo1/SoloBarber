//Preloader
let log = false
if (getRandomInt(10) - 9 > 0) localStorage.removeItem('loader')
if (!localStorage.getItem('loader')) {
	document.querySelector('head').innerHTML += `<link rel="stylesheet" href="/css/loader.css" type="text/css">`
	document.querySelector('body').innerHTML += `<section class="loader">
	<div class="icon">
		<div class="lamp"></div>
		<div class="metal">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div class="gradient"></div>
		<div class="metal">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
	<div class="load"></div>
</section>`
	localStorage.setItem('loader', '1')
	setTimeout(() => {
		let t = setInterval(() => {
			if (log === true) {
				document.querySelector('.loader').classList.add('del')
			}
			clearInterval(t)
		}, 500)
	}, 3000)
} document.addEventListener("DOMContentLoaded", () => log = true)




let rootCSS = document.documentElement.style;
rootCSS.setProperty(`--bg-color-25`, `${colorHexA(documentVarCSS('--bg-color'), 25)}`)
rootCSS.setProperty(`--bg-color-65`, `${colorHexA(documentVarCSS('--bg-color'), 65)}`)
rootCSS.setProperty(`--bg-color-90`, `${colorHexA(documentVarCSS('--bg-color'), 90)}`)
rootCSS.setProperty(`--white-25`, `${colorHexA(documentVarCSS('--white'), 25)}`)
rootCSS.setProperty(`--white-50`, `${colorHexA(documentVarCSS('--white'), 50)}`)

const main = document.querySelector('main')
const navButton = document.querySelector('.navigation')
const header = document.querySelector('header.header')
const b = document.querySelector('body')

navButton.addEventListener('click', () => {
	header.classList.toggle('active')
	main.classList.toggle('blur')
	b.classList.toggle('noscroll')
})

function documentVarCSS(name) {
	return window.getComputedStyle(document.documentElement).getPropertyValue(`${name}`)
}
// const documentVarCSS = window.getComputedStyle(document.documentElement).getPropertyValue('--bg-color');

function colorHexA(colorHex, alpha_0_100) {
	var hex = Math.round(alpha_0_100 * 255 / 100).toString(16)
	return colorHex + hex
}// console.log(colorHexA('#ff9b25', 100));

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}




// window.location.pathname
// console.log(`${location.pathname}`.slice(1, -11));


if (location.pathname.toString().slice(1, -5) != "index" && location.pathname != '\/') {
	document.querySelector(`#${location.pathname.toString().slice(1, -5)}`).classList.add('active')
}

