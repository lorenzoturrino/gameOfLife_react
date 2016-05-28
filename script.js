var Cell = React.createClass({
  getInitialState: function() {return null},
  render: function() {
  return (<tr>hi</tr>);
}
});

ReactDOM.render(
  <table className="mainGrid">
    <thead></thead>
    <tbody>
      <Cell />
    </tbody>
  </table>,
  document.getElementById('grid')
)
