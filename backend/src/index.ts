import { Hono } from "hono";
import authRouter from "./routes/authRouter";
import blogsApi from "./routes/blogsRouter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { auth } from "hono/utils/basic-auth";
import { cors } from "hono/cors";

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
app.use("/api/*", cors());
//forwarding requests to api routes
app.route("/api/v1/blogs", blogsApi);
app.route("/api/v1/user", authRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
