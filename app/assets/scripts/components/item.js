let React = require('react');
module.exports = React.createClass({
  getInitialState: function(){
    return {
      complete: false
    }
  },
  render: function(){
    let completeClass = '';
    if(this.state.complete === false){
      completeClass = 'incomplete';
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
  toggleTodo: function(){
    this.setState({
      complete: !this.state.complete
    })
    console.log(this.state);
  }
})