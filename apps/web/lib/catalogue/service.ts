import { mockCatalogues, mockThemes } from "./mock-data";
import type { Catalogue, Theme } from "./types";

export async function getCatalogues(): Promise<Catalogue[]> {
  return [...mockCatalogues].sort((a, b) => a.order - b.order);
}

export async function getCatalogueById(id: string): Promise<Catalogue | null> {
  return (await getCatalogues()).find((catalogue) => catalogue.id === id) ?? null;
}

export async function getThemesByCatalogueId(catalogueId: string): Promise<Theme[]> {
  return mockThemes
    .filter((theme) => theme.catalogueId === catalogueId)
    .sort((a, b) => a.order - b.order);
}

export async function getThemeById(catalogueId: string, themeId: string): Promise<Theme | null> {
  return (await getThemesByCatalogueId(catalogueId)).find((theme) => theme.id === themeId) ?? null;
}
