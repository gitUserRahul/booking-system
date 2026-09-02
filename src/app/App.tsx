import { QueryProvider } from "./Provider/QueryProvider";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <QueryProvider>
      <section className="flex flex-col items-center  min-h-screen py-2">
        <h1 className="text-black-500 font-bold text-xl">
          Customer Service Booking System
        </h1>
        {/* Child routes (ServicesDisplay or SingleServicePage) render here */}
        <Outlet />
      </section>
    </QueryProvider>
  );
}

export default App;
