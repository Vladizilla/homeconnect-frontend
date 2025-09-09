// Home Connect - Dummy Data for Demo
// This file contains sample data to populate the app before connecting to real backend

export const users = [
  // Employers
  { 
    id: "e1", 
    name: "You (Employer)", 
    email: "you@demo.com", 
    phone: "+5219981234567",
    role: "Employer", 
    avatar: "👤", 
    rep: 20, 
    premium: true,
    notifications: { email: true, sms: false },
    community: "Puerto Cancún"
  },
  { 
    id: "e2", 
    name: "Juan Pérez", 
    email: "juan@demo.com", 
    phone: "+5219987654321",
    role: "Employer", 
    avatar: "👨‍💼", 
    rep: 15, 
    premium: false,
    notifications: { email: true, sms: true },
    community: "Playa del Carmen"
  },

  // Maids
  { 
    id: "m1", 
    name: "María González", 
    email: "maria@demo.com", 
    phone: "+5219981111111",
    role: "Maid", 
    avatar: "👩‍🦱", 
    rep: 85, 
    premium: true,
    notifications: { email: true, sms: true },
    community: "Playa del Carmen",
    rating: 4.9,
    completedJobs: 127,
    badges: ["🥇 Top Rated", "⚡ Quick Response", "🛡️ Verified ID"]
  },
  { 
    id: "m2", 
    name: "Luis Hernández", 
    email: "luis@demo.com", 
    phone: "+5219982222222",
    role: "Maid", 
    avatar: "👨‍🧹", 
    rep: 72, 
    premium: false,
    notifications: { email: false, sms: true },
    community: "Cancún",
    rating: 4.7,
    completedJobs: 89,
    badges: ["🧹 Deep Clean Expert", "🏠 Residential Pro"]
  },
  { 
    id: "m3", 
    name: "Rosa Martínez", 
    email: "rosa@demo.com", 
    phone: "+5219983333333",
    role: "Maid", 
    avatar: "👩‍🦳", 
    rep: 95, 
    premium: true,
    notifications: { email: true, sms: true },
    community: "Tulum",
    rating: 5.0,
    completedJobs: 203,
    badges: ["🏆 Elite Cleaner", "⭐ Perfect Rating", "🛡️ Background Checked"]
  },
  { 
    id: "m4", 
    name: "Carmen López", 
    email: "carmen@demo.com", 
    phone: "+5219984444444",
    role: "Maid", 
    avatar: "👩", 
    rep: 68, 
    premium: false,
    notifications: { email: true, sms: false },
    community: "Cancún",
    rating: 4.6,
    completedJobs: 76,
    badges: ["🧼 Eco-Friendly", "🏢 Office Specialist"]
  },
  { 
    id: "m5", 
    name: "Ana Rodríguez", 
    email: "ana@demo.com", 
    phone: "+5219985555555",
    role: "Maid", 
    avatar: "👩‍🦰", 
    rep: 58, 
    premium: false,
    notifications: { email: true, sms: true },
    community: "Playa del Carmen",
    rating: 4.4,
    completedJobs: 45,
    badges: ["🌟 Rising Star", "🏠 Move-in Ready"]
  }
];

export const jobs = [
  {
    id: 1,
    title: "Deep Clean 3-Bedroom House",
    description: "Need thorough cleaning of 3-bedroom house including bathrooms, kitchen, and living areas. Pet-friendly cleaner preferred.",
    pay: 1200,
    community: "Puerto Cancún",
    schedule: "2025-09-15",
    employer: "e1",
    status: "Open",
    bids: [
      { maid: "m1", price: 1100, message: "I have 5+ years experience with pet-friendly cleaning!", status: "Pending", timestamp: "2025-09-08 10:30" },
      { maid: "m2", price: 1150, message: "Available this weekend, can bring eco-friendly supplies", status: "Pending", timestamp: "2025-09-08 11:15" }
    ],
    requirements: ["Pet-friendly products", "Own supplies", "References required"],
    images: ["🏠", "🧹", "🐕"]
  },
  {
    id: 2,
    title: "Weekly Office Maintenance",
    description: "Small office space needs weekly cleaning - desks, bathrooms, kitchen area, and floors.",
    pay: 800,
    community: "Playa del Carmen",
    schedule: "2025-09-12",
    employer: "e2",
    status: "Open",
    bids: [
      { maid: "m4", price: 750, message: "I specialize in office cleaning, very reliable!", status: "Pending", timestamp: "2025-09-08 09:45" }
    ],
    requirements: ["Commercial experience", "Flexible schedule", "Own transportation"],
    images: ["🏢", "🧽", "📅"]
  },
  {
    id: 3,
    title: "Move-out Cleaning Service",
    description: "Complete move-out cleaning for 2-bedroom apartment. Need everything spotless for deposit return.",
    pay: 950,
    community: "Tulum",
    schedule: "2025-09-20",
    employer: "e1",
    status: "Hired",
    hiredMaid: "m3",
    bids: [
      { maid: "m3", price: 900, message: "I guarantee deposit-quality cleaning!", status: "Accepted", timestamp: "2025-09-07 14:20" },
      { maid: "m5", price: 950, message: "Available anytime, very thorough", status: "Rejected", timestamp: "2025-09-07 16:30" }
    ],
    requirements: ["Move-out experience", "Deposit guarantee", "Same-day availability"],
    images: ["📦", "✨", "🔑"]
  }
];

