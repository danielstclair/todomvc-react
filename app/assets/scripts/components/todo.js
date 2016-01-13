let React = require('react');
let Item = require('./item');
let Footer = require('./footer');
module.exports = React.createClass({
  getInitialState: function(){
    return {
      list: [],
      filter: ''
    }
  },
  render: function(){
    console.log(this.state);
    console.log(this.state.filter);
    console.log(Footer);

    let listHTML = this.state.list.filter((item, i) =>{
      return item.indexOf(this.state.filter) > -1;
    }).map((item, i) =>{
      return <Item key={i} text={item} />
    });
    return(
      <section>
        <h1>Much todo about nothing</h1>
        <form onSubmit={this.newTodo}>
          <input className="todo-text" ref="todoInput" type="text" placeholder="Type your todos here" />
          <button>Add</button>
        </form>
        <div>
          <input className="todo-text" onKeyUp={this.itemFilter} placeholder="filter" type="text" />
        </div>
        <ul>
          {listHTML}
        </ul>
        <Footer />
      </section>
    );
  },
  itemFilter: function(e){
    this.setState({filter: e.target.value});
    console.log(this.state.filter);
  },
  newTodo: function(e){
    e.preventDefault();
    this.state.list.push(this.refs.todoInput.value);
    this.setState(this.state);
    this.refs.todoInput.value = '';
  }
})