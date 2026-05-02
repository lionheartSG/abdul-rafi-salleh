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
      "Tech Lead with over 20 years of experience across law enforcement and private sector operations. I specialise in translating complex ground realities into practical digital systems that drive real adoption and operational impact.",
    chips: ["Operations", "Security", "Tech", "Digitalisation"],
    position: [0, 0, 0],
    isCenter: true,
    accent: "cyan",
    avatarSrc: "/rafi.png",
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

  // 🔴 OPS (FULL HISTORY)
  {
    id: "ops",
    label: "Security Operations",
    shortLabel: "Security Operations & Policy",
    description:
      "Deep operational experience across aviation security and private sector, covering policy, compliance, incident response, and manpower operations.",
    chips: ["Aviation Security", "Incident Mgmt", "Compliance", "Manpower"],
    position: [2.0, 0.5, -0.7],
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
    position: [-1.9, 0.6, 0.8],
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
    position: [0.4, -1.8, 1.1],
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
    position: [-2.2, -0.9, -0.7],
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
    position: [1.8, 1.2, -1.0],
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
    position: [2.4, -0.2, 1.2], // adjust if clashes with others
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
