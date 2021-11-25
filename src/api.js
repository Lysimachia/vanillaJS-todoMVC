const BASE_URL = 'http://3.35.25.199'

export default async function getReservationList() {
    const GET_RESERVATION = '/v1/store/9533/reservations'
    let response = {};
    try {
        response = await fetch(`${BASE_URL}${GET_RESERVATION}`);
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
}