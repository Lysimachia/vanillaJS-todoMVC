import getTodos from './getTodos';
import todoView from './view/todos';
import counterView from './view/counter';
import filtersView from './view/filters';
import registry from './registry';
import './style.css'

registry.add('todos', todoView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
    todos: getTodos(),
    currentFilter: 'All'
};

const render = () => {
    window.requestAnimationFrame(() => {
        const main = document.querySelector('.todoapp');
        const newMain = registry.renderRoot(main, state);
        main.replaceWith(newMain);
    })
}

render();