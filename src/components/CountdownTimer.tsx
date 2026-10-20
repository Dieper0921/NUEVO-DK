import React, { useState, useEffect } from 'react';
import { Flame, Clock } from 'lucide-react';

interface CountdownTimerProps {
  durationMinutes?: number;
  className?: string;
  onExpire?: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  durationMinutes = 15,
  className = '',
  onExpire
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    try {
      const storageKey = 'dk_magnesium_countdown_target';
      const stored = localStorage.getItem(storageKey);
      const now = Date.now();
      const targetDurationMs = durationMinutes * 60 * 1000;

      if (stored) {
        const target = parseInt(stored, 10);
        if (!isNaN(target) && target > now && target <= now + targetDurationMs) {
          return Math.max(0, Math.floor((target - now) / 1000));
        }
      }
      
      const newTarget = now + targetDurationMs;
      localStorage.setItem(storageKey, newTarget.toString());
      return durationMinutes * 60;
    } catch {
      return durationMinutes * 60;
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Reset to 15 minutes to maintain continuous urgency
          try {
            const nextTarget = Date.now() + durationMinutes * 60 * 1000;
            localStorage.setItem('dk_magnesium_countdown_target', nextTarget.toString());
          } catch {
            // Ignore storage errors
          }
          if (onExpire) onExpire();
          return durationMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [durationMinutes, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');
  const totalSeconds = durationMinutes * 60;
  const progressPercent = Math.max(0, Math.min(100, (secondsLeft / totalSeconds) * 100));

  return (
    <div className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50/60 to-amber-50 border-2 border-amber-300 shadow-sm text-slate-900 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Urgency message */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Flame className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black uppercase text-rose-700 tracking-wider">
                Oferta por tiempo limitado
              </span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-700 font-medium leading-none mt-0.5">
              La oferta especial de <strong className="text-slate-900 font-bold whitespace-nowrap">S/39.90</strong> termina en:
            </p>
          </div>
        </div>

        {/* 2 points larger eye-catching digital timer */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border-2 border-amber-400 shadow-sm">
          {/* Minutes */}
          <div className="flex items-baseline gap-1">
            <span className="font-mono font-black text-xl sm:text-2xl text-amber-300 tabular-nums drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]">
              {minutesStr}
            </span>
            <span className="text-[11px] sm:text-xs font-black text-amber-400 uppercase tracking-tight">
              min
            </span>
          </div>

          <span className="font-mono font-black text-amber-400 text-base sm:text-lg animate-pulse -mt-0.5">
            :
          </span>

          {/* Seconds */}
          <div className="flex items-baseline gap-1">
            <span className="font-mono font-black text-xl sm:text-2xl text-rose-400 tabular-nums drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]">
              {secondsStr}
            </span>
            <span className="text-[11px] sm:text-xs font-black text-rose-400 uppercase tracking-tight">
              seg
            </span>
          </div>
        </div>

      </div>

      {/* Progress bar */}
      <div className="mt-2.5 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-amber-500 via-rose-500 to-red-500 h-full rounded-full transition-all duration-1000 ease-linear shadow-xs"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
