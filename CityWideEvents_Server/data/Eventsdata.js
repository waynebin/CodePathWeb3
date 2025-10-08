export const events = [
  // ---------- Florida ----------
  {
    id: 1,
    title: "Downtown Food & Music Festival",
    date: "2025-10-12",
    description: "Local bites, live bands every hour, family art corner.",
    location: "Miami, FL",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Tech Expo: Sunshine State Innovates",
    date: "2025-10-18",
    description: "Startups, product demos, and founder lightning talks.",
    location: "Orlando, FL",
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Bayfront Jazz Night",
    date: "2025-11-02",
    description: "Sunset jazz concert by the bay with local vendors.",
    location: "Tampa, FL",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Riverside Film in the Park",
    date: "2025-11-09",
    description: "Outdoor classic movie screening. Free popcorn for early birds.",
    location: "Jacksonville, FL",
    imageUrl:
      "https://images.unsplash.com/photo-1485841890310-6a055c88698a?q=80&w=1400&auto=format&fit=crop",
  },

  // ---------- New York ----------
  {
    id: 5,
    title: "Hudson Harvest Market",
    date: "2025-10-13",
    description: "Farm-to-table vendors, live acoustic sets, family activities.",
    location: "New York, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Lakefront Startup Meetup",
    date: "2025-10-20",
    description: "Pitch night and networking with local founders.",
    location: "Buffalo, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Roc City Art Walk",
    date: "2025-10-26",
    description: "Gallery crawl with pop-up installations and food trucks.",
    location: "Rochester, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Capital City Book Fest",
    date: "2025-11-03",
    description: "Author talks, indie publishers, and kids’ story corner.",
    location: "Albany, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop",
  },

  // ---------- California ----------
  {
    id: 9,
    title: "Sunset Pier Concert",
    date: "2025-10-15",
    description: "Indie bands live on the pier with ocean breezes.",
    location: "Los Angeles, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Golden Gate Tech Night",
    date: "2025-10-22",
    description: "Talks on AI, data viz demos, and hiring mixer.",
    location: "San Francisco, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 11,
    title: "Beachside Wellness Morning",
    date: "2025-10-28",
    description: "Sunrise yoga, breathwork session, and smoothie bar.",
    location: "San Diego, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 12,
    title: "Old Town Film Under the Stars",
    date: "2025-11-07",
    description: "Classic film screening in the historic plaza.",
    location: "Sacramento, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop",
  },

  // ---------- Texas ----------
  {
    id: 13,
    title: "Bayou City Night Market",
    date: "2025-10-17",
    description: "Handmade crafts, street food, and live DJs.",
    location: "Houston, TX",
    imageUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 14,
    title: "Deep Ellum Arts & Beats",
    date: "2025-10-23",
    description: "Murals, pop-up galleries, and local bands.",
    location: "Dallas, TX",
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 15,
    title: "ATX Founder Forum",
    date: "2025-10-29",
    description: "Panel + AMA with Austin founders and VCs.",
    location: "Austin, TX",
    imageUrl:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 16,
    title: "Riverwalk Movies & Munchies",
    date: "2025-11-08",
    description: "Food trucks + outdoor movie by the river.",
    location: "San Antonio, TX",
    imageUrl:
      "https://images.unsplash.com/photo-1485841890310-6a055c88698a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 17,
    title: "Test Event",
    date: "2025-12-01",
    description: "This is a test event.",
    location: "Test City, TC",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1400&auto=format&fit=crop",
  },
];

export const eventsByState = events.reduce((acc, e) => {
  const state = e.location.split(", ").pop(); // "FL", "NY", ...
  acc[state] = acc[state] || [];
  acc[state].push(e);
  return acc;
}, {});
