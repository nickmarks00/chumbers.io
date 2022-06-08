import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

// Connects to client if not already open
async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

// Schema for post content
class Post extends Entity {}

let schema = new Schema(
  Post,
  {
    title: { type: "string" },
    excerpt: { type: "string", textSearch: true },
    content: { type: "string", textSearch: true },
  },
  {
    dataStructure: "JSON",
  }
);

export async function createPost(data) {
  await connect();

  console.log(data);

  const repository = new Repository(schema, client);

  const post = repository.createEntity(data);

  const id = await repository.save(post);
  return id;
}
