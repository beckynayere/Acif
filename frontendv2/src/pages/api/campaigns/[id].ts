import { campaigns } from '@/utils/samples';
import { NextApiRequest, NextApiResponse } from 'next';

 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found' });
  }

  res.status(200).json(campaign);
}
