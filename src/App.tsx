import { QueryProvider } from "./Provider/QueryProvider";
import { ServicesDisplay } from "./features/services/pages/ServicesDisplay";

function App() {
  // const { data } = useServices();
  // console.log("data", data);

  return (
    <QueryProvider>
      <section className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-black-500 font-bold text-xl ">
          Customer Service Booking System
        </h1>
        <ServicesDisplay />
      </section>
    </QueryProvider>
  );
}

export default App;
