import type { Achievement } from "./types";

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    description: "Complete 10 lessons",
    icon: "BookOpen",
    id: "word-explorer",
    progress: 30,
    status: "in-progress",
    title: "Word Explorer",
  },
  {
    description: "Complete your first lesson",
    icon: "Star",
    id: "first-steps",
    status: "completed",
    title: "First Steps",
  },
  {
    description: "Complete 5 themes",
    icon: "Target",
    id: "theme-master",
    progress: 85,
    status: "in-progress",
    title: "Theme Master",
  },
  {
    description: "Complete 5 conversation lessons",
    icon: "MessageCircle",
    id: "conversation-starter",
    status: "completed",
    title: "Conversation Starter",
  },
  {
    description: "Complete 10 themes",
    icon: "Globe",
    id: "polyglot",
    status: "unlocked",
    title: "Polyglot",
  },
  {
    description: "Maintain a 7-day streak",
    icon: "Flame",
    id: "streak-champion",
    status: "locked",
    title: "Streak Champion",
  },
  {
    description: "Score 100% in a lesson",
    icon: "Award",
    id: "perfect-score",
    status: "locked",
    title: "Perfect Score",
  },
  {
    description: "Try lessons from 3 different categories",
    icon: "Compass",
    id: "explorer",
    status: "locked",
    title: "Explorer",
  },
];
