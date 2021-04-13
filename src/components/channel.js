const Channel = ({ id, moisture, saturation }) => {
  const moistureVal = moisture ? moisture.value.toFixed(2) : NaN;
  const saturationVal = saturation ? (saturation.value * 100).toFixed(2) : NaN;
  return (
    <div className="mb-4">
      <h3>Channel {id.split("/").pop()}</h3>
      <table className="table-row">
        <tr>
          <th>Last updated</th>
          <td>{moisture?.timestamp}</td>
        </tr>
        <tr>
          <th>Moisture</th>
          <td>{moistureVal} cycles/s</td>
        </tr>
        <tr>
          <th>Saturation</th>
          <td>{saturationVal}%</td>
        </tr>
      </table>
    </div>
  );
};

export default Channel;
