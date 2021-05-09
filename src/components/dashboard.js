import { useEffect, useState } from "react";
import { streamDocument } from "../lib/fauna";

const Dashboard = () => {
  const [status, setStatus] = useState("Connecting to Fauna Stream API...");
  const [data, setData] = useState({});
  const handleStart = (message) => setStatus(message);
  const handleSnapshot = (data) => setData(data);
  const handleUpdate = (data) => setData(data);
  useEffect(
    () =>
      streamDocument(
        process.env.NEXT_PUBLIC_SAMPLE_DOCUMENT_ID,
        handleStart,
        handleSnapshot,
        handleUpdate
      ),
    []
  );

  return (
    <section>
      <div>
        <h2>Live data</h2>
        <p>{`Status: ${status}`}</p>
        <p>{`Data: ${JSON.stringify(data, null, 2)}`}</p>
      </div>
    </section>
  );
};

export default Dashboard;
