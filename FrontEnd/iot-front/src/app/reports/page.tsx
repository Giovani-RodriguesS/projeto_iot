import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Report() {
    return (
        <div className="flex h-screen bg-neutral-100">
            <Sidebar/>
            <div className="flex-1 mr-5 mt-10">
                <Header title="Reports"/>
            </div>
        </div>
    );
}