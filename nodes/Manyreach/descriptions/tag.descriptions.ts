import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

export const tagOperations: INodeProperties[] = [
  createField({
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
				noDataExpression: true,
    resource: 'tag',
    default: '',
    optionsList: [
      { name: 'Get Many', value: 'getMany' },
      { name: 'Get', value: 'getById' },
      { name: "Get Prospects", value: 'getProspects' },
      { name: 'Create', value: 'create' },
      { name: 'Update', value: 'update' },
      { name: 'Delete', value: 'delete' },
    ],
  }),
];

export const tagFields: INodeProperties[] = [
  // Title field for Create
  createField({
    displayName: 'Title',
    name: 'title',
    type: 'string',
    default: '',
    required: true,
    description: 'Tag title (must be unique within your organization)',
    resource: 'tag',
    operations: ['create'],
  }),

  // Description field for Create
  createField({
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    description: 'Optional description for the tag',
    resource: 'tag',
    operations: ['create'],
  }),

  // Page field for Get Many and Get Tag's Prospects
  createField({
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    description: 'Page number for pagination',
    resource: 'tag',
    operations: ['getMany', 'getProspects'],
  }),

  // Limit field for Get Many and Get Tag's Prospects
  createField({
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
				typeOptions: {
					minValue: 1,
				},
    default: 50,
    description: 'Max number of results to return',
    resource: 'tag',
    operations: ['getMany', 'getProspects'],
  }),

  // Starting After field for Get Many and Get Tag's Prospects
  createField({
    displayName: 'Starting After',
    name: 'startingAfter',
    type: 'number',
    default: 0,
    description: 'Cursor for next page (optional, for cursor-based pagination)',
    resource: 'tag',
    operations: ['getMany', 'getProspects'],
  }),

  // Search field for Get Many only
  createField({
    displayName: 'Search',
    name: 'search',
    type: 'string',
    default: '',
    description: 'Optional case-insensitive search term for tag name',
    resource: 'tag',
    operations: ['getMany'],
  }),

  // // Include Prospect Count for Get Many only
  // createField({
  //   displayName: 'Include Prospect Count',
  //   name: 'includeProspectCount',
  //   type: 'boolean',
  //   default: false,
  //   description: 'Whether to include the count of prospects for each tag',
  //   resource: 'tag',
  //   operations: ['getMany'],
  // }),

  // Tag field for Get, Get Tag's Prospects, Update, and Delete
  createField({
    displayName: 'Tag',
    name: 'tagId',
    type: 'resourceLocator',
    default: { mode: 'list', value: '' },
    required: true,
    description: 'Select a tag or enter its ID',
    resource: 'tag',
    operations: ['getById', 'getProspects', 'update', 'delete'],
    modes: [
      {
        displayName: 'From list',
        name: 'list',
        type: 'list',
        placeholder: 'Select a tag...',
        typeOptions: {
          searchListMethod: 'searchTags',
          searchable: true,
          searchFilterRequired: false,
        },
      },
      {
        displayName: 'By ID',
        name: 'id',
        type: 'string',
        placeholder: 'Enter tag ID',
        validation: [
          {
            type: 'regex',
            properties: {
              regex: '^\\d+$',
              errorMessage: 'Only numeric IDs are allowed',
            },
          },
        ],
      },
    ],
  }),

  // Force delete option for Delete operation
  createField({
    displayName: 'Force Delete',
    name: 'force',
    type: 'boolean',
    default: false,
    description: 'Whether to force delete even if tag has prospects (cascade delete all tag-prospect relationships)',
    resource: 'tag',
    operations: ['delete'],
  }),

  // Update Fields collection
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    default: {},
    placeholder: 'Add Field',
    displayOptions: {
      show: { resource: ['tag'], operation: ['update'] },
    },
    options: [
      { 
        displayName: 'Title', 
        name: 'title', 
        type: 'string', 
        default: '',
        description: 'New tag title (must be unique within your organization)',
      },
      { 
        displayName: 'Description', 
        name: 'description', 
        type: 'string', 
        default: '',
        description: 'New description for the tag',
      },
    ],
  },
];

