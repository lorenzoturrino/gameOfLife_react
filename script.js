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

ReactDOM.render(
  <table className="mainGrid">
    <thead></thead>
    <tbody>
      <tr>
        <Cell />
      </tr>
    </tbody>
  </table>,
  document.getElementById('grid')
);
