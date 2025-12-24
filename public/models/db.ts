import Dexie, { Table } from "dexie";
import { Trace } from "./Trace";

export class TraceLocalDB extends Dexie {
    trace!: Table<Trace, string>

    constructor() {
        super("TraceLocalDB")
        this.version(1).stores({
            trace: 'id, spanId, service, route, duration, status, timestamp'
        })
    }

    deleteTraceData = async () => {
        return await this.trace.clear()
    }

}

export const db = new TraceLocalDB()

// db.on("populate")
