// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import client from "../../../client"
// Make sure client has token

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { post_id, name, email, comment } = JSON.parse(req.body)

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: post_id
      },
      name,
      email,
      comment
    })
  } catch (error) {
    return res.status(500).json({ message: "Couldn't submit comment", error })
  }
  return res.status(201).json({ message: 'Comment submitted' })
}
