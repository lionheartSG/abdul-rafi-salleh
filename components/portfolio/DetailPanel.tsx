"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import type { ContentItem } from "@/lib/portfolioData";
import { getNodeById, portfolioNodes } from "@/lib/portfolioData";
import { usePortfolioHover } from "./portfolio-hover-context";

function ContentCard({ item }: { item: ContentItem }) {
  switch (item.kind) {
    case "project":
      return (
        <div className="rounded-lg border border-[color-mix(in_srgb,var(--color-accent-cyan)_18%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_60%,transparent)] p-4">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-on-surface)]">
              {item.title}
            </h4>
            {item.period ? (
              <span className="flex-shrink-0 rounded border border-[color-mix(in_srgb,var(--color-accent-cyan)_20%,transparent)] px-2 py-0.5 font-[family-name:var(--font-label)] text-[0.6rem] uppercase tracking-wider text-[var(--color-on-surface-muted)]">
                {item.period}
              </span>
            ) : null}
          </div>
          <p className="mt-2 font-[family-name:var(--font-body)] text-xs leading-relaxed text-[var(--color-on-surface-muted)]">
            {item.summary}
          </p>
          {item.stack && item.stack.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.stack.map((t) => (
                <span
                  key={t}
                  className="rounded bg-[color-mix(in_srgb,var(--color-accent-cyan)_10%,transparent)] px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[0.6rem] text-[var(--color-accent-cyan)]"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      );

    case "timeline":
      return (
        <div className="flex gap-3">
          <div className="flex flex-col items-center pt-1">
            <div className="h-2.5 w-2.5 rounded-full border-2 border-[var(--color-accent-cyan)] bg-[color-mix(in_srgb,var(--color-accent-cyan)_20%,transparent)]" />
            <div className="mt-1 w-px flex-1 bg-[color-mix(in_srgb,var(--color-accent-cyan)_18%,transparent)]" />
          </div>
          <div className="pb-4">
            <p className="font-[family-name:var(--font-label)] text-[0.6rem] font-medium uppercase tracking-[0.1em] text-[var(--color-accent-cyan)]">
              {item.period}
            </p>
            <h4 className="mt-0.5 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-on-surface)]">
              {item.title}
            </h4>
            <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-on-surface-muted)]">
              {item.subtitle}
            </p>
            <p className="mt-1.5 font-[family-name:var(--font-body)] text-xs leading-relaxed text-[var(--color-on-surface-muted)]">
              {item.description}
            </p>
          </div>
        </div>
      );

    case "metric":
      return (
        <div className="rounded-lg border border-[color-mix(in_srgb,var(--color-accent-cyan)_18%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_60%,transparent)] px-4 py-3 text-center">
          <p className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-on-surface)]">
            {item.value}
          </p>
          <p className="mt-0.5 font-[family-name:var(--font-body)] text-[0.65rem] leading-tight text-[var(--color-on-surface-muted)]">
            {item.label}
          </p>
          {item.trend ? (
            <span className="mt-1 inline-block font-[family-name:var(--font-label)] text-[0.55rem] uppercase tracking-wider text-[var(--color-accent-green)]">
              {item.trend === "up" ? "↑ " : item.trend === "down" ? "↓ " : "→ "}
              {item.trend === "up" ? "+" : ""}
            </span>
          ) : null}
        </div>
      );

    case "journey":
      return (
        <div className="overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--color-accent-cyan)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_60%,transparent)]">
          <div className="border-b border-[color-mix(in_srgb,var(--color-accent-cyan)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-cyan)_6%,transparent)] px-4 py-3">
            <p className="font-[family-name:var(--font-label)] text-[0.6rem] font-medium uppercase tracking-[0.12em] text-[var(--color-accent-cyan)]">
              Case Study
            </p>
            <h4 className="mt-0.5 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[var(--color-on-surface)]">
              {item.title}
            </h4>
          </div>
          <div className="divide-y divide-[color-mix(in_srgb,var(--color-accent-cyan)_8%,transparent)] p-4">
            {item.sections.map((section, i) => (
              <div key={section.label} className={i === 0 ? "pb-3" : "py-3"}>
                <div className="flex items-center gap-2">
                  <span className="flex-shrink-0 font-[family-name:var(--font-geist-mono)] text-[0.6rem] text-[var(--color-accent-cyan)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h5 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-on-surface)]">
                    {section.label}
                  </h5>
                </div>
                <p className="mt-1.5 font-[family-name:var(--font-body)] text-xs leading-relaxed text-[var(--color-on-surface-muted)]">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "skills":
      return (
        <div>
          {item.categories.map((cat) => (
            <div key={cat.label} className="mb-4 last:mb-0">
              <h5 className="mb-2 font-[family-name:var(--font-label)] text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-cyan)]">
                {cat.label}
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[color-mix(in_srgb,var(--color-accent-cyan)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-cyan)_10%,transparent)] px-3 py-1 font-[family-name:var(--font-body)] text-[0.7rem] text-[var(--color-on-surface)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "career": {
      const colorMap = {
        purple: "var(--color-accent-purple)",
        blue: "var(--color-accent-cyan)",
        green: "var(--color-accent-green)",
      };
      const accent = colorMap[item.color ?? "blue"];
      const isHero = item.variant === "hero";
      const isEducation = item.variant === "education";
      const isPivot = item.variant === "pivot";
      const dotBg = isHero
        ? "var(--color-accent-cyan)"
        : isPivot
          ? "var(--color-accent-green)"
          : isEducation
            ? "var(--color-accent-purple)"
            : accent;
      return (
        <div className="flex gap-3">
          <div className="flex flex-col items-center pt-1">
            <div
              className={`rounded-full border-2 ${isHero ? "h-3.5 w-3.5 shadow-[0_0_12px_var(--color-accent-cyan)]" : "h-2.5 w-2.5"}`}
              style={{ borderColor: dotBg, background: `${dotBg}33` }}
            />
            <div className="mt-1 w-px flex-1 bg-[color-mix(in_srgb,var(--color-accent-cyan)_18%,transparent)]" />
          </div>
          <div className="pb-5">
            {isHero ? (
              <span className="inline-block rounded border border-[color-mix(in_srgb,var(--color-accent-cyan)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-cyan)_10%,transparent)] px-2 py-0.5 font-[family-name:var(--font-label)] text-[0.55rem] font-bold uppercase tracking-[0.12em] text-[var(--color-accent-cyan)]">
                HERO
              </span>
            ) : isPivot ? (
              <span className="inline-block rounded border border-[color-mix(in_srgb,var(--color-accent-green)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-green)_10%,transparent)] px-2 py-0.5 font-[family-name:var(--font-label)] text-[0.55rem] font-bold uppercase tracking-[0.12em] text-[var(--color-accent-green)]">
                PIVOT
              </span>
            ) : isEducation ? (
              <span className="inline-block rounded border border-[color-mix(in_srgb,var(--color-accent-purple)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-purple)_10%,transparent)] px-2 py-0.5 font-[family-name:var(--font-label)] text-[0.55rem] font-medium uppercase tracking-[0.12em] text-[var(--color-accent-purple)]">
                Education
              </span>
            ) : null}
            <p className="mt-1 font-[family-name:var(--font-label)] text-[0.6rem] font-medium uppercase tracking-[0.1em] text-[var(--color-accent-cyan)]">
              {item.period}
            </p>
            <h4
              className={`mt-0.5 font-[family-name:var(--font-display)] font-semibold tracking-tight text-[var(--color-on-surface)] ${isHero ? "text-lg shadow-[0_0_16px_var(--color-accent-cyan)_25%]" : "text-sm"}`}
            >
              {item.title}
            </h4>
            <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-on-surface-muted)]">
              {item.subtitle}
            </p>
            <p className="mt-1.5 font-[family-name:var(--font-body)] text-xs leading-relaxed text-[var(--color-on-surface-muted)]">
              {item.description}
            </p>
            {item.highlights && item.highlights.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {item.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 font-[family-name:var(--font-body)] text-xs leading-relaxed text-[var(--color-on-surface-muted)]"
                  >
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-accent-cyan)]" />
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

export function DetailPanel() {
  const {
    selectedNodeId,
    setSelectedNodeId,
    setFocusedNodeId,
    setHoveredNodeId,
  } = usePortfolioHover();

  const node = useMemo(() => getNodeById(selectedNodeId), [selectedNodeId]);

  const centerNode = useMemo(() => portfolioNodes.find((n) => n.isCenter), []);

  const isSatellite = node ? !node.isCenter : false;

  const handleClose = () => {
    setSelectedNodeId(null);
    setFocusedNodeId(null);
    setHoveredNodeId(null);
  };

  return (
    <AnimatePresence>
      {node ? (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-black/25 backdrop-blur-[2px]"
            onClick={handleClose}
            aria-hidden
          />
          <motion.div
            key={`detail-${node.id}`}
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "40%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 bottom-6 z-40 mx-auto max-h-[65vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[color-mix(in_srgb,var(--color-accent-cyan)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-glass)_94%,transparent)] shadow-[0_-8px_60px_-12px_var(--color-accent-cyan)] backdrop-blur-2xl cyber-scrollbar"
          >
            <div className="p-6 md:p-8">
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-accent-cyan)_30%,transparent)] font-[family-name:var(--font-body)] text-xs text-[var(--color-on-surface-muted)] transition-all hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)]"
                aria-label="Close detail panel"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <title>Close</title>
                  <path d="M1 1l10 10M11 1L1 11" />
                </svg>
              </button>

              {/* Hub section — always visible at top */}
              {centerNode ? (
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-[color-mix(in_srgb,var(--color-accent-cyan)_50%,transparent)] shadow-[0_0_24px_color-mix(in_srgb,var(--color-accent-cyan)_25%,transparent)]">
                    <div className="flex h-full w-full items-center justify-center bg-[#0a1219] font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-accent-cyan)]/70">
                      {centerNode.label
                        .split(/\s+/)
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-label)] text-[0.6rem] font-medium uppercase tracking-[0.14em] text-[var(--color-accent-cyan)]">
                      Hub
                    </p>
                    <h3 className="mt-0.5 truncate font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-on-surface)]">
                      {centerNode.label}
                    </h3>
                    <p className="truncate font-[family-name:var(--font-body)] text-xs text-[var(--color-on-surface-muted)]">
                      {centerNode.shortLabel}
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Divider + satellite section */}
              {isSatellite ? (
                <>
                  <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--color-accent-cyan)_35%,transparent)] to-transparent" />

                  {/* Satellite accent label */}
                  <p className="font-[family-name:var(--font-label)] text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[var(--color-accent-cyan)]">
                    {node.shortLabel}
                  </p>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-on-surface)]">
                    {node.label}
                  </h2>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-on-surface-muted)]">
                    {node.description}
                  </p>

                  {node.chips && node.chips.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {node.chips.map((chip) => (
                        <li
                          key={chip}
                          className="rounded border border-[color-mix(in_srgb,var(--color-accent-cyan)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-cyan)_12%,transparent)] px-2.5 py-1 font-[family-name:var(--font-label)] text-[0.65rem] font-medium uppercase tracking-wider text-[var(--color-on-surface)]"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {/* Contact-specific links */}
                  {node.id === "contact" ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href="https://github.com/lionheartSG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-[color-mix(in_srgb,var(--color-accent-cyan)_22%,transparent)] px-4 py-2 font-[family-name:var(--font-body)] text-xs text-[var(--color-on-surface-muted)] transition-all hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)] hover:shadow-[0_0_16px_color-mix(in_srgb,var(--color-accent-cyan)_15%,transparent)]"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://www.linkedin.com/in/arbms/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-[color-mix(in_srgb,var(--color-accent-cyan)_22%,transparent)] px-4 py-2 font-[family-name:var(--font-body)] text-xs text-[var(--color-on-surface-muted)] transition-all hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)] hover:shadow-[0_0_16px_color-mix(in_srgb,var(--color-accent-cyan)_15%,transparent)]"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="mailto:abdul.rafi.mdsalleh@hotmail.com"
                        className="rounded-lg border border-[color-mix(in_srgb,var(--color-accent-cyan)_22%,transparent)] px-4 py-2 font-[family-name:var(--font-body)] text-xs text-[var(--color-on-surface-muted)] transition-all hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)] hover:shadow-[0_0_16px_color-mix(in_srgb,var(--color-accent-cyan)_15%,transparent)]"
                      >
                        Email
                      </a>
                    </div>
                  ) : null}

                  {/* Content section — metrics, timeline, projects */}
                  {node.content && node.content.length > 0 ? (
                    <div className="mt-6 space-y-4">
                      {/* Metrics grid */}
                      {node.content.filter((c) => c.kind === "metric").length >
                      0 ? (
                        <div className="grid grid-cols-3 gap-3">
                          {node.content
                            .filter((c) => c.kind === "metric")
                            .map((item) => (
                              <ContentCard
                                key={`metric-${item.label}`}
                                item={item}
                              />
                            ))}
                        </div>
                      ) : null}

                      {/* Career timeline */}
                      {node.content.filter((c) => c.kind === "career").length >
                      0 ? (
                        <div>
                          {node.content
                            .filter((c) => c.kind === "career")
                            .map((item) => (
                              <ContentCard
                                key={`career-${item.title}-${item.period}`}
                                item={item}
                              />
                            ))}
                        </div>
                      ) : null}

                      {/* Timeline items */}
                      {node.content.filter((c) => c.kind === "timeline")
                        .length > 0 ? (
                        <div>
                          {node.content
                            .filter((c) => c.kind === "timeline")
                            .map((item) => (
                              <ContentCard
                                key={`timeline-${item.title}-${item.period}`}
                                item={item}
                              />
                            ))}
                        </div>
                      ) : null}

                      {/* Projects */}
                      {node.content.filter((c) => c.kind === "project").length >
                      0 ? (
                        <div className="space-y-3">
                          {node.content
                            .filter((c) => c.kind === "project")
                            .map((item) => (
                              <ContentCard
                                key={`project-${item.title}`}
                                item={item}
                              />
                            ))}
                        </div>
                      ) : null}

                      {/* Skills */}
                      {node.content.filter((c) => c.kind === "skills").length >
                      0 ? (
                        <div className="rounded-lg border border-[color-mix(in_srgb,var(--color-accent-cyan)_18%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_60%,transparent)] p-4">
                          {node.content
                            .filter((c) => c.kind === "skills")
                            .map((item) => (
                              <ContentCard key="skills-overview" item={item} />
                            ))}
                        </div>
                      ) : null}

                      {/* Journey / Case Study */}
                      {node.content.filter((c) => c.kind === "journey").length >
                      0 ? (
                        <div className="space-y-4">
                          {node.content
                            .filter((c) => c.kind === "journey")
                            .map((item) => (
                              <ContentCard
                                key={`journey-${item.title}`}
                                item={item}
                              />
                            ))}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="mt-6 rounded-lg border border-dashed border-[color-mix(in_srgb,var(--color-accent-cyan)_15%,transparent)] p-4 text-center">
                      <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-on-surface-muted)]">
                        Add your content here — projects, timelines, or metrics.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* Center node only — show its own content */
                <>
                  <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--color-accent-cyan)_35%,transparent)] to-transparent" />
                  <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-on-surface-muted)]">
                    {node.description}
                  </p>
                  {node.chips && node.chips.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {node.chips.map((chip) => (
                        <li
                          key={chip}
                          className="rounded border border-[color-mix(in_srgb,var(--color-accent-cyan)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-cyan)_12%,transparent)] px-2.5 py-1 font-[family-name:var(--font-label)] text-[0.65rem] font-medium uppercase tracking-wider text-[var(--color-on-surface)]"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {node.content && node.content.length > 0 ? (
                    <div className="mt-6 space-y-4">
                      {node.content.map((item) => (
                        <ContentCard
                          key={
                            item.kind === "skills"
                              ? "skills-overview"
                              : `hub-${item.kind}`
                          }
                          item={item}
                        />
                      ))}
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
