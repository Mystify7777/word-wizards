import { mockContentUnlocks, mockLearnerOverview, mockLearnerProfile, mockLearnerWallet } from "./mock-data";
import type { ContentUnlock, LearnerOverview, LearnerProfile, LearnerWallet } from "./types";

export async function getLearnerProfile(): Promise<LearnerProfile> {
  return mockLearnerProfile;
}

export async function getLearnerOverview(): Promise<LearnerOverview> {
  return mockLearnerOverview;
}

export async function getLearnerWallet(): Promise<LearnerWallet> {
  return mockLearnerWallet;
}

export async function getContentUnlocks(): Promise<ContentUnlock[]> {
  return mockContentUnlocks;
}

export async function getContentUnlock(
  contentType: ContentUnlock["contentType"],
  contentId: string,
): Promise<ContentUnlock | null> {
  return (
    mockContentUnlocks.find((unlock) => unlock.contentType === contentType && unlock.contentId === contentId) ?? null
  );
}
