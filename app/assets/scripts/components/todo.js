let React = require('react');
let Item = require('./item');
let Footer = require('./footer');
module.exports = React.createClass({
  getInitialState: function(){
    return {
      list: [],
      sort: [],
      filter: '',
      complete: false,
      activeMenuItem: 'All'
    }
  },
  render: function(){
    let baseHTML = this.state.list.filter((item, i) => {
      return item.todo.indexOf(this.state.filter) > -1;
    });
    let listHTML = baseHTML.map((item, i) =>{
      return <Item key={i} id={i} toggleTodo={this.toggleTodo} text={item.todo} />
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
        <Footer activeMenuItem={this.state.activeMenuItem} setSortItems={this.setSortItems} list={this.state.list} complete={this.state.complete} />
      </section>
    );
  },
  itemFilter: function(e){
    this.setState({filter: e.target.value});
  },
  newTodo: function(e){
    e.preventDefault();
    this.state.list.push({todo: this.refs.todoInput.value, complete: false});
    this.setState(this.state);
    this.refs.todoInput.value = '';
  },
  toggleTodo: function(e){
    let {todo, complete, id} = e;
    this.state.list[id].todo = todo;
    this.state.list[id].complete = complete;
    this.setState({
      list : this.state.list
    })
  },
  setSortItems: function(e){
    e.preventDefault();
    this.setState({activeMenuItem: e.target.text});
    this.sortItems(e.target.text);
  },
  sortItems: function(e){
    let baseHTML = this.state.list.filter((item, i) => {
      return item.indexOf(this.state.filter) > -1;
    });
    console.log(this.state.list);
  }
})