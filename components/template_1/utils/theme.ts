import { ThemeColors } from "@/app/types";

export function generateCSSVariables(colors: ThemeColors): Record<string, string> {
  return {
    "--color-primary": colors.primaryColor,
    "--color-secondary": colors.secondaryColor,
    "--color-background": colors.backgroundColor,
    "--color-accent": colors.accentColor,
    "--color-contrast": colors.contrastColor,
    "--color-text": colors.textColor,
  };
}

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
  
  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}
