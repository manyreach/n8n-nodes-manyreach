import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

export const workspaceOperations: INodeProperties[] = [
    createField({
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        resource: 'workspace',
        default: '',
        optionsList: [
            { name: 'Get Many', value: 'getMany' },
            { name: 'Create', value: 'create' },
            { name: 'Get', value: 'getById' },
            { name: 'Delete', value: 'delete' },
            { name: 'Update', value: 'update' }
        ],
    }),
];

export const workspaceFields: INodeProperties[] = [
    createField({
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 1,
        resource: 'workspace',
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
        resource: 'workspace',
        operations: ['getMany'],
    }),

    createField({
        displayName: 'Starting After',
        name: 'startingAfter',
        type: 'number',
        default: 0,
        description: 'Cursor for next page (optional, for cursor-based pagination)',
        resource: 'workspace',
        operations: ['getMany'],

    }),

    createField({
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        description: 'Display name of the workspace; maximum 256 characters',
        resource: 'workspace',
        operations: ['create'],
        required: true,
    }),

    createField({
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        description: 'Display name of the workspace; maximum 256 characters',
        resource: 'workspace',
        operations: ['update'],

    }),

    createField({
        displayName: 'Workspace',
        name: 'workspaceId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a workspace from the list or enter its ID',
        resource: 'workspace',
        operations: ['getById', 'update', 'delete'],
        modes: [
            {
                displayName: 'From list',
                name: 'list',
                type: 'list',
                placeholder: 'Select a workspace...',
                typeOptions: {
                    searchListMethod: 'searchWorkspaces',
                    searchable: true,
                    searchFilterRequired: false,
                },
            },
            {
                displayName: 'By ID',
                name: 'id',
                type: 'string',
                placeholder: 'Enter workspace ID',
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
];
