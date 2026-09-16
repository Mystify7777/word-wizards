export type Catalogue = {
  id: string;
  name: string;
  description: string;
  visual: string;
  order: number;
};

export type ThemeAvailability = "available" | "locked";

export type Theme = {
  id: string;
  catalogueId: string;
  name: string;
  description: string;
  visual: string;
  order: number;
  progress: number;
  availability: ThemeAvailability;
};
