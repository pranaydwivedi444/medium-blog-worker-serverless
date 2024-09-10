import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";
import { authMiddleware } from "../Middlewares/authMiddleware";

const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("welcome to blogs");
});

app.post("/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //fetching body
  const body = await c.req.json();
  //create user in db
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    const secret = c.env.JWT_SECRET;
    const JWT = await sign({ id: user.id }, secret);
    // return jwt token
    return c.json({
      jwt: JWT,
    });
  } catch (err) {
    c.status(403);
    return c.json({ error: `error while signingup + ${err}` });
  }
});

app.post("/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

// app.use("/blog/*", async (c, next) => {
//   //do Authenication here
//   await next();
// });
//using auth middleware
app.use("/blog/*", authMiddleware);

app.get("/blog/bulk", (c) => {
  return c.text("blogs");
});

app.get("/blog/:id", (c) => {
  return c.text("done");
});

app.post("/blog/", (c) => {
  return c.text("done");
});

app.put("/blog/", (c) => {
  return c.text("done");
});

export default app;
