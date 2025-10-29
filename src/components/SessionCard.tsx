import { component$ } from "@builder.io/qwik";
import type { TrackWithSpeakers } from "~/lib/sanity";
import type {
  SessionCardProps,
  SessionTypeBadgeProps,
  SpeakerListProps,
} from "~/lib/types";
import {
  formatTime,
  getBreakTypeLabel,
  getRandomRotation,
  getSessionBgColor,
  getSessionTitleColor,
  isBreakType,
} from "../lib/schedule.utils";

/**
 * SessionCard displays comprehensive information about a conference session or break.
 *
 * Features:
 * - Visual distinction for different session types (talks, workshops, breaks)
 * - Random rotation effect for a playful "sticky note" design
 * - Speaker information with photos and avatar fallbacks
 * - Track and difficulty level badges
 * - Responsive design optimized for mobile and desktop
 * - Accessible with semantic HTML and ARIA labels
 *
 * @component
 *
 * @param props - Component properties
 * @param props.session - Session data from Sanity CMS including title, speakers, timing, and type
 *
 * @example
 * Display a talk session:
 * ```tsx
 * <SessionCard session={talkSession} />
 * ```
 *
 * @example
 * Display a break:
 * ```tsx
 * <SessionCard session={lunchBreak} />
 * ```
 *
 * @accessibility
 * - Uses semantic `<time>` element with dateTime attribute
 * - Speaker images have descriptive alt text
 * - Avatar fallbacks have role="img" and aria-label
 * - All images use lazy loading for performance
 *
 * @performance
 * - Images are lazy-loaded with loading="lazy"
 * - Async image decoding with decoding="async"
 * - Minimal re-renders with Qwik's fine-grained reactivity
 */
