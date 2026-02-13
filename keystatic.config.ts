import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts',
        }),
        author: fields.relationship({
          label: 'Author',
          collection: 'authors',
        }),
        publishedDate: fields.date({ label: 'Published Date' }),
        categories: fields.array(
          fields.text({ label: 'Category' }),
          { label: 'Categories', itemLabel: props => props.value }
        ),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/posts/content',
              publicPath: '/images/posts/content',
            },
          },
        }),
      },
    }),
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/content/authors/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/authors',
          publicPath: '/images/authors',
        }),
        credentials: fields.text({ label: 'Credentials (e.g. MD, PhD)' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        socials: fields.array(
          fields.object({
            platform: fields.text({ label: 'Platform' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: 'Social Links', itemLabel: props => props.fields.platform.value }
        ),
      },
    }),
  },
});
