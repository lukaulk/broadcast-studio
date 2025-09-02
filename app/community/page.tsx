import Header from "@/src/components/home/Header";

export default function CommunityPage(){
       return (<>
        <Header />
        <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-cyan-900/30">
            <h1 className="text-4xl sm:text-5xl font-bold text-center"> 
                Join the <span className="text-cyan-400">Broadcast Studio</span> Community! 
            </h1>
        </div>
        </>)
}