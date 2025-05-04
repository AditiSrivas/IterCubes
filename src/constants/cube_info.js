const empathizeTopInfo = [
    // 1. Isabella Cruz
    {
        name: "Isabella Cruz",
        archetype: "The On-the-Go Parent",
        imgPath: "/images/persona/persona1.png",
        animPath: "/animations/persona/persona1.json",
        demographics: {
            age: 38,
            occupation: "Marketing Manager",
            family: "Married, 2 kids (5 & 8) ",
            loaction: "Miami, FL",
        },
        bio: " Isabella balances a busy marketing career with family logistics. She demands intuitive, time-saving tools.",
        personality: {
            introvertExtrovert: 6,
            analyticalCreative: 7,
            loyalFickle: 8,
            passiveActive: 5,
        }, 
        preferredChannels: {
            web: 8,
            mobile: 10,
            email: 6,
            ads: 3,
        },
        goals: [
            "Automate recurring tasks",
            "Get reminders and alerts in real time",
        ],
        frustrations: [
            "Apps that demand too much setup time  ",
            "Notifications that aren’t customizable",
        ],
        motivations: {
            price: 4,
            comfort: 8,
            convenience: 10,
            speed: 7,
            loyalty: 5,
        },
        brands: ["Amazon", "Google Calendar", "Slack", "Disney+"],
    }, 

    // 2. Dev Patel
    {
        name: "Dev Patel",
        archetype: "The Aspiring Innovator ",
        imgPath: "/images/persona/persona2.png",
        animPath: "/animations/persona/persona2.json",
        demographics: {
            age: 24,
            occupation: "Startup Founder (EdTech)",
            family: "Single",
            loaction: "Bengaluru, India",
        },
        bio: "Dev leads an AI-powered tutoring startup and needs scalable, API-driven platforms.",
        personality: {
            introvertExtrovert: 4,
            analyticalCreative: 8,
            loyalFickle: 5,
            passiveActive: 6,
        }, 
        preferredChannels: {
            web: 10,
            mobile: 6,
            email: 9,
            ads: 7,
        },
        goals: [
            "Rapid prototyping",
            "Integration with third-party services",
        ],
        frustrations: [
            "Vendor lock-in",
            "Poor or undocumented APIs",
        ],
        motivations: {
            price: 6,
            flexibility: 10,
            communitySupport: 6,
        },
        brands: ["Stripe", "AWS", "Github", "Coursera"],
    },

    // 3. Mei Ling
    {
        name: "Mei Ling",
        archetype: "The Digital Native",
        imgPath: "/images/persona/persona3.png",
        animPath: "/animations/persona/persona3.json",
        demographics: {
            age: 22,
            occupation: "University Student (Media Studies)",
            family: "Lives with roommates",
            loaction: "Toronto, Canada",
        },
        bio: "Mei balances studies, work, and social life, demanding consistent cross-device experiences.",
        personality: {
            introvertExtrovert: 5,
            analyticalCreative: 6,
            loyalFickle: 5,
            passiveActive: 6,
        }, 
        preferredChannels: {
            mobile: 10,
            web: 8,
            socialMedia: 9,
            email: 6,
        },
        goals: [
            "Instant syncing",
            "Zero learning curve",
        ],
        frustrations: [
            "Clunky interfaces",
            "Unresponsive mobile layouts",
        ],
        motivations: {
            convenience: 10,
            speed: 8,
        },
        brands: ["Apple", "Instagram", "Spotify", "Netflix"],
    }, 

    // 4. Ahmed Hassan
    {
        name: "Ahmed Hassan",
        archetype: "The SME Owner",
        imgPath: "/images/persona/persona4.png",
        animPath: "/animations/persona/persona4.json",
        demographics: {
            age: 45,
            occupation: "Café Chain Owner",
            family: "Married, 3 children",
            loaction: "Cairo, Egypt",
        },
        bio: "Ahmed manages multiple cafés and prioritizes reliability, transparency, and predictable costs.",
        personality: {
            introvertExtrovert: 6,
            analyticalCreative: 6,
            loyalFickle: 8,
            passiveActive: 7,
        }, 
        preferredChannels: {
            web: 7,
            mobile: 5,
            email: 8,
            wordOfMouth: 6,
        },
        goals: [
            "Streamline supply chain",
            "Predictable budgeting",
        ],
        frustrations: [
            "Hidden fees",
            "Unclear service levels",
        ],
        motivations: {
            price: 9,
            reliability: 10,
        },
        brands: ["Square", "WhatsApp Business", "Shopify", "Trello"],
    },

    // 5. Elena Petrova
    {
        name: "Elena Petrova",
        archetype: "The Global Traveler",
        imgPath: "/images/persona/persona5.png",
        animPath: "/animations/persona/persona5.json",
        demographics: {
            age: 31,
            occupation: "Travel Blogger",
            family: "Single",
            loaction: "Barcelona, Spain",
        },
        bio: "Elena seeks authentic cultural experiences and values local insights over mainstream guides.",
        personality: {
            introvertExtrovert: 5,
            analyticalCreative: 5,
            loyalFickle: 4,
            passiveActive: 6,
        }, 
        preferredChannels: {
            web: 6,
            mobile: 10,
            socialMedia: 9,
          },
        goals: [
            "Unique itineraries",
            "Real-time translation",
        ],
        frustrations: [
            "Over-touristed areas",
            "Poor user reviews",
        ],
        motivations: {
            experience: 10,
            convenience: 8,
        },
        brands: ["Airbnb", "TripAdvisorr", "Google Maps", "Adobe Lightroom"],
    }, 

    // 6. Marcus Johnson
    {
        name: "Marcus Johnson",
        archetype: "The Fitness Enthusiast",
        imgPath: "/images/persona/persona6.png",
        animPath: "/animations/persona/persona6.json",
        demographics: {
            age: 29,
            occupation: "Software Developer",
            family: "In a relationship",
            loaction: "London, UK",
        },
        bio: "Marcus tracks every metric from sleep to steps, expecting deep analytics and actionable insights.",
        personality: {
            introvertExtrovert: 4,
            analyticalCreative: 8,
            loyalFickle: 5,
            passiveActive: 7,
        }, 
        preferredChannels: {
            mobile: 10,
            wearable: 9,
            email: 5,
          },
        goals: [
            "Optimize performance",
            "Prevent injuries",
        ],
        frustrations: [
            "Fragmented data silos",
            "Generic advice",
        ],
        motivations: {
            precision: 10,
            health: 10,
        },
        brands: ["Fitbit", "Strava", "MyFitnessPal", "Apple Health"],
    },

    // 7. Fatima al-Saleh
    {
        name: "Fatima al-Saleh",
        archetype: "The Healthcare Advocate",
        imgPath: "/images/persona/persona7.png",
        animPath: "/animations/persona/persona7.json",
        demographics: {
            age: 52,
            occupation: "Nurse & Patient Educator",
            family: "Widow, adult children",
            loaction: "Riyadh, Saudi Arabia",
        },
        bio: "Fatima equips patients with understandable resources and telehealth tools with multi-language support.",
        personality: {
            introvertExtrovert: 5,
            analyticalCreative: 6,
            loyalFickle: 8,
            passiveActive: 6,
        }, 
        preferredChannels: {
            web: 8,
            mobile: 7,
            email: 6,
          },
        goals: [
            "Empower patients",
            "Simplify medical jargon",
        ],
        frustrations: [
            "Inaccessible interfaces",
            "Outdated data",
        ],
        motivations: {
            accuracy: 9,
            empathy: 9,
        },
        brands: ["Mayo Clinic", "WebMD", "Zoom Health", "Medscape"],
    }, 

    // 8. Lars Svensson
    {
        name: "Lars Svensson",
        archetype: "The Eco-Conscious Commuter",
        imgPath: "/images/persona/persona8.png",
        animPath: "/animations/persona/persona8.json",
        demographics: {
            age: 34,
            occupation: "Graphic Designer",
            family: "Partner, no children",
            loaction: "Stockholm, Sweden",
        },
        bio: "Lars bikes or rides transit, choosing sustainable services and expecting transparent impact metrics.",
        personality: {
            introvertExtrovert: 6,
            analyticalCreative: 6,
            loyalFickle: 5,
            passiveActive: 6,
        }, 
        preferredChannels: {
            web: 7,
            mobile: 9,
            socialMedia: 5
          },
        goals: [
            "Track personal emissions",
            "Support green businesses",
        ],
        frustrations: [
            "Greenwashing",
            "Lack of standardized metrics",
        ],
        motivations: {
            sustainability: 10,
            transparency: 8,
        },
        brands: ["Tesla", "Voi", "Ecosia", "Patagonia"],
    },

    // 9. Sofia Romero
    {
        name: "Sofia Romero",
        archetype: "The Retiree Learner",
        imgPath: "/images/persona/persona9.png",
        animPath: "/animations/persona/persona9.json",
        demographics: {
            age: 68,
            occupation: "Retired Teacher",
            family: "Grandchildren",
            loaction: "Buenos Aires, Argentina",
        },
        bio: "Sofia explores new hobbies with patient-paced tutorials and intuitive, accessible interfaces.",
        personality: {
            introvertExtrovert: 5,
            analyticalCreative: 5,
            loyalFickle: 8,
            passiveActive: 6,
        }, 
        preferredChannels: {
            web: 6,
            tablet: 7,
            email: 4,
          },
        goals: [
            "Easy-to-follow lessons",
            "Community engagement",
        ],
        frustrations: [
            "Small text",
            "Overly technical language",
        ],
        motivations: {
            learning: 7,
            social: 7,
        },
        brands: ["Duolingo", "Zoom", "Udemy", "Barnes & Noble"],
    }, 

    // 10. Kwame Boateng
    {
        name: "Kwame Boateng",
        archetype: "The Rural Entrepreneur",
        imgPath: "/images/persona/persona10.png",
        animPath: "/animations/persona/persona10.json",
        demographics: {
            age: 42,
            occupation: "Solar-Pump Technician",
            family: "Wife & 4 children",
            loaction: "Kumasi, Ghana",
        },
        bio: "Kwame implements renewable-powered solutions and needs reliable connectivity and simple diagnostic tools.",
        personality: {
            introvertExtrovert: 5,
            analyticalCreative: 5,
            loyalFickle: 8,
            passiveActive: 6,
        }, 
        preferredChannels: {
            mobile: 9,
            sms: 6,
            phone: 4,
          },
        goals: [
            "Remote diagnostics",
            "Transparent pricing",
        ],
        frustrations: [
            "Spotty coverage",
            "Complex UIs",
        ],
        motivations: {
            reliability: 8,
            affordability: 6,
        },
        brands: ["M-KOPA", "Twiga Foods", "Google", "Local Telecom"],
    },

    // 11. Hiroshi Yamamoto
    {
        name: "Hiroshi Yamamoto",
        archetype: "The Tech Skeptic",
        imgPath: "/images/persona/persona11.png",
        animPath: "/animations/persona/persona11.json",
        demographics: {
            age: 50,
            occupation: "University Librarian",
            family: "Married",
            loaction: "Kyoto, Japan",
        },
        bio: "Hiroshi prefers analog workflows and demands airtight privacy and offline capabilities",
        personality: {
            introvertExtrovert: 7,
            analyticalCreative: 7,
            loyalFickle: 5,
            passiveActive: 6,
        }, 
        preferredChannels: {
            desktop: 8,
            paper: 9,
            email: 5,
          },
        goals: [
            "Data sovereignty",
            "Seamless offline workflow",
        ],
        frustrations: [
            "Hidden data collection",
            "Forced updates",
        ],
        motivations: {
            privacy: 10,
            control: 7,
        },
        brands: ["iD Software", "ProtonMail", "Signal", "Local Archives"],
    }, 

    // 12. Camila Santos
    {
        name: "Camila Santos",
        archetype: "The Wellness Seeker",
        imgPath: "/images/persona/persona12.png",
        animPath: "/animations/persona/persona12.json",
        demographics: {
            age: 27,
            occupation: "Yoga Instructor & Nutrition Blogger",
            family: "Single",
            loaction: "Lisbon, Portugal",
        },
        bio: "Camila promotes holistic living, expecting harmonious tech that supports mindfulness.",
        personality: {
            introvertExtrovert: 6,
            analyticalCreative: 5,
            loyalFickle: 8,
            passiveActive: 6,
        }, 
        preferredChannels: {
            socialMedia: 8,
            mobile: 9,
            email: 4,
          },
        goals: [
            "Mindful notifications",
            "Integrated habit tracking",
        ],
        frustrations: [
            "Overly gamified apps",
            "Information overload",
        ],
        motivations: {
            simplicity: 7,
            wellbeing: 10,
        },
        brands: ["Headspace", "Calm", "Lululemon", "Whole Foods"],
    },
]
const empathizeFrontInfo = [
    // 1. Isabella Cruz
    {
        empathyMap: {
            thinksFeels: "Wants to stay on top of work and family without burnout. Overwhelmed by cluttered schedules.",
            sees: "Endless notifications, messy calendars, and tools that don’t sync.",
            saysDoes: "“Can I do this quickly from my phone?” Multitasks constantly—often from her car or kitchen.",
            hears: "Reminders from family, urgent pings from work, and productivity tips from friends.",
        },
        quote: " “I need a solution that lets me manage schedules and logistics in seconds.” ",
        dayInLife: [
            "7:00 AM – Preps kids and checks emails over coffee.",
            "9:00 AM – Juggles meetings and school alerts.",
            "3:00 PM – Picks up kids, responds to Slack in the car.",
            "8:00 PM – Reviews tomorrow’s schedule and resets.",
        ],
    }, 

    // 2. Dev Patel
    {
        empathyMap: {
            thinksFeels: "Constantly strategizing how to scale fast. Wants tech that won’t slow him down.",
            sees: "API docs, Slack threads, and dashboards full of user metrics.",
            saysDoes: "“Is there a faster way to deploy this?” Prototypes late into the night, lives in VS Code",
            hears: "Investor expectations, user feedback, and community buzz on new tools.",
        },
        quote: " “I want tools that grow as fast as my ideas.” ",
        dayInLife: [
            "9:00 AM – Stand-up with remote team, reviews product backlog.",
            "12:00 PM – Debugs API issues over coffee.",
            "4:00 PM – Meets with potential partners or mentors.",
            "10:00 PM – Codes and browses GitHub for inspiration.",
        ],
    },

    // 3. Mei Ling
    {
        empathyMap: {
            thinksFeels: "Wants tech that works instantly, without thinking. Hates lag and clutter.",
            sees: "Push notifications, Reels, group chats, and Canva assignments.",
            saysDoes: "“This should’ve synced by now.” Multitasks across tabs and apps constantly.",
            hears: "Buzzing phones, Spotify playlists, and friends hyping the next trend.",
        },
        quote: " “I expect seamless UX across all my devices.” ",
        dayInLife: [
            "8:30 AM – Streams a lecture while checking socials.",
            "1:00 PM – Works on a group project via shared docs.",
            "6:00 PM – Switches from laptop to phone for entertainment.",
            "10:00 PM – Edits TikToks and finishes last-minute readings.",
        ],
    }, 

    // 4. Ahmed Hassan
    {
        empathyMap: {
            thinksFeels: "Wants stability—no surprises in cost or service. Trust is key.",
            sees: "Delivery delays, inventory charts, staff updates, and vendor invoices.",
            saysDoes: "I need this on time, every time.” Tracks expenses and staff schedules daily",
            hears: "Customer feedback, supplier promises, and team concerns.",
        },
        quote: " “I need a reliable partner, not another vendor.” ",
        dayInLife: [
            "7:00 AM – Checks inventory levels and vendor updates",
            "10:00 AM – Visits café branches and speaks to managers.",
            "2:00 PM – Reviews costs, pays invoices, and replies to emails.",
            "8:00 PM – Plans ahead for supply orders and marketing efforts",
        ],
    },

    // 5. Elena Petrova
    {
        empathyMap: {
            thinksFeels: "Seeks hidden gems, not tourist traps. Trusts locals more than ratings.",
            sees: "Travel vlogs, photo inspiration, cultural posts from locals.",
            saysDoes: "“I want real experiences.” Posts daily, bookmarks unique spots.",
            hears: "Tips from fellow travelers and local hosts",
        },
        quote: " “I crave off-the-beaten-path experiences.” ",
        dayInLife: [
            "9:00 AM – Captures sunrise shots and local street scenes.",
            "12:00 PM – Explores hidden cafés or museums recommended by locals.",
            "4:00 PM – Edits photos and writes blog content.",
            "9:00 PM – Plans next day’s itinerary and posts travel stories.",
        ],
    }, 

    // 6. Marcus Johnson
    {
        empathyMap: {
            thinksFeels: "Driven by data. Wants clarity, not clutter. Seeks constant improvement.",
            sees: "Performance dashboards, wearable trends, fitness communities.",
            saysDoes: "'Show me what actually works.' Syncs data, tweaks routines weekly.",
            hears: "Tips from biohackers, workout podcasts, and fitness tech reviews.",
        },
        quote: "“I want data-driven insights for my workouts.”",
        dayInLife: [
            "6:30 AM – Logs sleep metrics and does a morning run.",
            "12:00 PM – Eats a macro-tracked lunch and checks app stats.",
            "6:00 PM – Strength training session guided by wearable data.",
            "10:00 PM – Reviews trends, adjusts targets, logs recovery goals.",
        ],
    },

    // 7. Fatima al-Saleh
    {
        empathyMap: {
            thinksFeels: "Everyone deserves to understand their health. Trust starts with clarity.",
            sees: "Confused patients, multilingual needs, outdated printouts.",
            saysDoes: "“This should be easier to explain.” Translates terms, shares resources.",
            hears: "Patient concerns, clinical updates, peer suggestions on tools.",
        },
        quote: "“My priority is clear, compassionate communication.”",
        dayInLife: [
            "7:00 AM – Checks medical dashboards and schedules virtual check-ins.",
            "12:30 PM – Explains test results using simple language and visuals.",
            "4:00 PM – Updates patient education resources and checks translations.",
            "8:00 PM – Joins a healthcare webinar or reviews latest guidelines.",
        ],
    }, 

    // 8. Lars Svensson
    {
        empathyMap: {
            thinksFeels: "“My choices should make a difference.” He values environmental accountability.",
            sees: "Bike lanes, reusable packaging, brands claiming “green” without proof.",
            saysDoes: "“I try to live sustainably.” Uses eco-apps, checks carbon footprint weekly.",
            hears: "Discussions about climate policy, product reviews on sustainability.",
        },
        quote: "“Every choice should minimize my carbon footprint.”",
        dayInLife: [
            "7:30 AM – Cycles to his co-working space while tracking CO₂ savings.",
            "1:00 PM – Grabs lunch from a local zero-waste café.",
            "5:30 PM – Rides Voi scooter home, comparing carbon stats on apps.",
            "9:00 PM – Shops online for ethical brands or donates to a green cause.",
        ],
    },

    // 9. Sofia Romero
    {
        empathyMap: {
            thinksFeels: "“I want to keep my mind active, but at my own pace.” Values simplicity and encouragement.",
            sees: "Online courses, creative hobby videos, family chats on Zoom.",
            saysDoes: "“I’m learning something new every week.” Joins online book clubs and beginner tutorials.",
            hears: "Recommendations from friends, grandkids showing her new apps.",
        },
        quote: "“It’s never too late to pick up a new skill.”",
        dayInLife: [
            "9:00 AM – Enjoys morning coffee while browsing new Udemy courses on her tablet.",
            "11:00 AM – Attends a virtual Spanish class via Zoom.",
            "3:00 PM – Practices piano with a YouTube tutorial",
            "7:00 PM – Video calls grandkids and shares what she learned.",
        ],
    }, 

    // 10. Kwame Boateng
    {
        empathyMap: {
            thinksFeels: "“I need tools that work even when the signal doesn’t.” Values practicality and uptime.",
            sees: "Offline dashboards, missed calls from clients, solar components in the field.",
            saysDoes: "“Keep it simple—if it breaks, I fix it.” Travels between villages for maintenance jobs.",
            hears: "Local feedback, community needs, occasional updates from mobile carriers.",
        },
        quote: "“Connectivity transforms my community.”",
        dayInLife: [
            "7:30 AM – Loads equipment and checks SMS for job requests.",
            "10:00 AM – Installs or services a solar pump in a remote area.",
            "2:00 PM – Uses mobile app for basic diagnostics—when network allows.",
            "6:00 PM – Reviews parts inventory and sends reports via low-data app.",
        ],
    },

    // 11. Hiroshi Yamamoto
    {
        empathyMap: {
            thinksFeels: "“Just because it’s digital doesn’t mean it’s better.” Prioritizes control, permanence, and transparency.",
            sees: "Bookshelves, archived files, overly complex software updates that interrupt workflows.",
            saysDoes: "“I’d rather have a printed manual.” Uses encrypted email selectively and prefers software with no cloud dependency.",
            hears: "Peers discussing digital upgrades, warnings about data privacy breaches, local tech policies",
        },
        quote: "“Privacy is non-negotiable for me.”",
        dayInLife: [
            "8:00 AM – Opens the library, checks paper logs, and plans archive curation.",
            "10:30 AM – Uses an offline database on a secure terminal.",
            "2:00 PM – Assists students with research, encourages critical tech use.",
            "6:00 PM – Updates backups manually, locks systems before closing.",
        ],
    }, 

    // 12. Camila Santos
    {
        empathyMap: {
            thinksFeels: "“My tech should help me breathe easier, not stress me out.” Camila values serenity, balance, and clean interfaces.",
            sees: "Minimalist apps, soothing color palettes, daily routines built around yoga, journaling, and meal planning.",
            saysDoes: "“I unfollow anything that clutters my mind.” Posts wellness content, tests new holistic tools, disables most push notifications.",
            hears: "Mantras during sessions, wellness community buzz, and gentle reminders from curated mindfulness apps.",
        },
        quote: "“Balance is more than a buzzword—it’s my lifestyle.”",
        dayInLife: [
            "7:00 AM – Morning yoga and meditation using a calm audio guide.",
            "9:30 AM – Posts a new recipe or wellness tip on Instagram.",
            "12:00 PM – Meets clients or runs a virtual class",
            "5:00 PM – Tracks daily wellness habits and disconnects from screens for a nature walk.",
        ],
    },
]
const empathizeLeftInfo = [
    // 1. Isabella Cruz
    {
        painpoints: [
            "Apps that require a long setup before becoming useful.",
            "Notifications without priority filtering.",
            "Switching between too many platforms.",
            "Lack of real-time sync between family and work tools.",
            "Inflexible mobile interfaces while on the move.",
        ],
    }, 

    // 2. Dev Patel
    {
        painpoints: [
            "Platforms with rigid infrastructure or limited customization.",
            "APIs lacking documentation or community examples.",
            "Tools that don’t scale easily or break under traffic.",
            "Delayed support responses from vendors.",
            "Overpriced platforms with unclear pricing tiers.",
        ],
    },

    // 3. Mei Ling
    {
        painpoints: [
            "Interfaces that don’t feel intuitive or modern.",
            "Apps that don’t sync between devices instantly.",
            "Mobile layouts that break or scroll awkwardly.",
            "Long setup flows or logins.",
            "Services that lag or buffer frequently.",
        ],
    }, 

    // 4. Ahmed Hassan
    {
        painpoints: [
            "Surprise fees or inconsistent billing.",
            "Delayed deliveries disrupting service.",
            "Platforms that are hard to train staff on.",
            "No clear escalation path when things go wrong.",
            "Data not syncing across tools (POS, inventory, etc).",
        ],
    },

    // 5. Elena Petrova
    {
        painpoints: [
            "Locations feeling staged or touristy.",
            "Unreliable language translation apps.",
            "Generic travel suggestions with no local flavor.",
            "Poor mobile performance when abroad.",
            "Difficulty navigating new cities offline.",
        ],
    }, 

    // 6. Marcus Johnson
    {
        painpoints: [
            "Inconsistent data between fitness platforms.",
            "Advice that isn’t personalized.",
            "Apps that are overwhelming with too many options.",
            "Delayed syncing from wearables.",
            "Difficulty identifying meaningful trends over time.",
        ],
    },

    // 7. Fatima al-Saleh
    {
        painpoints: [
            "Medical tools that aren’t user-friendly for elderly or ESL patients.",
            "Difficult interfaces during high-stress consultations.",
            "Lack of culturally sensitive resources.",
            "Delayed access to updated medical content.",
            "Too much reliance on dense clinical terminology.",
        ],
    }, 

    // 8. Lars Svensson
    {
        painpoints: [
            "Inconsistent or vague sustainability claims (greenwashing).",
            "Apps that don't integrate multiple metrics (CO₂, energy, etc.).",
            "Lack of clarity on supply chain transparency.",
            "Few incentives for making eco-conscious choices.",
            "Limited localized data on transit and emissions impact.",
        ],
    },

    // 9. Sofia Romero
    {
        painpoints: [
            "Confusing user interfaces with too many features.",
            "Small or hard-to-read fonts.",
            "Learning materials that assume prior tech knowledge.",
            "Limited community options tailored to her age group.",
            "Tutorials that move too quickly or lack clear visuals.",
        ],
    }, 

    // 10. Kwame Boateng
    {
        painpoints: [
            "Unreliable mobile networks in rural zones.",
            "Apps that require constant connectivity.",
            "User interfaces not adapted for outdoor or low-light conditions.",
            "High data consumption or hidden app costs.",
            "Inflexible pricing or one-size-fits-all service plans.",
        ],
    },

    // 11. Hiroshi Yamamoto
    {
        painpoints: [
            "Mandatory internet connectivity for core features.",
            "Lack of transparency in software permissions.",
            "Auto-updates disrupting customized offline setups.",
            "Overly cloud-reliant tools with poor documentation.",
            "Limited support for legacy systems or analog workflows.",
        ],
    }, 

    // 12. Camila Santos
    {
        painpoints: [
            "Apps that overuse badges, streaks, or gamified pressure.",
            "Cluttered dashboards that feel overwhelming.",
            "Inconsistent syncing between wellness trackers.",
            "Too many contradictory nutrition claims.",
            "Limited support for natural, intuitive scheduling.",
        ],
    },
]
const empathizeRightInfo = [
    "The local grocery store's self-checkout system frequently experiences errors, causing long wait times for customers and leading to frustration among employees who must manually resolve the issues.",
    "Online education platforms are seeing an increase in drop-out rates because students feel isolated and unsupported due to lack of personalized interactions or mentorship.",
    "Frequent outages in the cloud storage services of a mid-sized tech company result in lost work and decreased productivity, causing significant dissatisfaction among employees and clients alike.",
    "A city’s public transportation system lacks real-time updates and effective communication channels, leading to confusion and delays for commuters, especially during rush hours.",
    "The customer onboarding process for a popular e-commerce app is overly complex, leading to a high rate of abandoned accounts and a decline in new user retention.",
    "A small manufacturing business is struggling with its outdated inventory management system, causing frequent stockouts and excess inventory, which increases operational costs and customer dissatisfaction",
    "Freelancers in creative industries report feeling overwhelmed by inconsistent payment schedules and delayed invoices, impacting their financial stability and productivity.",
    "Hospital emergency rooms face extended wait times and high levels of patient dissatisfaction due to insufficient staffing and inefficient triage systems during peak hours.",
    "A new fitness app has low engagement rates because users feel disconnected from the community and lack personalized fitness plans that match their goals and preferences.",
    "A mid-sized law firm experiences delays in case processing due to inefficient document management systems, leading to a backlog of clients and increased legal costs.",
    "Local cafes struggle to attract regular customers as their loyalty program is poorly integrated into their mobile app, resulting in low usage and customer retention.",
    "Small urban farmers face difficulty accessing affordable agricultural tools and resources due to lack of streamlined distribution channels and information in their region.",
    "Many remote teams at a large corporation experience communication breakdowns during virtual meetings, resulting in missed deadlines and reduced collaboration due to a lack of effective tools and strategies.",
    "A digital health startup’s app fails to deliver accurate health data due to inconsistent syncing with wearable devices, leading to a decrease in trust among early adopters.",
    "Residents in rural communities face limited access to fast internet, which hinders their ability to access essential services like telemedicine and online education, especially during critical times.",
    "The rising number of digital ad blockers is causing a significant drop in ad revenues for a content-based website, leaving it financially unstable and unsure of how to adapt to changing user behaviors.",
    "A popular tourist destination faces overcrowding due to inefficient ticketing systems and lack of real-time visitor tracking, leading to a diminished experience for tourists and locals.",
    "Elderly patients with chronic conditions face difficulty managing their medications due to complex dosage schedules and lack of user-friendly reminder systems.",
    "Parents of young children often feel overwhelmed by the vast array of parenting advice online, leading to confusion and uncertainty when trying to find reliable, evidence-based resources.",
    "Local governments struggle with inefficient waste management systems, resulting in inconsistent pickup schedules, overflowing bins, and public dissatisfaction in both residential and commercial areas.",
]
const empathizeBackInfo = [
    { moodBoard: "/images/empathizeBack/1.png" },
    { moodBoard: "/images/empathizeBack/2.png" },
    { moodBoard: "/images/empathizeBack/3.png" },
    { moodBoard: "/images/empathizeBack/4.png" },
    { moodBoard: "/images/empathizeBack/5.png" },
    { moodBoard: "/images/empathizeBack/6.png" },
    { moodBoard: "/images/empathizeBack/7.png" },
    { moodBoard: "/images/empathizeBack/1.png" },
    { moodBoard: "/images/empathizeBack/1.png" },
    { moodBoard: "/images/empathizeBack/1.png" },
    { moodBoard: "/images/empathizeBack/1.png" },
    { moodBoard: "/images/empathizeBack/1.png" },
]

