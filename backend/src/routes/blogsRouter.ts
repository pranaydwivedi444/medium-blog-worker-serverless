import { Hono } from "hono";
import { decode, jwt, sign, verify } from "hono/jwt";
import { authMiddleware } from "../Middlewares/authMiddleware";
import {createBlogInput,updateBlogInput} from "pranaydwivedi444-zodvalidation-blog"
const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
  Variables: {
    prisma: any;
    authorId: string;
  };
}>();

// app.use("/blog/*", async (c, next) => {
//   //do Authenication here
//   await next();
// });
//using auth middleware
app.use("/*", authMiddleware);

app.get("/", (c) => {
  return c.text("welcome to blogs");
});

app.get("/bulk", async (c) => {
  //implementing bottom loading
  const primsa = c.get("prisma");
  const limit = c.req.query("limit") || 10;
  const cursorId = c.req.query("cursor") || 0;
  try {
    const posts = await primsa.post.findMany({
      take: limit,
      skip: cursorId ? 1 : 0,
      cursor: cursorId ? { id: cursorId } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;
    return c.json({
      nextId: nextCursor,
      posts,
    });
  } catch (error) {
    return c.text("error fecthing" + error, 500);
  }
});

app.get("/:id", async (c) => {
  const primsa = c.get("prisma");
  const postId = c.req.param("id");
  try {
    const post = await primsa.post.findUnique({
      where: {
        id: postId,
      },
    });

    return c.json(
      {
        post,
      },
      200
    );
  } catch (error) {
    return c.text("error fetching" + error, 500);
  }
});

app.post("/", async (c) => {
  const authorID = c.get("authorId");
  const prisma = c.get("prisma");
  try {
    const body = await c.req.json();
    //adding zod validation 
    const {success} = createBlogInput.safeParse(body);
     if(!success){
      throw new Error("invalid inputs");
    }
    //take primsa and post blogs
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorID,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    return c.text("Error creating blog" + error);
  }
});

app.put("/", async (c) => {
  const authorID = c.get("authorId");
  const prisma = c.get("prisma");
  try {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      throw new Error("invalid inputs");
    }
    //take primsa and post blogs
    const blog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: authorID,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.text("updated post");
  } catch (error) {
    return c.text("Error updating  blog" + error);
  }
});

export default app;
