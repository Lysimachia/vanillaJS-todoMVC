import getReservationList from "../../api";
import Item from './Item'
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
    <section>
      <reservation-detail/>
    </section>
  </article>
`
export default class ReservationList extends HTMLElement {
    constructor() {
        super();
    }
    render() {
        window.requestAnimationFrame(async() => {
            const { reservations } = await getReservationList();
            console.table(reservations);

            const fragment = document.createDocumentFragment();
            fragment.appendChild(listTemplate.content.cloneNode(true));
            this.appendChild(fragment);

            const list = document.getElementById('reservation-list');

            reservations.forEach(reservation => {
                let item = new Item();
                list.appendChild(item.getReservationItem(reservation));
            })
        });
    }

    connectedCallback() {
        this.render();
    }
}