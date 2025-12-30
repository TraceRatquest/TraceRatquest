import { useEffect, useState, Suspense } from "react"
import { Table } from "./components/Table"
import { useQuery } from "@tanstack/react-query"
import { db } from "./models/db"
import { Trace } from "./models/Trace"
import { CustomTraceI } from "./types/types"
import { Navbar } from "./components/Navbar"
import { Loading } from "./components/Loading"

export const Home = () => {

    const [refetchedData, setRefetchedData] = useState<Trace[]>([])
    const [customTraces, setCustomTraces] = useState<CustomTraceI[]>([])

    const getTraces = async () => {
        const response = await fetch("/trace")
        return await response.json()
    }

    const { data = [], isError, isLoading } = useQuery({
        queryKey: ["traces"],
        queryFn: getTraces,
        refetchInterval: 3000,
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
    }, [data])

    useEffect(() => {
        const localData = [] as CustomTraceI[]
        refetchedData.forEach((trace) => {
            const customTrace: CustomTraceI = {
                traceId: trace.traceId,
                service: trace.service,
                route: trace.route,
                duration: `${trace.duration} ms`,
                status: trace.status,
                timestamp: new Date(trace.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                })
                
            }
            localData.push(customTrace)
        })
        setCustomTraces(localData)
    }, [refetchedData])


    return (
        <div className="container">
            <Navbar />

            <div className="main-content">
                <h1>Welcome to Ratquest Trace</h1>
                
                {/* error showcase */}
                {isError && <>
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                        <strong>Error!</strong> <a href="#" className="alert-link">Report bug</a> Fetch traces failed.
                    </div>
                </>}

                {isLoading && <Loading />}
                <Table data={customTraces} 
                            tableHeaders={["Trace ID", "Service", "Route", "Duration", "Status", "Time"]}
                            callback={() => {}} />

            </div>

        </div>
    )
}