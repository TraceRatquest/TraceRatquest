
export interface DataI {
    id: string
    spanId: string
    service: string
    route: string 
    duration: number
    timestamp: string
}

export interface CustomTraceI {
    traceId: string
    service: string
    route: string
    duration: string
    status: string 
    timestamp: string
}