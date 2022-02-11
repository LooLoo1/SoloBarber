const SizeCalendar = 7 * 6
const WeeksText = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД']
const MonthsText = ['Січень', 'Лютий',
	'Березень', 'Квітень', 'Травень',
	'Червень', 'Липень', 'Серпень',
	'Вересень', 'Жовтень', 'Листопад',
	'Грудень']

// const week = {
// 	monday: 1,
// 	tuesday: 2,
// 	wednesday: 3,
// 	thursday: 4,
// 	friday: 5,
// 	saturday: 6,
// 	sunday: 0
// }

const CalendarButton = document.querySelector('.form__sub-title.calendar')
const CalendarButtonInput = document.querySelector('#calendar')
const CalendarConteiner = document.querySelector('.form__sub-conteiner.calendar')
// let changeDate

date = new Date()
// date = new Date(2022, 3, 1)
installMonths(date)
createCalendar(date)

setInterval(() => {
	date = new Date()
	// date = new Date(2022, 3, 1)
}, 1000);


function installMonths(d) {
	let month = d.getMonth()

	CalendarButton.children[0].innerHTML = MonthsText[month]
	CalendarButton.children[1].innerHTML = MonthsText[month = month + 1 > 11 ? 0 : month + 1]
}

function createCalendar(d) {
	//Create weeks
	for (let i = 0; i < WeeksText.length; i++) {
		let elWeek = document.createElement('span')
		elWeek.className = 'week'
		elWeek.innerText = WeeksText[i]
		CalendarConteiner.append(elWeek)
	}

	// let todayDateMonth = d.getDate() //27 число


	let dateArr = getMondayDateNumber(d)
	// let dateArr = getMondayDateNumber(d, 1)
	// let todayDateMonth = dateArr[0]
	// let firstDayMonght = dateArr[1]


	// Generate inputs date
	for (let i = 0; i < SizeCalendar; i++) {
		// let dateNum = firstDayMonght.getDate()

		let elInp = document.createElement('input')
		elInp.type = 'radio'
		elInp.name = 'date'
		elInp.id = `date-${i}`
		elInp.dataset.index = i
		// elInp.className = `next-month` //`inaccessible`
		// elInp.disabled = true
		CalendarConteiner.append(elInp)


		let elDay = document.createElement('label')
		elDay.htmlFor = `date-${i}`
		// elDay.innerText = dateNum
		// elDay.dataset.date = // Повну дату типу 22.11.2022
		CalendarConteiner.append(elDay)

	}

	fillingСalendar(d, dateArr)
	// fillingСalendar(d, dateArr, 1)


	// console.log(`=============`);
	// console.log(todayDateMonth);
	// console.log(firstDayMonght.getDay());
	// console.log(firstDayMonght.getDate());
}

CalendarButtonInput.addEventListener('change', changeMonth)
let calendarStatus = 0
function changeMonth() {
	if (this.dataset.date) changeDate = this.dataset.date
	if (calendarStatus == 0) calendarStatus = 1
	else calendarStatus = 0 //(calendarStatus == 1)
	let dateArr = getMondayDateNumber(date, calendarStatus)
	fillingСalendar(date, dateArr, calendarStatus)
	this.blur()
	CalendarButtonInput.checked = calendarStatus

	if (changeDate != undefined) {
		changeDateF()
	}

}

// createFormTime(date.getFullYear(), date.getMonth(), 13)
changeDateF()
function changeDateF() {
	let calendarLabels = CalendarConteiner.querySelectorAll('label')
	let calendarInput = CalendarConteiner.querySelectorAll('input')
	for (let i = 0; i < calendarLabels.length; i++) {
		calendarInput[i].checked = false
		if (changeDate == calendarLabels[i].dataset.date) {
			RecordValue(Record, calendarLabels[i].dataset.date)
			calendarInput[i].checked = true
		}


	}
}





