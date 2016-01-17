let React = require('react');
let Item = require('./item');
let Footer = require('./footer');
let Filter = require('./filter');
module.exports = React.createClass({
  getInitialState: function(){
    return {
      list: [],
      filter: '',
      activeMenuItem: 'All'
    }
  },
  render: function(){
    let filteredList = this.state.list.filter((item, i) => {
      return item.todo.indexOf(this.state.filter) > -1;
    });
    let sortedList = filteredList.filter((item, i) => {
      let realItem = item;
      if(this.state.activeMenuItem === "Complete"){
        return item.complete == true;
      } 
      else if(this.state.activeMenuItem === "Active"){
        return item.complete === false;
      } 
      else{
        return true;
      }
    })
    let listHTML = sortedList.map((item, i) =>{
      return <Item key={i} item={item} toggleTodo={this.toggleTodo} />
    });
    return(
      <section>
        <h1>Much todo about nothing</h1>
        <form onSubmit={this.newTodo}>
          <input className="todo-text" ref="todoInput" type="text" placeholder="Type your todos here" />
          <button>Add</button>
        </form>
        <Filter itemFilter={this.itemFilter} filter={this.state.filter} />
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
    let id = this.state.list.length;
    this.state.list.push({todo: this.refs.todoInput.value, complete: false, id: id});
    this.setState(this.state);
    this.refs.todoInput.value = '';
  },
  toggleTodo: function(id){
    return (e) => {
      let thisTodo = this.state.list.filter((item, i) => {
        return item.id === id;
      })
      thisTodo[0].complete = !thisTodo[0].complete;
      this.setState({
        list : this.state.list
      })
    }
  },
  setSortItems: function(e){
    e.preventDefault();
    this.setState({activeMenuItem: e.target.textContent});
    this.sortItems(e.target.textContent);
  }
})