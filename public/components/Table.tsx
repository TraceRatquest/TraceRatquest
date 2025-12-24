import { DataI } from "../types/types";

interface TablePropsI {
    data: DataI[];
    tableHeaders: string[];
}

export const Table = ({ data, tableHeaders }: TablePropsI) => {

    // TODO: make dexie table component with pagination, sorting, filtering


    return (
        <>
        <table>
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