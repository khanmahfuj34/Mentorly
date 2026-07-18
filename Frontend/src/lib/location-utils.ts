/**
 * Bangladesh Administrative Location Utilities
 * ----------------------------------------------
 * Static, dependency-free helpers built on top of `bangladesh-locations.json`.
 * Safe for use in both server and client components (Next.js / React).
 *
 * Data: 8 divisions -> 64 districts -> upazilas (thana/upazila), sorted
 * alphabetically, English names only, official post-2018 spellings.
 */

import rawData from "@/src/data/bangladesh-locations.json";

// ---------- Types ----------

export interface District {
  name: string;
  upazilas: string[];
}

export interface Division {
  division: string;
  districts: District[];
}

export interface LocationOption {
  value: string;
  label: string;
}

export interface DistrictOption extends LocationOption {
  division: string;
}

export interface UpazilaOption extends LocationOption {
  district: string;
  division: string;
}

export interface LocationOptions {
  divisions: LocationOption[];
  districts: DistrictOption[];
  upazilas: UpazilaOption[];
}

// ---------- Data ----------

const locations: Division[] = rawData as Division[];

// ---------- Internal lookup maps (built once, module-level cache) ----------

const districtsByDivisionMap = new Map<string, District[]>();
const upazilasByDistrictMap = new Map<string, string[]>();
const divisionByDistrictMap = new Map<string, string>();

for (const div of locations) {
  districtsByDivisionMap.set(div.division, div.districts);
  for (const dist of div.districts) {
    upazilasByDistrictMap.set(dist.name, dist.upazilas);
    divisionByDistrictMap.set(dist.name, div.division);
  }
}

// ---------- Public API ----------

/**
 * Returns all 8 divisions, alphabetically sorted, as plain names.
 */
export function getDivisions(): string[] {
  return locations.map((d) => d.division);
}

/**
 * Returns the list of districts (name + upazilas) belonging to a division.
 * Matching is case-insensitive. Returns an empty array if not found.
 */
export function getDistrictsByDivision(divisionName: string): District[] {
  if (!divisionName) return [];
  const match =
    districtsByDivisionMap.get(divisionName) ??
    locations.find(
      (d) => d.division.toLowerCase() === divisionName.trim().toLowerCase()
    )?.districts;
  return match ? [...match] : [];
}

/**
 * Returns the list of upazila names belonging to a district.
 * Matching is case-insensitive. Returns an empty array if not found.
 */
export function getUpazilasByDistrict(districtName: string): string[] {
  if (!districtName) return [];
  const direct = upazilasByDistrictMap.get(districtName);
  if (direct) return [...direct];

  const target = districtName.trim().toLowerCase();
  for (const [name, upazilas] of upazilasByDistrictMap.entries()) {
    if (name.toLowerCase() === target) return [...upazilas];
  }
  return [];
}

/**
 * Returns the division a given district belongs to, or undefined.
 */
export function getDivisionByDistrict(districtName: string): string | undefined {
  return divisionByDistrictMap.get(districtName);
}

/**
 * Returns the full dataset flattened into { value, label } option lists,
 * ready to feed into <select>/dropdown components for dependent
 * Division -> District -> Upazila pickers.
 *
 * `districts` and `upazilas` carry their parent(s) so the UI can filter
 * client-side without recomputing from the raw JSON.
 */
export function getLocationOptions(): LocationOptions {
  const divisions: LocationOption[] = [];
  const districts: DistrictOption[] = [];
  const upazilas: UpazilaOption[] = [];

  for (const div of locations) {
    divisions.push({ value: div.division, label: div.division });

    for (const dist of div.districts) {
      districts.push({
        value: dist.name,
        label: dist.name,
        division: div.division,
      });

      for (const upazila of dist.upazilas) {
        upazilas.push({
          value: upazila,
          label: upazila,
          district: dist.name,
          division: div.division,
        });
      }
    }
  }

  // Sort districts and upazilas alphabetically to ensure premium user experience
  districts.sort((a, b) => a.label.localeCompare(b.label));
  upazilas.sort((a, b) => a.label.localeCompare(b.label));

  return { divisions, districts, upazilas };
}

/**
 * Returns the raw, unmodified dataset (8 divisions with nested
 * districts/upazilas), in case a consumer needs the whole tree at once.
 */
export function getAllLocations(): Division[] {
  return locations;
}

export default locations;
