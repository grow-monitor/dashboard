import dayjs from "dayjs";
import MqttConnector from "../src/components/connector";
import Dashboard from "../src/components/dashboard";
import prisma from "../src/lib/prisma";

const DashboardPage = ({ moisture, saturation }) => {
  return (
    <section className="text-primary text-justify leading-snug px-4">
      <h2>My Dashboard</h2>
      <MqttConnector>
        <Dashboard historical={{ moisture, saturation }} />
      </MqttConnector>
    </section>
  );
};

export const getServerSideProps = async (context) => {
  const history = await prisma.monitor.findMany({
    where: {
      timestamp: {
        gte: dayjs().subtract(10, "seconds").toDate(),
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  const moisture = history.filter((data) => data.topic.endsWith("moisture"));
  const saturation = history.filter((data) =>
    data.topic.endsWith("saturation")
  );
  return {
    props: { moisture, saturation },
  };
};

export default DashboardPage;
