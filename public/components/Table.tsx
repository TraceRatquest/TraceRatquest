import { Trace } from "../models/Trace";
import { CustomTraceI } from "../types/types";

interface TablePropsI {
    data: Trace[] | CustomTraceI[];
    tableHeaders: string[];
    callback: () => void;
}

export const Table = ({ data, tableHeaders, callback }: TablePropsI) => {

    // TODO: make dexie table component with pagination, sorting, filtering

    const traceRequest = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        const traceId = e.currentTarget.innerText
        console.log("Trace ID clicked -> ", traceId)
    }

    return (
        <>
            <table className="table-def table-hover">
                <thead>
                    <tr>
                        {tableHeaders.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* {data.map((row, index) => (
                        <>
                            <tr className="table-active" key={index} >
                                {Object.values(row).map((value, index) => (
                                    <>
                                        <td key={index}>
                                            {value}
                                        </td>
                                    </>
                                ))}
                            </tr>
                        </>
                    ))} */}
                    {data.map((row, index) => {
                        return row.traceId && (
                            <tr key={index}>
                                <td className="traceid-style" onClick={traceRequest}>{row.traceId}</td>
                                <td>{row.service}</td>
                                <td>{row.route}</td>
                                <td>{row.duration}</td>
                                <td className={
                                    row.status.toString().includes("200") && "status-success" ||
                                    row.status.toString().includes("304") && "status-bad" || ""
                                }>{row.status}</td>
                                <td>{row.timestamp}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}