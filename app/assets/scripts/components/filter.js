let React = require('react');
module.exports = React.createClass({
  getInitialState: function(){
    return {
      filter: ''
    }
  },
  render: function(){
    return (
      <div>
        <input className="todo-text" type="text" placeholder="filter" onKeyUp={this.itemFilter} />
      </div>
    );
  },
  itemFilter: function(e){
    this.setState({filter: e.target.value});
    this.props.itemFilter(e);
  }
});