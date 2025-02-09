export const campaigns = [
    { id: "1", name: "Summer Fashion", status: "Active", deadline: "2025-02-15" },
    { id: "2", name: "Tech Review", status: "Completed", deadline: "2025-01-10" },
    { id: "3", name: "Fitness Challenge", status: "Active", deadline: "2025-03-05" },
    { id: "4", name: "Gaming Sponsorship", status: "Upcoming", deadline: "2025-04-01" },
    { id: "5", name: "Food Bloggers Collab", status: "Active", deadline: "2025-02-28" },
    { id: "6", name: "Luxury Travel Campaign", status: "Completed", deadline: "2025-01-25" },
    { id: "7", name: "Tech Unboxing", status: "Upcoming", deadline: "2025-04-15" },
    { id: "8", name: "Music Festival Promo", status: "Active", deadline: "2025-03-20" },
    { id: "9", name: "Eco-Friendly Products", status: "Completed", deadline: "2025-01-30" },
    { id: "10", name: "Automobile Test Drive", status: "Upcoming", deadline: "2025-05-10" },
  ]

  export const influencers = [
    { id: "101", name: "John Doe", submissions: 5, lastSubmitted: "2025-02-07" },
    { id: "102", name: "Jane Smith", submissions: 3, lastSubmitted: "2025-02-05" },
    { id: "103", name: "Alice Johnson", submissions: 8, lastSubmitted: "2025-02-06" },
    { id: "104", name: "Michael Brown", submissions: 2, lastSubmitted: "2025-02-04" },
  ]

  export   const submissions = [
    {
      id: "501",
      influencerId: "101",
      campaignId: "1",
      contentUrl: "https://tiktok.com/post1",
      status: "Pending",
      submittedAt: "2025-02-07",
      engagement: { likes: 120, shares: 30, comments: 15 },
    },
    {
      id: "502",
      influencerId: "101",
      campaignId: "1",
      contentUrl: "https://instagram.com/post2",
      status: "Approved",
      submittedAt: "2025-02-05",
      engagement: { likes: 250, shares: 50, comments: 40 },
    },
    {
      id: "503",
      influencerId: "102",
      campaignId: "2",
      contentUrl: "https://twitter.com/post3",
      status: "Rejected",
      submittedAt: "2025-02-04",
      engagement: { likes: 90, shares: 10, comments: 5 },
    },
  ];