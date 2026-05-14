import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

const accountTypeOptions = [
    { name: 'SingleUnibox', value: 'SingleUnibox' },
    { name: 'SingleReports', value: 'SingleReports' },
    { name: 'SingleSenders', value: 'SingleSenders' },
    { name: 'User', value: 'User' },
    { name: 'Editor', value: 'Editor' },
    { name: 'Admin', value: 'Admin' },
    { name: 'SuperAdmin', value: 'SuperAdmin' }
]

export const userOperations: INodeProperties[] = [
    createField({
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        resource: 'user',
        default: '',
        optionsList: [
            { name: 'Create', value: 'create', action: 'Create user', description: 'Create a new user' },
            { name: 'Delete', value: 'delete', action: 'Delete user', description: 'Delete a user permanently' },
            { name: 'Get', value: 'getById', action: 'Get user', description: 'Retrieve a user' },
            { name: 'Get Many', value: 'getMany', action: 'Get many users', description: 'Retrieve a list of users' },
            { name: 'Update', value: 'update', action: 'Update user', description: 'Update a user' },
        ],
    }),
];

export const userFields: INodeProperties[] = [
    createField({
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 1,
        resource: 'user',
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
        resource: 'user',
        operations: ['getMany'],
    }),

    createField({
        displayName: 'Starting After',
        name: 'startingAfter',
        type: 'string',
        default: '',
        description: 'Cursor for next page (optional, for cursor-based pagination)',
        resource: 'user',
        operations: ['getMany'],

    }),

    createField({
        displayName: 'Simplify',
        name: 'simplify',
        type: 'boolean',
        default: true,
        description: 'Whether to return a simplified version of the response instead of the raw data',
        resource: 'user',
        operations: ['getMany'],
    }),

    createField({
        displayName: 'User',
        name: 'userId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a user from the list or enter its ID',
        resource: 'user',
        operations: ['getById', 'update', 'delete'],
        modes: [
            {
                displayName: 'From list',
                name: 'list',
                type: 'list',
                placeholder: 'Select a user...',
                typeOptions: {
                    searchListMethod: 'searchUsers',
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

    createField({
        displayName: 'Email',
        name: 'email',
        type: 'string',
								placeholder: 'e.g. nathan@example.com',
        default: '',
        required: true,
        resource: 'user',
        operations: ['create'],
    }),

    createField({
        displayName: 'Account Type',
        name: 'accountType',
        type: 'options',
        default: 'User',
        options: accountTypeOptions,
        resource: 'user',
        operations: ['create'],
    }),

    createField({
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Field',
        resource: 'user',
        operations: ['create'],
        options: [
            { displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
            { displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
        ],
    }),

    createField({
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Field',
        resource: 'user',
        operations: ['update'],
        options: [
            { displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
            { displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
            { displayName: 'Account Type', name: 'accountType', type: 'options', options: accountTypeOptions, default: 'User' },
        ],
    }),

];
