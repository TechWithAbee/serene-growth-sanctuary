
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Plant {
  id: string;
  name: string;
  type: 'calm' | 'focus' | 'creative';
  points: number;
  stage: number; // 0-4 (seed, sprout, growing, blooming, fully grown)
  lastWatered: Date | null;
}

interface GardenState {
  plants: Plant[];
  streak: number;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  lastVisit: Date | null;
  activePrompt: string | null;
  
  // Actions
  waterPlant: (plantId: string, points: number) => void;
  setActivePrompt: (promptId: string | null) => void;
  updateStreak: () => void;
  getPlantByType: (type: string) => Plant | undefined;
}

const initialPlants: Plant[] = [
  {
    id: 'calm-lily',
    name: 'Calm Lily',
    type: 'calm',
    points: 0,
    stage: 0,
    lastWatered: null,
  },
  {
    id: 'focus-fern',
    name: 'Focus Fern',
    type: 'focus',
    points: 0,
    stage: 0,
    lastWatered: null,
  },
  {
    id: 'creative-cactus',
    name: 'Creative Cactus',
    type: 'creative',
    points: 0,
    stage: 0,
    lastWatered: null,
  },
];

const getStageFromPoints = (points: number): number => {
  if (points >= 100) return 4; // fully grown
  if (points >= 75) return 3;  // blooming
  if (points >= 50) return 2;  // growing
  if (points >= 25) return 1;  // sprout
  return 0; // seed
};

export const useGardenStore = create<GardenState>()(
  persist(
    (set, get) => ({
      plants: initialPlants,
      streak: 0,
      season: 'spring',
      lastVisit: null,
      activePrompt: null,

      waterPlant: (plantId: string, points: number) => {
        set((state) => ({
          plants: state.plants.map((plant) =>
            plant.id === plantId
              ? {
                  ...plant,
                  points: Math.min(plant.points + points, 100),
                  stage: getStageFromPoints(Math.min(plant.points + points, 100)),
                  lastWatered: new Date(),
                }
              : plant
          ),
        }));
      },

      setActivePrompt: (promptId: string | null) => {
        set({ activePrompt: promptId });
      },

      updateStreak: () => {
        const today = new Date().toDateString();
        const lastVisit = get().lastVisit;
        
        if (!lastVisit || new Date(lastVisit).toDateString() !== today) {
          set((state) => ({
            streak: state.streak + 1,
            lastVisit: new Date(),
          }));
        }
      },

      getPlantByType: (type: string) => {
        return get().plants.find((plant) => plant.type === type);
      },
    }),
    {
      name: 'mindful-grove-storage',
    }
  )
);
