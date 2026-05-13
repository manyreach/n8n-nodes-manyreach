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
            { name: 'Get Many', value: 'getMany', action: 'Get many workspaces', description: 'Retrieve a list of workspaces' },
            { name: 'Create', value: 'create', action: 'Create workspace', description: 'Create a new workspace' },
            { name: 'Get', value: 'getById', action: 'Get workspace', description: 'Retrieve a workspace' },
            { name: 'Delete', value: 'delete', action: 'Delete workspace', description: 'Delete a workspace permanently' },
            { name: 'Update', value: 'update', action: 'Update workspace', description: 'Update a workspace' }
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
        displayName: 'Simplify',
        name: 'simplify',
        type: 'boolean',
        default: true,
        description: 'Whether to return a simplified version of the response instead of the raw data',
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
];
