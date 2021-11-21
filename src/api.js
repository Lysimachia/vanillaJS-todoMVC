const BASE_URL = 'http://3.35.25.199'

const RESERVATIONS = {
    id: '',
    status: '',
    timeReserved: '',
    timeRegistered: '',
    customer: {},
    tables: [],
    menus: []
}

export default async function getReservationList() {
    const GET_RESERVATION = '/v1/store/9533/reservations'
    let response = {};
    try {
        response = await fetch(`${BASE_URL}${GET_RESERVATION}`);
        if (!response.ok) {
            throw new Error(response.statusText)
        }
    } catch (error) {
        console.log(error);
    }
    return response.json();
}