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
      <div>시간</div>
      <div>상태</div>
    </div>
    <div class="col" id="col-customer-menues">
      <ul>
        <li>
            <span>예약자명</span>-<span>테이블명</span>
          </li>
        <li>
          성인<span>00</span>
          아이<span>00</span>
        </li>
        <li>
          <span>메뉴명</span>
          <span>(갯수)</span>
        </li>
      </ul>
    </div>
    <div class="col" id="col-status-btn">
      <button type="button">버튼</button>
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
            fragment.appendChild(listTemplate.content.cloneNode(true))
            this.appendChild(fragment);

            const list = document.getElementById('reservation-list')

            reservations.forEach(el => {
                list.appendChild(itemTemplate.content.cloneNode(true))
            })
        });
    }

    connectedCallback() {
        this.render();
    }
}