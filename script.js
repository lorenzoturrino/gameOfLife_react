var Cell = React.createClass({
  getInitialState: function() {
    return {
      alive: false
    };
  },
  handleClick: function() {
    this.setState({alive: !this.state.alive});
  },
  render: function() {
    console.log("hi i'm rendering and i'm", this.state);
  return <td data-alive={this.state.alive} onClick={this.handleClick}>cell proto</td>;
  }
});

var gridSize = 10;

var grid = [];
for(var i = 0; i < gridSize; i++) {
  var row = [];
  for(var j = 0; j < gridSize; j++) {
    row.push(<Cell />);
  }
  grid.push(<tr>{row}</tr>);
}

ReactDOM.render(
  <table className="mainGrid">
    <thead></thead>
    <tbody>
        {grid}
    </tbody>
  </table>,
  document.getElementById('grid')
);
