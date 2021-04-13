import { useSubscription } from "mqtt-react-hooks";
import { useEffect, useState } from "react";
import Channel from "./channel";

const IDENTIFIERS = process.env.NEXT_PUBLIC_IDENTIFIERS.split(",");
const SUBJECTS = process.env.NEXT_PUBLIC_SUBJECTS.split(",");

const TOPICS = IDENTIFIERS.flatMap((identifier) =>
  SUBJECTS.map((subject) => `${identifier}/${subject}`)
);
const INITIAL_STATE = Object.fromEntries(
  IDENTIFIERS.map((identifier) => [identifier, []])
);

const getLastElementMap = (mapOfLists) => {
  return Object.entries(mapOfLists)
    .map(([key, val]) => {
      return [key, ...val.slice(-1)];
    })
    .reduce((lastElementMap, [key, val]) => {
      lastElementMap[key] = val;
      return lastElementMap;
    }, {});
};

const Dashboard = ({ historical }) => {
  const [moistures, setMoistures] = useState(INITIAL_STATE);
  const [saturations, setSaturations] = useState(INITIAL_STATE);
  const [latestMoistures, setLatestMoistures] = useState(
    getLastElementMap(moistures)
  );
  const [latestSaturations, setLatestSaturations] = useState(
    getLastElementMap(saturations)
  );
  const { message, connectionStatus } = useSubscription(TOPICS);

  useEffect(() => {
    if (!message?.topic) {
      return;
    }
    const parts = message.topic.split("/");
    const [identifier, topic] = [
      parts.slice(0, -1).join("/"),
      ...parts.slice(-1),
    ];

    switch (topic) {
      case "moisture":
        const latestMoisture = { topic, ...message?.message };
        setLatestMoistures({
          ...latestMoistures,
          [identifier]: latestMoisture,
        });
        const moisture = [...moistures[identifier].slice(1), latestMoisture];
        setMoistures({ ...moistures, [identifier]: moisture });
        break;
      case "saturation":
        const latestSaturation = { topic, ...message?.message };
        setLatestSaturations({
          ...latestSaturations,
          [identifier]: latestSaturation,
        });
        const saturation = [
          ...saturations[identifier].slice(1),
          latestSaturations,
        ];
        setSaturations({ ...saturations, [identifier]: saturation });
    }
  }, [message]);

  return (
    <section>
      <div>
        <h2>Live data</h2>
        <p>{`Status: ${connectionStatus}`}</p>
        {IDENTIFIERS.map((id) => (
          <Channel
            key={id}
            id={id}
            moisture={latestMoistures[id]}
            saturation={latestSaturations[id]}
          />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