export const SessionCard = component$<SessionCardProps>(({ session }) => {
  return (
    <div
      class={`group relative overflow-hidden rounded-sm shadow-md transition-all duration-300 hover:scale-105 hover:-rotate-1 hover:shadow-xl ${getSessionBgColor(session.type)}`}
      style={{ transform: getRandomRotation() }}
    >
      {/* Sticky tape effect at top */}
      <div class="absolute top-0 left-1/2 h-6 w-16 -translate-x-1/2 bg-white/40 opacity-60 shadow-sm"></div>

      <div class="relative p-6 pt-8">
        {/* Mobile time with sticky note style */}
        <div class="mb-3 flex items-center gap-1 text-xs font-bold tracking-wide text-gray-700 uppercase md:hidden">
          <time dateTime={session.startTime}>
            {formatTime(session.startTime)} - {formatTime(session.endTime)}
          </time>
        </div>

        {/* Handwritten-style title */}
        <h3
          class={`mb-3 font-mono text-xl leading-tight font-bold ${getSessionTitleColor(session.type)}`}
          style={{ textShadow: "0.5px 0.5px 0px rgba(0,0,0,0.1)" }}
        >
          {session.title}
        </h3>

        {/* Type badges */}
        <SessionTypeBadge type={session.type} />

        {/* Description */}
        {session.description && !isBreakType(session.type) && (
          <p class="mb-4 font-mono text-sm leading-relaxed text-gray-700">
            {session.description}
          </p>
        )}

        {/* Tracks with their speakers */}
        {session.tracks && session.tracks.length > 0 && (
          <div class="mb-4 space-y-3">
            {session.tracks.map((trackWithSpeakers: TrackWithSpeakers) => (
              <div key={trackWithSpeakers.track._id} class="space-y-2">
                {/* Track badge */}
                <span class="inline-block rounded-full border-2 border-gray-700 bg-white/70 px-3 py-1 font-mono text-xs font-semibold text-gray-800">
                  {trackWithSpeakers.track.icon} {trackWithSpeakers.track.name}
                </span>

                {/* Speakers for this track */}
                {trackWithSpeakers.speakers &&
                  trackWithSpeakers.speakers.length > 0 && (
                    <div class="ml-4 space-y-2">
                      {trackWithSpeakers.speakers.map((speaker) => (
                        <div key={speaker._id} class="flex items-center gap-2">
                          {speaker.photo?.asset?.url ? (
                            <div class="shrink-0 rounded border-2 border-white bg-white p-0.5 shadow-sm">
                              <img
                                src={speaker.photo.asset.url}
                                alt={`${speaker.name} profile photo`}
                                class="h-8 w-8 object-cover"
                                width={32}
                                height={32}
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          ) : (
                            <div
                              class="flex h-10 w-10 shrink-0 items-center justify-center rounded border-2 border-white bg-gray-700 font-mono text-xs font-bold text-white shadow-sm"
                              role="img"
                              aria-label={`${speaker.name} avatar`}
                            >
                              {speaker.name.charAt(0)}
                            </div>
                          )}
                          <div class="min-w-0">
                            <p class="truncate font-mono text-xs font-bold text-gray-900">
                              {speaker.name}
                            </p>
                            {speaker.title && (
                              <p class="truncate font-mono text-xs text-gray-700">
                                {speaker.title}
                                {speaker.company && ` @ ${speaker.company}`}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}

        {/* Default speakers (for sessions without tracks or full-venue sessions) */}
        {session.speakers && session.speakers.length > 0 && (
          <SpeakerList speakers={session.speakers} />
        )}

        {/* Level badge */}
        {session.level && (
          <div class="mt-3">
            <span class="inline-block rounded-full border-2 border-gray-600 bg-white/70 px-3 py-1 font-mono text-xs font-semibold text-gray-700">
              📊 {session.level.toUpperCase()}
            </span>
          </div>
        )}

        {/* Tags */}
        {session.tags && session.tags.length > 0 && (
          <div class="mt-4 flex flex-wrap gap-2">
            {session.tags.map((tag) => (
              <span
                key={tag}
                class="font-mono text-xs font-medium text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom torn paper effect */}
      <div
        class="h-2 w-full opacity-20"
        style={{
          background:
            "linear-gradient(45deg, transparent 33.33%, currentColor 33.33%, currentColor 66.66%, transparent 66.66%), linear-gradient(-45deg, transparent 33.33%, currentColor 33.33%, currentColor 66.66%, transparent 66.66%)",
          backgroundSize: "8px 4px",
          backgroundPosition: "0 0, 4px 0",
        }}
      ></div>
    </div>
  );
});

/**
 * SessionTypeBadge displays a visual badge indicating the session type.
 *
 * Displays different styles for:
 * - Breaks (dashed border, lighter background)
 * - Regular sessions (solid border)
 * - Keynotes (includes star emoji)
 *
 * @component
 * @param props - Component properties
 * @param props.type - Session type (talk, workshop, keynote, break, lunch, etc.)
 *
 * @example
 * ```tsx
 * <SessionTypeBadge type="keynote" />
 * <SessionTypeBadge type="lunch-break" />
 * ```
 */
const SessionTypeBadge = component$<SessionTypeBadgeProps>(({ type }) => {
  return (
    <div class="mb-3 flex flex-wrap items-center gap-2">
      {isBreakType(type) ? (
        <span class="rounded border-2 border-dashed border-gray-600 bg-white/50 px-2 py-1 font-mono text-xs font-bold text-gray-700 uppercase">
          {getBreakTypeLabel(type)}
        </span>
      ) : (
        <>
          <span class="rounded border-2 border-dashed border-gray-700 bg-white/60 px-2 py-1 font-mono text-xs font-bold text-gray-800 uppercase">
            {type}
          </span>
          {type === "keynote" && <span class="font-mono text-2xl">⭐</span>}
        </>
      )}
    </div>
  );
});

/**
 * SpeakerList displays a list of speakers for a session.
 *
 * Features:
 * - Speaker photos or avatar fallbacks (first letter of name)
 * - Speaker name, title, and company
 * - Optimized images with lazy loading
 * - Accessible with proper alt text and ARIA labels
 *
 * @component
 * @param props - Component properties
 * @param props.speakers - Array of speaker objects with name, photo, title, and company
 *
 * @example
 * ```tsx
 * <SpeakerList speakers={sessionSpeakers} />
 * ```
 */
const SpeakerList = component$<SpeakerListProps>(({ speakers }) => {
  return (
    <div class="mt-4 space-y-2 border-t-2 border-dashed border-gray-400 pt-4">
      {speakers?.map((speaker) => (
        <div key={speaker._id} class="flex items-center gap-3">
          {speaker.photo?.asset?.url ? (
            <div class="shrink-0 rounded border-4 border-white bg-white p-1 shadow-md">
              <img
                src={speaker.photo.asset.url}
                alt={speaker.name}
                class="h-12 w-12 object-cover"
                width={48}
                height={48}
              />
            </div>
          ) : (
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded border-4 border-white bg-gray-700 font-mono text-lg font-bold text-white shadow-md">
              {speaker.name.charAt(0)}
            </div>
          )}
          <div class="min-w-0">
            <p class="truncate font-mono text-sm font-bold text-gray-900">
              {speaker.name}
            </p>
            {speaker.title && (
              <p class="truncate font-mono text-xs text-gray-700">
                {speaker.title}
                {speaker.company && ` @ ${speaker.company}`}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});
