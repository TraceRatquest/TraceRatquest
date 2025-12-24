import { useEffect, useState } from "react"
import { Table } from "./components/Table"
import { useQuery } from "@tanstack/react-query"
import { db } from "./models/db"
import { Trace } from "./models/Trace"

export const Home = () => {

    const [refetchedData, setRefetchedData] = useState<Trace[]>([])

    const getTraces = async () => {
        const response = await fetch("/trace")
        return await response.json()
    }

    const { data = [], isError, refetch, isRefetching } = useQuery({
        queryKey: ["traces"],
        queryFn: getTraces,
        refetchInterval: 3000
    })

    

    useEffect(() => {
        try {
            if (data.length > 0) {
                db.deleteTraceData()
                Promise.all(data.map((trace: Trace) => db.trace.add(trace)))
            }
            setRefetchedData(data)
        } 
        catch (error) {
            console.error("Failed to store traces in IndexedDB", error)
        }
        console.log("Data fetched:", data)
    }, [data, refetchedData])

    const refetchData = () => {
        refetch()
        setRefetchedData(data)
    }



    return (
        <div className="container-md">
            <div className="d-flex justify-content-between m-3 p-3 border-bottom">
                <h1>Welcome to Ratquest Trace</h1>
                <button onClick={refetchData}>Refresh</button>
            </div>
            {isError && <>
                <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Error!</strong> <a href="#" className="alert-link">Report bug</a> Fetch traces failed.
                </div>
            </>}
            
            <Table data={refetchedData} 
                    tableHeaders={["id", "Span ID", "Service", "Route", "Duration", "Status", "Time"]}
                    callback={refetchData} />
        </div>
    )
}