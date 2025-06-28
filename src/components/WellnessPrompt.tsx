
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useGardenStore } from '../store/gardenStore';

interface WellnessPromptProps {
  isOpen: boolean;
  onClose: () => void;
  plantType: 'calm' | 'focus' | 'creative';
}

const WellnessPrompt: React.FC<WellnessPromptProps> = ({ isOpen, onClose, plantType }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [breathingCount, setBreathingCount] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(5);
  const [creativeText, setCreativeText] = useState('');
  const [isActive, setIsActive] = useState(false);
  
  const waterPlant = useGardenStore((state) => state.waterPlant);
  const plant = useGardenStore((state) => state.getPlantByType(plantType));

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setBreathingCount(0);
      setTimerProgress(0);
      setCreativeText('');
      setIsActive(false);
    }
  }, [isOpen]);

  const completePrompt = (points: number) => {
    if (plant) {
      waterPlant(plant.id, points);
    }
    onClose();
  };

  const renderCalmPrompt = () => {
    if (currentStep === 0) {
      return (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🌸</div>
          <h3 className="text-xl font-medium text-green-800">Breathing Exercise</h3>
          <p className="text-green-600">
            Let's take a moment to breathe together. Follow the gentle rhythm and let your mind settle.
          </p>
          <Button
            onClick={() => {
              setCurrentStep(1);
              setIsActive(true);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Begin Breathing
          </Button>
        </div>
      );
    }

    return (
      <div className="text-center space-y-6">
        <div className="relative">
          <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-200 to-blue-300 flex items-center justify-center text-4xl transition-transform duration-4000 ${
            breathingCount % 2 === 0 ? 'scale-110' : 'scale-90'
          }`}>
            {breathingCount % 2 === 0 ? '🌬️' : '🫁'}
          </div>
        </div>
        <div className="text-lg font-medium text-blue-700">
          {breathingCount % 2 === 0 ? 'Breathe In...' : 'Breathe Out...'}
        </div>
        <div className="text-2xl font-bold text-blue-800">{Math.floor(breathingCount / 2) + 1}/5</div>
        <Progress value={(breathingCount / 10) * 100} className="h-2" />
        
        {breathingCount >= 10 && (
          <Button
            onClick={() => completePrompt(25)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Complete Session (+25 points)
          </Button>
        )}
      </div>
    );
  };

  const renderFocusPrompt = () => {
    if (currentStep === 0) {
      return (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🌿</div>
          <h3 className="text-xl font-medium text-green-800">Focus Session</h3>
          <p className="text-green-600">
            Choose your focus duration and commit to single-tasking. Put away distractions and be present.
          </p>
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {[5, 15, 25].map((minutes) => (
                <Button
                  key={minutes}
                  variant={focusMinutes === minutes ? "default" : "outline"}
                  onClick={() => setFocusMinutes(minutes)}
                  className="px-4"
                >
                  {minutes}m
                </Button>
              ))}
            </div>
            <Button
              onClick={() => {
                setCurrentStep(1);
                setIsActive(true);
                startFocusTimer();
              }}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Start Focus Session
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-xl font-medium text-green-800">Stay Focused</h3>
        <div className="text-3xl font-bold text-green-700">
          {Math.floor(timerProgress / 60)}:{(timerProgress % 60).toString().padStart(2, '0')}
        </div>
        <Progress value={(timerProgress / (focusMinutes * 60)) * 100} className="h-3" />
        <p className="text-green-600">Keep your attention on one task</p>
        
        {timerProgress >= focusMinutes * 60 && (
          <Button
            onClick={() => completePrompt(focusMinutes * 2)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Complete Session (+{focusMinutes * 2} points)
          </Button>
        )}
      </div>
    );
  };

  const renderCreativePrompt = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🌵</div>
            <h3 className="text-xl font-medium text-green-800">Creative Expression</h3>
            <p className="text-green-600 mb-4">
              Let your creativity flow. Write about anything that comes to mind - no judgment, just expression.
            </p>
          </div>
          
          <Textarea
            value={creativeText}
            onChange={(e) => setCreativeText(e.target.value)}
            placeholder="Write freely about your thoughts, dreams, or observations..."
            className="min-h-32 border-orange-200 focus:border-orange-400"
          />
          
          <div className="text-center">
            <Button
              onClick={() => completePrompt(Math.min(creativeText.length, 30))}
              disabled={creativeText.length < 10}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Complete Expression (+{Math.min(Math.max(creativeText.length, 10), 30)} points)
            </Button>
          </div>
        </div>
      );
    }
  };

  const startFocusTimer = () => {
    const interval = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= focusMinutes * 60) {
          clearInterval(interval);
          return focusMinutes * 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (plantType === 'calm' && isActive && currentStep === 1) {
      const breathingInterval = setInterval(() => {
        setBreathingCount((prev) => {
          if (prev >= 10) {
            clearInterval(breathingInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 2000); // 2 seconds per breath phase

      return () => clearInterval(breathingInterval);
    }
  }, [isActive, currentStep, plantType]);

  const getPromptTitle = () => {
    switch (plantType) {
      case 'calm':
        return 'Calm Lily Session';
      case 'focus':
        return 'Focus Fern Session';
      case 'creative':
        return 'Creative Cactus Session';
      default:
        return 'Wellness Session';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur border-green-200">
        <DialogHeader>
          <DialogTitle className="text-center text-green-800">{getPromptTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {plantType === 'calm' && renderCalmPrompt()}
          {plantType === 'focus' && renderFocusPrompt()}
          {plantType === 'creative' && renderCreativePrompt()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WellnessPrompt;
