import getReservationList from "../../api";

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
      justify-content: space-between;
    }
    #col-time-status, #col-status-btn {
      min-width: 8ch;
    }
    #col-customer-menues {
      flex: auto;
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
let itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
  <li id="reservation-item">
    <div class="col" id="col-time-status">
    </div>
    <div class="col" id="col-customer-menues">
      <ul id="list-customer-menues">
      </ul>
    </div>
    <div class="col" id="col-status-btn">
      <button type="button" id="status-btn">버튼</button>
    </div>
  </li>
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

            const list = document.getElementById('reservation-list')

            reservations.forEach(el => {
                // console.table(el.customer);
                // console.dir(el.tables);
                // console.table(el.menus);

                const item = itemTemplate.content.cloneNode(true);
                const itemId = item.getElementById('reservation-item');
                itemId.setAttribute("data-id", el.id);

                const col_1 = item.getElementById('col-time-status');
                col_1.innerHTML = `
                <div>
                  ${new Date(el.timeReserved).getHours()}:${new Date(el.timeReserved).getMinutes() < 10 ? '0'+new Date(el.timeReserved).getMinutes() : new Date(el.timeReserved).getMinutes()}
                </div>
                <div>
                  ${el.status}
                </div>
                `;

                const col_2 = item.getElementById('list-customer-menues');
                col_2.innerHTML = `
                  <li>${el.customer.name}-${el.tables.map(el => el.name)}</li>
                  <li>성인 ${el.customer.adult} 아이 ${el.customer.child}</li>
                  <li>${el.menus.map(el => el.name)}(${el.menus.map(el => el.qty)})</li>
                `;

                list.appendChild(item);
            })
        });
    }

    connectedCallback() {
        this.render();
    }
}