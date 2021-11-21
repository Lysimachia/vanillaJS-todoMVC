import getReservationList from "../../api";
export default class ReserveList extends HTMLElement {
    constructor() {
        super();
    }
    render() {
        window.requestAnimationFrame(async() => {
            const reservationList = await getReservationList();
            const div = document.createElement("div");
            const title = document.createElement("h1");
            const ul = document.createElement("ul");
            title.textContent = "예약 목록";
            this.appendChild(div);
            div.appendChild(title);
            div.appendChild(ul);

            const reservations = reservationList.reservations;
            reservations.forEach((reservation) => {
                const item = JSON.parse(JSON.stringify(reservation));
                const customer = JSON.parse(JSON.stringify(item.customer));

                const li = document.createElement("li");
                const itemWrapper = document.createElement("div");
                const col1 = document.createElement("div");
                const col2 = document.createElement("div");
                const col3 = document.createElement("div");
                const button = document.createElement("button");
                button.textContent = item.status === "seated" ? "취소" : "예약";

                col1.textContent = item.status;
                col2.textContent = customer.name;
                col3.appendChild(button);

                ul.appendChild(li);
                li.appendChild(itemWrapper);
                itemWrapper.appendChild(col1);
                itemWrapper.appendChild(col2);
                itemWrapper.appendChild(col3);
            });
        });
    }

    connectedCallback() {
        this.render();
    }
}