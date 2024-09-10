import { Hono } from "hono";
import blogsApi from "./routes/api";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    prisma: any;
  };
}>();

app.use("*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});
//forwarding requests to api routes
app.route("/api/v1/", blogsApi);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
