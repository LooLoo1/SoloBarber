const Record = document.querySelectorAll('.form__info.form__info-date')
let changeDate = ``

const RecordT = document.querySelectorAll('.form__info.form__info-time')
let changeTime = ``
let changeTimeIf = ``

const RecordList = document.querySelectorAll('.form__info.form__info-services')
const RecordPrise = document.querySelectorAll('.form__info.form__info-price')
let RecordAllPrice
let RecordPriceList
/* <p class="form__info form__info-barber"><span>Барбер:</span><span>Зауличний Олександр</span></p>
<p class="form__info form__info-services"><span>Послуги:</span><span></span></p>
<p class="form__info form__info-price"><span>Вартість:</span><span></span></p>
<p class="form__info form__info-date"><span>Дата:</span><span></span></p>
<p class="form__info form__info-time"><span>Час:</span><span></span></p> */


function RecordValue(list, val) {
	for (let i = 0; i < list.length; i++) {
		list[i].children[1].innerText = val
	}
	changeBtn()
}



const formTimeConteiner = document.querySelector('.form__sub-conteiner.time')
const formTimeHours = [9, 16]
const formTimeMinutes = [`00`, 30]
createFormTime()

function createFormTime(y, m, d) {
	let today
	let selectDay
	if (y != undefined) {
		today = new Date()
		today.setHours(13)
		selectDay = new Date(y, m, d)
	}
	formTimeConteiner.innerHTML = ``
	let i = formTimeHours[0]
	let index = 0
	while (i <= formTimeHours[1]) {
		for (let j = 0; j < formTimeMinutes.length; j++) {
			let elInp = document.createElement('input')
			elInp.type = 'radio'
			elInp.name = 'time'
			elInp.id = `time-${index}`
			elInp.dataset.index = index
			elInp.value = `${i}:${formTimeMinutes[j]}`

			let elLabel = document.createElement('label')
			elLabel.type = 'radio'
			elLabel.htmlFor = `time-${index}`
			elLabel.innerText = `${i}:${formTimeMinutes[j]}`

			elLabel.dataset.index = index
			elLabel.className = ` `

			if (y) {
				if (today.getFullYear() == selectDay.getFullYear()
					&& today.getMonth() == selectDay.getMonth()
					&& today.getDate() == selectDay.getDate()
					// && today.getHours() >= i
				) {
					elLabel.className = `disabled`
					elInp.disabled = true
					RecordValue(RecordT, ``)
					changeTimeIf = ``
				}
			}

			formTimeConteiner.append(elInp)
			formTimeConteiner.append(elLabel)
			index++
		}
		i++

	}
	let timeInp = formTimeConteiner.querySelectorAll('input')
	let timeLabel = formTimeConteiner.querySelectorAll('label')
	// console.log(timeLabel);
	for (let j = 0; j < timeLabel.length; j++) {
		timeLabel[j].addEventListener('click', () => {
			changeTime = timeLabel[j].innerHTML
			changeTimeIf = timeLabel[j].innerHTML
			RecordValue(RecordT, timeLabel[j].innerHTML)

		})
		if (timeLabel[j].innerHTML == changeTime && timeInp[j].disabled != true) {
			timeInp[j].checked = true
			changeTimeIf = timeLabel[j].innerHTML
			RecordValue(RecordT, timeLabel[j].innerHTML)

		}
		// console.log(timeLabel[j].innerText);
		// console.log(changeTime);
	}


	// <input type="radio" name="time" id="time-1" value="9:00">
	// <label for="time-1">9:00</label>
}







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
				<input type="checkbox" name="haircut" id="serv-${i}">
				<label class="list__item" for="serv-${i}" data-index="${i}">
					<p class="name">${json[i].name} ${subName}</p>
					${discount}
					<span class="price" data-currency="${json[i].price.currency}.">${json[i].price.value}</span>
				</label>	
				`
			}


			const servicesItems = servicesList.querySelectorAll(".list__item")
			for (let i = 0; i < servicesItems.length; i++) {
				servicesItems[i].addEventListener('click', () => {
					RecordValue(RecordList, ``)
					RecordValue(RecordPrise, ``)
					setInterval(() => {
						RecordPriceList = ``
						RecordAllPrice = 0
						for (let j = 0; j < servicesItems.length; j++) {
							let servicesInp = servicesList.querySelectorAll("input")
							if (servicesInp[j].checked == true) {
								RecordAllPriceF(servicesJSON[servicesItems[j].dataset.index])
							}

						}
					}, 1);

					// RecordValue(list, val)
				})
			}

		})
}

function RecordAllPriceF(e) {
	RecordPriceList += `${e.name}, `
	if (e.discount != true) {
		RecordAllPrice += Number(e.price.value)
	} else {
		RecordAllPrice -= Number(e.price.value)
	}
	if (RecordAllPrice < 0) {
		RecordAllPrice = 50
	}


	RecordValue(RecordList, RecordPriceList.slice(0, -2))
	RecordValue(RecordPrise, `${RecordAllPrice} ${e.price.currency}.`)
}



const formBG = document.querySelectorAll(".form__item .form__bg")
for (let i = 0; i < formBG.length; i++) {
	randBGForm(formBG[i], 10)

}
function randBGForm(bg, size) {
	// console.log(window);
	let w = window.innerWidth
	let h = window.innerHeight
	// console.log(w, h);

	for (let i = 0; i < size; i++) {
		// console.log(randomInteger(0, w));
		// console.log(randomInteger(0, h));
		let vertical = randomInteger(0, w)
		let horisontal = h / size * i
		bg.innerHTML += `
		<div class="form__img active" style="--rotate: ${randomInteger(0, 360)}deg; --top:${horisontal}px; --left:${vertical}px;">
			<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M15.6184 23.0268L35.3816 22.8573C37.2466 20.8413 36.2731 17.2031 36.2731 17.2031L13.686 17.396L15.6184 23.0268Z" />
				<path
					d="M1.50882 21.0958L1.50982 21.0968L37.2685 20.7889C37.2362 19.7202 37.0198 18.9095 37.0198 18.9095L33.6187 18.9377L1.49212 19.2143C0.972535 19.2178 0.554161 19.6435 0.559771 20.1631C0.564454 20.6837 0.989315 21.1012 1.50882 21.0958Z" />
				<path
					d="M2.16537 20.0031C2.1658 17.9198 3.85418 16.2314 5.93653 16.2319L34.6668 16.2325C36.7496 16.2315 38.438 17.9198 38.437 20.0026C38.438 22.0855 36.7497 23.7738 34.6659 23.7738L5.93604 23.7738C3.85369 23.7733 2.16581 22.0854 2.16537 20.0031Z" />
				<path
					d="M6.87888 20.9455C7.40034 20.9455 7.82219 20.5236 7.82219 20.0022C7.82169 19.4822 7.39986 19.0604 6.8799 19.0599C6.35844 19.0599 5.93659 19.4817 5.93659 20.0032C5.93702 20.5232 6.35886 20.9451 6.87888 20.9455Z" />
			</svg>
		</div>`

	}

}

function randomInteger(min, max) {
	return Math.floor(min + Math.random() * (max - min))
}


const formItem = document.querySelectorAll(".form .form__item")
const formBtnNext = document.querySelector(".form button")
let forPage = 0
formPageShow()
changeBtn()

let formName = formTel = false

const formInputs = document.querySelectorAll("#sign-in input:required")
const formInputsAll = document.querySelectorAll("#sign-in *")

formInputs[0].addEventListener('input', function validFormName() {
	// console.log(this.value)
	formName = /^[^0-9]+$$/.test(this.value)
	changeBtn()

})
formInputs[1].addEventListener('input', function validFormTelNumber() {
	formTel = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(this.value)
	// telephoneCheck("1 555 555 5555");
	changeBtn()
})






function formPageShow() {
	formItem[forPage].style.opacity = 1
	formItem[forPage].style.visibility = 'visible'
	// formItem[forPage].style.overflowY = 'auto'
}
function formPageNext() {
	forPage = (forPage + 1 >= formItem.length) ? 0 : forPage + 1
}



formBtnNext.addEventListener('click', () => {
	if (forPage == 0) {
		if (changeDate != undefined &&
			changeTime != undefined &&
			changeTimeIf != undefined) {
			// console.log('Good');
			formPageNext()
		}
	} else if (forPage == 1) formPageNext()
	if (forPage == 2) {
		formBtnNext.innerText = `Записатися`
		formBtnNext.disabled = true
		// formBtnNext.form = `sign-in` //???????????
		// formBtnNext.outerHTML = `<input type="submit" class="sign" form="sign-in">Записатися</input>`
		// formBtnNext.outerHTML = `<button class="sign" form="sign-in" onClick="function a(e) {e.preventDefault()}">Записатися</button>`
		if (formName === true &&
			formTel === true) {
			formPageNext()
		}
	}
	if (forPage == 3) {
		formBtnNext.style.opacity = 0
		formBtnNext.style.pointerEvents = 'none'
		formItem[forPage].style.overflow = 'hidden'
		let formValur = []
		for (let i = 0; i < formInputsAll.length; i++) {
			formValur[i] = formInputsAll[i].value == '' ? 'Невказав' : formInputsAll[i].value
			// console.log(formValur[i]);

		}

		let template_params = {
			to_name: `${formValur[0]}`,
			tel: `${formValur[1]}`,
			email: `${formValur[2]}`,
			message: `${formValur[3]}`,
			price: `${RecordAllPrice == undefined ? 'Невказав' : RecordAllPrice}грн.`,
			list: `${RecordPriceList == undefined ? 'Невказав' : RecordPriceList}`,
			to_time: `${changeTime}`,
			to_date: `${changeDate}`
		}

		emailjs.send('service_3xjbcls', 'template_rrfrn3l', template_params)

	}



	// console.dir(formBtnNext);

	for (let i = 0; i < formItem.length; i++) {
		formItem[i].style.opacity = 0
		formItem[i].style.visibility = 'hidden'
		// formItem[i].style.overflow = 'hidden'
		// formItem[i].style.pointerEvents = 'none'
	}
	formPageShow()

})

function changeBtn() {
	if (forPage == 0) {
		if (changeDate != `` && changeTime != `` && changeTimeIf != ``) {
			formBtnNext.disabled = false
		} else {
			formBtnNext.disabled = true

		}
	}
	if (forPage == 2) {
		if (formName == true &&
			formTel == true) {
			formBtnNext.disabled = false
		}
	}
}










