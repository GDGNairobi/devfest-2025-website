import type { Signal } from "@builder.io/qwik";
import { useComputed$ } from "@builder.io/qwik";
import type { Session, TrackWithSpeakers } from "~/lib/sanity";
import { groupSessionsByTimeSlot } from './schedule.utils';

/**
 * Filter sessions by day and stage (category)
 */
export function useFilteredSessions(
  sessions: Session[],
  selectedDay: Signal<1 | 2>,
  selectedStage: Signal<string>,
) {
  return useComputed$(() => {
    return sessions
      .filter((session) => session.day === selectedDay.value)
      .filter((session) => {
        // Show full venue sessions (keynotes, breaks) in all stage filters
        if (session.isFullVenue) {
          return true;
        }

        // For "all" filter, show everything
        if (selectedStage.value === "all") {
          return true;
        }

        // For "main" filter, show sessions without specific tracks
        if (selectedStage.value === "main") {
          return !session.tracks || session.tracks.length === 0;
        }

        // Filter by stage (category)
        return session.tracks?.some(
          (trackWithSpeakers: TrackWithSpeakers) =>
            trackWithSpeakers.track.category === selectedStage.value,
        );
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  });
}

/**
 * Group filtered sessions by time slot
 */
export function useGroupedTimeSlots(filteredSessions: Signal<Session[]>) {
  return useComputed$(() => {
    return groupSessionsByTimeSlot(filteredSessions.value);
  });
}
