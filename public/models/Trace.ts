export interface Trace {
    id?: string;
    traceId: string;
    service: string;
    route: string;
    duration: number;
    status: string;
    timestamp: string;
}