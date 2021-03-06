var Cell = React.createClass({
  handleClick: function() {
    this.props.handleClick(this.props.xPos, this.props.yPos);
  },
  render: function() {
    return <td data-alive={this.props.alive} onClick={this.handleClick}></td>;
  }
});

var Grid = React.createClass({
  getInitialState: function() {
    return {
      gridState: this.createGrid(this.stateBuilder),
      evolving: false,
      looper: null,
      generationNumber: 0
    };
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
    var that = this;
    return function(xpos, ypos) {
      var sum = 0;
      for(var i = xpos-1; i < xpos+2; i++) {
        for(var j = ypos-1; j < ypos+2; j++) {
          if(oldGrid[i] !== undefined && oldGrid[i][j] !== undefined) {
            if(!(i === xpos && j === ypos) && oldGrid[i][j] === true) {
              sum += 1;
            }
          }
        }
      }
      return that.survivalRules(sum, oldGrid[xpos][ypos]);
    };
  },
  survivalRules: function(number, state) {
    if(number === 3 || (state && number === 2)) {
      return true;
    }
    return false;
  },
  stepGridState: function() {
    this.setState({gridState: this.createGrid(this.stepBuilder(this.state.gridState)), generationNumber: this.state.generationNumber + 1});
  },
  clearGrid: function() {
    clearInterval(this.state.looper);
    this.setState({gridState: this.createGrid(this.stateBuilder),evolving: false,generationNumber: 0});
  },
  createGrid: function(buildFunction) {
    var grid = [];
    for(var i = 0; i < this.props.gridSize; i++) {
      var row = [];
      for(var j = 0; j < this.props.gridSize; j++) {
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
  toggleEvolution: function() {
    if(this.state.evolving) {
      clearInterval(this.state.looper);
    } else {
      this.state.looper = setInterval(this.stepGridState,150);
    }
    this.setState({evolving: !this.state.evolving});
  },
  printLooperStatus: function() {
    if(this.state.evolving) {
      return "ON";
    }
    return "OFF";
  },
  componentWillUnmount: function() {
    clearInterval(this.state.looper);
  },
  render: function() {
    return (
      <div className="gridGroup">
        <button onClick={this.clearGrid}>Clear Grid</button>
        <button onClick={this.stepGridState}>Single Step</button>
        <button onClick={this.toggleEvolution}>Toggle Stepping</button>
        <div className="gridSize">
          Grid size: <input className="gridSizeBox" type="text" value={this.props.gridSize} onChange={this.props.sizeFunc}/>
        </div>
        <p className="genCounter">Generation number: {this.state.generationNumber}</p>
        <p data-stepping={this.printLooperStatus()}>Auto-Stepping is {this.printLooperStatus()}</p>
        <table className="mainGrid">
          <thead></thead>
          <tbody>
            {
              this.createGrid(this.cellBuilder)
                .map(row => <tr>{row}</tr>)
            }
          </tbody>
        </table>
      </div>
    );
  }
});


var GridContainer = React.createClass({
  getInitialState: function() {
    return {
      size: 30
    };
  },
  setSize: function(evt) {
    this.setState({size: evt.target.value});
  },
  render: function() {
    return (
      <Grid key={this.state.size} gridSize={this.state.size} sizeFunc={this.setSize} />
    );
  }
});

ReactDOM.render(
  <GridContainer />,
  document.getElementById('grid')
);
