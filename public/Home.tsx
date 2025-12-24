import { useEffect, useState } from "react"
import { Table } from "./components/Table"
import { DataI } from "./types/types"
import { useQuery } from "@tanstack/react-query"

export const Home = () => {
    const [fetchedTraces, setFetchedTraces] = useState<DataI[]>([])

    const getTraces = async () => {
        const response = await fetch("/traces")
        return await response.json()
    }

    const { data, isError, isFetched } = useQuery({
        queryKey: ["traces"],
        queryFn: getTraces,
    })

    if (isFetched && data ) {
        setFetchedTraces(data)
    }

    useEffect(() => {

    }, [fetchedTraces])



    return (
        <div>
            <h1>Welcome to Ratquest Trace</h1>
            {isError && <>
                <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Error!</strong> <a href="#" className="alert-link">Report bug</a> Fetch traces failed.
                </div>
            </>}
            
            <Table data={fetchedTraces} tableHeaders={["id", "Span ID", "Service", "Route", "Duration", "Status", "Time"]} />
        </div>
    )
}