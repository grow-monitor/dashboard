import { Connector } from "mqtt-react-hooks";

const brokerUrl = `wss://${process.env.NEXT_PUBLIC_MQTT_HOST}:${process.env.NEXT_PUBLIC_MQTT_PORT}`;

const options = {
  username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
  password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
};

const MqttConnector = ({ children }) => (
  <Connector
    brokerUrl={brokerUrl}
    options={options}
    parserMethod={(msg) => JSON.parse(msg.toString())}
  >
    {children}
  </Connector>
);

export default MqttConnector;
