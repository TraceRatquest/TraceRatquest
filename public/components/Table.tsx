import { Trace } from "../models/Trace";

interface TablePropsI {
    data: Trace[];
    tableHeaders: string[];
    callback: () => void;
}

export const Table = ({ data, tableHeaders, callback }: TablePropsI) => {

    // TODO: make dexie table component with pagination, sorting, filtering


    return (
        <>
        <table className="table table-hover">
            <thead>
                <tr>
                    {tableHeaders.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} >
                        {Object.values(row).map((value, index) => (
                            <td key={index}>
                                {value}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}