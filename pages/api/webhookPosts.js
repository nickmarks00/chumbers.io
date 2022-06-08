import { createPost } from "../../lib/redis";

export default async function handler(req, res) {
  // TODO: destructure data to only get relevant props
  //   const id = await createPost(req.body);
  res.status(200).json({ msg: "Test message" });
}
