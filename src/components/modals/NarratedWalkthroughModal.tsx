import React from 'react';
import { Play, Pause, Volume2, Globe, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useAppContext } from '@/context/AppContext';

interface NarratedWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NarratedWalkthroughModal: React.FC<NarratedWalkthroughModalProps> = ({
  isOpen,
  onClose
}) => {
  const { state } = useAppContext();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(180);
  const [volume, setVolume] = React.useState([80]);
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');
  
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // All 9 audio language options for Rumtek Monastery
  const rumtekAudioLanguages = [
    { value: 'en', label: 'English', flag: '🇺🇸', file: 'src/assets/rumtek-audio-en.mp3' },
    { value: 'fr', label: 'French', flag: '🇫🇷', file: 'src/assets/rumtek-audio-fr.mp3' },
    { value: 'hi', label: 'Hindi', flag: '🇮🇳', file: 'src/assets/rumtek-audio-hi.mp3' },
    { value: 'it', label: 'Italian', flag: '🇮🇹', file: 'src/assets/rumtek-audio-it.mp3' },
    { value: 'jap', label: 'Japanese', flag: '🇯🇵', file: 'src/assets/rumtek-audio-jap.mp3' },
    { value: 'sp', label: 'Spanish', flag: '🇪🇸', file: 'src/assets/rumtek-audio-sp.mp3' },
    { value: 'tl', label: 'Telugu', flag: '🇮🇳', file: 'src/assets/rumtek-audio-tl.mp3' },
    { value: 'ta', label: 'Tamil', flag: '🇮🇳', file: 'src/assets/rumtek-audio-ta.mp3' },
    { value: 'mal', label: 'Malayalam', flag: '🇮🇳', file: 'src/assets/rumtek-audio-mal.mp3' },
  ];

  // Get selected audio file
  const selectedAudio = rumtekAudioLanguages.find(l => l.value === selectedLanguage)?.file;

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      audioRef.current?.pause();
    } else {
      const videoPromise = videoRef.current?.play();
      const audioPromise = audioRef.current?.play();
      
      videoPromise?.catch(error => console.error('Video play error:', error));
      audioPromise?.catch(error => console.error('Audio play error:', error));
    }
    setIsPlaying(!isPlaying);
  };

  if (!state.selectedMonastery || state.selectedMonastery.name !== 'Rumtek Monastery') return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Volume2 className="h-5 w-5 text-accent" />
            Narrated Walkthrough - Rumtek Monastery
          </DialogTitle>
          <DialogDescription>
            Experience an immersive audio-visual journey through the monastery with narration in multiple languages.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative aspect-video bg-gradient-mountain rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src="src/assets/rumtek-video.mp4"
              className="w-full h-full object-cover"
              controls={true}
            />
            <audio
              ref={audioRef}
              src={selectedAudio}
              preload="auto"
              style={{ display: 'none' }}
            />
            
            <div className="absolute top-4 right-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40 bg-card/90 backdrop-blur-sm">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rumtekAudioLanguages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button onClick={togglePlayPause} className="bg-gradient-monastery hover:opacity-90">
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NarratedWalkthroughModal;
