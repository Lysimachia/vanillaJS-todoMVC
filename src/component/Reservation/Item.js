import { getTimeFormat } from '../../util';
export default class Item extends HTMLElement {
    constructor() {
        super();
    }
    getReservationItem(reservation) {
            let itemTemplate = document.createElement('template');
            if (reservation.status !== 'done') {
                const { tables } = reservation;
                const { customer } = reservation;
                const { menus } = reservation;
                const { id, status, timeReserved, timeRegistered } = reservation;

                itemTemplate.innerHTML = `
                    <li class="reservation-item" data-id="${id}">
                      <div class="col">
                          <div>${getTimeFormat(timeReserved)}</div>
                          <div>${status === 'reserved' ? '예약' : '착석중'}</div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <span>${customer['name']}</span>
                            -
                            <span>${tables.map(table => table.name).join(', ')}</span>
                          </li>
                          <li>
                            성인&nbsp;<span>${customer['adult']}</span>
                            아이&nbsp;<span>${customer['child']}</span>
                          </li>
                          <li>
                            <span>
                              ${menus.map(menu => `${menu.name}(${menu.qty})`).join(', ')}
                            <span>
                          </li>
                        </ul>
                      </div>
                      <div class="col">
                        <button type="button" class="status-btn ${status}">${status === 'reserved' ? '착석' : '퇴석'}</button>
                      </div>
                    </li>`
        }
        return itemTemplate.content.cloneNode(true);
    }
}