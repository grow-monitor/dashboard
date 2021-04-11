import { useSubscription } from "mqtt-react-hooks";
import { useEffect, useState } from "react";

const getLastElement = (arr) => arr.slice(arr.length - 1)[0];

const Dashboard = ({ historical }) => {
  const [moisture, setMoisture] = useState(historical.moisture);
  const [saturation, setSaturation] = useState(historical.saturation);
  const [latestMoisture, setLatestMoisture] = useState(
    getLastElement(moisture)
  );
  const [latestSaturation, setLatestSaturation] = useState(
    getLastElement(saturation)
  );
  const { message, connectionStatus } = useSubscription([
    "mock/moisture",
    "mock/saturation",
  ]);

  useEffect(() => {
    if (message?.topic) {
      const topic = message.topic.split("/").pop();
      switch (topic) {
        case "moisture":
          setLatestMoisture({ topic, ...message?.message });
          setMoisture([...moisture.slice(1), latestMoisture]);
          break;
        case "saturation":
          setLatestSaturation({ topic, ...message?.message });
          setSaturation([...saturation.slice(1), latestSaturation]);
      }
    }
  }, [message]);

  return (
    <section>
      <div>
        <h3>Live data</h3>
        <p>{`Status: ${connectionStatus}`}</p>
        <p>{`Topic: ${latestSaturation.topic} / Value: ${latestSaturation.value} / Last updated: ${latestSaturation.timestamp}`}</p>
        <p>{`Topic: ${latestMoisture.topic} / Value: ${latestMoisture.value} / Last updated: ${latestMoisture.timestamp}`}</p>
      </div>
      <div>
        <h3>Historical data (last 30 seconds)</h3>
        <p>Saturation</p>
        <p>{JSON.stringify(saturation)}</p>
        <p>Moisture</p>
        <p>{JSON.stringify(moisture)}</p>
      </div>
    </section>
  );
};

export default Dashboard;
