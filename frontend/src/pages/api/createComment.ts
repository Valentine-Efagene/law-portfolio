// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
// Make sure client has token
import client from '../../../client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { _id, name, email, comment } = JSON.parse(req.body)

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id
      },
      name,
      email,
      comment
    })
  } catch (error) {
    return res.status(500).json({ message: "Couldn't submit comment", error })
  }
  return res.status(200).json({ message: 'Comment submitted' })
}
