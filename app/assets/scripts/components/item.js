let React = require('react');
module.exports = React.createClass({
  render: function(){
    let {todo, complete, id} = this.props.item;
    let completeClass = '';
    if(complete === false){
      completeClass = 'incomplete todos';
    } 
    else{
      completeClass = 'complete todos';
    }
    return (
      <li className={completeClass}>
        <label onClick={this.props.toggleTodo(id)}>
          <input type="checkbox" checked={complete} />
          {todo}
        </label>
      </li>
    )
  }
})