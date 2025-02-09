import { influencers } from "@/utils/samples";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Campaign ID

  // Mock Data: Replace with actual DB query later
 

  // Simulate filtering influencers by campaign ID
  res.status(200).json(influencers);
}
