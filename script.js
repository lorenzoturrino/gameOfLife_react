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
  setCellState: function(xpos, ypos, alive) {
    var gridState = this.state.gridState;
    gridState[xpos][ypos] = alive;
    this.setState({gridState: gridState});
  },
  stepBuilder: function(oldGrid) {
    console.log("building stepper");
    return function(xpos, ypos) {
      // console.log("sum stuff");
      var sum = 0;
      for(var i = xpos-1; i < xpos+1; i++) {
        for(var j = ypos-1; j < ypos+1; j++) {
          if(oldGrid[i] !== undefined && oldGrid[i][j] !== undefined) {
            if(oldGrid[i][j] === true) {
              sum += 1;
            }
          }
        }
      }
      return true;
      return survivalRules(sum, oldGrid[i][j]);
    };
  },
  survivalRules: function(number, state) {
    // a < 2 false
    // a 2,3 true
    // a > 3 false

  },
  stepGridState: function() {
    // console.log("stepgrid", this.stepBuilder(this.state.gridState));
    this.setState({gridState: this.createGrid(this.stepBuilder(this.state.gridState),3)});
  },
  createGrid: function(buildFunction, gridSize) {
    var grid = [];
    for(var i = 0; i < gridSize; i++) {
      var row = [];
      for(var j = 0; j < gridSize; j++) {
        // console.log("gridding", buildFunction);
        row.push(buildFunction(i,j));
      }
      grid.push(row);
    }
    return grid;
  },
  stateBuilder: () => false,
  cellBuilder: function(xpos, ypos) {
    return (<Cell alive={this.state.gridState[xpos][ypos]} handleClick={this.toggleCellState} xPos={xpos} yPos={ypos}/>);
  },
  render: function() {
    return (
      <div>
        <table className="grinding">
          <thead></thead>
          <tbody>
            {
              this.createGrid(this.cellBuilder,3)
                .map(row => <tr>{row}</tr>)
            }
          </tbody>
        </table>
        <button onClick={this.stepGridState}>Step me</button>
      </div>
    );
  }
});

ReactDOM.render(
  <Grid />,
  document.getElementById('grid')
);
