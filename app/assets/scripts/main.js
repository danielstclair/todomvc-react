console.log('bundle is bundling');
let React = require('react');
let ReactDOM = require('react-dom');
let Todo = require('./components/todo.js');

ReactDOM.render(<Todo />, document.getElementById('todoapp'));