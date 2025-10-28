export default {
  name: 'track',
  title: 'Track',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Track Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., AI/ML, Cloud Stage, Android Stage, Main Stage',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Track Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Green', value: 'green'},
          {title: 'Red', value: 'red'},
          {title: 'Orange', value: 'orange'},
          {title: 'Purple', value: 'purple'},
          {title: 'Cyan', value: 'cyan'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'A single emoji to represent this track',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
  ],
}
