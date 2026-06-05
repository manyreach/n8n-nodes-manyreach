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
      { name: 'Create', value: 'create', action: 'Create tag', description: 'Create a new tag' },
      { name: 'Delete', value: 'delete', action: 'Delete tag', description: 'Delete a tag permanently' },
      { name: 'Get', value: 'getById', action: 'Get tag', description: 'Retrieve a tag' },
      { name: 'Get Campaigns', value: 'getCampaigns', action: 'Get campaigns for tag', description: 'Retrieve campaigns assigned to a tag' },
      { name: 'Get Many', value: 'getMany', action: 'Get many tags', description: 'Retrieve a list of tags' },
      { name: 'Get Prospects', value: 'getProspects', action: 'Get prospects for tag', description: 'Retrieve prospects assigned to a tag' },
      { name: 'Get Senders', value: 'getSenders', action: 'Get senders for tag', description: 'Retrieve senders assigned to a tag' },
      { name: 'Update', value: 'update', action: 'Update tag', description: 'Update a tag' },
    ],
  }),
];

export const tagFields: INodeProperties[] = [

  // Tag field for Get, Get Campaigns, Get Senders, Get Prospects, Update, and Delete
  createField({
    displayName: 'Tag',
    name: 'tagId',
    type: 'resourceLocator',
    default: { mode: 'list', value: '' },
    required: true,
    description: 'Select a tag or enter its ID',
    resource: 'tag',
    operations: ['getById', 'getProspects', 'getCampaigns', 'getSenders', 'update', 'delete'],
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
        placeholder: 'e.g. 1234',
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
  
  // Title field for Create
  createField({
    displayName: 'Title',
    name: 'title',
    type: 'string',
    default: '',
    required: true,
    description: 'Title of the tag (must be unique)',
    resource: 'tag',
    operations: ['create'],
  }),

  // Description field for Create
  createField({
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    description: 'Description of the tag',
    resource: 'tag',
    operations: ['create'],
  }),

  // Tag Type field for Create
  createField({
    displayName: 'Tag Type',
    name: 'tagType',
    type: 'options',
    options: [
      { name: 'CRM', value: 'Crm' },
      { name: 'Campaign', value: 'Campaign' },
      { name: 'Sender', value: 'Sender' },
    ],
    default: 'Crm',
    description: 'Tag classification: CRM, Campaign, or Sender. Defaults to CRM.',
    resource: 'tag',
    operations: ['create'],
  }),

  // Tag Type Filter field for Get Many
  createField({
    displayName: 'Tag Type',
    name: 'tagType',
    type: 'options',
    options: [
      { name: 'All', value: '' },
      { name: 'CRM', value: 'Crm' },
      { name: 'Campaign', value: 'Campaign' },
      { name: 'Sender', value: 'Sender' },
    ],
    default: '',
    description: 'Filter tags by type: CRM, Campaign, or Sender',
    resource: 'tag',
    operations: ['getMany'],
  }),

  // Page field for pagination
  createField({
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    description: 'Page number for pagination',
    resource: 'tag',
    operations: ['getMany', 'getProspects', 'getCampaigns', 'getSenders'],
  }),

  // Limit field for pagination
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
    operations: ['getMany', 'getProspects', 'getCampaigns', 'getSenders'],
  }),

  // Starting After field for pagination
  createField({
    displayName: 'Starting After',
    name: 'startingAfter',
    type: 'number',
    default: 0,
    description: 'Cursor for next page (optional, for cursor-based pagination)',
    resource: 'tag',
    operations: ['getMany', 'getProspects', 'getCampaigns', 'getSenders'],
  }),

  // Search field for Get Many only
  createField({
    displayName: 'Search',
    name: 'search',
    type: 'string',
    default: '',
    description: 'Case-insensitive search term to filter tags by name',
    resource: 'tag',
    operations: ['getMany'],
  }),

  // Include Prospect Count for Get Many only
  createField({
    displayName: 'Include Prospect Count',
    name: 'includeProspectCount',
    type: 'boolean',
    default: false,
    description: 'Whether to include the count of prospects for each tag',
    resource: 'tag',
    operations: ['getMany'],
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

