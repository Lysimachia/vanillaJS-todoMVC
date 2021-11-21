import getReservationList from "../../api";
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