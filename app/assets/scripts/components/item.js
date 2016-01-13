let React = require('react');
module.exports = React.createClass({
  render: function(){
    let completeClass = '';
    console.log(this.props);
    if(this.props.complete === false){
      completeClass = 'incomplete';
    } 
    else{
      completeClass = 'complete';
    }
    return (
      <li className="whats-new">
        <label onClick={this.props.onClick} className={completeClass}>
          <input type="checkbox" />
          {this.props.text}
        </label>
      </li>
    )
  }
})