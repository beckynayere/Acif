"use client";
import { influencers } from "@/utils/samples";
import React, { useEffect, useState } from "react";

async function getSubmissions(influencerId: string) {
  const submissions = await fetch(`/api/influencers/${influencerId}`);
  return submissions.json();
}

export default function InfluencerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const uwparams = React.use(params);
  const [influencer, setInfluencer] = useState<any>(null);
  const [submissions, setsubmissions] = useState([]);
  const [campaign, setcampaign] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const influencer = influencers.find((c) => c.id === uwparams.id);
      if (influencer) {
        const submissions = await getSubmissions(influencer?.id);

        setsubmissions(submissions);
        setInfluencer(influencer);
      }
    })();
  }, [params]);

  async function handleApproval(submissionId: string, status: string) {
    await fetch(`/api/submissions/${submissionId}/approve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    alert(`Submission ${status}!`);
  }

  if (!influencer || !submissions)
    return <p className="text-gray-800 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">
        {influencer.name}'s Submissions
      </h1>

      {submissions.map((submission: any) => (
        <div
          key={submission.id}
          className="p-4 border rounded-lg shadow mb-4 bg-white"
        >
          <p className="text-lg font-medium">{submission.content}</p>
          <p className="mt-2">
            Status:{" "}
            <span
              className={
                submission.status === "Pending"
                  ? "text-yellow-600"
                  : "text-green-600"
              }
            >
              {submission.status}
            </span>
          </p>

          {submission.status === "Pending" && (
            <div className="mt-3">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-3"
                onClick={() => handleApproval(submission.id, "Approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={() => handleApproval(submission.id, "Rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
