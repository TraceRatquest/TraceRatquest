import { Elysia, t } from "elysia";
import { onStartServer } from "./core/cli";
import { prisma } from "../lib/pisma";
import { TracePlainInputCreate } from "./generated/prismabox/Trace";
import { auth } from "../lib/auth";
import staticPlugin from "@elysiajs/static";

await onStartServer();


const app = new Elysia()
  .use(await staticPlugin({
    prefix: '/'
  }))
  // server frontend 
  .get("/server", () => "Ratquest Trace server")
  .post(
    "/trace",
    async ({ body }) => prisma.trace.create({
      data: body
    }),
    {
      beforeHandle: [auth],
      body: TracePlainInputCreate
    }
  )
  .get(
    "/trace",
    async ({ query }) => {
      const { spanId, service, route, latency } = query;
      const where: any = {};
      if (spanId) where.spanId = spanId;
      if (service) where.service = service;
      if (route) where.route = route;
      if (latency) where.duration = { gte: latency };

      return prisma.trace.findMany({
        where,
        orderBy: { timestamp: "desc" },
        take: 50
      });
    },
    {
      query: t.Object({
        spanId: t.Optional(t.String()),
        service: t.Optional(t.String()),
        route: t.Optional(t.String()),
        latency: t.Optional(t.Integer())
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
