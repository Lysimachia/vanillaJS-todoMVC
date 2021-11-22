let itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
  <li id="reservation-item">
    <div class="col" id="col-time-status">
        <div name="timeReserved"></div>
        <div name="status"></div>
    </div>
    <div class="col" id="col-customer-menues">
      <ul id="list-customer-menues">
        <li>
          <span name="customer-name"></span>
          -
          <span name="tables-name"></span>
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="col" id="col-status-btn">
      <button type="button" id="status-btn">버튼</button>
    </div>
  </li>`

export default class Item extends HTMLElement {
    constructor() {
        super();
    }
    getReservationItem(reservation) {
        const {
            tables
        } = reservation;
        const {
            customer
        } = reservation;
        let content = itemTemplate.content.querySelectorAll('[name]');
        content.forEach(el => {
            const name = el.getAttribute('name');
            if (name.includes('table')) {
                el.textContent = tables.map(table => table.name)
            } else if (name.includes('customer')) {
                el.textContent = customer['name']
            } else {
                el.textContent = reservation[name];
            }
        });
        return itemTemplate.content.cloneNode(true);
    }
}