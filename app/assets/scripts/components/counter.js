let React = require('react');
module.exports = React.createClass({
  render: function(){
    let uid = this.props.uid;
    let counter = 0;
    let completed = this.props.list.filter((item, i) => {
      return item.complete === true;
    }).length;
    if(uid === 'All'){
      counter = this.props.list.length;
    }
    if(uid === 'Active'){
      counter = this.props.list.length - completed;
    }
    if(uid ==='Complete'){
      counter = completed;
    }
    let fancyClass = counter === 0 ? 'hidden' : 'counter';
    return (
      <span className={fancyClass}>{counter}</span>
    )
  }
});