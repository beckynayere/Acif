import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Mock Data: Influencers who joined the campaign
  const influencers = [
    { id: "1", name: "Alice Doe", submissions: 3, lastSubmitted: "2025-02-08" },
    { id: "2", name: "Bob Smith", submissions: 5, lastSubmitted: "2025-02-10" },
    { id: "3", name: "Charlie Brown", submissions: 2, lastSubmitted: "2025-02-05" },
  ];

  res.status(200).json(influencers);
}
