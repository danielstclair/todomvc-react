let React = require('react');
module.exports = React.createClass({
  getInitialState: function(){
    return{
      complete: false
    }
  },
  render: function(){
    let completeClass = '';
    if(this.state.complete === false){
      completeClass = 'active';
    } 
    else{
      completeClass = 'complete';
    }
    return (
      <li className="whats-new">
        <label onClick={this.toggleTodo} className={completeClass}>
          <input type="checkbox" />
          {this.props.text}
        </label>
      </li>
    )
  },
  toggleTodo: function(e){
    let newState = !this.state.complete;
    this.setState({
      complete: newState
    })
    this.props.toggleTodo({todo: this.props.text, complete: newState, id: this.props.id});
  }
})