export const notifications = [
  {
    id: 1,
    userId: "e1",
    type: "bid",
    message: "María González placed a bid on your 'Deep Clean 3-Bedroom House' job",
    timestamp: new Date("2025-09-08T10:30:00"),
    read: false,
    icon: "📩"
  },
  {
    id: 2,
    userId: "e1",
    type: "bid",
    message: "Luis Hernández placed a bid on your 'Deep Clean 3-Bedroom House' job",
    timestamp: new Date("2025-09-08T11:15:00"),
    read: false,
    icon: "📩"
  },
  {
    id: 3,
    userId: "m3",
    type: "hire",
    message: "Congratulations! Your bid for 'Move-out Cleaning Service' was accepted",
    timestamp: new Date("2025-09-07T14:25:00"),
    read: true,
    icon: "✅"
  },
  {
    id: 4,
    userId: "e1",
    type: "completion",
    message: "Rosa Martínez marked 'Move-out Cleaning Service' as completed",
    timestamp: new Date("2025-09-06T16:00:00"),
    read: true,
    icon: "🎉"
  },
  {
    id: 5,
    userId: "m3",
    type: "payment",
    message: "Payment of $900 has been released from escrow",
    timestamp: new Date("2025-09-06T16:30:00"),
    read: true,
    icon: "💰"
  }
];

export const leaderboard = {
  topMaids: [
    { 
      id: "m3", 
      name: "Rosa Martínez", 
      avatar: "👩‍🦳",
      rep: 95, 
      rating: 5.0, 
      completedJobs: 203,
      community: "Tulum",
      badges: ["🏆", "⭐", "🛡️"],
      lastActive: "2 hours ago",
      responseTime: "< 1 hour"
    },
    { 
      id: "m1", 
      name: "María González", 
      avatar: "👩‍🦱",
      rep: 85, 
      rating: 4.9, 
      completedJobs: 127,
      community: "Playa del Carmen",
      badges: ["🥇", "⚡", "🛡️"],
      lastActive: "30 minutes ago",
      responseTime: "< 30 minutes"
    },
    { 
      id: "m2", 
      name: "Luis Hernández", 
      avatar: "👨‍🧹",
      rep: 72, 
      rating: 4.7, 
      completedJobs: 89,
      community: "Cancún",
      badges: ["🧹", "🏠"],
      lastActive: "1 hour ago",
      responseTime: "< 2 hours"
    },
    { 
      id: "m4", 
      name: "Carmen López", 
      avatar: "👩",
      rep: 68, 
      rating: 4.6, 
      completedJobs: 76,
      community: "Cancún",
      badges: ["🧼", "🏢"],
      lastActive: "3 hours ago",
      responseTime: "< 4 hours"
    },
    { 
      id: "m5", 
      name: "Ana Rodríguez", 
      avatar: "👩‍🦰",
      rep: 58, 
      rating: 4.4, 
      completedJobs: 45,
      community: "Playa del Carmen",
      badges: ["🌟", "🏠"],
      lastActive: "5 hours ago",
      responseTime: "< 6 hours"
    }
  ],
  doNotHire: [
    { 
      id: "m6", 
      name: "Fake Account", 
      avatar: "❌",
      reports: 8, 
      reasons: ["No-show", "Fake profile", "Poor quality"],
      lastReported: "2025-09-05",
      status: "Banned"
    },
    { 
      id: "m7", 
      name: "Unreliable Worker", 
      avatar: "⚠️",
      reports: 5, 
      reasons: ["Multiple no-shows", "Damaged property"],
      lastReported: "2025-09-03",
      status: "Suspended"
    },
    { 
      id: "m8", 
      name: "Scam Profile", 
      avatar: "🚫",
      reports: 12, 
      reasons: ["Fraud attempts", "Fake reviews", "Identity theft"],
      lastReported: "2025-09-01",
      status: "Permanently Banned"
    }
  ]
};

export const communities = {
  "Cancún": [
    "Puerto Cancún", "Zona Hotelera", "El Centro", "Supermanzana 15", 
    "Supermanzana 22", "Supermanzana 44", "Las Américas", "Jardines del Sur"
  ],
  "Playa del Carmen": [
    "Playacar", "Centro", "Colosio", "Ejidal", "Gonzalo Guerrero", 
    "Luis Donaldo Colosio", "Villareal", "Zazil-Ha"
  ],
  "Tulum": [
    "Tulum Centro", "Zona Hotelera", "La Veleta", "Aldea Zama", 
    "Región 15", "Tumben Kaa", "Lúum Zama"
  ],
  "Cozumel": [
    "San Miguel Centro", "Zona Hotelera Norte", "Zona Hotelera Sur", 
    "Corpus Christi", "10 de Abril", "Adolfo López Mateos"
  ]
};

