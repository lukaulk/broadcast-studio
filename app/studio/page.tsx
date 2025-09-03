import Header from "./components/header";

export const metadata = {
  title: "Broadcast Studio",
  description: "A simple broadcast studio application.",
};
export default function Studio() {
  return (
    <div className="flex h-dvh w-full bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)]">
      <Header />
    </div>
  );
}
