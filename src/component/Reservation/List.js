import getReservationList from "../../api";
import Item from './Item'
import Detail from './Detail'

let style = document.createElement('style');
style.innerText = `
  body {
    background-color: #CED8E4;
    font-family: 'Noto Sans KR', sans-serif;
  }
  h1 {
    text-align: center;
    font-size: 2.4rem;
    font-weight: 400;
  }
  ul {
    list-style: none;
  }
  .reservation-app {
    display: inline-flex;
  }
  #reservation-list {
    padding: 0 1.25rem;
  }
  .reservation-item {
    display: inline-flex;
    background-color: #FFFFFF;
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 0.75rem;
    align-items: center;
    min-width: -webkit-fill-available;
    justify-content: flex-start
  }

  #reservation-detail {
    background-color: #FFFFFF;
    border-radius: 1rem;
    min-width: 23.5rem;
    max-width: 23.5rem;
  }
  #reservation-detail h2 {
    text-align: center;
  }

  #reservation-detail li{
    display:flex;
    align-items: center;
  }

  #reservation-detail li span:nth-child(2) {
    margin: auto;
  }

  #reservation-detail textarea {
    resize:none;
    border: none;
    outline: none;
    margin: auto;
    width: 50%;
  }
`

let listTemplate = document.createElement('template');
listTemplate.innerHTML = `
  <article>
    <h1 class="title">예약 목록</h1>
    <article class="reservation-app">
      <section class="reservation-list-wrapper">
       <ul id="reservation-list"></ul>
      </section>
      <section id="reservation-detail">
      </section>
    </article>
  </article>
`
export default class ReservationList extends HTMLElement {
    constructor() {
        super();
    }
    async getReservations() {
        const { reservations } = await getReservationList();
        return reservations;
    }
    createItemElements(reservations) {
        const listItem = new Item();
        const listFragments = document.createDocumentFragment();
        listFragments.appendChild(style);
        reservations.forEach(reservation => {
            listFragments.appendChild(listItem.getReservationItem(reservation));
        })
        return listFragments;
    }
    render() {
        window.requestAnimationFrame(async() => {
            this.reservations = await this.getReservations();

            let currentId;
            let currentItem;
            let currentIndex = 0;

            if (this.reservations.length !== 0) {
                currentId = this.reservations[currentIndex].id;
                currentItem = this.reservations.find(reservation => reservation.id == currentId);
            };
            this.appendChild(listTemplate.content.cloneNode(true));

            let detailSection = document.getElementById('reservation-detail');
            let detailContent = new Detail();
            detailSection.appendChild(detailContent.getItemDetail(currentItem))

            const list = document.getElementById('reservation-list');
            list.appendChild(this.createItemElements(this.reservations));

            const items = this.querySelectorAll('.reservation-item');

            items.forEach(item => item.addEventListener('click', e => {
                currentId = e.currentTarget.dataset.id;
                currentItem = this.reservations.find(reservation => reservation.id == currentId);
                currentIndex = this.reservations.findIndex(el => el.id === currentId);
                const isButton = e.target.classList.contains('status-btn');

                if (isButton) {
                    console.log(this.reservations[currentIndex]);
                    currentItem['status'] = currentItem['status'] === 'reserved' ? 'seated' : 'done';
                    list.innerHTML = '';
                    list.appendChild(this.createItemElements(this.reservations));
                }
                detailSection.innerHTML = '';
                detailSection.appendChild(detailContent.getItemDetail(currentItem))

            }))
        });
    }
    connectedCallback() {
        this.render();
    }
}