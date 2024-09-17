import { MiddlewareHandler } from "hono";
import { decode, jwt, sign, verify } from "hono/jwt";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from "hono/cookie";

export const authMiddleware: MiddlewareHandler = async function (c, next) {
  try {
    // const headerToken = c.req.header("Authorization") || "";
    // const token = headerToken.split(" ")[1];
    const cookie_secret = c.env.COOKIE_SECRET;
    const token = await getSignedCookie(c, cookie_secret, "bearer_token");
    if (!token) {
      c.status(401);
      return c.json({
        message: "Tokken missing",
      });
    }

    const secret = c.env.JWT_SECRET;
    const response = await verify(token, secret);
    if (response.id) {
      c.set("authorId", response.id);
      await next();
    }
  } catch (error) {
    c.status(401);
    return c.json({
      message: "Tokken error" + error,
    });
  }
};
