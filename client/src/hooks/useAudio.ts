import { useState, useEffect, useRef } from 'react';

interface AudioSettings {
  soundEffectsEnabled: boolean;
  backgroundMusicEnabled: boolean;
  soundVolume: number;
  musicVolume: number;
}

export function useAudio() {
  const [settings, setSettings] = useState<AudioSettings>(() => {
    const saved = localStorage.getItem('quoma-audio-settings');
    return saved ? JSON.parse(saved) : {
      soundEffectsEnabled: true,
      backgroundMusicEnabled: true,
      soundVolume: 0.7,
      musicVolume: 0.3
    };
  });

  const [customSounds, setCustomSounds] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('quoma-custom-sounds');
    return saved ? JSON.parse(saved) : {};
  });

  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('quoma-audio-settings', JSON.stringify(settings));
  }, [settings]);

  // Initialize background music
  useEffect(() => {
    if (backgroundMusicRef.current) return;
    
    // Create audio element for background music
    const audio = new Audio('/audio/background-music.mp3');
    audio.loop = true;
    audio.volume = settings.musicVolume;
    backgroundMusicRef.current = audio;

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  // Update background music volume and play/pause
  useEffect(() => {
    if (!backgroundMusicRef.current) return;
    
    backgroundMusicRef.current.volume = settings.musicVolume;
    
    if (settings.backgroundMusicEnabled) {
      backgroundMusicRef.current.play().catch(() => {
        // Auto-play might be blocked, user will need to interact first
      });
    } else {
      backgroundMusicRef.current.pause();
    }
  }, [settings.backgroundMusicEnabled, settings.musicVolume]);

  const playSound = (soundType: 'correct' | 'incorrect' | 'complete' | 'click' | 'notification') => {
    if (!settings.soundEffectsEnabled) return;

    // Check for custom uploaded sounds first
    const customUrl = customSounds[soundType];
    if (customUrl) {
      const audio = new Audio(customUrl);
      audio.volume = settings.soundVolume;
      audio.play().catch(() => {
        console.log(`Could not play custom ${soundType} sound`);
      });
      return;
    }

    // Use your custom sound files
    const soundMap = {
      correct: '/audio/correct.wav',  // Your success alert sound
      incorrect: '/audio/notification.wav', // Your bike bell for incorrect
      complete: '/audio/complete.wav',  // Your success alert for completion
      click: '/audio/click.wav', // Your bike bell for clicks
      notification: '/audio/notification.wav' // Your bike bell sound
    };

    const audio = new Audio(soundMap[soundType]);
    audio.volume = settings.soundVolume;
    audio.play().catch(() => {
      // Sound might fail to play, that's okay
    });
  };

  const uploadCustomSound = (soundType: string, file: File) => {
    const url = URL.createObjectURL(file);
    const newCustomSounds = { ...customSounds, [soundType]: url };
    setCustomSounds(newCustomSounds);
    localStorage.setItem('quoma-custom-sounds', JSON.stringify(newCustomSounds));
  };

  const removeCustomSound = (soundType: string) => {
    const newCustomSounds = { ...customSounds };
    delete newCustomSounds[soundType];
    setCustomSounds(newCustomSounds);
    localStorage.setItem('quoma-custom-sounds', JSON.stringify(newCustomSounds));
  };

  const updateSettings = (newSettings: Partial<AudioSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleBackgroundMusic = () => {
    updateSettings({ backgroundMusicEnabled: !settings.backgroundMusicEnabled });
  };

  const toggleSoundEffects = () => {
    updateSettings({ soundEffectsEnabled: !settings.soundEffectsEnabled });
  };

  return {
    settings,
    updateSettings,
    playSound,
    toggleBackgroundMusic,
    toggleSoundEffects,
    uploadCustomSound,
    removeCustomSound,
    customSounds
  };
}