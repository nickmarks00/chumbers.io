import { searchPosts } from "../../lib/redis";

export default async function handler(req, res) {
  const q = req.query.q;
  const posts = await searchPosts(q);
  res.status(200).json({ posts });
}