function fillingСalendar(d, MDN, month = 0) {

	if (month != 0) {
		d = new Date(d.getFullYear(), d.getMonth() + month, 1)
		MDN = getMondayDateNumber(d)
	}


	let todayDateMonth = MDN[0]
	let firstDayMonght = MDN[1]
	let calendarInput = CalendarConteiner.querySelectorAll('input')
	let calendarLabels = CalendarConteiner.querySelectorAll('label')

	let todayDate = d.getDate() //27 число
	let todayMonth = d.getMonth() //0 число
	// let nowTime = Date.parse(time);


	for (let i = 0; i < SizeCalendar; i++) {
		let dateNum = firstDayMonght.getDate()
		let dateMonth = firstDayMonght.getMonth()
		calendarInput[i].addEventListener('change', () => {
			changeDate = calendarLabels[i].dataset.date
			RecordValue(Record, changeDate)

		})
		calendarInput[i].removeEventListener('change', changeMonth)
		calendarInput[i].removeEventListener('click', changeMonth)


		if (month == 0) {
			if (todayMonth > dateMonth || todayMonth == 0 && dateMonth == 11) {
				// console.log(`Минулий`);
				calendarInput[i].disabled = true
				calendarInput[i].className = `inaccessible `

			} else if (todayMonth == dateMonth) {
				// console.log(`Теперішній`);
				calendarInput[i].className = ``
				calendarInput[i].disabled = false

				if (changeDate == undefined) {
					console.log(1);
					changeDate = new Date(d.getFullYear(), dateMonth, dateNum)
					changeDateF()

				}

			} else if (todayMonth < dateMonth || todayMonth == 11 && dateMonth == 0) {
				// console.log(`Наступний`);
				calendarInput[i].disabled = false
				calendarInput[i].className = `next-month`
				addListenerMulti(calendarInput[i], 'change click', changeMonth)

			}

			if (dateNum < todayDate && dateMonth == todayMonth) {
				calendarInput[i].disabled = true
				calendarInput[i].className = `inaccessible-the-month `
			}
		}

		else {
			if (todayMonth > dateMonth || todayMonth == 0 && dateMonth == 11) {
				// console.log(`Минулий`);
				calendarInput[i].disabled = false
				calendarInput[i].className = `next-month`
				addListenerMulti(calendarInput[i], 'change click', changeMonth)

			} else if (todayMonth == dateMonth) {
				// console.log(`Теперішній`);
				calendarInput[i].className = ``
				calendarInput[i].disabled = false

			} else if (todayMonth < dateMonth || todayMonth == 11 && dateMonth == 0) {
				// console.log(`Наступний`);
				calendarInput[i].className = `inaccessible `
				calendarInput[i].disabled = true

			}
		}

		calendarLabels[i].addEventListener('click', () => {
			createFormTime(d.getFullYear(), dateMonth, dateNum)
		})
		calendarLabels[i].innerText = dateNum
		let dataDate = `${(dateNum < 10) ? '0' + dateNum : dateNum}.${(dateMonth < 10) ? '0' + (dateMonth + 1) : dateMonth + 1}.${d.getFullYear()} `
		calendarInput[i].dataset.date = dataDate
		calendarLabels[i].dataset.date = dataDate


		todayDateMonth++
		firstDayMonght = new Date(d.getFullYear(), d.getMonth(), todayDateMonth)
	}
}

function getMondayDateNumber(d, month = 0) {
	let todayDateMonth = 1
	let moon = (d.getMonth() + month >= 12) ? 12 - d.getMonth() + month : d.getMonth() + month


	let firstDayMonght = new Date(d.getFullYear(), moon, 1)
	while (firstDayMonght.getDay() !== 1) {
		todayDateMonth--
		firstDayMonght = new Date(d.getFullYear(), moon, todayDateMonth) //останній день попереднього
	}
	// console.log(firstDayMonght);
	return [todayDateMonth, firstDayMonght]
}








// Multi EventListener
function addListenerMulti(el, s, fn, handler = false) {
	s.split(' ').forEach(e => el.addEventListener(e, fn, handler));
}

// function removeListenerMulti(el, s, fn, handler = false) {
// 	s.split(' ').forEach(e => el.removeListener(e, fn, handler));
// }













//Кароче лишилися дні вийнятки коли на роботу ні ні і
//можеш добавити через якийсь унікальний клас + disablet
// В момент перевірки роздачі стилів