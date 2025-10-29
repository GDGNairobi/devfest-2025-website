import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'track',
  title: 'Track',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Track Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., AI/ML Workshop, Cloud Architecture, Android Development',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Track Category',
      type: 'string',
      options: {
        list: [
          {title: 'AI/ML', value: 'ai-ml'},
          {title: 'Cloud Stage', value: 'cloud'},
          {title: 'Mobile & Web Stage', value: 'mobile-web'},
          {title: 'Main Stage', value: 'main'},
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Category determines the track color theme',
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'A single emoji to represent this track',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      icon: 'icon',
    },
    prepare(selection) {
      const {title, category, icon} = selection
      const categoryLabels: Record<string, string> = {
        'ai-ml': 'AI/ML',
        cloud: 'Cloud Stage',
        'mobile-web': 'Mobile & Web Stage',
        main: 'Main Stage',
      }
      return {
        title: `${icon || ''} ${title}`.trim(),
        subtitle: categoryLabels[category] || category,
      }
    },
  },
})
