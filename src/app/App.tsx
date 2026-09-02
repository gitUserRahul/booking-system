import { QueryProvider } from "./Provider/QueryProvider";
import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/Navbar";

function App() {
  return (
    <QueryProvider>
      <Navbar />
      <section className="flex flex-col items-center  min-h-screen py-2">
        {/* Child routes (ServicesDisplay or SingleServicePage) render here */}
        <Outlet />
      </section>
    </QueryProvider>
  );
}

export default App;
