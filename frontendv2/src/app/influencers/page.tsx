"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InfluencersPage({ params }: any) {
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    async function fetchInfluencers() {
      const res = await fetch(`/api/influencers/list`);
      const data = await res.json();
      setInfluencers(data);
    }
    fetchInfluencers();
  }, [params.id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Influencers in Campaign
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {influencers.map((influencer: any) => (
          <Link key={influencer.id} href={`/influencers/${influencer.id}`}>
            <div className="p-4 text-gray-800 border rounded-lg shadow bg-white hover:shadow-lg hover:bg-gray-100 transition cursor-pointer">
              <h2 className="text-lg text-gray-800 font-semibold">
                {influencer.name}
              </h2>
              <p>Submissions: {influencer.submissions}</p>
              <p>Last Submitted: {influencer.lastSubmitted}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
