export const colors = {
  primary: "#1B4D3E",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  background: "#F8FAF9",
  surface: "#FFFFFF",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  toggleOff: "#D1D5DB",
} as const;

export const categoryColors = {
  streaming: "#8B5CF6",
  musica: "#EC4899",
  produtividade: "#3B82F6",
  saude: "#22C55E",
  educacao: "#F59E0B",
  outros: "#6B7280",
} as const;

export type ColorToken = keyof typeof colors;
export type CategoryColorToken = keyof typeof categoryColors;
