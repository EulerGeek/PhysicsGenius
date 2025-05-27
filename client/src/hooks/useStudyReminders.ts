import { useState, useEffect } from 'react';
import { useAudio } from './useAudio';

interface StudyReminderSettings {
  enabled: boolean;
  time: string; // "09:00" format
  frequency: 'daily' | 'weekdays' | 'custom';
  customDays: string[]; // ['monday', 'tuesday', etc.]
  message: string;
  sound: boolean;
}

interface StudySession {
  date: string;
  duration: number; // minutes
  lessonsCompleted: number;
  score: number;
}

export function useStudyReminders() {
  const [settings, setSettings] = useState<StudyReminderSettings>(() => {
    const saved = localStorage.getItem('quoma-study-reminders');
    return saved ? JSON.parse(saved) : {
      enabled: true,
      time: '19:00', // 7 PM default
      frequency: 'daily',
      customDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      message: "Time to explore physics! 🚀 Keep your learning streak alive!",
      sound: true
    };
  });

  const [studySessions, setStudySessions] = useState<StudySession[]>(() => {
    const saved = localStorage.getItem('quoma-study-sessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastStudyDate, setLastStudyDate] = useState<string | null>(null);
  const { playSound } = useAudio();

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('quoma-study-reminders', JSON.stringify(settings));
  }, [settings]);

  // Save study sessions to localStorage
  useEffect(() => {
    localStorage.setItem('quoma-study-sessions', JSON.stringify(studySessions));
  }, [studySessions]);

  // Calculate streaks
  useEffect(() => {
    if (studySessions.length === 0) return;

    const sortedSessions = [...studySessions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Calculate current streak
    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    for (let i = 0; i < sortedSessions.length; i++) {
      const sessionDate = new Date(sortedSessions[i].date).toDateString();
      
      if (i === 0) {
        if (sessionDate === today || sessionDate === yesterday) {
          streak = 1;
          setLastStudyDate(sessionDate);
        } else {
          break;
        }
      } else {
        const prevSessionDate = new Date(sortedSessions[i - 1].date).toDateString();
        const daysBetween = (new Date(prevSessionDate).getTime() - new Date(sessionDate).getTime()) / 86400000;
        
        if (daysBetween === 1) {
          streak++;
        } else {
          break;
        }
      }
    }

    setCurrentStreak(streak);

    // Calculate longest streak
    let maxStreak = 0;
    let tempStreak = 1;
    
    for (let i = 1; i < sortedSessions.length; i++) {
      const currentDate = new Date(sortedSessions[i].date).toDateString();
      const prevDate = new Date(sortedSessions[i - 1].date).toDateString();
      const daysBetween = (new Date(prevDate).getTime() - new Date(currentDate).getTime()) / 86400000;
      
      if (daysBetween === 1) {
        tempStreak++;
      } else {
        maxStreak = Math.max(maxStreak, tempStreak);
        tempStreak = 1;
      }
    }
    
    maxStreak = Math.max(maxStreak, tempStreak);
    setLongestStreak(Math.max(maxStreak, streak));
  }, [studySessions]);

  // Setup notifications
  useEffect(() => {
    if (!settings.enabled || !('Notification' in window)) return;

    // Request permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const scheduleReminder = () => {
      const now = new Date();
      const [hours, minutes] = settings.time.split(':').map(Number);
      const reminderTime = new Date();
      reminderTime.setHours(hours, minutes, 0, 0);

      // If time has passed today, schedule for tomorrow
      if (reminderTime <= now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }

      const timeUntilReminder = reminderTime.getTime() - now.getTime();

      const timeoutId = setTimeout(() => {
        const today = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        let shouldNotify = false;
        if (settings.frequency === 'daily') {
          shouldNotify = true;
        } else if (settings.frequency === 'weekdays') {
          shouldNotify = !['saturday', 'sunday'].includes(today);
        } else if (settings.frequency === 'custom') {
          shouldNotify = settings.customDays.includes(today);
        }

        if (shouldNotify && Notification.permission === 'granted') {
          const notification = new Notification('QUOMA Study Reminder', {
            body: settings.message,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: 'study-reminder'
          });

          if (settings.sound) {
            playSound('notification');
          }

          // Auto-close after 10 seconds
          setTimeout(() => notification.close(), 10000);
        }

        // Schedule next reminder
        scheduleReminder();
      }, timeUntilReminder);

      return timeoutId;
    };

    const timeoutId = scheduleReminder();
    return () => clearTimeout(timeoutId);
  }, [settings, playSound]);

  const updateSettings = (newSettings: Partial<StudyReminderSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const recordStudySession = (lessonsCompleted: number, score: number, duration: number) => {
    const today = new Date().toDateString();
    
    // Check if already studied today
    const existingSession = studySessions.find(session => 
      new Date(session.date).toDateString() === today
    );

    if (existingSession) {
      // Update existing session
      setStudySessions(prev => prev.map(session => 
        new Date(session.date).toDateString() === today
          ? {
              ...session,
              lessonsCompleted: session.lessonsCompleted + lessonsCompleted,
              score: Math.max(session.score, score),
              duration: session.duration + duration
            }
          : session
      ));
    } else {
      // Create new session
      const newSession: StudySession = {
        date: new Date().toISOString(),
        duration,
        lessonsCompleted,
        score
      };
      
      setStudySessions(prev => [...prev, newSession]);
    }

    playSound('complete');
  };

  const getStudyStats = () => {
    const thisWeek = studySessions.filter(session => {
      const sessionDate = new Date(session.date);
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      return sessionDate >= weekStart;
    });

    const thisMonth = studySessions.filter(session => {
      const sessionDate = new Date(session.date);
      const now = new Date();
      return sessionDate.getMonth() === now.getMonth() && 
             sessionDate.getFullYear() === now.getFullYear();
    });

    return {
      weeklyMinutes: thisWeek.reduce((sum, session) => sum + session.duration, 0),
      monthlyMinutes: thisMonth.reduce((sum, session) => sum + session.duration, 0),
      totalSessions: studySessions.length,
      averageScore: studySessions.length > 0 
        ? studySessions.reduce((sum, session) => sum + session.score, 0) / studySessions.length 
        : 0
    };
  };

  const getMotivationalMessage = () => {
    const messages = [
      "You're doing amazing! Keep up the great work! 🌟",
      "Physics mastery is within your reach! 🚀",
      "Every lesson brings you closer to understanding the universe! ⚛️",
      "Your dedication to learning is inspiring! 💪",
      "Science awaits your curious mind! 🔬",
      "You're building an incredible foundation in physics! 🏗️",
      "Keep exploring the wonders of the physical world! 🌍",
      "Your learning journey is making a difference! ✨"
    ];

    if (currentStreak >= 7) {
      return `🔥 Amazing ${currentStreak}-day streak! ${messages[Math.floor(Math.random() * messages.length)]}`;
    } else if (currentStreak >= 3) {
      return `⚡ Great ${currentStreak}-day streak! ${messages[Math.floor(Math.random() * messages.length)]}`;
    } else {
      return messages[Math.floor(Math.random() * messages.length)];
    }
  };

  return {
    settings,
    updateSettings,
    currentStreak,
    longestStreak,
    lastStudyDate,
    recordStudySession,
    getStudyStats,
    getMotivationalMessage,
    studySessions
  };
}