export interface Trace {
    id?: string;
    spanId: string;
    service: string;
    route: string;
    duration: number;
    status: string;
    timestamp: string;
}