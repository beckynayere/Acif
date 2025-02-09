"use client";
import { Metadata } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

interface Campaign {
  id: string;
  name: string;
  status: string;
  deadline: string;
}

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns/list");
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-500";
      case "Completed":
        return "bg-gray-100 text-gray-700 border-gray-500";
      case "Upcoming":
        return "bg-blue-100 text-blue-700 border-blue-500";
      default:
        return "bg-gray-100 text-gray-700 border-gray-500";
    }
  };

  return (
    <>
      <Head>
        <title>Campaigns</title>
      </Head>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Campaigns</h1>

          {loading ? (
            <p className="text-gray-600">Loading campaigns...</p>
          ) : campaigns.length === 0 ? (
            <p className="text-gray-600">No campaigns available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition duration-300"
                >
                  {/* Clickable Title */}

                  <a
                    href={`/campaigns/${campaign.id}`}
                    className="text-lg font-semibold text-blue-600 hover:underline mr-5 w-full block"
                  >
                    {campaign.name}
                  </a>

                  <p
                    className={`inline-block px-3 py-1 mt-2 text-sm font-medium rounded border ${getStatusColor(
                      campaign.status
                    )}`}
                  >
                    {campaign.status}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
