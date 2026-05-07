export interface CurriculumVideo {
  readonly id: string;
  readonly title: string;
  readonly creator: string;
  readonly youtubeId?: string;       // YouTube embed (optional if videoUrl set)
  readonly videoUrl?: string;        // Cloudflare R2 / direct MP4 or HLS URL
  readonly thumbnailUrl?: string;    // explicit thumb; falls back to YouTube thumb
  readonly keyInsight: string;
}

export interface CurriculumTopic {
  readonly id: string;
  readonly name: string;
  readonly videos: readonly CurriculumVideo[];
}

export interface CurriculumHobby {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly emoji: string;
  readonly accentColor: string;
  readonly topics: readonly CurriculumTopic[];
}

export const CURRICULUM: readonly CurriculumHobby[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    category: 'Tech, AI & Digital',
    emoji: '💻',
    accentColor: '#93C5FD',
    topics: [
      {
        id: 'web-dev-html-css',
        name: 'HTML & CSS Crash Course',
        videos: [
          {
            id: 'v-web-1',
            title: 'HTML & CSS Full Course',
            creator: 'freeCodeCamp',
            youtubeId: 'mU6anWqZJcc',
            keyInsight: 'HTML structures content; CSS styles it. Master the box model first — every element is a box with margin, border, padding, and content.',
          },
        ],
      },
      {
        id: 'web-dev-js',
        name: 'JavaScript Full Course',
        videos: [
          {
            id: 'v-web-2',
            title: 'JavaScript Tutorial for Beginners',
            creator: 'Programming with Mosh',
            youtubeId: 'W6NZfCO5SIk',
            keyInsight: 'JavaScript makes pages interactive. Master variables, functions, and DOM manipulation before any framework.',
          },
        ],
      },
      {
        id: 'web-dev-react',
        name: 'React JS Full Course',
        videos: [
          {
            id: 'v-web-3',
            title: 'React JS Full Course 2024',
            creator: 'freeCodeCamp',
            youtubeId: 'bMknfKXIFA8',
            keyInsight: 'React builds UIs from components. State changes → React re-renders. Learn useState and useEffect before anything else.',
          },
        ],
      },
      {
        id: 'web-dev-responsive',
        name: 'Responsive Web Design',
        videos: [
          {
            id: 'v-web-4',
            title: 'A practical guide to responsive design',
            creator: 'Kevin Powell',
            youtubeId: 'x4u1yp3Msao',
            keyInsight: 'Responsive design adapts to any screen size. Use Flexbox + Grid + media queries. Always design mobile-first.',
          },
        ],
      },
      {
        id: 'web-dev-git',
        name: 'Git and GitHub for Beginners',
        videos: [
          {
            id: 'v-web-5',
            title: 'Git and GitHub for Beginners - Crash Course',
            creator: 'freeCodeCamp',
            youtubeId: 'RGOj5yH7evk',
            keyInsight: 'Git tracks code changes like save points. Core: git init, add, commit, push, pull, merge. Every professional uses this daily.',
          },
        ],
      },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    category: 'Tech, AI & Digital',
    emoji: '🤖',
    accentColor: '#C4B5FD',
    topics: [
      {
        id: 'ai-everyone',
        name: 'AI for Everyone',
        videos: [
          {
            id: 'v-ai-1',
            title: 'AI for Everyone - Andrew Ng',
            creator: 'DeepLearningAI',
            youtubeId: 'zOI6Oll1Zrg',
            keyInsight: 'AI = pattern recognition at scale. You don\'t need to code to use AI strategically. Focus on which problems AI can solve.',
          },
        ],
      },
      {
        id: 'ai-neural',
        name: 'Neural Networks Explained',
        videos: [
          {
            id: 'v-ai-2',
            title: 'But what is a neural network?',
            creator: '3Blue1Brown',
            youtubeId: 'aircAruvnKk',
            keyInsight: 'Neural networks: input → hidden layers → output. Each layer learns progressively complex features. Weights adjust during training.',
          },
        ],
      },
      {
        id: 'ai-prompt',
        name: 'Prompt Engineering Full Course',
        videos: [
          {
            id: 'v-ai-3',
            title: 'Prompt Engineering Tutorial',
            creator: 'freeCodeCamp',
            youtubeId: '_ZvnD73m40o',
            keyInsight: 'Prompts are instructions for AI. Be specific, add context, use examples, and iterate. Better prompts = dramatically better outputs.',
          },
        ],
      },
      {
        id: 'ai-art',
        name: 'Generating AI Art and Videos',
        videos: [
          {
            id: 'v-ai-4',
            title: 'How To Generate INSANE AI Art',
            creator: 'The AI Advantage',
            youtubeId: 'zf4z8A-OWBY',
            keyInsight: 'AI image generators use text-to-image models. Learn prompt keywords: style, lighting, medium, artist influences, quality modifiers.',
          },
        ],
      },
      {
        id: 'ai-app',
        name: 'How to Build an AI App',
        videos: [
          {
            id: 'v-ai-5',
            title: 'How To Build An App With AI',
            creator: 'Alex Finn',
            youtubeId: 'XPXKU-zAxAQ',
            keyInsight: 'Modern AI apps connect LLM APIs to a UI. Start with an API key, write a simple prompt, display the response. Ship fast.',
          },
        ],
      },
    ],
  },
  {
    id: 'python',
    name: 'Coding (Python)',
    category: 'Tech, AI & Digital',
    emoji: '🐍',
    accentColor: '#FDE68A',
    topics: [
      {
        id: 'py-basics',
        name: 'Python Full Course',
        videos: [
          {
            id: 'v-py-1',
            title: 'Python Tutorial for Beginners',
            creator: 'Programming with Mosh',
            youtubeId: '_uQrJ0TkZlc',
            keyInsight: 'Python is readable by design. Learn variables, loops, functions, and lists first. Indentation is not optional — it defines scope.',
          },
        ],
      },
      {
        id: 'py-oop',
        name: 'Object-Oriented Programming',
        videos: [
          {
            id: 'v-py-2',
            title: 'Python OOP Tutorial',
            creator: 'Corey Schafer',
            youtubeId: 'ZDa-Z5JzLYM',
            keyInsight: 'OOP organizes code into classes (blueprints) and objects (instances). Encapsulation, inheritance, and polymorphism are the core pillars.',
          },
        ],
      },
      {
        id: 'py-automation',
        name: 'Automating Boring Stuff',
        videos: [
          {
            id: 'v-py-3',
            title: 'Python Automation Projects',
            creator: 'Internet Made Coder',
            youtubeId: 'vEQ8CXFWLZU',
            keyInsight: 'Python automates repetitive tasks: file manipulation, web scraping, spreadsheets, emails. One script can save hours every week.',
          },
        ],
      },
      {
        id: 'py-dsa',
        name: 'Data Structures & Algorithms',
        videos: [
          {
            id: 'v-py-4',
            title: 'Algorithms and Data Structures Tutorial',
            creator: 'freeCodeCamp',
            youtubeId: '8hly31xKli0',
            keyInsight: 'DSA is about choosing the right tool: arrays for ordered data, dicts for lookups, trees for hierarchies. Big O measures efficiency.',
          },
        ],
      },
      {
        id: 'py-project',
        name: 'Building First Project',
        videos: [
          {
            id: 'v-py-5',
            title: 'Python Projects for Beginners',
            creator: 'Programming with Mosh',
            youtubeId: 'yVl_G-F7m8c',
            keyInsight: 'Build projects, not tutorials. A working project you built teaches 10x more than passively watching. Start small, ship often.',
          },
        ],
      },
    ],
  },
  {
    id: 'uiux',
    name: 'UI/UX Design',
    category: 'Tech, AI & Digital',
    emoji: '🎨',
    accentColor: '#A5B4FC',
    topics: [
      {
        id: 'ux-principles',
        name: 'Design Principles',
        videos: [
          {
            id: 'v-ux-1',
            title: 'UI/UX Design Principles',
            creator: 'Jesse Showalter',
            youtubeId: 'uwNClNmekGU',
            keyInsight: 'Good design is invisible. Core principles: contrast, alignment, repetition, proximity (CARP). Users don\'t read — they scan.',
          },
        ],
      },
      {
        id: 'ux-figma',
        name: 'Figma Crash Course',
        videos: [
          {
            id: 'v-ux-2',
            title: 'Figma Tutorial for Beginners',
            creator: 'Flux Academy',
            youtubeId: 'jQ1sfKIl50E',
            keyInsight: 'Figma is the industry-standard design tool. Master frames, components, auto-layout, and prototyping. Design systems save months.',
          },
        ],
      },
      {
        id: 'ux-color',
        name: 'Color & Typography',
        videos: [
          {
            id: 'v-ux-3',
            title: 'The ONLY Colour Theory Video',
            creator: 'Satori Graphics',
            youtubeId: 'HKtTNOgfhAU',
            keyInsight: 'Color triggers emotion. Use 60-30-10 rule: 60% dominant, 30% secondary, 10% accent. High contrast = accessibility.',
          },
        ],
      },
      {
        id: 'ux-wireframe',
        name: 'Wireframes & Prototypes',
        videos: [
          {
            id: 'v-ux-4',
            title: 'Wireframe, Mockup & Design in Figma',
            creator: 'freeCodeCamp',
            youtubeId: 'c9Wg6Cb_YlU',
            keyInsight: 'Wireframes are lo-fi blueprints. Prototypes are clickable. Test with real users early — fixing a wireframe costs 100x less than fixing code.',
          },
        ],
      },
      {
        id: 'ux-mobile',
        name: 'Clean Mobile Interface',
        videos: [
          {
            id: 'v-ux-5',
            title: 'Everything about Mobile App UI\'s',
            creator: 'Kole Jain',
            youtubeId: 'Gfsd8NNuD9g',
            keyInsight: 'Mobile UX: thumb-friendly zones, 44pt minimum tap targets, bottom navigation for primary actions. Less is always more.',
          },
        ],
      },
    ],
  },
  {
    id: 'mobile-dev',
    name: 'Mobile App Dev',
    category: 'Tech, AI & Digital',
    emoji: '📱',
    accentColor: '#6EE7B7',
    topics: [
      {
        id: 'mob-flutter',
        name: 'Flutter Full Course',
        videos: [{ id: 'v-mob-1', title: 'Flutter Course for Beginners', creator: 'freeCodeCamp', youtubeId: 'VPvVD8t02U8', keyInsight: 'Flutter uses Dart and builds native iOS+Android from one codebase. Widgets are everything — UI is a tree of composable widgets.' }],
      },
      {
        id: 'mob-rn',
        name: 'React Native Crash Course',
        videos: [{ id: 'v-mob-2', title: 'React Native Tutorial', creator: 'Programming with Mosh', youtubeId: '0-S5a0eXPoc', keyInsight: 'React Native renders real native components using JavaScript. If you know React, you already know 80% of React Native.' }],
      },
      {
        id: 'mob-swift',
        name: 'iOS App (Swift) Basics',
        videos: [{ id: 'v-mob-3', title: 'SwiftUI Course for Beginners', creator: 'freeCodeCamp', youtubeId: '-VC3hIEL7eQ', keyInsight: 'SwiftUI is Apple\'s declarative UI framework. Views are functions of state — state changes, UI updates automatically.' }],
      },
      {
        id: 'mob-android',
        name: 'Android Studio for Beginners',
        videos: [{ id: 'v-mob-4', title: 'Android Studio Tutorial', creator: 'DJ Malone', youtubeId: 'saKrGCWlJDs', keyInsight: 'Android dev uses Kotlin (or Java). Activities are screens; Jetpack Compose is the modern UI toolkit. Emulators let you test without a device.' }],
      },
      {
        id: 'mob-publish',
        name: 'Publishing First App',
        videos: [{ id: 'v-mob-5', title: 'How to Make an App for Beginners', creator: 'CodeWithChris', youtubeId: 'jniJeamcIUU', keyInsight: 'App Store review takes 1-3 days. Need: Apple Developer account ($99/yr), screenshots, privacy policy, and a working app. Ship iteratively.' }],
      },
    ],
  },
  {
    id: 'saas',
    name: 'SaaS Building',
    category: 'Tech, AI & Digital',
    emoji: '🚀',
    accentColor: '#FCA5A5',
    topics: [
      {
        id: 'saas-what',
        name: 'What is SaaS?',
        videos: [{ id: 'v-saas-1', title: 'What Is SaaS? Explained', creator: 'Rob Walling', youtubeId: 'x5JYwtkcqoM', keyInsight: 'SaaS = Software as a Service. Recurring revenue, low distribution cost, scalable. The goal: solve a painful problem for a specific niche.' }],
      },
      {
        id: 'saas-idea',
        name: 'SaaS Idea Validation',
        videos: [{ id: 'v-saas-2', title: '7 Proven Ways to Create SaaS Ideas', creator: 'Rob Walling', youtubeId: 'z_EMDtbB2tA', keyInsight: 'Best SaaS ideas solve problems you personally experience. Validate before building: 10 customer conversations before writing a line of code.' }],
      },
      {
        id: 'saas-nocode',
        name: 'No-Code SaaS (Bubble)',
        videos: [{ id: 'v-saas-3', title: 'Learn Bubble.io in 30 Minutes', creator: 'Jesse Showalter', youtubeId: 'PuQz1w80ddw', keyInsight: 'No-code tools let non-devs build real apps. Bubble, Glide, Webflow — launch an MVP in days. Validate demand before coding.' }],
      },
      {
        id: 'saas-pricing',
        name: 'Pricing Models',
        videos: [{ id: 'v-saas-4', title: 'SaaS Pricing Models Explained', creator: 'Rob Walling', youtubeId: 'lC6Gpn0ugFI', keyInsight: 'Per-seat, usage-based, flat-rate — pricing shapes behavior. Charge more than you think. Underpricing kills more startups than overpricing.' }],
      },
      {
        id: 'saas-launch',
        name: 'Product Hunt Launch',
        videos: [{ id: 'v-saas-5', title: 'Rank #1 on Product Hunt', creator: 'Lihong Hicken', youtubeId: 'g1sBB5xzmTI', keyInsight: 'Product Hunt launches work best with pre-built communities. Prepare makers, hunters, and supporters. Launch on Tuesday-Thursday for best reach.' }],
      },
    ],
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship',
    category: 'Business & Marketing',
    emoji: '🏆',
    accentColor: '#FFD600',
    topics: [
      {
        id: 'ent-startup',
        name: 'How to Start a Startup',
        videos: [{ id: 'v-ent-1', title: 'Lecture 1 - Y Combinator', creator: 'Y Combinator', youtubeId: 'CBYhVcO4WgI', keyInsight: 'Make something people want. Talk to users first, build second. Most startups die from building something nobody needs, not from competition.' }],
      },
      {
        id: 'ent-lean',
        name: 'The Lean Startup',
        videos: [{ id: 'v-ent-2', title: 'THE LEAN STARTUP SUMMARY', creator: 'The Swedish Investor', youtubeId: 'RSaIOCHbuYw', keyInsight: 'Build-Measure-Learn loop. MVPs test assumptions cheaply. Pivot when data says to — not when fear says to. Validated learning beats opinions.' }],
      },
      {
        id: 'ent-pitch',
        name: 'Pitch Deck',
        videos: [{ id: 'v-ent-3', title: 'How to Make a Pitch Deck', creator: 'Slidebean', youtubeId: 'SB16xgtFmco', keyInsight: '10 slides: Problem, Solution, Market, Product, Traction, Team, Business Model, Competition, Financials, Ask. Tell a story, not a features list.' }],
      },
      {
        id: 'ent-gtm',
        name: 'GTM Strategies',
        videos: [{ id: 'v-ent-4', title: 'How to Build a GTM Strategy', creator: 'Henry Wang', youtubeId: 'eDVtBleIxag', keyInsight: 'Go-to-market defines who you sell to, how you reach them, and why they buy. Product-led, sales-led, or marketing-led — pick one focus first.' }],
      },
      {
        id: 'ent-brand',
        name: 'Brand Identity',
        videos: [{ id: 'v-ent-5', title: 'How To ACTUALLY Design a Brand', creator: 'Jack Watson', youtubeId: 'y_2P5o_msuo', keyInsight: 'Brand is the feeling people have about you. Logo is 5% of brand. Consistency, voice, and values are 95%. Be unmistakably you.' }],
      },
    ],
  },
  {
    id: 'investing',
    name: 'Investing & Finance',
    category: 'Business & Marketing',
    emoji: '📈',
    accentColor: '#10B981',
    topics: [
      {
        id: 'inv-personal',
        name: 'Personal Finance Basics',
        videos: [{ id: 'v-inv-1', title: 'How to Invest for Beginners', creator: 'Ali Abdaal', youtubeId: 'lNdOtlpmH5U', keyInsight: 'Personal finance: spend less than you earn, invest the difference. Emergency fund (3-6 months) → high-interest debt → then invest.' }],
      },
      {
        id: 'inv-stock',
        name: 'Stock Market Works',
        videos: [{ id: 'v-inv-2', title: 'How does the stock market work?', creator: 'TED-Ed', youtubeId: 'p7HKvqRI_Bo', keyInsight: 'Stocks = ownership in companies. Prices reflect expected future earnings. Market is a voting machine short-term, weighing machine long-term.' }],
      },
      {
        id: 'inv-index',
        name: 'Index Funds & ETFs',
        videos: [{ id: 'v-inv-3', title: 'Vanguard Index Funds Guide', creator: 'Charlie Chang', youtubeId: 'PVgpKaXj0fk', keyInsight: 'Index funds buy the whole market cheaply. 90%+ of active fund managers underperform index funds over 15 years. Low-cost beats smart.' }],
      },
      {
        id: 'inv-valuation',
        name: 'Company Valuations',
        videos: [{ id: 'v-inv-4', title: 'Introduction to Valuation', creator: 'Aswath Damodaran', youtubeId: 'znmQ7oMiQrM', keyInsight: 'Valuation estimates what a business is worth today based on future cash flows. DCF, comparables, and asset-based are the main methods.' }],
      },
      {
        id: 'inv-psychology',
        name: 'Psychology of Money',
        videos: [{ id: 'v-inv-5', title: 'THE PSYCHOLOGY OF MONEY', creator: 'The Swedish Investor', youtubeId: 'TJDcGv9OH4Q', keyInsight: 'Wealth is what you don\'t spend. Compounding needs time above all else. Behavior matters more than intelligence in investing.' }],
      },
    ],
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    category: 'Business & Marketing',
    emoji: '📸',
    accentColor: '#F97316',
    topics: [
      {
        id: 'cc-niche',
        name: 'Niche and Voice',
        videos: [{ id: 'v-cc-1', title: 'Alex Hormozi Content Advice', creator: 'Castmagic', youtubeId: 'pyNOR5BSN9I', keyInsight: 'Your niche is the intersection of: what you know, what you enjoy, what people want to learn. Specific niches grow faster than broad ones.' }],
      },
      {
        id: 'cc-strategy',
        name: 'Content Strategy',
        videos: [{ id: 'v-cc-2', title: 'Social Media Strategy Plan', creator: 'HubSpot Marketing', youtubeId: 'VS0Sao1oHlw', keyInsight: 'Content strategy: who you serve → what they need → what you create → where you publish → how you measure. Document it, then execute relentlessly.' }],
      },
      {
        id: 'cc-shortform',
        name: 'Short-Form Video',
        videos: [{ id: 'v-cc-3', title: 'Short-Form Video Editing Guide', creator: 'Joseph | Video Editing', youtubeId: 'R9Uu0JtvyMg', keyInsight: 'Hook in 1-3 seconds or lose viewers. Cut everything that\'s not the point. Captions, fast edits, and vertical framing = short-form fundamentals.' }],
      },
      {
        id: 'cc-community',
        name: 'Building Community',
        videos: [{ id: 'v-cc-4', title: 'Engaging Community Ever', creator: 'Pat Flynn', youtubeId: '6ZVpufakwfk', keyInsight: '1,000 true fans > 1M passive followers. Community beats audience. Engage every comment early — algorithms and people both reward responsiveness.' }],
      },
      {
        id: 'cc-monetize',
        name: 'Monetizing Content',
        videos: [{ id: 'v-cc-5', title: 'How Content Creators Make $20K', creator: 'YCImaging', youtubeId: 'epNuCIOWF_M', keyInsight: 'Diversify: sponsorships, courses, merch, subscriptions. AdSense alone is unstable. Build owned channels (email list) before rented ones (social).' }],
      },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube Creation',
    category: 'Business & Marketing',
    emoji: '▶️',
    accentColor: '#FF6B6B',
    topics: [
      {
        id: 'yt-start',
        name: 'Start a Channel',
        videos: [{ id: 'v-yt-1', title: 'Start and Grow a YouTube Channel', creator: 'Ali Abdaal', youtubeId: 'UVardfy2qMk', keyInsight: 'Start before you\'re ready. First 100 videos are practice. Consistency > quality at the start. Pick a niche and commit to at least 50 videos.' }],
      },
      {
        id: 'yt-algo',
        name: 'YouTube Algorithm',
        videos: [{ id: 'v-yt-2', title: 'My Video Went Viral. Here\'s Why', creator: 'Veritasium', youtubeId: 'fHsa9DqmId8', keyInsight: 'YouTube optimizes for watch time and satisfaction. Click-through rate (thumbnail) × average view duration = algorithmic success.' }],
      },
      {
        id: 'yt-camera',
        name: 'Lighting & Camera',
        videos: [{ id: 'v-yt-3', title: 'Lighting 101: Intro', creator: 'Aputure', youtubeId: 'nqMQZG68Wkc', keyInsight: 'Lighting matters more than camera. One good key light transforms any setup. Natural window light + a reflector works better than a bad studio.' }],
      },
      {
        id: 'yt-script',
        name: 'Engaging Scripts',
        videos: [{ id: 'v-yt-4', title: 'How to Write a Script', creator: 'Think Media', youtubeId: '8s0i1LutAc4', keyInsight: 'Hook → promise → content → CTA. Write your ending first. Good scripts sound like natural speech — read aloud while writing.' }],
      },
      {
        id: 'yt-thumbnail',
        name: 'Clickable Thumbnails',
        videos: [{ id: 'v-yt-5', title: 'Clickable YouTube Thumbnails', creator: 'Nate Curtiss', youtubeId: 'hhuBNV_J_WA', keyInsight: 'Thumbnail is 50% of your video\'s success. 3 elements: face with emotion, bold text (3 words max), high contrast colors. Test at small size.' }],
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing & Brand',
    category: 'Business & Marketing',
    emoji: '📣',
    accentColor: '#EC4899',
    topics: [
      {
        id: 'mkt-digital',
        name: 'Digital Marketing',
        videos: [{ id: 'v-mkt-1', title: 'Digital Marketing Full Course', creator: 'Simplilearn', youtubeId: 'bixR-KIJKYM', keyInsight: 'Digital marketing = getting the right message to the right person at the right time. SEO, paid ads, email, and social each serve different stages of the funnel.' }],
      },
      {
        id: 'mkt-social',
        name: 'Social Media Strategy',
        videos: [{ id: 'v-mkt-2', title: 'Social Media Strategy Guide', creator: 'HubSpot Marketing', youtubeId: 'VS0Sao1oHlw', keyInsight: 'Platform-specific strategy beats posting everywhere. Pick 1-2 platforms where your audience lives, then master them before expanding.' }],
      },
      {
        id: 'mkt-personal',
        name: 'Personal Brand',
        videos: [{ id: 'v-mkt-3', title: 'Personal Brand Masterclass', creator: 'Vanessa Lau', youtubeId: '71oNb0HPf5E', keyInsight: 'Personal brand = your reputation online. Authenticity converts better than polish. Share what you know, be consistent, and engage genuinely.' }],
      },
      {
        id: 'mkt-email',
        name: 'Email Marketing',
        videos: [{ id: 'v-mkt-4', title: 'Email Marketing For Beginners', creator: 'Santrel Media', youtubeId: '2HOnV_2iN9Q', keyInsight: 'Email ROI: $42 for every $1 spent. Subject line = open rate. Personalization + segmentation + automation = email that actually converts.' }],
      },
      {
        id: 'mkt-analytics',
        name: 'Analyzing Data',
        videos: [{ id: 'v-mkt-5', title: 'GA4 Tutorial for Beginners', creator: 'Loves Data', youtubeId: 'sVE6AcTdYoE', keyInsight: 'GA4 tracks user behavior on your site. Focus on: sessions, conversion rate, bounce rate, and top pages. Data tells you what; talk to users for the why.' }],
      },
    ],
  },
  {
    id: 'seo',
    name: 'SEO',
    category: 'Business & Marketing',
    emoji: '🔍',
    accentColor: '#84CC16',
    topics: [
      {
        id: 'seo-crash',
        name: 'SEO Crash Course',
        videos: [{ id: 'v-seo-1', title: 'Complete SEO Course', creator: 'Ahrefs', youtubeId: 'xsVTqzratPs', keyInsight: 'SEO = making Google trust your content. Three pillars: technical (crawlability), on-page (relevance), off-page (authority via backlinks).' }],
      },
      {
        id: 'seo-keywords',
        name: 'Keyword Research',
        videos: [{ id: 'v-seo-2', title: 'Keyword Research 2026', creator: 'Ahrefs', youtubeId: 'XfO6lmlxh0M', keyInsight: 'Target keywords with high intent + achievable difficulty. Long-tail keywords (3+ words) convert better and compete less. Use Ahrefs or free tools.' }],
      },
      {
        id: 'seo-onpage',
        name: 'On-Page SEO',
        videos: [{ id: 'v-seo-3', title: 'On-Page SEO Checklist', creator: 'Ahrefs', youtubeId: 'O8Z2Zp2M_g0', keyInsight: 'On-page SEO: keyword in title, H1, URL, first 100 words. Internal links pass authority. Match search intent — Google knows what users actually want.' }],
      },
      {
        id: 'seo-links',
        name: 'Link Building',
        videos: [{ id: 'v-seo-4', title: 'Link Building for Beginners', creator: 'Ahrefs', youtubeId: 'C5it_v6uAas', keyInsight: 'Backlinks = votes of authority. Quality over quantity always. Guest posts, digital PR, and HARO are beginner-friendly link building methods.' }],
      },
      {
        id: 'seo-ga',
        name: 'Google Analytics',
        videos: [{ id: 'v-seo-5', title: 'GA4 Tutorial for Beginners', creator: 'Analytics Mania', youtubeId: 'u_ECkoHVlZ8', keyInsight: 'GA4 measures what matters: organic traffic growth, landing page performance, and conversion paths. Set up goals before you analyze anything.' }],
      },
    ],
  },
  {
    id: 'copywriting',
    name: 'Copywriting',
    category: 'Business & Marketing',
    emoji: '✍️',
    accentColor: '#F59E0B',
    topics: [
      {
        id: 'copy-basics',
        name: 'Copywriting Basics',
        videos: [{ id: 'v-copy-1', title: 'Copywriting For Beginners', creator: 'Alex Cattoni', youtubeId: 'OLIrJ5WUFIs', keyInsight: 'Copywriting sells with words. Write to one person, not a crowd. Benefits over features always. The best copy reads like a conversation, not an ad.' }],
      },
      {
        id: 'copy-persuasion',
        name: 'Psychology of Persuasion',
        videos: [{ id: 'v-copy-2', title: 'Influence | Robert Cialdini', creator: 'One Percent Better', youtubeId: '0qelyk_mWBs', keyInsight: 'Cialdini\'s 6 principles: reciprocity, commitment, social proof, authority, liking, scarcity. Embed these in copy ethically to drive action.' }],
      },
      {
        id: 'copy-landing',
        name: 'Landing Pages',
        videos: [{ id: 'v-copy-3', title: 'High-Converting Landing Page', creator: 'Alex Cattoni', youtubeId: '9_H8t87_Fsc', keyInsight: 'Landing page structure: headline (what it is) → subheadline (why it matters) → social proof → features-as-benefits → CTA. One offer per page.' }],
      },
      {
        id: 'copy-email',
        name: 'Email Copywriting',
        videos: [{ id: 'v-copy-4', title: 'Write Emails That Sell', creator: 'Alex Cattoni', youtubeId: 'Vl0Xv_87f9Y', keyInsight: 'Email copy: subject line opens, first line keeps, value educates, CTA converts. Write like you\'re emailing a friend. Casual wins over corporate.' }],
      },
      {
        id: 'copy-story',
        name: 'Storytelling in Ads',
        videos: [{ id: 'v-copy-5', title: 'Storytelling for Business', creator: 'Ahrefs', youtubeId: 'Nj-hdQMa36A', keyInsight: 'Stories sell because they bypass rational defenses. Structure: character → conflict → resolution (where your product is the hero\'s tool).' }],
      },
    ],
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    category: 'Creative & Visual',
    emoji: '🖌️',
    accentColor: '#6366F1',
    topics: [
      {
        id: 'gd-layout',
        name: 'Layout & Composition',
        videos: [{ id: 'v-gd-1', title: 'MASTER Layout Design', creator: 'Satori Graphics', youtubeId: 'yUvGHNzqG7M', keyInsight: 'Good layouts use visual hierarchy to guide the eye. Size, color, and whitespace establish importance. Rule of thirds is your foundation.' }],
      },
      {
        id: 'gd-illustrator',
        name: 'Adobe Illustrator',
        videos: [{ id: 'v-gd-2', title: 'Illustrator FULL COURSE', creator: 'Satori Graphics', youtubeId: '3zAPbjOfgHA', keyInsight: 'Illustrator works with vectors (infinitely scalable). Master the pen tool, shapes, and pathfinder. SVGs made in Illustrator look perfect at any size.' }],
      },
      {
        id: 'gd-logo',
        name: 'Logo Design',
        videos: [{ id: 'v-gd-3', title: 'Logo Design Process', creator: 'Will Paterson', youtubeId: 'E_PAnW_S_No', keyInsight: 'Great logos are simple, memorable, versatile. Sketch 50+ ideas before opening software. A logo works if it reads at 16px and on a billboard.' }],
      },
      {
        id: 'gd-type',
        name: 'Typography',
        videos: [{ id: 'v-gd-4', title: 'ULTIMATE Typography Guide', creator: 'DesignSpo', youtubeId: 'AXpxZMRM1EY', keyInsight: 'Typography is 95% of design. Rule: 2 typefaces maximum. Pair a serif with a sans-serif. Line height 1.4-1.6x font size for body text.' }],
      },
      {
        id: 'gd-social',
        name: 'Social Media Assets',
        videos: [{ id: 'v-gd-5', title: 'Social Media Graphics like Pro', creator: 'Canva', youtubeId: 'f-Fv7D9G23U', keyInsight: 'Social graphics need to stop the scroll. Bold text over image, one clear message, brand colors consistent. Size matters: Instagram vs Stories vs LinkedIn differ.' }],
      },
    ],
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    category: 'Creative & Visual',
    emoji: '🎬',
    accentColor: '#8B5CF6',
    topics: [
      {
        id: 've-premiere',
        name: 'Premiere Pro / DaVinci Resolve',
        videos: [{ id: 'v-ve-1', title: 'Learn PREMIERE PRO', creator: 'Creative Mind', youtubeId: 'xgEEHGoGQqs', keyInsight: 'Video editing workflow: import → rough cut → fine cut → color → audio → export. Learn keyboard shortcuts first — they\'re 5x faster than the mouse.' }],
      },
      {
        id: 've-pacing',
        name: 'Pacing & Flow',
        videos: [{ id: 'v-ve-2', title: 'The Art of the Edit', creator: 'Cinecom', youtubeId: 'kY8_B_uM3v0', keyInsight: 'Cut on action, not before or after. Every cut should serve a purpose: information, emotion, or pacing. Silence and pauses are editing tools too.' }],
      },
      {
        id: 've-audio',
        name: 'Audio Mixing',
        videos: [{ id: 'v-ve-3', title: 'Mix Audio for Video', creator: 'Justin Brown', youtubeId: '8mI3K3j6_4E', keyInsight: 'Bad audio kills good video. Mix levels: dialogue -12 to -6 dB, music -18 to -24 dB. EQ, compression, and noise removal are the core tools.' }],
      },
      {
        id: 've-color',
        name: 'Color Grading',
        videos: [{ id: 'v-ve-4', title: 'Premiere Color Grading', creator: 'Zac Watson', youtubeId: '1wZym4fQGig', keyInsight: 'Color grading creates mood. Fix exposure first (Lumetri Scopes), then match shots, then stylize. Orange-teal is popular because it\'s complementary.' }],
      },
      {
        id: 've-motion',
        name: 'Motion Graphics',
        videos: [{ id: 'v-ve-5', title: 'Add Text & Motion', creator: 'Cinecom', youtubeId: '9q_u8Vf_X_E', keyInsight: 'Motion graphics add professionalism. Use easing on all animations — linear motion looks robotic. Less is more; subtle motion beats flashy animations.' }],
      },
    ],
  },
  {
    id: 'photography',
    name: 'Photography',
    category: 'Creative & Visual',
    emoji: '📷',
    accentColor: '#F97316',
    topics: [
      {
        id: 'ph-exposure',
        name: 'Exposure Triangle',
        videos: [{ id: 'v-ph-1', title: 'Aperture Shutter ISO', creator: 'Tony Northrup', youtubeId: 'F8T94sdiNjc', keyInsight: 'Exposure triangle: aperture (depth of field), shutter speed (motion blur), ISO (noise). Change one, compensate with another to keep correct exposure.' }],
      },
      {
        id: 'ph-composition',
        name: 'Composition Rules',
        videos: [{ id: 'v-ph-2', title: '20 Photo Composition Techniques', creator: 'Sean Gallagher', youtubeId: '8XBYt-_U4WE', keyInsight: 'Rule of thirds: place subjects at grid intersections. Leading lines draw the eye. Foreground interest creates depth. Break rules deliberately, not accidentally.' }],
      },
      {
        id: 'ph-portrait',
        name: 'Portrait Basics',
        videos: [{ id: 'v-ph-3', title: 'Sharp Portraits Secrets', creator: 'Tony Northrup', youtubeId: 'tEIRynRpVHo', keyInsight: 'For sharp portraits: focus on the eyes, use continuous AF, shoot at f/2.8+ for background blur. Catch light in eyes = instant life in portraits.' }],
      },
      {
        id: 'ph-landscape',
        name: 'Landscape Guide',
        videos: [{ id: 'v-ph-4', title: 'Landscape Photography Step-by-Step', creator: 'Mads Peter Iversen', youtubeId: 'wXW1K5y50E8', keyInsight: 'Golden hour (sunrise/sunset) transforms landscape shots. Use a tripod, low ISO, small aperture (f/8-f/16). Include foreground, midground, and background.' }],
      },
      {
        id: 'ph-lightroom',
        name: 'Lightroom Editing',
        videos: [{ id: 'v-ph-5', title: 'Lightroom Tutorial Beginners', creator: 'Peter McKinnon', youtubeId: 'UqWpA9mGZ0Q', keyInsight: 'Lightroom workflow: exposure → contrast → highlights/shadows → color → sharpening. Shoot RAW — it gives 10x more editing latitude than JPEG.' }],
      },
    ],
  },
  {
    id: 'filmmaking',
    name: 'Filmmaking',
    category: 'Creative & Visual',
    emoji: '🎥',
    accentColor: '#3B82F6',
    topics: [
      {
        id: 'film-framing',
        name: 'Framing & Composition',
        videos: [{ id: 'v-film-1', title: 'Cinematic Film Composition', creator: 'StudioBinder', youtubeId: 'BWgcb7uiO7c', keyInsight: 'Shot types tell different stories. Close-up = emotion. Wide shot = context. Camera height = power dynamic. Every frame is a decision.' }],
      },
      {
        id: 'film-framerates',
        name: 'Frame Rates & Shutter Speed',
        videos: [{ id: 'v-film-2', title: 'Frame Rate & Shutter Speed', creator: 'StudioBinder', youtubeId: 'w_E3k8_K_6w', keyInsight: '180° shutter rule: shutter speed = 2× frame rate. 24fps = cinematic. 60fps = sports/slow-mo. Wrong shutter speed makes footage look "off."' }],
      },
      {
        id: 'film-lighting',
        name: 'Three-Point Lighting',
        videos: [{ id: 'v-film-3', title: '3 Point Lighting Setup', creator: 'Think Media', youtubeId: 'G6W5wbPqzPw', keyInsight: 'Three-point lighting: key light (main source), fill light (soften shadows), back light (separate subject from background). Portable and professional.' }],
      },
      {
        id: 'film-audio',
        name: 'Audio Quality',
        videos: [{ id: 'v-film-4', title: 'Better Audio for Video', creator: 'Film Riot', youtubeId: 'zT1C99_f_F8', keyInsight: 'Get the mic close to the subject. Lavalier mics beat camera mics every time. Record room tone for 30 seconds — you\'ll need it in post.' }],
      },
      {
        id: 'film-broll',
        name: 'B-Roll Mastery',
        videos: [{ id: 'v-film-5', title: 'B-Roll Masterclass', creator: 'Peter McKinnon', youtubeId: 'P_J4A2X-Xl0', keyInsight: 'B-roll covers cuts and adds visual interest. Shoot 3× more B-roll than you think you need. Vary angles, movement, and scale constantly.' }],
      },
    ],
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    category: 'Creative & Visual',
    emoji: '🖼️',
    accentColor: '#EC4899',
    topics: [
      {
        id: 'da-procreate',
        name: 'Procreate Basics',
        videos: [{ id: 'v-da-1', title: 'Procreate Drawing Beginners', creator: 'Art with Flo', youtubeId: 'AX84Qc0dwo4', keyInsight: 'Procreate uses layers like physical media. Master: layer blending modes, selection tools, and transform. Stylus pressure sensitivity is your best tool.' }],
      },
      {
        id: 'da-light',
        name: 'Light & Shadow',
        videos: [{ id: 'v-da-2', title: 'Shade Digital Art', creator: 'Viyaura', youtubeId: 'mQp78y2Lz50', keyInsight: 'Light direction determines where shadows fall. Core forms: sphere, cube, cylinder. Understand these and you can shade anything.' }],
      },
      {
        id: 'da-color',
        name: 'Color Theory',
        videos: [{ id: 'v-da-3', title: 'Color Theory Beginners', creator: 'Envato Tuts+', youtubeId: '2QTHs7QSR9o', keyInsight: 'Warm colors advance, cool colors recede. Complementary colors create vibration. Use a limited palette (3-5 colors) until you master color relationships.' }],
      },
      {
        id: 'da-character',
        name: 'Character Design',
        videos: [{ id: 'v-da-4', title: 'Character Design Tips', creator: 'BaM Animation', youtubeId: '8wm9ti-gzLM', keyInsight: 'Great characters read as silhouettes. Use primary shapes: circles (friendly), squares (strong), triangles (dangerous). Exaggerate for memorability.' }],
      },
      {
        id: 'da-brushes',
        name: 'Brushes & Blending',
        videos: [{ id: 'v-da-5', title: 'Procreate Brushes Blending', creator: 'Art with Flo', youtubeId: 'y3YjS7R_4sI', keyInsight: 'Custom brushes define your art style. Soft brushes for blending, hard brushes for detail. Opacity control via pressure = the foundation of digital painting.' }],
      },
    ],
  },
  {
    id: 'chess',
    name: 'Chess',
    category: 'Gaming & Strategy',
    emoji: '♟️',
    accentColor: '#FFD600',
    topics: [
      {
        id: 'chess-rules',
        name: 'Rules & Setup',
        videos: [
          {
            id: 'v-chess-1',
            title: 'How to Play Chess Episode 2: Fighting for the King',
            creator: 'Kids Academy',
            videoUrl: 'https://pub-ef0d64d4483442089d9334d9dc46aff9.r2.dev/hobbyapp/How%20to%20Play%20Chess%20Episode%202%20Fighting%20for%20the%20King%20Kids%20Academy%20-%20Kids%20Academy%20(1080p).mp4',
            keyInsight: 'Chess: 6 piece types, 64 squares. Control the center (e4, d4, e5, d5). Each piece has different movement — learn their values: pawn=1, knight/bishop=3, rook=5, queen=9.',
          },
          {
            id: 'v-chess-1b',
            title: 'How to Play Chess Episode 3: Chess Army',
            creator: 'Kids Academy',
            videoUrl: 'https://pub-ef0d64d4483442089d9334d9dc46aff9.r2.dev/hobbyapp/YTMP3GG_YouTube_How-to-Play-Chess-Episode-3-Chess-Army-L_Media_asb93vAinyM_001_1080p.mp4',
            thumbnailUrl: 'https://img.youtube.com/vi/asb93vAinyM/hqdefault.jpg',
            keyInsight: 'Every chess game has three phases: opening (develop pieces), middlegame (create plans and attack), endgame (convert material advantage). Knowing which phase you\'re in guides every decision.',
          },
        ],
      },
      {
        id: 'chess-openings',
        name: 'Openings',
        videos: [{ id: 'v-chess-2', title: 'Best Chess Openings', creator: 'GothamChess', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'Opening principles over memorization: develop pieces, control center, castle early. Don\'t move same piece twice without reason. Connect rooks.' }],
      },
      {
        id: 'chess-tactics',
        name: 'Tactics',
        videos: [{ id: 'v-chess-3', title: 'Chess Tactics Forks Pins', creator: 'Chess.com', youtubeId: '9_H8t87_Fsc', keyInsight: 'Tactics win games: fork (attack two pieces), pin (piece can\'t move), skewer (attack valuable piece behind lesser one). Solve 5 puzzles daily.' }],
      },
      {
        id: 'chess-endgame',
        name: 'Endgame',
        videos: [{ id: 'v-chess-4', title: 'Essential Chess Endgames', creator: 'GothamChess', youtubeId: 'zK8f9aXyGv8', keyInsight: 'King becomes powerful in endgame — activate it. King+pawn vs King: know the opposition and the square rule. Rook endgames are the most common.' }],
      },
      {
        id: 'chess-gm',
        name: 'Study GM Games',
        videos: [{ id: 'v-chess-5', title: 'Bobby Fischer Greatest Game', creator: 'Agadmator', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Study grandmaster games to see strategy in action. Don\'t just watch — replay moves and guess before looking. Understanding beats memorizing.' }],
      },
    ],
  },
  {
    id: 'cooking',
    name: 'Cooking',
    category: 'Food & Lifestyle',
    emoji: '🍳',
    accentColor: '#F97316',
    topics: [
      {
        id: 'cook-knife',
        name: 'Knife Skills',
        videos: [{ id: 'v-cook-1', title: 'Knife Skills Techniques', creator: 'Joshua Weissman', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Claw grip protects fingers — curl fingertips, knuckles guide blade. Sharp knives are safer than dull ones. Learn julienne, dice, and chiffonade.' }],
      },
      {
        id: 'cook-sauces',
        name: 'Mother Sauces',
        videos: [{ id: 'v-cook-2', title: '5 Mother Sauces Explained', creator: 'Babish', youtubeId: 'zK8f9aXyGv8', keyInsight: '5 French mother sauces: béchamel, velouté, espagnole, hollandaise, tomato. Master these and you can make hundreds of derivative sauces.' }],
      },
      {
        id: 'cook-sear',
        name: 'Searing Meat',
        videos: [{ id: 'v-cook-3', title: 'How to Sear Steak', creator: 'Gordon Ramsay', youtubeId: '9_H8t87_Fsc', keyInsight: 'Hot pan + dry meat + don\'t move it = perfect sear. Maillard reaction happens at 140°C+. Pat meat dry, season generously, rest after cooking.' }],
      },
      {
        id: 'cook-flavor',
        name: 'Flavor Profiling',
        videos: [{ id: 'v-cook-4', title: 'Salt Fat Acid Heat', creator: 'Samin Nosrat', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'Four elements of great cooking: salt (enhances flavor), fat (carries flavor), acid (brightens), heat (transforms). Master these, not recipes.' }],
      },
      {
        id: 'cook-prep',
        name: 'Meal Prep',
        videos: [{ id: 'v-cook-5', title: 'Meal Prep Ultimate Guide', creator: 'Joshua Weissman', youtubeId: 'P_J4A2X-Xl0', keyInsight: 'Batch cooking saves time and money. Cook bases (grains, proteins, sauces) separately for maximum flexibility. Mise en place before you start.' }],
      },
    ],
  },
  {
    id: 'guitar',
    name: 'Guitar',
    category: 'Music & Performance',
    emoji: '🎸',
    accentColor: '#FF6B6B',
    topics: [
      {
        id: 'gtr-anatomy',
        name: 'Anatomy & Tuning',
        videos: [{ id: 'v-gtr-1', title: 'Anatomy of Electric Guitar', creator: 'Guitar World', youtubeId: '9W_Lkqs64Js', keyInsight: 'Learn every part: headstock, tuning pegs, nut, frets, body, pickups, bridge. Standard tuning: EADGBe low to high. Tune before every practice session.' }],
      },
      {
        id: 'gtr-chords',
        name: 'First Chords',
        videos: [{ id: 'v-gtr-2', title: 'First 4 Guitar Chords', creator: 'JustinGuitar', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Learn G, C, D, Em first — thousands of songs use only these. Press close to the fret, arch your fingers, and practice chord transitions daily.' }],
      },
      {
        id: 'gtr-strum',
        name: 'Strumming Patterns',
        videos: [{ id: 'v-gtr-3', title: 'How to Strum Guitar', creator: 'JustinGuitar', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Strumming from the wrist, not the elbow. Down-Down-Up-Up-Down-Up is the most universal pattern. Keep the arm moving even when muting strings.' }],
      },
      {
        id: 'gtr-tabs',
        name: 'Reading Tabs',
        videos: [{ id: 'v-gtr-4', title: 'Read Guitar Tabs Beginners', creator: 'JustinGuitar', youtubeId: '9_H8t87_Fsc', keyInsight: 'Tabs show string (bottom = low E) and fret number. No rhythm notation — listen to the song for timing. Tabs are a shortcut, not a substitute for ear training.' }],
      },
      {
        id: 'gtr-firstsong',
        name: 'First Song',
        videos: [{ id: 'v-gtr-5', title: 'Learn First Song Guitar', creator: 'JustinGuitar', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'Pick a song you love — motivation beats theory. Practice slowly (half speed) until perfect, then increase tempo. Play daily for 15 min beats 1hr weekly.' }],
      },
    ],
  },
  {
    id: 'piano',
    name: 'Piano',
    category: 'Music & Performance',
    emoji: '🎹',
    accentColor: '#A5B4FC',
    topics: [
      {
        id: 'pno-layout',
        name: 'Layout & Posture',
        videos: [{ id: 'v-pno-1', title: 'Piano Posture Layout', creator: 'Hoffman Academy', youtubeId: 'vo4pMVb0z6M', keyInsight: 'Posture: sit at 90°, bench at elbow height, curved fingers, relaxed wrists. White keys repeat in groups of 2 and 3 black keys — that\'s how to find every note.' }],
      },
      {
        id: 'pno-scale',
        name: 'Major Scale',
        videos: [{ id: 'v-pno-2', title: 'Play C Major Scale', creator: 'Hoffman Academy', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'C Major: all white keys from C to C. Pattern: W-W-H-W-W-W-H (whole and half steps). All major scales follow this same pattern — just start on different notes.' }],
      },
      {
        id: 'pno-chords',
        name: 'Basic Chords',
        videos: [{ id: 'v-pno-3', title: 'Basic Piano Chords', creator: 'Hoffman Academy', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Major chords = root + 4 semitones + 3 semitones. Minor chords = root + 3 semitones + 4. Learn the 12 major and 12 minor chords — that\'s the foundation.' }],
      },
      {
        id: 'pno-hands',
        name: 'Hand Independence',
        videos: [{ id: 'v-pno-4', title: 'Hand Independence Piano', creator: 'Pianoote', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Practice hands separately first until each is fluent, then combine slowly. Metronome is mandatory for hand independence — tempo reveals all mistakes.' }],
      },
      {
        id: 'pno-sheet',
        name: 'Sheet Music',
        videos: [{ id: 'v-pno-5', title: 'Read Sheet Music Beginners', creator: 'Pianoote', youtubeId: '9_H8t87_Fsc', keyInsight: 'Treble clef: EGBDF (lines), FACE (spaces). Bass clef: GBDFA (lines), ACEG (spaces). "Every Good Boy Does Fine." Learn rhythmic values: whole, half, quarter, eighth.' }],
      },
    ],
  },
  {
    id: 'yoga',
    name: 'Yoga',
    category: 'Fitness & Wellness',
    emoji: '🧘',
    accentColor: '#6EE7B7',
    topics: [
      {
        id: 'yoga-beginners',
        name: 'Yoga for Beginners',
        videos: [{ id: 'v-yoga-1', title: 'Yoga For Beginners - 20 min', creator: 'Yoga With Adriene', youtubeId: 'v7AYKMP6rOE', keyInsight: 'Start with foundational poses: mountain, downward dog, child\'s pose, warrior I. Focus on breath over perfect form. Listen to your body, not your ego.' }],
      },
      {
        id: 'yoga-sun',
        name: 'Sun Salutations',
        videos: [{ id: 'v-yoga-2', title: 'Sun Salutation A Beginners', creator: 'Yoga With Adriene', youtubeId: 'v7AYKMP6rOE', keyInsight: 'Sun Salutation A: 10 poses linked by breath. Inhale to expand, exhale to fold/contract. 5-10 rounds warm the body and build heat. Perfect morning ritual.' }],
      },
      {
        id: 'yoga-flex',
        name: 'Flexibility',
        videos: [{ id: 'v-yoga-3', title: 'Deep Stretch Flexibility', creator: 'Yoga With Adriene', youtubeId: 'v7AYKMP6rOE', keyInsight: 'Flexibility improves with consistency, not intensity. Hold stretches 30-90 seconds for lasting change. Breathe into tight areas — tension releases with exhale.' }],
      },
      {
        id: 'yoga-vinyasa',
        name: 'Vinyasa Flow',
        videos: [{ id: 'v-yoga-4', title: 'Vinyasa Flow Beginners', creator: 'Yoga With Adriene', youtubeId: 'v7AYKMP6rOE', keyInsight: 'Vinyasa links movement to breath in continuous flow. Each pose leads to the next. The rhythm of breath guides the pace — never hold your breath.' }],
      },
      {
        id: 'yoga-core',
        name: 'Core Strength',
        videos: [{ id: 'v-yoga-5', title: 'Core Strength Yoga', creator: 'Yoga With Adriene', youtubeId: 'v7AYKMP6rOE', keyInsight: 'Core = not just abs, but the full cylinder: front, sides, back, floor. Yoga core: boat pose, plank variations, and twists. Engaged core protects the spine.' }],
      },
    ],
  },
  {
    id: 'gym',
    name: 'Gym & Fitness',
    category: 'Fitness & Wellness',
    emoji: '💪',
    accentColor: '#FF6B6B',
    topics: [
      {
        id: 'gym-routine',
        name: 'Workout Routine',
        videos: [{ id: 'v-gym-1', title: 'Perfect Beginner Routine', creator: 'Jeff Nippard', youtubeId: 'P_J4A2X-Xl0', keyInsight: '3 days/week full body beats 6 days split for beginners. Compound movements first (squat, bench, deadlift, row). Consistency over perfection always.' }],
      },
      {
        id: 'gym-overload',
        name: 'Progressive Overload',
        videos: [{ id: 'v-gym-2', title: 'Use Progressive Overload', creator: 'Jeff Nippard', youtubeId: '8mI3K3j6_4E', keyInsight: 'Progressive overload = adding stress over time: more weight, reps, or sets. Without it, gains stop. Track your workouts — you can\'t manage what you don\'t measure.' }],
      },
      {
        id: 'gym-compound',
        name: 'Compound Movements',
        videos: [{ id: 'v-gym-3', title: 'Form for Compound Movements', creator: 'Jeremy Ethier', youtubeId: '9_H8t87_Fsc', keyInsight: 'Squat, deadlift, bench, overhead press, row — these 5 movements build 90% of your physique. Form beats weight every time. Film yourself to spot errors.' }],
      },
      {
        id: 'gym-nutrition',
        name: 'Nutrition & Macros',
        videos: [{ id: 'v-gym-4', title: 'Calculate Your Macros', creator: 'Jeff Nippard', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Protein is the priority: 0.7-1g per pound of bodyweight. Calories determine body composition direction. Track for 2 weeks to learn your habits, then adjust.' }],
      },
      {
        id: 'gym-recovery',
        name: 'Recovery',
        videos: [{ id: 'v-gym-5', title: 'Science of Muscle Recovery', creator: 'Jeremy Ethier', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Muscle grows during rest, not during workouts. Sleep 7-9 hours — it\'s when growth hormone peaks. Under-recovery = 0 gains no matter how hard you train.' }],
      },
    ],
  },
  {
    id: 'meditation',
    name: 'Meditation',
    category: 'Fitness & Wellness',
    emoji: '🧠',
    accentColor: '#C4B5FD',
    topics: [
      {
        id: 'med-guided',
        name: 'Guided Meditation',
        videos: [{ id: 'v-med-1', title: '10-Min Guided Meditation', creator: 'Headspace', youtubeId: 'vo4pMVb0z6M', keyInsight: 'Meditation is noticing when you\'ve drifted and returning. 10 minutes daily beats 1 hour weekly. The goal isn\'t to stop thinking — it\'s to observe without attachment.' }],
      },
      {
        id: 'med-mindfulness',
        name: 'Mindfulness Science',
        videos: [{ id: 'v-med-2', title: 'Scientific Mindfulness', creator: 'Headspace', youtubeId: 'vo4pMVb0z6M', keyInsight: '8 weeks of daily meditation measurably changes the brain. Reduces amygdala reactivity (stress response) and grows prefrontal cortex (decision-making).' }],
      },
      {
        id: 'med-breathwork',
        name: 'Breathwork',
        videos: [{ id: 'v-med-3', title: 'Anxiety & Focus Breath', creator: 'Wim Hof', youtubeId: 'vo4pMVb0z6M', keyInsight: 'Box breathing (4-4-4-4) activates the parasympathetic nervous system immediately. Exhale longer than inhale for calm; equal or longer inhale for energy.' }],
      },
      {
        id: 'med-bodyscan',
        name: 'Body Scan',
        videos: [{ id: 'v-med-4', title: 'Body Scan Sleep', creator: 'Headspace', youtubeId: 'vo4pMVb0z6M', keyInsight: 'Body scan: systematically direct attention from feet to head. Releases stored physical tension. Most effective for sleep and connecting mind-body.' }],
      },
      {
        id: 'med-vipassana',
        name: 'Vipassana',
        videos: [{ id: 'v-med-5', title: 'What is Vipassana?', creator: 'Dhamma Service', youtubeId: 'vo4pMVb0z6M', keyInsight: 'Vipassana = insight meditation. Observe sensations without reacting. Impermanence is the core insight — everything arises and passes. 10-day retreats are transformative.' }],
      },
    ],
  },
  {
    id: 'public-speaking',
    name: 'Public Speaking',
    category: 'Learning & Knowledge',
    emoji: '🎤',
    accentColor: '#F59E0B',
    topics: [
      {
        id: 'ps-fear',
        name: 'Fear of Speaking',
        videos: [{ id: 'v-ps-1', title: 'Overcome Fear of Speaking', creator: 'TED-Ed', youtubeId: 'VUg33pNa5zE', keyInsight: 'Speaking anxiety is adrenaline — reframe it as excitement. The audience wants you to succeed. Preparation eliminates 80% of fear; practice eliminates the rest.' }],
      },
      {
        id: 'ps-body',
        name: 'Body Language',
        videos: [{ id: 'v-ps-2', title: 'Key to Stage Presence', creator: 'Stanford GSB', youtubeId: '1WTD-V2F_N8', keyInsight: 'Open posture, purposeful movement, eye contact (3-5 seconds per person). Hands should be visible. Slow down — nervous speakers rush, confident ones pause.' }],
      },
      {
        id: 'ps-hook',
        name: 'Hook Audience',
        videos: [{ id: 'v-ps-3', title: 'Hook Audience in 30 Seconds', creator: 'Public Speaking Pro', youtubeId: '9_H8t87_Fsc', keyInsight: 'Open with a question, bold statement, or story — never "Today I\'m going to talk about..." The first 30 seconds determine if the audience stays engaged.' }],
      },
      {
        id: 'ps-structure',
        name: 'Speech Structure',
        videos: [{ id: 'v-ps-4', title: 'Persuasive Speech Structure', creator: 'TEDx', youtubeId: 'C5it_v6uAas', keyInsight: 'Rule of 3: three main points are memorable, two feel incomplete, four overwhelm. Problem → Solution → Call to Action is the simplest persuasive structure.' }],
      },
      {
        id: 'ps-ted',
        name: 'TED Talk Analysis',
        videos: [{ id: 'v-ps-5', title: 'Great TED Talk Analysis', creator: 'Charisma on Command', youtubeId: '9q_u8Vf_X_E', keyInsight: 'TED talks work because they teach one idea clearly and memorably. They use story, data, and emotion. Study what makes your favorite talks compelling.' }],
      },
    ],
  },
  {
    id: 'productivity',
    name: 'Productivity Systems',
    category: 'Learning & Knowledge',
    emoji: '⚡',
    accentColor: '#10B981',
    topics: [
      {
        id: 'prod-gtd',
        name: 'GTD Method',
        videos: [{ id: 'v-prod-1', title: 'GTD Method Explained', creator: 'Tiago Forte', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Getting Things Done: capture everything, clarify next actions, organize by context, review weekly. Your brain is for having ideas, not storing them.' }],
      },
      {
        id: 'prod-brain',
        name: 'Second Brain',
        videos: [{ id: 'v-prod-2', title: 'Notion Second Brain Setup', creator: 'Tiago Forte', youtubeId: '9QDu6wpR59o', keyInsight: 'Second brain: an external system to capture and connect ideas. CODE method: Capture, Organize, Distill, Express. Build it around your projects, not topics.' }],
      },
      {
        id: 'prod-timeblock',
        name: 'Time Blocking',
        videos: [{ id: 'v-prod-3', title: 'Time Block Pomodoro', creator: 'Thomas Frank', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'Time blocking assigns tasks to specific time slots. Deep work first (hardest tasks when most alert). Protect deep work blocks like meetings — they\'re non-negotiable.' }],
      },
      {
        id: 'prod-habits',
        name: 'Atomic Habits',
        videos: [{ id: 'v-prod-4', title: 'Implement Atomic Habits', creator: 'James Clear', youtubeId: 'FnFBxRWnUdU', keyInsight: '1% better every day = 37× better after a year. Habits = cue → routine → reward. Make good habits obvious, attractive, easy, and satisfying. Stack new habits onto existing ones.' }],
      },
      {
        id: 'prod-procrastination',
        name: 'Stop Procrastinating',
        videos: [{ id: 'v-prod-5', title: 'Stop Procrastinating', creator: 'Ali Abdaal', youtubeId: 'dsS2wg2Y39c', keyInsight: 'Procrastination is emotional avoidance, not laziness. Fix: make tasks smaller (2-minute rule), reduce friction, start before feeling ready. Action precedes motivation.' }],
      },
    ],
  },
  {
    id: 'dancing',
    name: 'Dancing',
    category: 'Music & Performance',
    emoji: '💃',
    accentColor: '#EC4899',
    topics: [
      {
        id: 'dance-beat',
        name: 'Beat & Rhythm',
        videos: [{ id: 'v-dance-1', title: 'Find Beat and Rhythm', creator: 'STEEZY.CO', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'Finding the beat: clap on the snare (usually beats 2 and 4). Rhythm is patterns within the beat. Internalize music before learning choreography.' }],
      },
      {
        id: 'dance-groove',
        name: 'Groove & Bounce',
        videos: [{ id: 'v-dance-2', title: 'Dance Groove Bounce', creator: 'STEEZY.CO', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Groove comes from the knees — bend slightly and bounce with the music. Relaxed body moves better than tense. Dance with your whole body, not just arms.' }],
      },
      {
        id: 'dance-hiphop',
        name: 'Hip Hop Basics',
        videos: [{ id: 'v-dance-3', title: 'Hip Hop Dance Beginners', creator: 'STEEZY.CO', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Hip hop foundation moves: 2-step, running man, cabbage patch. Sharp hitting on accents, smooth gliding between. Freestyle > perfect choreography early on.' }],
      },
      {
        id: 'dance-footwork',
        name: 'Footwork',
        videos: [{ id: 'v-dance-4', title: 'Dance Footwork Fundamentals', creator: 'STEEZY.CO', youtubeId: '9_H8t87_Fsc', keyInsight: 'Footwork drives everything. Practice steps slowly, build muscle memory, then add speed and style. Good footwork = confidence that shows in full body movement.' }],
      },
      {
        id: 'dance-choreo',
        name: 'Choreography',
        videos: [{ id: 'v-dance-5', title: 'Short Hip Hop Routine', creator: 'STEEZY.CO', youtubeId: 'P_J4A2X-Xl0', keyInsight: 'Learn choreography in 8-count sections. Master section 1 before adding section 2. Perform with energy even when unsure — confidence sells the moves.' }],
      },
    ],
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    category: 'Learning & Knowledge',
    emoji: '📖',
    accentColor: '#F59E0B',
    topics: [
      {
        id: 'story-hero',
        name: "Hero's Journey",
        videos: [{ id: 'v-story-1', title: 'Joseph Campbell Explained', creator: 'StudioBinder', youtubeId: 'Hhk4N9A0oCA', keyInsight: "Hero's Journey: ordinary world → call to adventure → trials → transformation → return. Every great story follows this. Use it as a template, not a formula." }],
      },
      {
        id: 'story-character',
        name: 'Compelling Characters',
        videos: [{ id: 'v-story-2', title: 'Compelling Characters', creator: 'Lessons from the Screenplay', youtubeId: 'nXvS9Y_hMpk', keyInsight: 'Characters need want (external goal) + need (internal truth they must learn). Conflict between want and need creates the story. Flaws make characters human.' }],
      },
      {
        id: 'story-show',
        name: "Show Don't Tell",
        videos: [{ id: 'v-story-3', title: 'Better Scenes Writing', creator: 'StudioBinder', youtubeId: 'v_O6uGvT6_Y', keyInsight: "Show don't tell: character reveals emotion through action and dialogue, not narration. \"She slammed the door\" beats \"she was angry\". Trust your reader." }],
      },
      {
        id: 'story-arcs',
        name: 'Story Arcs',
        videos: [{ id: 'v-story-4', title: 'Pacing and Arcs', creator: 'Lessons from the Screenplay', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Three-act structure: setup (25%), confrontation (50%), resolution (25%). Every scene needs a micro-arc: a character wants something and gets or doesn\'t get it.' }],
      },
      {
        id: 'story-visual',
        name: 'Visual Storytelling',
        videos: [{ id: 'v-story-5', title: 'Visuals Storytelling', creator: 'RocketJump', youtubeId: 'FpW-7uMv8s0', keyInsight: 'Visual storytelling communicates through images, not words. Color, light, framing, and movement all carry meaning. If you need dialogue to explain it, show it better.' }],
      },
    ],
  },
  {
    id: 'backpacking',
    name: 'Backpacking',
    category: 'Travel',
    emoji: '🎒',
    accentColor: '#84CC16',
    topics: [
      {
        id: 'back-pack',
        name: 'Pack Light',
        videos: [{ id: 'v-back-1', title: 'Pack Light One Bag', creator: 'Pack Hacker', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'One-bag travel: 40L max, half your planned clothes. Everything must serve 2+ purposes. Layering beats packing for every scenario. Ship stuff home if needed.' }],
      },
      {
        id: 'back-hacks',
        name: 'Budget Travel Hacks',
        videos: [{ id: 'v-back-2', title: '10 Budget Travel Hacks', creator: 'Lost LeBlanc', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Flight timing beats flight search. Incognito mode for prices. Hostels > hotels for connection. Street food > restaurants. Off-season = 50% cost, 20% crowds.' }],
      },
      {
        id: 'back-safety',
        name: 'Safety Tips',
        videos: [{ id: 'v-back-3', title: 'Solo Travel Safety Tips', creator: 'Hey Nadine', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Research before you go — crime stats, scam types, local customs. Share itinerary with someone. Trust gut over politeness. Digital copies of all documents.' }],
      },
      {
        id: 'back-itinerary',
        name: 'Planning Itinerary',
        videos: [{ id: 'v-back-4', title: 'Plan Backpacking Trip', creator: 'The Broke Backpacker', youtubeId: '9_H8t87_Fsc', keyInsight: 'Over-planning kills spontaneity. Book first and last nights only; leave middle open. Allow transition days — they become your best memories.' }],
      },
      {
        id: 'back-photo',
        name: 'Travel Photography',
        videos: [{ id: 'v-back-5', title: 'Travel Photography Beginners', creator: 'Lost LeBlanc', youtubeId: 'P_J4A2X-Xl0', keyInsight: 'Travel photography: wake up early for golden hour and empty streets. Ask permission for portraits. Capture daily life, not just landmarks. Phone camera is enough to start.' }],
      },
    ],
  },
  {
    id: 'poker',
    name: 'Poker',
    category: 'Gaming & Strategy',
    emoji: '🃏',
    accentColor: '#FF6B6B',
    topics: [
      {
        id: 'poker-rules',
        name: 'Rules & Hand Rankings',
        videos: [{ id: 'v-poker-1', title: 'Texas Hold\'em Rules', creator: 'PokerStars', youtubeId: 'vo4pMVb0z6M', keyInsight: 'Hand rankings: Royal Flush → Straight Flush → Four of a Kind → Full House → Flush → Straight → Three of a Kind → Two Pair → Pair → High Card.' }],
      },
      {
        id: 'poker-strategy',
        name: 'Basic Strategy',
        videos: [{ id: 'v-poker-2', title: 'Poker Strategy Beginners', creator: 'PokerStars', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'Play tight (fewer hands) and aggressive (bet when you play). Fold most hands preflop. Position is power — playing in position lets you act with more information.' }],
      },
      {
        id: 'poker-odds',
        name: 'Pot Odds',
        videos: [{ id: 'v-poker-3', title: 'Pot Odds Management', creator: 'Daniel Negreanu', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Pot odds: call if your equity (chance of winning) > pot odds cost. Quick math: outs × 2 ≈ % chance of hitting on next card. Math beats gut feeling.' }],
      },
      {
        id: 'poker-position',
        name: 'Position',
        videos: [{ id: 'v-poker-4', title: 'Power of Position', creator: 'PokerStars', youtubeId: '9_H8t87_Fsc', keyInsight: 'Acting last is a massive advantage — you see opponents act before deciding. Steal blinds from late position. Play fewer hands from early position.' }],
      },
      {
        id: 'poker-mistakes',
        name: 'Common Mistakes',
        videos: [{ id: 'v-poker-5', title: '10 Poker Mistakes', creator: 'Daniel Negreanu', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Biggest leaks: playing too many hands, calling too much (be aggressive), tilting (emotional decisions), and ignoring position. Fix these before advanced concepts.' }],
      },
    ],
  },
  {
    id: 'coffee',
    name: 'Coffee Brewing',
    category: 'Food & Lifestyle',
    emoji: '☕',
    accentColor: '#F59E0B',
    topics: [
      {
        id: 'cof-espresso',
        name: 'Espresso Basics',
        videos: [{ id: 'v-cof-1', title: 'How to Dial In Espresso', creator: 'DaddyGotCoffee', youtubeId: 'nEGYSFD1Hm4', keyInsight: 'Espresso dial-in: 18g coffee → 36g output in 25-30 seconds. Too fast = grind finer. Too slow = grind coarser. Dose, grind size, and tamp pressure are the variables.' }],
      },
      {
        id: 'cof-frenchpress',
        name: 'French Press',
        videos: [{ id: 'v-cof-2', title: 'Ultimate French Press Guide', creator: 'James Hoffmann', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'French press: 30g coffee per 500ml water at 93°C. Don\'t plunge — just remove the plunger and pour. 4-minute steep. Coarse grind prevents sludge.' }],
      },
      {
        id: 'cof-pourover',
        name: 'V60 Pour Over',
        videos: [{ id: 'v-cof-3', title: 'Ultimate V60 Technique', creator: 'James Hoffmann', youtubeId: 'zK8f9aXyGv8', keyInsight: 'V60: 15g coffee, 250g water at 94°C, medium-fine grind. Bloom with 2× water weight (30g) for 30s. Pour in controlled circles. Total brew: 2:30-3:00 minutes.' }],
      },
      {
        id: 'cof-latte',
        name: 'Latte Art',
        videos: [{ id: 'v-cof-4', title: 'Steam Milk Latte Art', creator: 'James Hoffmann', youtubeId: '9_H8t87_Fsc', keyInsight: 'Steam milk to 60-65°C with a swirling motion. Microfoam (velvety, no big bubbles) is required for latte art. Pour from low height, then raise and pour slowly.' }],
      },
      {
        id: 'cof-roast',
        name: 'Roast Profiles',
        videos: [{ id: 'v-cof-5', title: 'Coffee Roasts Explained', creator: 'James Hoffmann', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'Light roast: more acidic, complex, origin flavors preserved. Dark roast: less acid, bitter, chocolate/smoke notes. Medium: balanced. Espresso ≠ dark roast — that\'s a myth.' }],
      },
    ],
  },
  {
    id: 'gardening',
    name: 'Gardening',
    category: 'Food & Lifestyle',
    emoji: '🌱',
    accentColor: '#84CC16',
    topics: [
      {
        id: 'gard-container',
        name: 'Container Gardening',
        videos: [{ id: 'v-gard-1', title: 'Grow CONTAINER Garden', creator: 'James Prigioni', youtubeId: 'HQTPDs6dvEI', keyInsight: 'Container gardening works anywhere with sun. Use quality potting mix (not garden soil). Containers dry fast — check moisture daily. Drainage holes are non-negotiable.' }],
      },
      {
        id: 'gard-soil',
        name: 'Soil Health',
        videos: [{ id: 'v-gard-2', title: 'Soil and Compost Science', creator: 'Epic Gardening', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'Soil is a living ecosystem. Compost feeds it. Avoid tilling — it kills fungal networks. Healthy soil smells earthy, clumps lightly, and drains well.' }],
      },
      {
        id: 'gard-herbs',
        name: 'Indoor Herbs',
        videos: [{ id: 'v-gard-3', title: 'How to Grow Herbs Indoors', creator: 'Epic Gardening', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Easiest indoor herbs: basil, mint, chives, parsley. South-facing window or grow light. Harvest regularly to encourage growth — don\'t let them flower.' }],
      },
      {
        id: 'gard-pest',
        name: 'Pest Control',
        videos: [{ id: 'v-gard-4', title: 'Natural Pest Control Garden', creator: 'Epic Gardening', youtubeId: '9_H8t87_Fsc', keyInsight: 'Identify pest before treating. Neem oil handles most soft-bodied insects. Companion planting deters pests naturally. Check undersides of leaves — that\'s where pests hide.' }],
      },
      {
        id: 'gard-pruning',
        name: 'Pruning & Propagation',
        videos: [{ id: 'v-gard-5', title: 'Prune and Propagate Plants', creator: 'Epic Gardening', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Pruning redirects energy to fruit/flowers. Cut at 45° above a node. Stem cuttings propagate most plants for free: cut, dip in rooting hormone, plant in moist soil.' }],
      },
    ],
  },
  {
    id: 'psychology',
    name: 'Psychology',
    category: 'Learning & Knowledge',
    emoji: '🧩',
    accentColor: '#8B5CF6',
    topics: [
      {
        id: 'psy-intro',
        name: 'Intro Psychology',
        videos: [{ id: 'v-psy-1', title: 'Crash Course Psychology #1', creator: 'CrashCourse', youtubeId: 'vo4pMVb0z6M', keyInsight: 'Psychology studies behavior and mental processes. Nature vs nurture is false — they interact constantly. The brain is both hardware and software.' }],
      },
      {
        id: 'psy-biases',
        name: 'Cognitive Biases',
        videos: [{ id: 'v-psy-2', title: '25 Cognitive Biases', creator: 'Practical Psychology', youtubeId: 'R9Uu0JtvyMg', keyInsight: 'Key biases: confirmation bias (seek confirming info), Dunning-Kruger (low competence = high confidence), sunk cost fallacy (past costs shouldn\'t drive future decisions).' }],
      },
      {
        id: 'psy-habits',
        name: 'Habit Formation',
        videos: [{ id: 'v-psy-3', title: 'Science of Habits', creator: 'The Royal Institution', youtubeId: 'y3YjS7R_4sI0', keyInsight: 'Habits form through repetition: cue → routine → reward. The basal ganglia automates repeated behaviors. 66 days average to form a habit (not 21).' }],
      },
      {
        id: 'psy-eq',
        name: 'Emotional Intelligence',
        videos: [{ id: 'v-psy-4', title: 'What is Emotional Intelligence?', creator: 'The School of Life', youtubeId: 'L22lDu3QX2c', keyInsight: 'EQ = self-awareness + self-regulation + motivation + empathy + social skills. EQ predicts success better than IQ in most fields. It\'s trainable.' }],
      },
      {
        id: 'psy-behavioral',
        name: 'Behavioral Economics',
        videos: [{ id: 'v-psy-5', title: 'Crash Course Economics #27', creator: 'CrashCourse', youtubeId: 'vo4pMVb0z6M', keyInsight: 'Humans aren\'t rational — we\'re predictably irrational. Loss aversion: losses hurt 2× more than gains please. Defaults and anchoring shape decisions invisibly.' }],
      },
    ],
  },
  {
    id: 'baking',
    name: 'Baking',
    category: 'Food & Lifestyle',
    emoji: '🍞',
    accentColor: '#F59E0B',
    topics: [
      {
        id: 'bake-science',
        name: 'Baking Science',
        videos: [{ id: 'v-bake-1', title: 'Baking Explained In 3 Min', creator: 'Better Cook Academy', youtubeId: 'Y_CrLm_DEV4', keyInsight: 'Baking is chemistry. Flour = structure, fat = tenderness, sugar = browning + moisture, eggs = binding, leavening = lift. Changing one ingredient changes everything.' }],
      },
      {
        id: 'bake-cookies',
        name: 'Perfect Cookies',
        videos: [{ id: 'v-bake-2', title: 'Best Choc Chip Cookie', creator: 'Joshua Weissman', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Brown butter = deeper flavor. Chill dough 24-72hrs for better texture. More brown sugar = chewier. Underbake slightly — cookies set as they cool.' }],
      },
      {
        id: 'bake-sourdough',
        name: 'Sourdough',
        videos: [{ id: 'v-bake-3', title: 'Ultimate Sourdough Starter', creator: 'Joshua Weissman', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Sourdough starter = wild yeast + bacteria culture. Feed with equal parts flour and water daily. Starter is ready when it doubles within 4-8 hours of feeding.' }],
      },
      {
        id: 'bake-cake',
        name: 'Cake Decorating',
        videos: [{ id: 'v-bake-4', title: 'Cake Decorating Beginners', creator: 'Wilton', youtubeId: '9_H8t87_Fsc', keyInsight: 'Crumb coat first (thin layer to seal crumbs), refrigerate 30 min, then final coat. Offset spatula + turntable = smooth sides. Let buttercream crust before smoothing.' }],
      },
      {
        id: 'bake-pastry',
        name: 'Pastry Dough',
        videos: [{ id: 'v-bake-5', title: 'Flaky Pastry Dough Babish', creator: 'Babish', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'Flaky pastry: keep fat cold, handle minimally, rest in fridge. Fat pieces in dough create steam = flaky layers. Never let the dough get warm while working.' }],
      },
    ],
  },
  {
    id: 'language',
    name: 'Language Learning',
    category: 'Learning & Knowledge',
    emoji: '🌍',
    accentColor: '#3B82F6',
    topics: [
      {
        id: 'lang-input',
        name: 'Comprehensible Input',
        videos: [{ id: 'v-lang-1', title: 'Language Comprehensible Input', creator: 'Language Lords', youtubeId: 'XfO6lmlxh0M', keyInsight: 'Krashen\'s input hypothesis: we acquire language through comprehensible input (i+1 — slightly above current level). TV, books, podcasts in target language build fluency.' }],
      },
      {
        id: 'lang-anki',
        name: 'Spaced Repetition',
        videos: [{ id: 'v-lang-2', title: 'Anki for Language', creator: 'Ali Abdaal', youtubeId: '76yqErAib5g', keyInsight: 'Anki uses spaced repetition — cards you struggle with appear more often. 20 min/day beats marathon sessions. 2,000 most common words = 90% of daily speech.' }],
      },
      {
        id: 'lang-speaking',
        name: 'Overcome Speaking Fear',
        videos: [{ id: 'v-lang-3', title: 'Fear Speak Foreign Language', creator: 'LinguaMarina', youtubeId: 'Vl0Xv_87f9Y', keyInsight: 'Speak imperfectly from day 1. Native speakers appreciate the attempt, not perfection. Language exchange apps put you in front of real speakers immediately.' }],
      },
      {
        id: 'lang-immersion',
        name: 'Immersion at Home',
        videos: [{ id: 'v-lang-4', title: 'Immersion at Home Fast', creator: 'Matt vs. Japan', youtubeId: '0qelyk_mWBs', keyInsight: 'Change phone/Netflix language. Think in target language. Immersion creates the acquisition environment without moving countries. Quantity of exposure beats quality of study.' }],
      },
      {
        id: 'lang-shadow',
        name: 'Shadowing Technique',
        videos: [{ id: 'v-lang-5', title: 'Shadowing Technique Pronunciation', creator: 'English with Lucy', youtubeId: 'yUvGHNzqG7M', keyInsight: 'Shadowing: listen to native speech and repeat simultaneously, mimicking rhythm and intonation exactly. The fastest way to get native-like pronunciation and connected speech.' }],
      },
    ],
  },
  {
    id: 'martial-arts',
    name: 'Martial Arts',
    category: 'Fitness & Wellness',
    emoji: '🥊',
    accentColor: '#FF6B6B',
    topics: [
      {
        id: 'ma-footwork',
        name: 'Boxing Footwork',
        videos: [{ id: 'v-ma-1', title: 'Boxing Stance Footwork', creator: 'Hayabusa', youtubeId: 'Q3siDY1a6PI', keyInsight: 'Boxing stance: dominant foot back, weight 60/40, hands up, chin down, elbows in. Pivot on ball of foot — always move the lead foot in the lead direction first.' }],
      },
      {
        id: 'ma-punch',
        name: 'Punching Basics',
        videos: [{ id: 'v-ma-2', title: 'How to Punch Beginners', creator: 'ExpertBoxing', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Power comes from rotation, not arm strength. Hips → core → shoulder → fist. Keep the non-punching hand guarding your chin at all times.' }],
      },
      {
        id: 'ma-kicks',
        name: 'Muay Thai Kicks',
        videos: [{ id: 'v-ma-3', title: 'Kick in Muay Thai', creator: 'FightTips', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Muay Thai teep (push kick): foot → hip extension → push through. Roundhouse: pivot foot, rotate hip, strike with shin (not foot). Shin is the weapon.' }],
      },
      {
        id: 'ma-bjj',
        name: 'BJJ Basics',
        videos: [{ id: 'v-ma-4', title: 'BJJ Basics Beginners', creator: 'Gracie University', youtubeId: '9_H8t87_Fsc', keyInsight: 'BJJ: leverage beats strength. Position before submission — guard → mount → back are dominant positions. Tap early, tap often. Ego is the most common injury.' }],
      },
      {
        id: 'ma-shadow',
        name: 'Shadowboxing',
        videos: [{ id: 'v-ma-5', title: 'Shadowbox for Beginners', creator: 'FightTips', youtubeId: 'P_J4A2X-Xl0', keyInsight: 'Shadowboxing builds technique when no partner is available. Use a mirror. Work combinations, footwork, and defense. Throw punches with intent — not flailing.' }],
      },
    ],
  },
  {
    id: 'creative-writing',
    name: 'Creative Writing',
    category: 'Learning & Knowledge',
    emoji: '📝',
    accentColor: '#A5B4FC',
    topics: [
      {
        id: 'cw-masterclass',
        name: 'Writing Masterclass',
        videos: [{ id: 'v-cw-1', title: 'Brandon Sanderson BYU Lectures', creator: 'Brandon Sanderson', youtubeId: 'N4ZDBOc2tX8', keyInsight: 'Sanderson\'s First Law: an author\'s ability to solve conflict with magic is directly proportional to how well the reader understands said magic. Rules create wonder.' }],
      },
      {
        id: 'cw-worldbuilding',
        name: 'World-Building',
        videos: [{ id: 'v-cw-2', title: 'World-Building 101', creator: 'Hello Future Me', youtubeId: 'yYjS7R_4sI0', keyInsight: 'World-build to serve your story, not to show off. Iceberg rule: 90% stays hidden, 10% shows. Readers trust richness without needing every detail explained.' }],
      },
      {
        id: 'cw-dialogue',
        name: 'Writing Dialogue',
        videos: [{ id: 'v-cw-3', title: 'Write Better Dialogue', creator: 'Lessons from the Screenplay', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Great dialogue serves multiple purposes: character, conflict, information, subtext. Read it aloud — if it sounds written, it is. Every character should sound different.' }],
      },
      {
        id: 'cw-block',
        name: "Writer's Block",
        videos: [{ id: 'v-cw-4', title: "Overcome Writer's Block", creator: 'The Write Life', youtubeId: 'P_J4A2X-Xl0', keyInsight: "Writer's block is fear. Write badly on purpose — permission to write badly releases the block. First draft = get it done, not get it right. Edit later." }],
      },
      {
        id: 'cw-publish',
        name: 'Publishing',
        videos: [{ id: 'v-cw-5', title: 'Self vs Traditional', creator: 'Reedsy', youtubeId: '8mI3K3j6_4E', keyInsight: 'Traditional: advance + marketing, but 18+ months, low royalties (10-15%). Self-publishing: 70% royalties, full control, but you handle everything. Query first, self-pub as backup.' }],
      },
    ],
  },
  {
    id: 'pc-building',
    name: 'PC Building',
    category: 'Gaming & Strategy',
    emoji: '🖥️',
    accentColor: '#6366F1',
    topics: [
      {
        id: 'pc-parts',
        name: 'Choose Parts',
        videos: [{ id: 'v-pc-1', title: 'How to Choose PC Parts', creator: 'Linus Tech Tips', youtubeId: 'Hhk4N9A0oCA', keyInsight: 'CPU + GPU balance matters most. No weak link — a $500 GPU with a $100 CPU bottlenecks. Use PCPartPicker to check compatibility. RAM: 16GB minimum, 32GB future-proof.' }],
      },
      {
        id: 'pc-build',
        name: 'Build Guide',
        videos: [{ id: 'v-pc-2', title: 'Step-by-Step PC Build', creator: 'Linus Tech Tips', youtubeId: 'v_O6uGvT6_Y', keyInsight: 'Build order: CPU → cooler → RAM → motherboard → PSU in case → GPU → storage → cables. Ground yourself constantly. Don\'t force anything — if it resists, stop.' }],
      },
      {
        id: 'pc-os',
        name: 'OS Installation',
        videos: [{ id: 'v-pc-3', title: 'Install Windows Setup', creator: 'JayzTwoCents', youtubeId: '9_H8t87_Fsc', keyInsight: 'Boot from USB drive (8GB min), select clean install, format the target drive. Install drivers in order: chipset → GPU → network. Windows Update after everything.' }],
      },
      {
        id: 'pc-cables',
        name: 'Cable Management',
        videos: [{ id: 'v-pc-4', title: 'Cable Management Masterclass', creator: 'Linus Tech Tips', youtubeId: 'zK8f9aXyGv8', keyInsight: 'Route cables behind the motherboard tray. Zip ties + velcro straps = organized. Good cable management improves airflow and makes future upgrades easier.' }],
      },
      {
        id: 'pc-trouble',
        name: 'Troubleshooting',
        videos: [{ id: 'v-pc-5', title: "Fix PC Won't Turn On", creator: 'JayzTwoCents', youtubeId: 'P_J4A2X-Xl0', keyInsight: 'PC won\'t boot: check 24-pin and CPU power connectors first. Breadboarding (building outside the case) isolates case short issues. RAM seated fully. GPU power connected.' }],
      },
    ],
  },
] as const;

export function getHobbyById(id: string): CurriculumHobby | undefined {
  return CURRICULUM.find((h) => h.id === id);
}

export function getTopicById(hobbyId: string, topicId: string): CurriculumTopic | undefined {
  const hobby = getHobbyById(hobbyId);
  return hobby?.topics.find((t) => t.id === topicId);
}

export function getTotalTopics(hobbyId: string): number {
  return getHobbyById(hobbyId)?.topics.length ?? 0;
}
