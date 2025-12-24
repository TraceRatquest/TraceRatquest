import { prisma } from "./pisma";

export const auth = async (context: any) => {
    const apiKey = context.request.headers.get("X-API-KEY");
    if (!apiKey) return new Response("Unauthorized", { status: 401 });
    const key = await prisma.apiKey.findUnique({ where: { key: apiKey }})
    if (!key) return new Response("Unauthorized", { status: 401 });
}