import { Hono } from "hono";
import { decode, jwt, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
  Variables: {
    prisma: any;
  };
}>();

app.get("/", (c) => {
  return c.text("welcome to blogs");
});

app.post("/signup", async (c) => {
  //fetching body
  const body = await c.req.json();
  const prisma = c.get("prisma");
  //create user in db
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name || " ",
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

app.post("/signin", async (c) => {
  const prisma = c.get("prisma");
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

export default app;
