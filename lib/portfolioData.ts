import type { Vector3Tuple } from "three";

export type NodeAccent = "cyan" | "purple" | "green";

export type PortfolioNode = {
  id: string;
  /** Short title for the orb label */
  label: string;
  /** One-line HUD label */
  shortLabel: string;
  /** Rich text for pop-up (plain string for now) */
  description: string;
  /** Optional tech stack chips */
  chips?: string[];
  position: Vector3Tuple;
  isCenter?: boolean;
  accent?: NodeAccent;
  /** Main hub portrait — place file in /public (e.g. /avatar.jpg) */
  avatarSrc?: string;
  /** One line under the satellite disc (placeholder copy) */
  caption?: string;
};

export const CENTER_NODE_ID = "self";

/** Placeholder graph: Technical Lead hub + capability satellites */
export const portfolioNodes: PortfolioNode[] = [
  {
    id: CENTER_NODE_ID,
    label: "System Architect",
    shortLabel: "Technical Lead",
    description:
      "Placeholder bio: I lead engineering teams through complex delivery—architecture reviews, roadmap alignment, and hands-on guidance across distributed systems. Replace this with your story.",
    chips: ["Leadership", "Architecture", "Delivery"],
    position: [0, 0, 0],
    isCenter: true,
    accent: "cyan",
    avatarSrc: "/main-hub-avatar.png",
  },
  {
    id: "architecture",
    label: "Architecture",
    shortLabel: "Architecture",
    description:
      "Placeholder: Designing scalable, resilient microservices and event-driven platforms across regions.",
    chips: ["Microservices", "Events", "Cloud"],
    position: [2.1, 0.4, -0.6],
    accent: "cyan",
    caption:
      "Placeholder: platforms, events, and resilient service boundaries.",
  },
  {
    id: "leadership",
    label: "Team Leadership",
    shortLabel: "Leadership",
    description:
      "Placeholder: Mentoring senior engineers, shaping ways of working, and steering cross-functional squads to predictable outcomes.",
    chips: ["Mentoring", "Process", "Stakeholders"],
    position: [-1.8, 0.5, 0.9],
    accent: "purple",
    caption:
      "Placeholder: mentoring, delivery cadence, and stakeholder alignment.",
  },
  {
    id: "fullstack",
    label: "Fullstack",
    shortLabel: "Engineering",
    description:
      "Placeholder: Deep work across React, Node, and data layers—shipping UIs backed by robust APIs and observability.",
    chips: ["React", "Node", "Postgres"],
    position: [0.3, -1.9, 1.2],
    accent: "green",
    caption: "Placeholder: product UI, APIs, data models, and observability.",
  },
  {
    id: "opensource",
    label: "Open Source",
    shortLabel: "Community",
    description:
      "Placeholder: Contributing to frameworks and tooling the community relies on—replace with your repos and impact metrics.",
    chips: ["OSS", "Docs", "Talks"],
    position: [-0.5, 1.6, -1.4],
    accent: "purple",
    caption: "Placeholder: libraries, talks, and community-facing work.",
  },
];

export type PortfolioEdge = { from: string; to: string };

export const portfolioEdges: PortfolioEdge[] = portfolioNodes
  .filter((n) => n.id !== CENTER_NODE_ID)
  .map((n) => ({ from: CENTER_NODE_ID, to: n.id }));

export function getNodeById(id: string | null): PortfolioNode | undefined {
  if (!id) return undefined;
  return portfolioNodes.find((n) => n.id === id);
}
