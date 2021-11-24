import getReservationList from "../../api";
import Item from './Item'
import Detail from './Detail'
import { cloneDeep } from '../../util'

let listTemplate = document.createElement('template');
listTemplate.innerHTML = `
  <style>
    body{
      margin:0;
      padding:0;
      word-break: keep-all;
    }
    #reservation-item {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    #col-time-status, #col-status-btn {
      width: 8ch;
      text-overflow: eclipse;
      text-align: center;
      margin: auto;
    }
    #col-customer-menues {
      flex: 1;
      min-width: 30ch;
    }
  </style>
  <article>
    <h1 class="title">예약 목록</h1>
    <section class="reservation-list-wrapper">
      <ul id="reservation-list"></ul>
    </section>
    <section id="reservation-detail">
    </section>
  </article>
`
export default class ReservationList extends HTMLElement {
    constructor() {
        super();
        this.reservations;
        this.currentItemId = null;
    }

    setDetail(id) {
        if (!id) {
            return;
        }
        let currentItemId = id;
        let currentItem = this.reservations.filter(reservation => reservation.id == currentItemId);
        const detail = document.getElementById('reservation-detail');
        detail.innerHTML = '';
        const detailItem = new Detail();
        detail.appendChild(detailItem.getItemDetail(currentItem));
    }

    setDetailEvent() {
        const items = this.querySelectorAll('.reservation-item');
        items.forEach(item => item.addEventListener('click', e => this.setDetail(e.currentTarget.dataset.id)))
    }

    async getReservations() {
        const { reservations } = await getReservationList();
        return reservations;
    }

    render() {
        window.requestAnimationFrame(async() => {
            this.reservations = await this.getReservations();

            const fragment = document.createDocumentFragment();
            fragment.appendChild(listTemplate.content.cloneNode(true));
            this.appendChild(fragment);

            const list = document.getElementById('reservation-list');
            const listItem = new Item();

            this.reservations.forEach(reservation => {
                list.appendChild(listItem.getReservationItem(reservation));
            })
            this.setDetail(this.currentItemId);
            this.setDetailEvent();
        });
    }

    connectedCallback() {
        this.render();
    }
}