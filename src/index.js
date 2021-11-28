import getTodos from './getTodos';
import appView from '../src/view/app';
import './style.css'

const state = {
    todos: getTodos(),
    currentFilter: 'All'
}

const main = document.querySelector('.todoapp')

window.requestAnimationFrame(() => {
    const newMain = appView(main, state);
    main.replaceWith(newMain);
})