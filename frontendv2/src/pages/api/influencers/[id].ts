import { submissions } from "@/utils/samples";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Mock Data: Replace with actual database query

console.log({submissions,id})
  // Filter submissions by campaign and influencer ID
  const filteredSubmissions = submissions.filter(
    (submission) =>
      
      submission.influencerId === id
  );

  res.status(200).json(filteredSubmissions);
}
