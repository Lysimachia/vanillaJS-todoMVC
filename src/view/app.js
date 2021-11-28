import todoView from './todos';
import counterView from './counter';
import filterView from './filters';

export default (targetElement, state) => {
    const element = targetElement.cloneNode(true);
    const list = element.querySelector('.todo-list');
    const counter = element.querySelector('.todo-count');
    const filters = element.querySelector('.filters');

    list.replaceWith(todoView(list, state));
    counter.replaceWith(counterView(counter, state));
    filters.replaceWith(filterView(filters, state));

    return element;
}