let React = require('react');
let ReactDOM = require('react-dom');
module.exports = React.createClass({
  getDefaultProps: function(){
    return {
      menuItems: [
        {uid: 'All'},
        {uid: 'Active'},
        {uid: 'Complete'}
      ]
    }
  },
  getInitialState: function(){
    return{
      activeMenuItem: 'All'
    };
  },
  render:function(){
    let menuItems = this.props.menuItems.map((item, i) =>{
      return (
        <li key={i}><a className={this.state.activeMenuItem === item.uid ? 'active menu-item' : 'inactive menu-item'} onClick={this.sortItems} href="#">{item.uid}</a></li>
      )
    });
    return (
      <footer>
        <ul>
          {menuItems}
        </ul>
      </footer>
    )
  },
  sortItems: function(e){
    e.preventDefault();
    this.setState({activeMenuItem: e.target.text});
  }
})