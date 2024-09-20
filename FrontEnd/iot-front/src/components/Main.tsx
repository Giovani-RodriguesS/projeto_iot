'use client'

import Tables from "./ViewTable";
import Cards from "./Cards";
import LineChart from "./dashboard/LineChart";
import Table from "./dashboard/Table";

export default function Main() {
    return (
        <main className="main rounded-b-lg max-w">
            <Cards/>
            <div className="flex justify-around p-3 mt-4 h-3/4 w-full">
            
                <div className="h-full w-3/6">
                    <LineChart/>
                </div>

                <div className="w-3/6">
                    <Table/>
                </div>
            </div>
        </main>
    );

}