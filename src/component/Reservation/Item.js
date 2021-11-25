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
                    <style>
                      .col:not(:nth-child(2)) {
                        flex: 5rem 0 0;
                        text-align: center;
                      }
                      .col{
                        flex: auto;
                      }
                      .status-btn.reserved{
                        width: 100%;
                        background-color: #162149;
                        color: #FFFFFF;
                        padding: 0.5rem 1.6rem;
                        white-space: nowrap;
                        border-radius: 0.5rem;
                        border: #162149;
                      }
                      .status-btn.seated{
                        width: 100%;
                        border-color: #162149;
                        border-radius: 0.5rem;
                        color: #162149;
                        background: none;
                        padding: 0.5rem 1.6rem;
                        white-space: nowrap;
                      }
                   

                    </style>
                    <li class="reservation-item" data-id="${id}" data-status="${status}">
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