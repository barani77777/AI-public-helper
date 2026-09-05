import React from 'react';
import { CheckCircle2, Clock, Circle } from 'lucide-react';
import { ComplaintStatus, TimelineEvent } from '../../types/complaint';

export interface StatusTimelineProps {
  timeline: TimelineEvent[];
  currentStatus: ComplaintStatus;
  className?: string;
}

const LIFECYCLE_ORDER: ComplaintStatus[] = [
  'Submitted',
  'AI Processing',
  'Classified',
  'Assigned',
  'In Progress',
  'Resolved',
];

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  timeline,
  currentStatus,
  className = '',
}) => {
  const currentIndex = LIFECYCLE_ORDER.indexOf(currentStatus);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Visual horizontal stage indicator */}
      <div className="hidden sm:flex items-center justify-between relative px-2">
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-neutral-200 -translate-y-1/2 -z-0" />
        <div
          className="absolute top-1/2 left-4 h-0.5 bg-teal-600 -translate-y-1/2 -z-0 transition-all duration-500"
          style={{
            width: `${Math.max(0, (currentIndex / (LIFECYCLE_ORDER.length - 1)) * 100)}%`,
          }}
        />

        {LIFECYCLE_ORDER.map((stage, idx) => {
          const isPassed = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={stage} className="flex flex-col items-center relative z-10">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  isPassed
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : isCurrent
                    ? 'bg-white border-teal-600 text-teal-700 ring-4 ring-teal-100'
                    : 'bg-white border-neutral-300 text-neutral-400'
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isCurrent ? (
                  <Clock className="w-3.5 h-3.5 animate-pulse text-teal-600" />
                ) : (
                  <Circle className="w-2.5 h-2.5" />
                )}
              </div>
              <span
                className={`text-[11px] font-medium mt-1.5 transition-colors ${
                  isCurrent ? 'text-teal-700 font-bold' : isPassed ? 'text-[#2D2D2D]' : 'text-[#A3A3A3]'
                }`}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detailed historical timeline list */}
      <div className="mt-6 flow-root">
        <ol className="-mb-8" role="list">
          {timeline.map((event, eventIdx) => {
            const isLast = eventIdx === timeline.length - 1;
            return (
              <li key={event.id} className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-neutral-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center ring-4 ring-white">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">
                        {event.label}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Logged by <span className="font-medium text-slate-700">{event.actor}</span>
                      </p>
                      {event.notes && (
                        <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2 rounded-lg border border-slate-200">
                          {event.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-[11px] whitespace-nowrap text-slate-400 font-mono">
                      <time dateTime={event.timestamp}>
                        {new Date(event.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
