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
    content: { markdown },
    excerpt,
    heroImage: { url },
    publishedAt,
    series: { seriesTitle },
    slug,
    title,
  } = post;

  const repository = client.fetchRepository(schema);

  const newPost = repository.createEntity({
    name,
    excerpt,
    markdown,
    publishedAt,
    slug,
    seriesTitle,
    title,
    url,
  });

  const id = await repository.save(newPost);
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
