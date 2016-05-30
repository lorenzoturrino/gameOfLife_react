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
    // console.log("hi i'm rendering and i'm", this.state);
  return <td data-alive={this.state.alive} onClick={this.handleClick}>cell proto</td>;
  }
});

var gridSize = 3;

var grid = [];
for(var i = 0; i < gridSize; i++) {
  var row = [];
  for(var j = 0; j < gridSize; j++) {
    row.push(<Cell key={j}/>);
  }
  grid.push(<tr key={i}>{row}</tr>);
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

/////////////////////

var CloneCell = React.createClass({
  handleClick: function() {
    this.props.callb();
  },
  render: function() {
  return <td data-alive={this.props.viva} onClick={this.handleClick}>cell proto</td>;
  }
});

var CloneGrid = React.createClass({
  getInitialState: function() {
    return {alive: true};
  },
  switchState: function () {
    this.setState({alive: !this.state.alive});
  },
  render: function() {
    return (
      <td>
        <CloneCell viva={this.state.alive} callb={this.switchState}/>
      </td>
    );
  }
});


ReactDOM.render(
  <table className="secondGrind">
    <thead></thead>
    <tbody>
        <CloneGrid />
    </tbody>
  </table>,
  document.getElementById('experiment')
);
