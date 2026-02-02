import { ThemeColors } from "@/app/types";

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#000000";

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// Get text color from theme
export function getTextColor(colors: ThemeColors): string {
  return colors.textColor || getContrastColor(colors.backgroundColor);
}

// Get text color with opacity (e.g., "B3" for 70%, "99" for 60%, "80" for 50%)
export function getTextColorWithOpacity(colors: ThemeColors, opacity: string = "B3"): string {
  return `${getTextColor(colors)}${opacity}`;
}

// Common member type for team/employees
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

// Combine teams and employees into unified list
export function combineTeamMembers(
  teams: { id: string; name: string; role: string; image: string }[],
  employees: { id: string; firstname: string; name: string; image: string }[]
): TeamMember[] {
  return [
    ...teams
      .filter((t) => t.name?.trim())
      .map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role || "Team Member",
        image: t.image,
      })),
    ...employees
      .filter((e) => e.firstname || e.name)
      .map((e) => ({
        id: e.id,
        name: `${e.firstname || ""} ${e.name || ""}`.trim(),
        role: "Team Member",
        image: e.image,
      })),
  ].filter((m) => m.name?.trim());
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
