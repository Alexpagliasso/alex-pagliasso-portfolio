// Shared by page composition, section numbering, and navigation tracking.
export const sectionOrder = [
  "about", "experience", "projects", "stack", "education", "beyond",
] as const;
export type SectionId = typeof sectionOrder[number];
export const desktopNavigation = sectionOrder.filter(id => id !== "education");
