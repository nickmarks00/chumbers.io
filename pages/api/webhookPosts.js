import { createPost } from "../../lib/redis";
import { verifyWebhookSignature } from "@graphcms/utils";

import { getSinglePostById } from "../../services/getPosts";

const secret = process.env.NEXT_PUBLIC_SECRET_KEY;

export default async function handler(req, res) {
  // TODO: destructure data to only get relevant props

  // const body = req.body; // Typically req.body
  // const signature = req.headers["gcms-signature"];

  // const isValid = verifyWebhookSignature({ body, signature, secret });

  if (true) {
    const post = await getSinglePostById(req.body.data.id);
    try {
      const id = await createPost(post);
      res.status(200).json({ id });
    } catch (e) {
      res.status(500).send("Post did not create successfully");
    }
  } else {
    res.status(500).send("Payload did not verify");
  }
}
