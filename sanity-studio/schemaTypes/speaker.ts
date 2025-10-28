export default {
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company/Organization',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
    },
    {
      name: 'twitter',
      title: 'Twitter Handle',
      type: 'string',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'github',
      title: 'GitHub Username',
      type: 'string',
    },
    {
      name: 'website',
      title: 'Personal Website',
      type: 'url',
    },
  ],
}
