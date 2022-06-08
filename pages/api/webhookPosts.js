import { createPost } from "../../lib/redis";
import { verifyWebhookSignature } from "@graphcms/utils";

const secret = process.env.NEXT_PUBLIC_SECRET_KEY;

export default async function handler(req, res) {
  // TODO: destructure data to only get relevant props

  const body = req.body; // Typically req.body
  // const signature = req.headers["gcms-signature"];

  // const isValid = verifyWebhookSignature({ body, signature, secret });

  if (true) {
    const id = await createPost(req.body.data);
    res.status(200).json({ id });
  }
}
