import { Hono } from "hono";
import { decode, jwt, sign, verify } from "hono/jwt";
import {  signupInput, signinInput} from "pranaydwivedi444-zodvalidation-blog";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from "hono/cookie";
const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    COOKIE_SECRET: string;
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
  const { success } = signupInput.safeParse(body);
  if (!success) {
    return c.text("invalid inputs", 411);
  }
  //create user in db
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return c.json({ error: "User already exists" }, 409); // Conflict status code
    }

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
    const cookie_secret = c.env.COOKIE_SECRET;
    await setSignedCookie(c, "bearer_token", JWT, cookie_secret, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    // return jwt token
    return c.json({
      message: "successfull signed in",
      success : true,
    });
  } catch (err) {
    c.status(403);
    return c.json({ error: `error while signingup + ${err}` });
  }
});

app.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return c.text("invalid inputs", 411);
  }
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
  const cookie_secret = c.env.COOKIE_SECRET;
  await setSignedCookie(c, "bearer_token", jwt, cookie_secret, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "None",
    secure: true,
    httpOnly: true,
  });
  return c.json({ message :"successfully signed in ", success: true });
});

export default app;
