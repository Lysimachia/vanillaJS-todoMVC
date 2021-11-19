const API_URL = 'http://3.35.25.199/'

const RESERVATIONS = {
    id: '',
    status: '',
    timeReserved: '',
    timeRegistered: '',
    customer: {},
    tables: [],
    menus: []
}

const getReservationList = async() => {
    const GET_RESERVATION_URL = 'v1/store/9533/reservations'
    const response = await fetch(API_URL + GET_RESERVATION_URL)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const reservationList = response.json()
    return reservationList
}

export default class ReserveList extends HTMLElement {
    constructor() {
        super();
    }
    render() {
        window.requestAnimationFrame(async() => {
            const reservationList = await getReservationList();
            const div = document.createElement('div')
            const title = document.createElement('h1')
            const ul = document.createElement('ul')
            title.textContent = '예약 목록'
            this.appendChild(div)
            div.appendChild(title)
            div.appendChild(ul)

            const reservations = reservationList.reservations
            reservations.forEach(el => {
                const li = document.createElement('li')
                li.innerText = el.status
                ul.appendChild(li)
            })



        })
    }

    connectedCallback() {
        this.render()
    }


}