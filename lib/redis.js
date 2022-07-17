import { Client, Entity, Schema } from "redis-om";

const client = new Client();

// Connects to client if not already open
async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.NEXT_PUBLIC_REDIS_URL);
  }
}

// Schema for post content
class Post extends Entity {}

let schema = new Schema(
  Post,
  {
    category: { type: "string" },
    content: { type: "text", textSearch: true },
    excerpt: { type: "text", textSearch: true },
    heroImage: { type: "string" },
    publishedAt: { type: "date" },
    series: { type: "text", textSearch: true },
    slug: { type: "string" },
    title: { type: "text", textSearch: true },
  },
  {
    dataStructure: "JSON",
  }
);

export async function createPost(post) {
  await connect();

  const {
    category: { name },
    content,
    excerpt,
    heroImage: { url },
    publishedAt,
    slug,
    title,
  } = post;

  let seriesTitle;
  if (post.series != null) {
    seriesTitle = post.series.seriesTitle;
  } else {
    seriesTitle = "";
  }

  const repository = client.fetchRepository(schema);

  const newPost = repository.createEntity({
    category: name,
    excerpt,
    content,
    publishedAt,
    slug,
    series: seriesTitle,
    title,
    heroImage: url,
  });

  const id = await repository.save(newPost);

  await client.close();

  return id;
}

export async function createIndex() {
  await connect();

  const repository = client.fetchRepository(schema);

  await repository.createIndex();

  await client.close();
}

export async function searchPosts(q) {
  await connect();

  const repository = client.fetchRepository(schema);
  const posts = await repository
    .search()
    .where("title")
    .matches(q)
    .or("excerpt")
    .matches(q)
    .or("content")
    .matches(q)
    .or("series")
    .matches(q)
    .or("category")
    .eq(q)
    .return.all();

  await client.close();

  return posts;
}
