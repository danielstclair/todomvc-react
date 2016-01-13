let React = require('react');
module.exports = React.createClass({
  getInitialState: function(){
    return {
      this.props.filter
    }
  },
  render: function(){
    return (
      <div>
        <input type="text" placeholder="filter" onKeyUp={this.itemFilter} />
      </div>
    );
  },
  itemFilter: function(e){
    this.setState({filter:e.target.value});
    // console.log(this.state.filter);
  }
});