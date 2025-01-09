import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { BlocksFeature, FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { slugField } from "@/fields/slug";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";

import { revalidateDelete, revalidatePost } from "./hooks/revalidatePost";


export const Publishers: CollectionConfig<'publishers'> = {
  slug: 'publishers',
  access: {
      create: authenticated,
      delete: authenticated,
      read: authenticatedOrPublished,
      update: authenticated,
    },
    defaultPopulate: {
      title: true,
      slug: true,
      categories: true,
      meta: {
        image: true,
        description: true,
      },
    },
  admin: {
      defaultColumns: ['title', 'slug'],
      livePreview: {
        url: ({ data, req }) => {
          const path = generatePreviewPath({
            slug: typeof data?.slug === 'string' ? data.slug : '',
            collection: 'publishers',
            req,
          });
  
          return path;
        },
      },
      preview: (data, { req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'publishers',
          req,
        }),
      useAsTitle: 'title',
    },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
          type: 'tabs',
          tabs: [
            {
              fields: [
                {
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'content',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => [
                      ...rootFeatures,
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                      BlocksFeature({ blocks: [MediaBlock] }),
                      FixedToolbarFeature(),
                      InlineToolbarFeature(),
                      HorizontalRuleFeature(),
                    ],
                  }),
                  label: false,
                  required: true,
                },
              ],
              label: 'Content',
            },
            {
              fields: [
                {
                  name: 'categories',
                  type: 'relationship',
                  admin: {
                    position: 'sidebar',
                  },
                  hasMany: true,
                  relationTo: 'categories',
                },
              ],
              label: 'Meta',
            },
            {
              name: 'meta',
              label: 'SEO',
              fields: [
                OverviewField({
                  titlePath: 'meta.title',
                  descriptionPath: 'meta.description',
                  imagePath: 'meta.image',
                }),
                MetaTitleField({
                  hasGenerateFn: true,
                }),
                MetaImageField({
                  relationTo: 'media',
                }),
    
                MetaDescriptionField({}),
                PreviewField({
                  // if the `generateUrl` function is configured
                  hasGenerateFn: true,
    
                  // field paths to match the target field for data
                  titlePath: 'meta.title',
                  descriptionPath: 'meta.description',
                }),
              ],
            },
          ],
        },
        {
          name: 'establishedAt',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'yyyy',
            },
            position: 'sidebar',
          },
        },
        {
          name: 'city',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'web',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'telegram',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'vk',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
        },
        ...slugField(),
  ],
  hooks: {
      afterChange: [revalidatePost],
      afterDelete: [revalidateDelete],
    },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}