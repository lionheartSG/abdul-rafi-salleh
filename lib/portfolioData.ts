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
    label: "Tech Lead",
    shortLabel: "Ops-Tech",
    description:
      "Tech Lead with over 20 years of experience across law enforcement and private sector operations. I specialise in translating complex ground realities into practical digital systems that drive real adoption and operational impact.",
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
    shortLabel: "Ops",
    description:
      "Deep operational experience across aviation security and private sector, covering policy, compliance, incident response, and manpower operations.",
    chips: ["Aviation Security", "Incident Mgmt", "Compliance", "Manpower"],
    position: [2.0, 0.5, -0.7],
    accent: "purple",
    caption: "20 years of ground experience.",
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
        period: "2024 – Present",
        description:
          "Manage day-to-day operations across 46 sites, overseeing manpower deployment, incident response, and operational standards.",
      },
    ],
  },

  // 🔵 SYSTEMS (FULL DETAIL)
  {
    id: "systems",
    label: "ERP System",
    shortLabel: "ERP System",
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
          "Identified that HR was only one part of a fragmented system. Expanded scope to include operational workflows such as incident reporting and patrol tracking.",
      },
      {
        kind: "project",
        title: "Integrated Enterprise System (IES)",
        summary:
          "Unified platform covering incident reporting, e-OB, security clocking (Mission Patrol), attendance, rostering, LMS, and organisational structure.",
        stack: ["Next.js", "Postgres", "Prisma"],
        period: "Jun 2024 – Present",
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
    shortLabel: "Digitalise",
    description:
      "Transformed traditional paper-based operations into structured digital workflows across the organisation.",
    chips: ["Workflow Design", "Automation", "Change"],
    position: [0.4, -1.8, 1.1],
    accent: "green",
    caption: "Transformation is about adoption, not tools.",
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
        kind: "timeline",
        title: "AI Integration",
        subtitle: "AI-powered insights",
        period: "2025",
        description:
          "Integrated AI-powered insights to enhance operational awareness and automation.",
      },
    ],
  },

  // 🟣 LEADERSHIP (REAL YOU)
  {
    id: "leadership",
    label: "Leadership",
    shortLabel: "Leadership",
    description:
      "Lead transformation by combining operational credibility with system thinking, ensuring adoption across all levels of the organisation.",
    chips: ["Change Mgmt", "Training", "Execution"],
    position: [-2.2, -0.9, -0.7],
    accent: "purple",
    caption: "People > system.",
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
    label: "Integration",
    shortLabel: "Integration",
    description:
      "Integrated operational workflows and explored advanced capabilities including IoT and video analytics.",
    chips: ["QR Patrol", "IoT", "R&D"],
    position: [1.8, 1.2, -1.0],
    accent: "cyan",
    caption: "Connecting systems.",
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
