
import { Plant } from '../store/gardenStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PlantCardProps {
  plant: Plant;
  onWellnessPrompt: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onWellnessPrompt }) => {
  const getPlantEmoji = () => {
    switch (plant.type) {
      case 'calm':
        return '🌸';
      case 'focus':
        return '🌿';
      case 'creative':
        return '🌵';
      default:
        return '🌱';
    }
  };

  const getPromptText = () => {
    switch (plant.type) {
      case 'calm':
        return 'Breathe & Reflect';
      case 'focus':
        return 'Focus Session';
      case 'creative':
        return 'Creative Flow';
      default:
        return 'Wellness Moment';
    }
  };

  const getStageText = () => {
    const stages = ['Seed', 'Sprout', 'Growing', 'Blooming', 'Flourishing'];
    return stages[plant.stage] || 'Seed';
  };

  const progressPercentage = (plant.points % 25) * 4; // Progress within current stage

  return (
    <Card className="w-full max-w-sm bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-green-800">
          <span className="text-2xl">{getPlantEmoji()}</span>
          {plant.name}
        </CardTitle>
        <p className="text-sm text-green-600">{getStageText()}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-green-700">Growth Progress</span>
            <span className="font-medium text-green-800">{plant.points}/100</span>
          </div>
          <Progress value={plant.points} className="h-2" />
        </div>
        
        <Button
          onClick={onWellnessPrompt}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
        >
          {getPromptText()}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
