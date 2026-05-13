import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

export const listOperations: INodeProperties[] = [
  createField({
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
				noDataExpression: true,
    resource: 'list',
    default: '',
    optionsList: [
      { name: 'Get Many', value: 'getMany', action: 'Get many lists', description: 'Retrieve all lists' },
      { name: 'Create', value: 'create', action: 'Create list', description: 'Create a new list' },
      { name: 'Get', value: 'getById', action: 'Get list', description: 'Retrieve a list' },
      { name: 'Update', value: 'update', action: 'Update list', description: 'Update a list' },
      { name: 'Delete', value: 'delete', action: 'Delete list', description: 'Delete a list permanently' },
    ],
  }),
];

export const listFields: INodeProperties[] = [
  createField({
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    resource: 'list',
    operations: ['getMany'],
  }),

  createField({
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
    default: 50,
    resource: 'list',
    operations: ['getMany'],
  }),

  createField({
    displayName: 'Starting After',
    name: 'startingAfter',
    type: 'number',
    default: 0,
    description: 'Cursor for next page (optional, for cursor-based pagination)',
    resource: 'list',
    operations: ['getMany'],
  }),

  createField({
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: true,
    description: 'Whether to return a simplified version of the response instead of the raw data',
    resource: 'list',
    operations: ['getMany'],
  }),

  createField({
    displayName: 'List',
    name: 'listId',
    type: 'resourceLocator',
    default: { mode: 'list', value: '' },
    description: 'Select a list from the list or enter its ID',
    resource: 'list',
    operations: ['getById', 'update', 'delete'],
    modes: [
      {
        displayName: 'From list',
        name: 'list',
        type: 'list',
        placeholder: 'Select a list...',
        typeOptions: {
          searchListMethod: 'searchLists',
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
              regex: '^\\\\d+$',
              errorMessage: 'Only numeric IDs are allowed',
            },
          },
        ],
      },
    ],
  }),

  createField({
    displayName: 'Title',
    name: 'title',
    type: 'string',
    default: '',
    required:true,
    resource: 'list',
    operations: ['create'],
  }),

  createField({
    displayName: 'Title',
    name: 'title',
    type: 'string',
    default: '',
    resource: 'list',
    operations: ['update'],
  }),

  createField({
    displayName: 'Folder ID',
    name: 'folderId',
    type: 'number',
				default: 0,
    resource: 'list',
    operations: ['create','update'],
  }),

];