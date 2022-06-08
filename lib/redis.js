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
    title: { type: "text", textSearch: true },
    excerpt: { type: "text", textSearch: true },
    content: { type: "text", textSearch: true },
    series: { type: "text", textSearch: true },
    category: { type: "string" },
    publishedAt: { type: "string" },
    slug: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

export async function createPost(data) {
  await connect();

  const { title, excerpt, content, publishedAt, series, category } = data;

  const repository = client.fetchRepository(schema);

  const post = repository.createEntity({
    title,
    excerpt,
    content,
    publishedAt,
    series,
    category,
    slug,
  });

  const id = await repository.save(post);
  return id;
}

export async function createIndex() {
  await connect();

  const repository = client.fetchRepository(schema);

  await repository.createIndex();
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

  return posts;
}
