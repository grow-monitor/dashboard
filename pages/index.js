import Dashboard from "../src/components/dashboard";
import TechStack from "../src/components/tech-stack";

const DashboardPage = () => {
  return (
    <>
      <section className="text-primary text-justify leading-snug px-4">
        <h1>My Dashboard</h1>
        <Dashboard />
      </section>
      <section className="text-primary absolute bottom-0 left-1/2 center-absolute-x">
        <TechStack />
      </section>
    </>
  );
};

export default DashboardPage;
