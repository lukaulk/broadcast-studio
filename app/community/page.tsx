import Header from "@/components/home/Header";

export default function CommunityPage() {
  return (
    <>
      <Header headerText="Community" noHomeLink />
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-b bg-black text-white">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
          <span className="text-white">Community!</span> 
        </h1>
      </div>
    </>
  );
}
