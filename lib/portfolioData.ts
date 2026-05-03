import type { Vector3Tuple } from "three";

export type NodeAccent = "cyan" | "purple" | "green";

export type ContentItem =
  | {
      kind: "project";
      title: string;
      summary: string;
      stack?: string[];
      period?: string;
    }
  | {
      kind: "timeline";
      title: string;
      subtitle: string;
      period: string;
      description: string;
    }
  | {
      kind: "metric";
      label: string;
      value: string;
      trend?: "up" | "down" | "flat";
    }
  | {
      kind: "skills";
      categories: {
        label: string;
        items: string[];
      }[];
    }
  | {
      kind: "journey";
      title: string;
      sections: {
        label: string;
        body: string;
      }[];
    }
  | {
      kind: "career";
      variant: "work" | "education" | "pivot" | "hero";
      title: string;
      subtitle: string;
      period: string;
      description: string;
      highlights?: string[];
      color?: "purple" | "blue" | "green";
    };

export type PortfolioNode = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  chips?: string[];
  position: Vector3Tuple;
  isCenter?: boolean;
  accent?: NodeAccent;
  avatarSrc?: string;
  caption?: string;
  content?: ContentItem[];
};

export const CENTER_NODE_ID = "self";

export const portfolioNodes: PortfolioNode[] = [
  {
    id: CENTER_NODE_ID,
    label: "Abdul Rafi Salleh",
    shortLabel: "Tech Lead & Ops-Tech Integrator",
    description:
      "I started my career in frontline law enforcement, where I learned early what responsibility, discipline, and decision making under pressure really mean. For over a decade, I was in environments where mistakes had real consequences and where structure and clarity were not optional. Over time, I found myself naturally drawn to improving how things work, not just doing the work itself. Whether it was investigating cases, leading officers on the ground, or building internal systems to track operations, I was always trying to make processes clearer, faster, and more reliable. That curiosity eventually led me into technology. I started building software not as a career switch, but as a way to solve real operational problems I had experienced firsthand. What began as simple tools gradually grew into full systems used across multiple sites, supporting daily operations, reporting, and workforce coordination. Today, I work as a Tech Lead in an Ops-Tech role, bridging ground operations and system design. My focus is not just on building software, but on making sure it actually works in real environments where people are busy, under pressure, and need things to be simple and dependable. What drives me is not technology on its own, but impact. I care about whether a system reduces frustration on the ground, whether it saves time for officers, and whether it makes decision making clearer for everyone involved. I don't see my journey as a shift away from my past, but rather a continuation of it. Everything I build today is still rooted in the same foundation: understanding people, understanding operations, and trying to make things better than how I found them.",
    chips: ["Operations", "Security", "Tech", "Digitalisation"],
    position: [0, 0, 0],
    isCenter: true,
    accent: "cyan",
    avatarSrc: "/rafi.png",
  },

  // 🔴 OPS (FULL HISTORY)
  {
    id: "ops",
    label: "Security Operations",
    shortLabel: "Security Operations & Policy",
    description:
      "Deep operational experience across aviation security and private sector, covering policy, compliance, incident response, and manpower operations.",
    chips: ["Aviation Security", "Incident Mgmt", "Compliance", "Manpower"],
    position: [3.2, 0.8, -1.1],
    accent: "purple",
    caption:
      "20 years of ground experience in aviation security and private sector.",
    content: [
      {
        kind: "timeline",
        title: "Operations Officer / Staff Officer",
        subtitle: "Singapore Police Force (Aviation Security)",
        period: "2005 – 2022",
        description:
          "Handled aviation security operations and served as staff officer to the National Civil Aviation Security Authority. Contributed to regulatory frameworks, policies, and operational planning.",
      },
      {
        kind: "timeline",
        title: "Policy & Security Programmes",
        subtitle: "National-level contributions",
        period: "2010 – 2022",
        description:
          "Drafted and maintained over 200 SOPs and security programmes under the Air Navigation Act, working with multiple stakeholders including airlines and regulators.",
      },
      {
        kind: "timeline",
        title: "Audits & Inspections",
        subtitle: "International & regulatory",
        period: "Ongoing during SPF",
        description:
          "Facilitated international audits and regulatory inspections with no adverse findings, ensuring compliance with aviation security standards.",
      },
      {
        kind: "timeline",
        title: "Operations Executive",
        subtitle: "Private Security Sector",
        period: "2024 – 2026",
        description:
          "Manage day-to-day operations across 46 sites, overseeing manpower deployment, incident response, and operational standards.",
      },
    ],
  },

  // 🔵 SYSTEMS (FULL DETAIL)
  {
    id: "systems",
    label: "Custom Unified Platform",
    shortLabel: "Custom Unified Platform",
    description:
      "Led end-to-end development of an ERP system, transforming an initial HRMS into a full operations platform used daily across the organisation.",
    chips: ["Next.js", "Postgres", "Fullstack", "System Design"],
    position: [-3.1, 1.0, 1.3],
    accent: "cyan",
    caption: "From HRMS to full enterprise ERP system with AI integration.",
    content: [
      {
        kind: "timeline",
        title: "e-Forms",
        subtitle: "Starting point",
        period: "Jun 2024 - August 2024",
        description:
          "Built a custom e-Forms system to replace the manual paper-based forms with a digital solution. This allowed for faster processing of forms such as incident reports, statements and reduced the need for manual data entry.",
      },
      {
        kind: "timeline",
        title: "HRMS Initiative",
        subtitle: "Capability Building",
        period: "2024",
        description:
          "Tasked to build a HRMS, focusing on employee management, attendance-taking, schedule planning, site-tasking, and administrative workflows.",
      },
      {
        kind: "timeline",
        title: "System Expansion",
        subtitle: "Reframing the problem",
        period: "2024 – 2025",
        description:
          "Identified that HR was only one part of a fragmented system. Expanded scope to include new modules such as Business Management System (BMS) and Learning Management System (LMS).",
      },
      {
        kind: "project",
        title: "Integrated ERP System",
        summary:
          "Unified platform covering incident reporting, e-OB, security clocking (Mission Patrol), attendance, rostering, Learning Management System (LMS), and organisational structure.",
        stack: ["Next.js", "Postgres", "Prisma"],
        period: "Jun 2024 – May 2026",
      },
      { kind: "metric", label: "Sites Covered", value: "90" },
      { kind: "metric", label: "Daily Users", value: "250 Officers" },
      { kind: "metric", label: "Adoption", value: "100%", trend: "up" },
    ],
  },

  // 🟢 DIGITALISATION (FULL STORY)
  {
    id: "digitalisation",
    label: "Digital Transformation",
    shortLabel: "Digital Transformation in Private Security Industry",
    description:
      "Transformed traditional paper-based operations into structured digital workflows across the organisation.",
    chips: ["Workflow Design", "Automation", "Change"],
    position: [0.7, -2.9, 1.8],
    accent: "green",
    caption:
      "Transformation is about adoption, not tools. The system should reflect the ground reality, users should be involved early, and adoption should be the main success metric.",
    content: [
      {
        kind: "timeline",
        title: "Before",
        subtitle: "Manual processes",
        period: "Pre-2024",
        description:
          "Operations relied heavily on paper reports, Excel tracking, and fragmented communication across sites.",
      },
      {
        kind: "timeline",
        title: "Transition",
        subtitle: "Phased rollout",
        period: "2024 – 2025",
        description:
          "Migrated workflows gradually, ensuring minimal disruption while aligning stakeholders and training users.",
      },
      {
        kind: "timeline",
        title: "After",
        subtitle: "Fully digital operations",
        period: "2025",
        description:
          "Achieved full digital workflow adoption across all sites with structured data and real-time visibility.",
      },
      {
        kind: "metric",
        label: "Paper Reduction",
        value: "85–95%",
        trend: "up",
      },
      {
        kind: "metric",
        label: "Reporting Speed",
        value: "Hours → Minutes",
        trend: "up",
      },
      {
        kind: "metric",
        label: "Officer Satisfaction Rate",
        value: "90%",
      },
      {
        kind: "timeline",
        title: "AI Integration",
        subtitle: "AI-powered insights",
        period: "2025",
        description:
          "Integrated AI-powered insights to enhance operational awareness and automation.",
      },
      {
        kind: "journey",
        title: "From Paper to Platform",
        sections: [
          {
            label: "The Problem",
            body: "Operations were heavily reliant on paper reports, fragmented Excel tracking, and manual coordination across sites. This resulted in delayed reporting, inconsistent data, and limited visibility for management.",
          },
          {
            label: "The Approach",
            body: "Instead of introducing multiple tools, I focused on building a single integrated platform. What started as a HRMS evolved into a full Integrated Enterprise System (IES) covering incident reporting, electronic occurrence book, patrol tracking, attendance, rostering, and LMS.",
          },
          {
            label: "The Execution",
            body: "I took on a hybrid role as product owner, operations lead, and system owner. Designed workflows based on real operational needs, guided development with a full stack developer, conducted ground training across all levels, and iterated continuously based on user feedback.",
          },
          {
            label: "The Outcome",
            body: "90 sites onboarded. 250 officers using daily. 100% adoption within 6 months. 85–95% reduction in paperwork. Reporting time reduced from hours to minutes.",
          },
          {
            label: "Key Insight",
            body: "Technology alone does not solve operational problems. Real transformation happens when systems reflect ground reality, users are involved early, and adoption is treated as the main success metric.",
          },
        ],
      },
    ],
  },

  // 🟣 LEADERSHIP (REAL YOU)
  {
    id: "leadership",
    label: "Leadership",
    shortLabel: "Servant Leader",
    description:
      "Lead transformation by combining operational credibility with system thinking, ensuring adoption across all levels of the organisation.",
    chips: ["Change Mgmt", "Training", "Execution", "Servant Leadership"],
    position: [-3.1, -1.3, -1.0],
    accent: "purple",
    caption:
      "People > System. Servant leadership is about serving the needs of the people, not the other way around.",
    content: [
      {
        kind: "timeline",
        title: "Ops-Tech Lead",
        subtitle: "Dual-role leadership",
        period: "2024 – Present",
        description:
          "Acted as product owner, operations lead, and system owner, bridging communication between technical and operational stakeholders.",
      },
      {
        kind: "timeline",
        title: "Tech Lead",
        subtitle: "Transition to full time tech lead",
        period: "2026",
        description:
          "Transitioned to a full-time tech lead role, focusing on building and maintaining the ERP system and other technical projects.",
      },
      {
        kind: "timeline",
        title: "Training & Adoption",
        subtitle: "Organisation-wide",
        period: "2024 – 2025",
        description:
          "Led hands-on training sessions for officers and supervisors, ensuring smooth transition from manual to digital workflows.",
      },
      {
        kind: "metric",
        label: "Adoption Rate",
        value: "100%",
        trend: "up",
      },
    ],
  },

  // 🔵 INTEGRATION (REALISTIC)
  {
    id: "integration",
    label: "Ops-Tech Integration",
    shortLabel: "Ops-Tech Integration",
    description:
      "Integrated operational workflows and explored advanced capabilities including IoT and video analytics.",
    chips: ["QR Patrol", "IoT", "R&D"],
    position: [2.6, 1.8, -1.5],
    accent: "cyan",
    caption:
      "Connecting systems between hardware and software and exploring new frontiers in security operations.",
    content: [
      {
        kind: "project",
        title: "Mission Patrol",
        summary:
          "Custom security clocking system integrated into ERP, proving live-view capability and replacing legacy workflows.",
        period: "2026",
      },
      {
        kind: "project",
        title: "IoT Sensor Integration",
        summary:
          "Integrated sensor-based inputs into operational workflows to enhance monitoring and situational awareness.",
        period: "2026",
      },
      {
        kind: "timeline",
        title: "Video Analytics (R&D)",
        subtitle: "Computer Vision",
        period: "Ongoing",
        description:
          "Exploring video analytics integration to enhance operational awareness and automation.",
      },
    ],
  },
  {
    id: "law_enforcement",
    label: "Law Enforcement",
    shortLabel: "Law Enforcement (SPF)",
    description:
      "17 years in Singapore Police Force covering frontline policing, investigations, and aviation security. Experienced in crime operations, regulatory frameworks, and leadership in high-stakes environments.",
    chips: ["Policing", "Investigations", "Leadership", "Security"],
    position: [3.1, -0.3, 1.6],
    accent: "purple",
    caption:
      "Where discipline, judgement, and leadership were forged in the Singapore Police Force. Courage, Loyalty, Integrity, and Fairness remains core values.",
    content: [
      {
        kind: "timeline",
        title: "Anti-Crime Task Force Officer (Assistant Officer-in-Charge)",
        subtitle: "Singapore Police Force",
        period: "Oct 2010 – Oct 2013",
        description:
          "Led investigations into crime cases, identifying persons of interest through evidence gathering and analysis. Prepared investigation reports for prosecution and managed crime data tracking. Led joint operations to apprehend suspects and ensured compliance with rules of engagement. Developed in-house case management and crime analytics systems, and contributed to organisational initiatives including leadership development and job redesign. Received multiple commendations including Higher Commander’s and Commissioner of Police awards.",
      },
      {
        kind: "timeline",
        title: "Patrol Officer (Station Sergeant / Group Leader)",
        subtitle: "Singapore Police Force",
        period: "Apr 2005 – Oct 2010",
        description:
          "Responded to public incidents and ensured case resolution. Supervised a team of over 60 officers and trained new officers including NSFs. Improved deployment planning efficiency by 80% through administrative changes. Conducted community engagement and crime prevention outreach. Appointed as unit IT in-charge.",
      },
      {
        kind: "metric",
        label: "Commendations",
        value: "30+ Awards",
      },
      {
        kind: "metric",
        label: "National Day Award 2022",
        value: "Pingat Berkebolehan",
      },
    ],
  },
  {
    id: "journey",
    label: "Career Journey",
    shortLabel: "Career",
    description:
      "From frontline policing to ops-tech leadership — a 20-year career spanning law enforcement, national policy, investigations, and digital transformation.",
    chips: ["Career", "Timeline"],
    position: [0, 2.9, -2.0],
    accent: "purple",
    caption: "20 years across law enforcement, operations, and technology.",
    content: [
      {
        kind: "career",
        variant: "hero",
        color: "blue",
        title: "Patrol Officer → Station Sergeant / Group Leader",
        subtitle: "Singapore Police Force",
        period: "2005 – 2010",
        description: "Frontline policing and incident response.",
        highlights: [
          "Led 60+ officers",
          "Trained new officers and NSFs",
          "Improved deployment planning efficiency by 80%",
          "Appointed unit IT in-charge",
        ],
      },
      {
        kind: "career",
        variant: "hero",
        color: "blue",
        title: "Anti-Crime Task Force – Assistant OIC",
        subtitle: "Singapore Police Force",
        period: "2010 – 2013",
        description:
          "Led investigations and operations with a systems mindset.",
        highlights: [
          "Built in-house case management and crime analytics system",
          "Led joint operations and investigations",
          "Received 30+ commendations including Higher Commander's and Commissioner's awards",
        ],
      },
      {
        kind: "career",
        variant: "hero",
        color: "blue",
        title: "Operations Officer / Staff Officer",
        subtitle: "SPF Aviation Security",
        period: "2013 – 2022",
        description:
          "National-level policy, regulatory frameworks, and systems thinking at scale.",
        highlights: [
          "Drafted and maintained 200+ SOPs under the Air Navigation Act",
          "Worked with 50+ airlines and government agencies",
          "Led international audits with zero adverse findings",
          "Risk assessment and security inspections across airports",
          "Received Pingat Berkebolehan (National Day Award 2022)",
        ],
      },
      {
        kind: "career",
        variant: "hero",
        color: "green",
        title: "React Developer",
        subtitle: "ICA Project via Accenture",
        period: "2022 – 2023",
        description:
          "Enterprise application development — the deliberate pivot into tech.",
        highlights: [
          "Built production React + TypeScript applications",
          "API integration and enterprise system development",
          "Self-taught transition from operations to engineering",
        ],
      },
      {
        kind: "career",
        variant: "hero",
        color: "blue",
        title: "STEM Instructor (Robotics)",
        subtitle: "Ministry of Education",
        period: "Jan 2024 - Mar 2024",
        description:
          "Transition and recalibration — bridging ops experience with teaching in STEM robotics education.",
      },
      {
        kind: "career",
        variant: "hero",
        color: "green",
        title: "[Dual Role] - Operations Executive / Ops-Tech Lead",
        subtitle: "Private Security Sector",
        period: "June 2024 – April 2026",
        description:
          "Hybrid role combining frontline operations management with internal digitalisation initiatives. Focused on improving operational efficiency through system building, process redesign, and digitisation of core workflows across multi-site security operations.",

        highlights: [
          "Oversaw daily security operations across multiple sites, ensuring manpower deployment, incident response, and service consistency",
          "Led digitalisation of operational workflows by converting manual paper-based forms into structured digital systems",
          "Improved key operational processes through workflow redesign, reducing administrative effort and improving reporting clarity",
          "Drove adoption through on-ground engagement, training, and continuous feedback from supervisors and officers",
          "Maintained end-to-end involvement from requirements gathering to deployment and ongoing system improvements",
        ],
      },
      {
        kind: "career",
        variant: "hero",
        color: "green",
        title: "Tech Lead (Software Development & Digitalisation)",
        subtitle: "Private Security Sector",
        period: "Apr 2026 - Current",
        description:
          "Led the convergence of operations and technology by building internal systems directly from frontline operational needs. Started with a HRMS initiative and progressively evolved it into a full Integrated Enterprise System (IES) powering daily operations across the organisation.",

        highlights: [
          "Started with a HRMS requirement and expanded scope into a full operational platform based on ground realities",
          "Designed and built an Integrated Enterprise System (IES) covering incident reporting, patrol tracking, attendance, rostering, and organisational structure",
          "Deployed system across 90 sites with 250 officers actively using it daily in real operations",
          "Achieved full organisational adoption within 6 months through structured rollout, training, and iterative feedback cycles",
          "Reduced paper-based workflows by 85–95%, significantly improving reporting speed and data consistency",
          "Owned entire lifecycle end-to-end: requirements gathering, system design, development guidance, deployment, and operational adoption",
          "Acted as bridge between Command, HR, Payroll, and ground operations to align technical solutions with real-world constraints",
        ],
      },
    ],
  },
  {
    id: "education",
    label: "Education Journey",
    shortLabel: "Education",
    description:
      "Academic and professional qualifications spanning electronics, security management, web development, and business digitalisation.",
    chips: [],
    position: [0, 3.6, -1.5],
    accent: "purple",
    caption: "Degrees, diplomas, and certifications.",
    content: [
      {
        kind: "career",
        variant: "education",
        color: "purple",
        title: "Singapore Polytechnic",
        subtitle: "Diploma in Electronic, Computer & Communication",
        period: "2001 – 2004",
        description: "Technical Foundation — built the engineering mindset.",
      },
      {
        kind: "career",
        variant: "education",
        color: "purple",
        title: "Singapore University of Social Sciences",
        subtitle: "BSc Management & Security Studies",
        period: "2010 – 2013",
        description:
          "Formalising leadership & security knowledge while in service.",
      },
      {
        kind: "career",
        variant: "education",
        color: "purple",
        title: "Temasek Polytechnic",
        subtitle: "Specialist Diploma in Security Consultancy",
        period: "2020 – 2021",
        description: "Deepening domain expertise in security consultancy.",
      },
      {
        kind: "career",
        variant: "education",
        color: "green",
        title: "Le Wagon + ReactJS Certification",
        subtitle: "Full-Stack Web Development",
        period: "2022 – 2023",
        description:
          "Self-driven transition into tech — intensive full-stack training alongside project work.",
      },
      {
        kind: "career",
        variant: "education",
        color: "green",
        title: "BELLS Institute of Higher Learning",
        subtitle: "Business Digitalisation Specialist",
        period: "2024 – 2025",
        description: "Formalising digital transformation capability.",
      },
    ],
  },
  {
    id: "skills-profile",
    label: "Skills & Expertise",
    shortLabel: "Skills",
    description:
      "Capabilities built across two decades of law enforcement, operations, and technology.",
    chips: [],
    position: [-2.7, 1.6, -1.6],
    accent: "green",
    caption: "Blending operational depth with technical execution.",
    content: [
      {
        kind: "skills",
        categories: [
          {
            label: "Technical",
            items: [
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Postgres",
              "Prisma",
              "REST APIs",
              "Fullstack Development",
              "System Design",
              "Automation",
            ],
          },
          {
            label: "Operations",
            items: [
              "Aviation Security",
              "Incident Management",
              "Compliance & Audits",
              "Manpower Planning",
              "SOP Development",
              "Stakeholder Management",
              "Crisis Response",
            ],
          },
          {
            label: "Leadership",
            items: [
              "Change Management",
              "Digital Transformation",
              "Team Training",
              "Cross-Functional Execution",
              "Strategy & Roadmapping",
              "QA / QC",
              "R&D & IoT Exploration",
            ],
          },
        ],
      },
    ],
  },
];
/* ── Edge helpers ── */

export type PortfolioEdge = { from: string; to: string };

export const portfolioEdges: PortfolioEdge[] = portfolioNodes
  .filter((n) => n.id !== CENTER_NODE_ID)
  .map((n) => ({ from: CENTER_NODE_ID, to: n.id }));

export function getNodeById(id: string | null): PortfolioNode | undefined {
  if (!id) return undefined;
  return portfolioNodes.find((n) => n.id === id);
}
