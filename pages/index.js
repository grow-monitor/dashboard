import dayjs from "dayjs";
import MqttConnector from "../src/components/connector";
import Dashboard from "../src/components/dashboard";
import TechStack from "../src/components/tech-stack";
import prisma from "../src/lib/prisma";

const DashboardPage = ({ moisture, saturation }) => {
  return (
    <>
      <section className="text-primary text-justify leading-snug px-4">
        <h1>My Dashboard</h1>
        <MqttConnector>
          <Dashboard historical={{ moisture, saturation }} />
        </MqttConnector>
      </section>
      <section className="text-primary absolute bottom-0 left-1/2 center-absolute-x">
        <TechStack />
      </section>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const history = await prisma.monitor.findMany({
    where: {
      timestamp: {
        gte: dayjs().subtract(30, "seconds").toDate(),
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
