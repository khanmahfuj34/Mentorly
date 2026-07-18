/**
 * Bangladesh Academic Level & Subject Utilities
 * -----------------------------------------------
 * Static, dependency-free helpers built on top of `academic-levels.json`.
 * Based on the NCTB curriculum (Science / Business Studies / Humanities
 * groups reinstated for SSC & HSC). Safe for server and client use in
 * Next.js / React.
 *
 * Frontend flow:
 *   Academic Level dropdown  -->  Preferred Subjects checkbox grid auto-updates
 */

import rawData from "@/src/data/academic-levels.json";

// ---------- Types ----------

export interface AcademicLevel {
  level: string;
  subjects: string[];
}

const GROUP_SUFFIXES = ["Science", "Business Studies", "Humanities"] as const;
type GroupSuffix = (typeof GROUP_SUFFIXES)[number];

export interface GroupedLevel {
  /** Base label shown as the primary dropdown option, e.g. "Class 9-10" */
  base: string;
  /** True if this base level has Science / Business Studies / Humanities groups */
  hasGroups: boolean;
  /** Individual selectable levels under this base */
  options: {
    level: string;
    group: GroupSuffix | null;
    subjects: string[];
  }[];
}

// ---------- Data ----------

const levels: AcademicLevel[] = rawData as AcademicLevel[];

const subjectsByLevelMap = new Map<string, string[]>();
for (const entry of levels) {
  subjectsByLevelMap.set(entry.level, entry.subjects);
}

// ---------- Public API ----------

/**
 * Returns all academic level labels, in dataset order
 * (Class 1 -> Class 8 -> Class 9-10 groups -> SSC Candidate groups
 * -> HSC 1st/2nd Year groups -> HSC Candidate groups).
 */
export function getAcademicLevels(): string[] {
  return levels.map((l) => l.level);
}

/**
 * Returns the subject list for a given academic level.
 * Matching is case-insensitive. Returns an empty array if not found.
 */
export function getSubjectsByLevel(level: string): string[] {
  if (!level) return [];
  const direct = subjectsByLevelMap.get(level);
  if (direct) return [...direct];

  const target = level.trim().toLowerCase();
  for (const [name, subjects] of subjectsByLevelMap.entries()) {
    if (name.toLowerCase() === target) return [...subjects];
  }
  return [];
}

/**
 * Groups levels that share a base name (e.g. "Class 9-10 Science",
 * "Class 9-10 Business Studies", "Class 9-10 Humanities" all collapse
 * into one base entry "Class 9-10" with 3 group options). Levels with
 * no group suffix (Class 1-8) are returned as single-option bases.
 *
 * Useful for a two-step UI: pick a class, then (if applicable) pick a
 * group, then subjects resolve automatically.
 */
export function getGroupedLevels(): GroupedLevel[] {
  const order: string[] = [];
  const map = new Map<string, GroupedLevel>();

  for (const entry of levels) {
    let base = entry.level;
    let group: GroupSuffix | null = null;

    for (const suffix of GROUP_SUFFIXES) {
      if (entry.level.endsWith(suffix)) {
        group = suffix;
        base = entry.level.slice(0, entry.level.length - suffix.length).trim();
        break;
      }
    }

    if (!map.has(base)) {
      map.set(base, { base, hasGroups: group !== null, options: [] });
      order.push(base);
    }

    map.get(base)!.options.push({
      level: entry.level,
      group,
      subjects: entry.subjects,
    });
  }

  return order.map((base) => map.get(base)!);
}

/**
 * Returns the raw, unmodified dataset in case a consumer needs the
 * whole flat list of { level, subjects } at once.
 */
export function getAllAcademicLevels(): AcademicLevel[] {
  return levels;
}

export default levels;
