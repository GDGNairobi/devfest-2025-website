export default {
  name: 'session',
  title: 'Session',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Session Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
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
          {title: 'Fireside Chat', value: 'fireside'},
          {title: 'Break', value: 'break'},
          {title: 'Lunch', value: 'lunch'},
          {title: 'Registration', value: 'registration'},
          {title: 'Networking', value: 'networking'},
          {title: 'Ice Breaker', value: 'icebreaker'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
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
    },
    {
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'Format: HH:mm (24-hour, e.g., 09:00, 14:30)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'Format: HH:mm (24-hour, e.g., 09:00, 14:30)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
    },
    {
      name: 'track',
      title: 'Track',
      type: 'reference',
      to: [{type: 'track'}],
      description: 'Leave empty for full-venue sessions like keynotes',
    },
    {
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'speaker'}]}],
    },
    {
      name: 'isBreak',
      title: 'Is Break/Transition',
      type: 'boolean',
      description: 'Mark as break, lunch, or transition time',
      initialValue: false,
    },
    {
      name: 'isKeynote',
      title: 'Is Keynote',
      type: 'boolean',
      description: 'Mark as keynote session for special highlighting',
      initialValue: false,
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
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
    },
  ],
  preview: {
    select: {
      title: 'title',
      day: 'day',
      startTime: 'startTime',
      track: 'track.name',
    },
    prepare(selection) {
      const {title, day, startTime, track} = selection
      return {
        title: title,
        subtitle: `Day ${day} - ${startTime}${track ? ` - ${track}` : ''}`,
      }
    },
  },
}
