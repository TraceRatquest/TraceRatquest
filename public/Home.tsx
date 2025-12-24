import { useEffect, useState } from "react"
import { Table } from "./components/Table"
import { useQuery } from "@tanstack/react-query"
import { db } from "./models/db"
import { Trace } from "./models/Trace"

export const Home = () => {

    const getTraces = async () => {
        const response = await fetch("/trace")
        return await response.json()
    }

    const { data = [], isError } = useQuery({
        queryKey: ["traces"],
        queryFn: getTraces,
    })

    useEffect(() => {
        try {
            if (data.length > 0) {
                db.deleteTraceData()
                Promise.all(data.map((trace: Trace) => db.trace.add(trace)))
            }
        } 
        catch (error) {
            console.error("Failed to store traces in IndexedDB", error)
        }
    }, [data])

    const refetchData = () => {
        console.log("callback called")
    }



    return (
        <div>
            <h1>Welcome to Ratquest Trace</h1>
            {isError && <>
                <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Error!</strong> <a href="#" className="alert-link">Report bug</a> Fetch traces failed.
                </div>
            </>}
            
            <Table data={data} 
                    tableHeaders={["id", "Span ID", "Service", "Route", "Duration", "Status", "Time"]}
                    callback={refetchData} />
        </div>
    )
}