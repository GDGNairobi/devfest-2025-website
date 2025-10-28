export default {
  name: 'venueLocation',
  title: 'Venue Location',
  type: 'document',
  fields: [
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
      name: 'venueName',
      title: 'Venue Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
    },
    {
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Get embed URL from Google Maps Share > Embed a map',
    },
    {
      name: 'directions',
      title: 'Directions',
      type: 'text',
      rows: 3,
    },
    {
      name: 'parkingInfo',
      title: 'Parking Information',
      type: 'text',
      rows: 2,
    },
  ],
}
