import { getTimeFormat } from '../../util';

export default class Detail extends HTMLElement {
    constructor() {
        super();
    }
    getItemDetail(currentItem) {
        let detailTemplate = document.createElement('template');
        const { customer } = currentItem;
        const { id, status, timeReserved, timeRegistered } = currentItem;
        detailTemplate.innerHTML = `
            <style>
     
            </style>
            <section class="reservation-info">
              <h2>예약 정보</h2>
                <ul>
                  <li>
                    <span>예약 상태</span>
                    <span>${status === 'reserved' ? '예약' : '착석중'}</span>
                  </li>
                  <li>
                    <span>예약 시간</span>
                    <span>${getTimeFormat(timeReserved)}</span>
                  </li>
                  <li>
                    <span>접수 시간</span>
                    <span>${getTimeFormat(timeRegistered)}</span>
                  </li>
                </ul>
              </section>
              <section class="customer-info">
                <h2>고객 정보</h2>
                <ul>
                  <li>
                    <span>고객 성명</span>
                    <span>${customer['name']}</span>
                  </li>
                  <li>
                    <span>고객 등급</span>
                    <span>${customer['level']}</span>
                  </li>
                  <li>
                    <span>고객 메모</span>
                    <textarea rows="3" readonly>${customer['memo']}</textarea>
                  </li>
                  <li>
                    <span>요청 사항</span>
                    <textarea rows="3" readonly>${customer['request']}</textarea>
                  </li>
                </ul>
            </section>
                `
        return detailTemplate.content.cloneNode(true);
    }
}