const defineTopInfo =[
    "Attention span – Limited user focus time (e.g., 8-second rule).",
    "Memory load – Avoiding cognitive overload in design.",
    "Learning curve – Complexity vs. ease of learning.",
    "Budget – Limited financial resources for development or production.",
    "Cost to use – Must be affordable or freemium.",
    "Return on investment (ROI) – Must deliver measurable value over time.",
    "Platform compatibility – Works across iOS, Android, web, etc.",
    "Hardware limitations – Must run on low-power or legacy devices.",
    "Connectivity – Must work offline or with limited bandwidth.",
    "Accessibility – Must support screen readers, high contrast, etc.",
    "Age appropriateness – Suitable for kids, teens, or elderly.",
    "Cultural context – Respecting local norms and language.",
    "Digital literacy – Must be usable by non-tech-savvy users.",
    "Space – Limited physical space (e.g., in a kiosk or mobile home).",
    "Climate – Works in extreme hot/cold/humid environments.",
    "Noise level – Must operate in noisy/silent spaces (e.g., classrooms).",
    "Lighting conditions – Visible in bright sunlight or low-light.",
    "Time to market – Must be launched within a short timeframe.",
    "Session duration – Tasks must be completed within 5 mins/session.",
    "Usage frequency – Designed for daily/weekly/monthly interaction.",
    "Material availability – Limited resources or sustainable materials only.",
    "Manufacturing process – Must be 3D-printable or mass-producible.",
    "Distribution – Must fit standard shipping requirements.",
    "Privacy laws – Must comply with GDPR, HIPAA, etc.",
    "IP restrictions – Can’t infringe on patents or trademarks.",
    "Fairness/bias – Algorithms must be non-discriminatory.",
    "Speed – Must load or respond under 2 seconds.",
    "Scalability – Should handle growth from 100 to 10,000 users.",
    "Reliability – Minimal downtime or failure rate.",
    "Brand alignment – Must follow a brand’s tone, color, and style guide.",
]
const defineFrontInfo = {
    priorities: [
        "Essential",
        "Important",
        "Nice to have",
        "Future consideration"
    ],
    descriptions: {
        "Essential": "Must be included for minimum viable product",
        "Important": "Significant value but not blocking release",
        "Nice to have": "Adds value but can be deprioritized",
        "Future consideration": "Worth exploring in future iterations"
    }
}
const defineRightInfo =[
    "Must be designed for a fictional character (e.g., Batman, a time traveler, or an alien).",
    "Only usable during nighttime – Solution must be relevant or functional only after dark.",
    "Designed for a post-apocalyptic world – No internet, electricity is limited, social norms have shifted.",
    "No buttons or screens allowed – Must rely on gestures, voice, or analog input.",
    "Can only give haptic feedback – No visuals or sound for user output.",
    "Must encourage collaboration between strangers – Socially interactive by design.",
    "User is colorblind or blindfolded – Must function without color or sight.",
    "Solution must emit a smell – Engages olfactory senses for feedback or alerts.",
    "Must be silent – Cannot produce any audible sound.",
    "Only 3 materials allowed – Choose and justify use of a strict material set.",
    "DIY-assembly required – Must be designed for user assembly with no tools.",
    "Everything must fit inside a shoebox – Spatial packaging constraint.",
    "Designed for someone with extreme anxiety in public spaces.",
    "User is always on the move (e.g., a nomad or gig worker) – No fixed location.",
    "Designed for a 100-year-old person with no digital experience.",
    "Must double as an art piece – Has aesthetic or expressive value in display.",
    "Must be customizable by the user in real time – Includes personal expression or modularity.",
    "Designed to provoke emotion (e.g., nostalgia, surprise, or joy) – Emotional design goal.",
    "Built for a future society in 2075 – Consider futuristic norms and technologies.",
    "Designed to be culturally neutral across 5 continents – No culturally specific symbols or language.",
]
const defineBackInfo =[
    
]
const defineLeftInfo =[
    
]

export {
    empathizeFrontInfo,
    empathizeLeftInfo,
    empathizeRightInfo,
    empathizeTopInfo,
    empathizeBackInfo,

    defineBackInfo,
    defineFrontInfo,
    defineLeftInfo,
    defineRightInfo,
    defineTopInfo,
};