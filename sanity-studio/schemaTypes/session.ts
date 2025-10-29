import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'session',
  title: 'Session',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Session Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'type',
      title: 'Session Type',
      type: 'string',
      options: {
        list: [
          {title: 'Keynote', value: 'keynote'},
          {title: 'Talk', value: 'talk'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Codelab', value: 'codelab'},
          {title: 'Panel', value: 'panel'},
          {title: 'Lightning Talk', value: 'lightning'},
          {title: 'Break', value: 'break'},
          {title: 'Lunch', value: 'lunch'},
          {title: 'Registration', value: 'registration'},
          {title: 'Networking', value: 'networking'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFullVenue',
      title: 'Full Venue Session',
      type: 'boolean',
      description: 'Check for keynotes, breaks, or any session spanning all tracks',
      initialValue: false,
    }),
    defineField({
      name: 'day',
      title: 'Day',
      type: 'number',
      options: {
        list: [
          {title: 'Friday (Day 1)', value: 1},
          {title: 'Saturday (Day 2)', value: 2},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'Format: HH:mm (24-hour, e.g., 09:00, 14:30)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'Format: HH:mm (24-hour, e.g., 09:00, 14:30)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tracks',
      title: 'Tracks with Speakers',
      type: 'array',
      description:
        'Select tracks and assign speakers to each track. Optional for full-venue sessions and breaks.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'track',
              title: 'Track',
              type: 'reference',
              to: [{type: 'track'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'speakers',
              title: 'Speakers for this Track',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'speaker'}]}],
              description: 'Speakers presenting in this specific track',
            },
          ],
          preview: {
            select: {
              trackName: 'track.name',
              trackIcon: 'track.icon',
              speakers: 'speakers',
            },
            prepare(selection) {
              const {trackName, trackIcon, speakers} = selection
              const speakerCount = speakers?.length || 0
              return {
                title: `${trackIcon || ''} ${trackName || 'Track'}`.trim(),
                subtitle: speakerCount ? `${speakerCount} speaker(s)` : 'No speakers',
              }
            },
          },
        },
      ],
      hidden: ({parent}) =>
        parent?.isFullVenue ||
        ['break', 'lunch', 'registration', 'networking'].includes(parent?.type),
      validation: (Rule) =>
        Rule.custom((tracks, context) => {
          const parent = context.parent as any
          const isFullVenue = parent?.isFullVenue
          const sessionType = parent?.type

          // Break types and full venue sessions don't need tracks
          const isBreakType = ['break', 'lunch', 'registration', 'networking'].includes(sessionType)

          if (isFullVenue || isBreakType) {
            return true // Tracks are optional
          }

          // For regular sessions, tracks are required
          if (!tracks || (Array.isArray(tracks) && tracks.length === 0)) {
            return 'Please select at least one track for regular sessions, or mark as "Full Venue Session"'
          }

          return true
        }),
    }),
    defineField({
      name: 'speakers',
      title: 'Default Speakers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'speaker'}]}],
      description:
        'Default speakers for sessions without tracks, or full-venue sessions (keynotes, panels)',
      hidden: ({parent}) => ['break', 'lunch', 'registration', 'networking'].includes(parent?.type),
    }),
    defineField({
      name: 'level',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
          {title: 'All Levels', value: 'all'},
        ],
      },
      hidden: ({parent}) => ['break', 'lunch', 'registration', 'networking'].includes(parent?.type),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      hidden: ({parent}) => ['break', 'lunch', 'registration', 'networking'].includes(parent?.type),
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'url', type: 'url', title: 'URL'},
          ],
        },
      ],
      hidden: ({parent}) => ['break', 'lunch', 'registration', 'networking'].includes(parent?.type),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      day: 'day',
      startTime: 'startTime',
      type: 'type',
      isFullVenue: 'isFullVenue',
      tracks: 'tracks',
    },
    prepare(selection: any) {
      const {title, day, startTime, type, isFullVenue, tracks} = selection

      let subtitle = `Day ${day} - ${startTime} - ${type.charAt(0).toUpperCase() + type.slice(1)}`

      if (isFullVenue) {
        subtitle += ' (Full Venue)'
      } else if (tracks && tracks.length > 0) {
        subtitle += ` (${tracks.length} track${tracks.length > 1 ? 's' : ''})`
      }

      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
})
