import { campaigns } from "@/utils/samples";
import { notFound } from "next/navigation";

// This replaces getStaticPaths
async function getCampaignDetails(id: string) {
  const res = await fetch(`http://localhost:3000/api/campaigns/${id}`, {
    cache: "no-store", // Use 'no-store' for real-time data
  });
  console.log({ res, id });
  if (!res) {
    return null;
  }

  return res.json();
}

export async function generateMetadata({ params }: any) {
  const campaign = await getCampaignDetails(params.id);

  if (!campaign) {
    return {
      title: "Campaign Not Found",
    };
  }

  return {
    title: `Campaign: ${campaign.name}`,
    description: `Details about the campaign "${campaign.name}".`,
  };
}
// The dynamic page component
export default function CampaignDetail({ params }: any) {
  const campaign = campaigns.find((c) => c.id === params.id);

  if (!campaign) {
    notFound(); // Show a 404 page if the campaign doesn't exist
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Campaign Details
        </h1>
        <p className="text-gray-600">ID: {campaign.id}</p>
        <p className="text-gray-600">Name: {campaign.name}</p>
        <p className="text-gray-600">Status: {campaign.status}</p>
        <p className="text-gray-600">Deadline: {campaign.deadline}</p>
      </div>
    </div>
  );
}
