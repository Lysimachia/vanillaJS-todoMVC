export default (targetElement, { currentFilter }) => {
    const newCounter = targetElement.cloneNode(true);
    const filterListArray = Array.from(newCounter.querySelectorAll('li a'));
    filterListArray.forEach(a => {
        if (a.textContent === currentFilter) {
            a.classList.add('selected');
        } else {
            a.classList.remove('selected');
        }
    });
    return newCounter;
}