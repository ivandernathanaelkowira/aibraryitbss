const aiToolsData = [
  // Text & Writing AI Tools
  {
    id: 1,
    name: "ChatGPT",
    category: "Text & Writing",
    description: "Advanced AI chatbot for conversation, content creation, and problem-solving",
    features: ["Conversational AI", "Content Writing", "Code Generation", "Problem Solving"],
    website: "https://chat.openai.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    color: "#10a37f",
    rating: 4.8,
    price: "Free/Plus"
  },
  {
    id: 2,
    name: "Claude",
    category: "Text & Writing",
    description: "AI assistant focused on helpful, harmless, and honest interactions",
    features: ["Safe AI", "Writing Assistant", "Analysis", "Research"],
    website: "https://claude.ai/",
    logo: "https://claude.ai/favicon.ico",
    color: "#d97706",
    rating: 4.7,
    price: "Free/Pro"
  },
  {
    id: 3,
    name: "Jasper",
    category: "Text & Writing",
    description: "AI writing assistant for marketing, content, and business copy",
    features: ["Marketing Copy", "Blog Writing", "Social Media", "SEO Content"],
    website: "https://www.jasper.ai/",
    logo: "https://images.seeklogo.com/logo-png/47/1/jasper-logo-png_seeklogo-472363.png",
    color: "#059669",
    rating: 4.6,
    price: "Paid"
  },
  {
    id: 4,
    name: "Grammarly",
    category: "Text & Writing",
    description: "AI-powered writing assistant for grammar, style, and tone",
    features: ["Grammar Check", "Style Suggestions", "Tone Analysis", "Plagiarism Check"],
    website: "https://www.grammarly.com/",
    logo: "https://brandlogo.org/wp-content/uploads/2024/06/Grammarly-Logo.png.webp",
    color: "#2563eb",
    rating: 4.5,
    price: "Free/Premium"
  },

  // Image Generation AI Tools
  {
    id: 5,
    name: "Midjourney",
    category: "Image Generation",
    description: "AI art generator creating stunning images from text descriptions",
    features: ["Text-to-Image", "Artistic Styles", "High Quality", "Creative Control"],
    website: "https://www.midjourney.com/",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSye1e-iB67lO-OsAYMnhGw3qlRRQrCexJVCw&s",
    color: "#7c3aed",
    rating: 4.9,
    price: "Paid"
  },
  {
    id: 6,
    name: "DALL-E",
    category: "Image Generation",
    description: "OpenAI's AI system creating images from natural language descriptions",
    features: ["Text-to-Image", "Variations", "Editing", "High Resolution"],
    website: "https://openai.com/dall-e-2",
    logo: "https://openai.com/favicon.ico",
    color: "#dc2626",
    rating: 4.8,
    price: "Paid"
  },
  {
    id: 7,
    name: "Stable Diffusion",
    category: "Image Generation",
    description: "Open-source image generation model for creative AI art",
    features: ["Open Source", "Customizable", "Fast Generation", "Community Models"],
    website: "https://stability.ai/",
    logo: "https://stability.ai/favicon.ico",
    color: "#0891b2",
    rating: 4.7,
    price: "Free/Paid"
  },
  {
    id: 8,
    name: "Canva AI",
    category: "Image Generation",
    description: "AI-powered design tool for creating professional graphics and images",
    features: ["Design AI", "Text-to-Image", "Templates", "Brand Kit"],
    website: "https://www.canva.com/",
    logo: "https://www.canva.com/favicon.ico",
    color: "#00c4cc",
    rating: 4.6,
    price: "Free/Pro"
  },

  // Video & Audio AI Tools
  {
    id: 9,
    name: "Runway ML",
    category: "Video & Audio",
    description: "AI-powered video editing and generation platform",
    features: ["Video Generation", "Motion Graphics", "Green Screen", "Text-to-Video"],
    website: "https://runwayml.com/",
    logo: "https://images.seeklogo.com/logo-png/49/1/runway-logo-png_seeklogo-496519.png",
    color: "#f59e0b",
    rating: 4.7,
    price: "Paid"
  },
  {
    id: 10,
    name: "Synthesia",
    category: "Video & Audio",
    description: "AI video generation platform with virtual presenters",
    features: ["AI Avatars", "Text-to-Speech", "Video Templates", "Custom Characters"],
    website: "https://www.synthesia.io/",
    logo: "https://logowik.com/content/uploads/images/synthesia8926.jpg",
    color: "#8b5cf6",
    rating: 4.6,
    price: "Paid"
  },
  {
    id: 11,
    name: "Descript",
    category: "Video & Audio",
    description: "AI-powered audio and video editing with voice cloning",
    features: ["Voice Cloning", "Audio Editing", "Video Editing", "Transcription"],
    website: "https://www.descript.com/",
    logo: "https://descript-website.vercel.app/images/descript-logo.svg",
    color: "#06b6d4",
    rating: 4.5,
    price: "Free/Paid"
  },
  {
    id: 12,
    name: "Mubert",
    category: "Video & Audio",
    description: "AI music generator for creating original compositions",
    features: ["AI Music", "Royalty-Free", "Custom Styles", "API Access"],
    website: "https://mubert.com/",
    logo: "https://mubert.com/favicon.ico",
    color: "#ec4899",
    rating: 4.4,
    price: "Free/Paid"
  },

  // Productivity & Business AI Tools
  {
    id: 13,
    name: "Notion AI",
    category: "Productivity",
    description: "AI-powered workspace for notes, docs, and project management",
    features: ["AI Writing", "Task Management", "Knowledge Base", "Collaboration"],
    website: "https://www.notion.so/",
    logo: "https://brandlogo.org/wp-content/uploads/2025/05/Notion-Logo-2016.png.webp",
    color: "#000000",
    rating: 4.7,
    price: "Free/Paid"
  },
  {
    id: 14,
    name: "Tome",
    category: "Productivity",
    description: "AI-powered presentation and storytelling platform",
    features: ["AI Presentations", "Story Generation", "Visual Design", "Collaboration"],
    website: "https://tome.app/",
    logo: "https://tome.app/favicon.ico",
    color: "#6366f1",
    rating: 4.6,
    price: "Free/Paid"
  },
  {
    id: 15,
    name: "Copy.ai",
    category: "Productivity",
    description: "AI copywriting tool for marketing and business content",
    features: ["Marketing Copy", "Social Media", "Email Campaigns", "Brand Voice"],
    website: "https://www.copy.ai/",
    logo: "https://cdn.prod.website-files.com/628288c5cd3e8411b90a36a4/6797ee68ae7908e605a9a4d0_copy_logo-all-dark.svg",
    color: "#f97316",
    rating: 4.5,
    price: "Free/Paid"
  },
  {
    id: 16,
    name: "Otter.ai",
    category: "Productivity",
    description: "AI-powered meeting transcription and note-taking",
    features: ["Live Transcription", "Meeting Notes", "Voice Recognition", "Collaboration"],
    website: "https://otter.ai/",
    logo: "https://otter.ai/favicon.ico",
    color: "#059669",
    rating: 4.4,
    price: "Free/Paid"
  },

  // Code & Development AI Tools
  {
    id: 17,
    name: "GitHub Copilot",
    category: "Code & Development",
    description: "AI pair programmer that helps write code faster",
    features: ["Code Completion", "Multi-language", "IDE Integration", "Code Review"],
    website: "https://github.com/features/copilot",
    logo: "https://github.com/favicon.ico",
    color: "#6b7280",
    rating: 4.8,
    price: "Paid"
  },
  {
    id: 18,
    name: "Replit",
    category: "Code & Development",
    description: "AI-powered online IDE for coding and collaboration",
    features: ["Online IDE", "AI Code Assistant", "Deployment", "Collaboration"],
    website: "https://replit.com/",
    logo: "https://i.pinimg.com/736x/45/89/76/45897678148e5e3b6f2931ab62599ca7.jpg",
    color: "#f97316",
    rating: 4.6,
    price: "Free/Paid"
  },
  {
    id: 19,
    name: "Tabnine",
    category: "Code & Development",
    description: "AI code completion tool for developers",
    features: ["Code Completion", "Multi-language", "Privacy-focused", "Team Learning"],
    website: "https://www.tabnine.com/",
    logo: "https://www.tabnine.com/favicon.ico",
    color: "#3b82f6",
    rating: 4.5,
    price: "Free/Paid"
  },
  {
    id: 20,
    name: "CodeWhisperer",
    category: "Code & Development",
    description: "Amazon's AI code generator for developers",
    features: ["Code Generation", "Security Scanning", "IDE Integration", "AWS Integration"],
    website: "https://aws.amazon.com/codewhisperer/",
    logo: "https://aws.amazon.com/favicon.ico",
    color: "#ff9900",
    rating: 4.4,
    price: "Free/Paid"
  }
];

// Categories for filtering
const categories = [
  "All",
  "Text & Writing",
  "Image Generation", 
  "Video & Audio",
  "Productivity",
  "Code & Development"
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { aiToolsData, categories };
} 