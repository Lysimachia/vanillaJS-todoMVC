import ReservationList from './component/Reservation/List'
import ReservationItem from './component/Reservation/Item'
import ReservationDetail from './component/Reservation/Detail'

window.customElements.define('reservation-item', ReservationItem);
window.customElements.define('reservation-list', ReservationList);
window.customElements.define('reservation-detail', ReservationDetail);