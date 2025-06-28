
import { useState } from 'react';
import Garden3D from '../components/Garden3D';
import PlantCard from '../components/PlantCard';
import WellnessPrompt from '../components/WellnessPrompt';
import { useGardenStore } from '../store/gardenStore';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activePrompt, setActivePrompt] = useState<'calm' | 'focus' | 'creative' | null>(null);
  const [zenMode, setZenMode] = useState(false);
  
  const plants = useGardenStore((state) => state.plants);
  const streak = useGardenStore((state) => state.streak);
  const updateStreak = useGardenStore((state) => state.updateStreak);

  const handlePromptOpen = (plantType: 'calm' | 'focus' | 'creative') => {
    setActivePrompt(plantType);
    updateStreak();
  };

  const handlePromptClose = () => {
    setActivePrompt(null);
  };

  if (zenMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <Garden3D />
          <Button
            onClick={() => setZenMode(false)}
            className="fixed top-4 right-4 bg-white/80 hover:bg-white text-green-800 border border-green-200"
            variant="outline"
          >
            Exit Zen Mode
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur border-b border-green-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
              🌱 Mindful Grove
            </h1>
            <p className="text-sm text-green-600">Cultivate wellness, grow serenity</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm bg-green-100 px-3 py-1 rounded-full text-green-700">
              🔥 Streak: {streak} days
            </div>
            <Button
              onClick={() => setZenMode(true)}
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              Zen Mode
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Garden View */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Your Mindful Garden</h2>
          <Garden3D />
        </div>

        {/* Plant Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onWellnessPrompt={() => handlePromptOpen(plant.type)}
            />
          ))}
        </div>

        {/* Welcome Message */}
        <div className="text-center py-8">
          <div className="bg-white/60 backdrop-blur rounded-2xl p-6 max-w-2xl mx-auto border border-green-100">
            <h3 className="text-lg font-medium text-green-800 mb-2">
              Welcome to your peaceful sanctuary
            </h3>
            <p className="text-green-600">
              Each plant represents a pillar of wellness. Nurture them daily with mindful moments - 
              breathing exercises, focused work, and creative expression. Watch as your garden grows 
              into a beautiful reflection of your self-care journey.
            </p>
          </div>
        </div>
      </main>

      {/* Wellness Prompt Modal */}
      {activePrompt && (
        <WellnessPrompt
          isOpen={!!activePrompt}
          onClose={handlePromptClose}
          plantType={activePrompt}
        />
      )}
    </div>
  );
};

export default Index;