export const forumTopics = [
  {
    id: 1,
    title: "🏆 Best Maids in Playa del Carmen - Recommendations",
    author: "e1",
    authorName: "You (Employer)",
    authorAvatar: "👤",
    community: "Playa del Carmen",
    tags: ["Recommendations", "Playa"],
    sticky: true,
    replies: 12,
    views: 156,
    lastActivity: "2 hours ago",
    content: "Looking for reliable cleaning service recommendations in Playa del Carmen. Who have you had great experiences with?",
    posts: [
      {
        id: 1,
        author: "m1",
        authorName: "María González",
        authorAvatar: "👩‍🦱",
        content: "Thank you for considering me! I've been serving Playa del Carmen for 5+ years with excellent reviews.",
        timestamp: "2025-09-08T09:30:00",
        likes: 8,
        replies: []
      },
      {
        id: 2,
        author: "e2",
        authorName: "Juan Pérez",
        authorAvatar: "👨‍💼",
        content: "I highly recommend María! She's cleaned my office weekly for 2 years - always professional and thorough.",
        timestamp: "2025-09-08T10:15:00",
        likes: 5,
        replies: []
      }
    ]
  },
  {
    id: 2,
    title: "🛡️ Safety Tips for Employers - Avoid Scams",
    author: "m3",
    authorName: "Rosa Martínez",
    authorAvatar: "👩‍🦳",
    community: "General",
    tags: ["Safety", "Tips", "Scams"],
    sticky: false,
    replies: 8,
    views: 89,
    lastActivity: "1 day ago",
    content: "As an experienced cleaner, here are red flags to watch for when hiring...",
    posts: [
      {
        id: 1,
        author: "e1",
        authorName: "You (Employer)",
        authorAvatar: "👤",
        content: "Great advice! Always use the escrow system - it protects both parties.",
        timestamp: "2025-09-07T14:20:00",
        likes: 6,
        replies: []
      }
    ]
  },
  {
    id: 3,
    title: "💰 Fair Pricing Discussion - What's Reasonable?",
    author: "m2",
    authorName: "Luis Hernández",
    authorAvatar: "👨‍🧹",
    community: "Cancún",
    tags: ["Pricing", "Discussion"],
    sticky: false,
    replies: 15,
    views: 234,
    lastActivity: "3 hours ago",
    content: "Let's discuss fair pricing for different types of cleaning jobs in Cancún area...",
    posts: []
  }
];

export const moderatorLogs = [
  {
    id: 1,
    action: "🛡️ Resolved Dispute #15",
    details: "Escrow split 60/40 in favor of employer due to incomplete work",
    moderator: "Admin",
    timestamp: "2025-09-08T08:30:00",
    severity: "high"
  },
  {
    id: 2,
    action: "⚠️ Warning Issued",
    details: "User 'Unreliable Worker' warned for multiple no-shows",
    moderator: "Admin",
    timestamp: "2025-09-07T16:45:00",
    severity: "medium"
  },
  {
    id: 3,
    action: "🚫 Account Suspended",
    details: "Fake Account permanently banned for fraudulent activity",
    moderator: "Admin",
    timestamp: "2025-09-07T12:20:00",
    severity: "high"
  },
  {
    id: 4,
    action: "📌 Topic Pinned",
    details: "Pinned 'Best Maids in Playa del Carmen' topic for visibility",
    moderator: "Admin",
    timestamp: "2025-09-07T09:15:00",
    severity: "low"
  },
  {
    id: 5,
    action: "✅ Review Verified",
    details: "Verified authenticity of 5-star review for Rosa Martínez",
    moderator: "Admin",
    timestamp: "2025-09-06T18:30:00",
    severity: "low"
  }
];

export const reviews = [
  {
    id: 1,
    jobId: 3,
    reviewer: "e1",
    reviewerName: "You (Employer)",
    reviewee: "m3",
    revieweeName: "Rosa Martínez",
    rating: 5,
    comment: "Absolutely perfect! Rosa left the apartment spotless and I got my full deposit back. Highly recommend!",
    timestamp: "2025-09-06T17:00:00",
    helpful: 12
  },
  {
    id: 2,
    jobId: 3,
    reviewer: "m3",
    reviewerName: "Rosa Martínez",
    reviewee: "e1",
    revieweeName: "You (Employer)",
    rating: 5,
    comment: "Great employer! Clear instructions, fair payment, and very respectful. Would work for again.",
    timestamp: "2025-09-06T17:15:00",
    helpful: 8
  }
];

// Helper functions
export function getUserById(id) {
  return users.find(user => user.id === id);
}

export function getJobsByEmployer(employerId) {
  return jobs.filter(job => job.employer === employerId);
}

export function getNotificationsByUser(userId) {
  return notifications.filter(notif => notif.userId === userId);
}

export function timeAgo(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}