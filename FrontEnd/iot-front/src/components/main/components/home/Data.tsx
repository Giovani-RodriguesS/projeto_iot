'use client'

import LineChart from "../../../dashboard/LineChart";
import Table from "../../../dashboard/Table";

export default function Data() {
    return (
        <>
            <div className="h-full w-3/6">
                <LineChart/>
            </div>

            <div className="w-3/6">
                <Table/>
            </div>
        </>
    );

}