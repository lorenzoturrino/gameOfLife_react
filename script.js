var Cell = React.createClass({
  handleClick: function() {
    this.props.handleClick(this.props.xPos, this.props.yPos);
  },
  render: function() {
    return <td data-alive={this.props.alive} onClick={this.handleClick}>Cell!</td>;
  }
});

var Grid = React.createClass({
  getInitialState: function() {
    return {gridState: this.createGrid(this.stateBuilder,3)};
  },
  toggleCellState: function(xpos, ypos) {
    var gridState = this.state.gridState;
    gridState[xpos][ypos] = !gridState[xpos][ypos];
    this.setState({gridState: gridState});
  },
  createGrid: function(buildFunction, gridSize) {
    var grid = [];
    for(var i = 0; i < gridSize; i++) {
      var row = [];
      for(var j = 0; j < gridSize; j++) {
        row.push(buildFunction(i,j));
      }
      grid.push(row);
    }
    return grid;
  },
  stateBuilder: () => true,
  cellBuilder: function(xpos, ypos) {
    return (<Cell alive={this.state.gridState[xpos][ypos]} handleClick={this.toggleCellState} xPos={xpos} yPos={ypos}/>);
  },
  render: function() {
    return (
      <tbody>
        {
          this.createGrid(this.cellBuilder,3)
            .map(row => <tr>{row}</tr>)
        }
      </tbody>
    );
  }
});

ReactDOM.render(
  <table className="secondGrind">
    <thead></thead>
      <Grid />
  </table>,
  document.getElementById('grid')
);
