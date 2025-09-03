import Header from "./components/header";
import OptionBar from "./components/optionBar";
import SideBar from "./components/sideBar";
import StatusBar from "./components/statusBar"; 

export const metadata = {
  title: "Broadcast Studio",
  description: "A simple broadcast studio application.",
};
export default function Studio() {
  return (
    <div className="flex flex-col h-dvh w-full bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)]">
      <Header />
      <div className="flex flex-1 w-full">
        <OptionBar />
        <SideBar />
      </div>

    <StatusBar />
    </div>
  );
}
