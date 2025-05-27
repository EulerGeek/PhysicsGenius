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

    const soundMap = {
      correct: '/audio/correct.mp3',
      incorrect: '/audio/incorrect.mp3', 
      complete: '/audio/lesson-complete.mp3',
      click: '/audio/click.mp3',
      notification: '/audio/notification.mp3'
    };

    const audio = new Audio(soundMap[soundType]);
    audio.volume = settings.soundVolume;
    audio.play().catch(() => {
      // Sound might fail to play, that's okay
    });
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
    toggleSoundEffects
  };
}