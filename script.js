var Cell = React.createClass({
  handleClick: function() {
    this.props.handleClick(this.props.xPos, this.props.yPos);
  },
  render: function() {
    return <td data-alive={this.props.alive} onClick={this.handleClick}>Cell!</td>;
  }
});


function newGridState() {
  var gridSize = 3;
  var grid = [];
  for(var i = 0; i < gridSize; i++) {
    var row = [];
    for(var j = 0; j < gridSize; j++) {
      row.push(false);
    }
    grid.push(row);
  }
  return grid;
}

var Grid = React.createClass({
  getInitialState: function() {
    return {cellsAlive: newGridState()};
  },
  handleClick: function(xpos, ypos) {
    console.log("clicking on", xpos, ypos);
  },
  newGridState: function() {

  },
  buildGrid: function() {
    var gridSize = 3;
    var grid = [];
    for(var i = 0; i < gridSize; i++) {
      var row = [];
      for(var j = 0; j < gridSize; j++) {
        row.push(<Cell
                    alive={this.state.cellsAlive[i][j]}
                    handleClick={this.handleClick}
                    xPos={i}
                    yPos={j}
                  />);
      }
      grid.push(<tr>{row}</tr>);
    }
    return grid;
  },
  render: function() {
    console.log(this.buildGrid());
    return (
      <tbody>
        {this.buildGrid()}
      </tbody>
    );
  }
});


// for(var i = 0; i < gridSize; i++) {
//   var row = [];
//   for(var j = 0; j < gridSize; j++) {
//     row.push(<Cell
//                 alive="true"
//                 handleClick={this.handleClick}
//                 xPos={i}
//                 yPos={j}
//               />);
//   }
//   grid.push(row);
// }
/////////////////////



ReactDOM.render(
  <table className="secondGrind">
    <thead></thead>
      <Grid />
  </table>,
  document.getElementById('grid')
);
