import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

export const clientspaceOperations: INodeProperties[] = [
    createField({
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        resource: 'clientspace',
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

export const clientspaceFields: INodeProperties[] = [
    
    createField({
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 1,
        resource: 'clientspace',
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
        resource: 'clientspace',
        operations: ['getMany'],
    }),

    createField({
        displayName: 'Starting After',
        name: 'startingAfter',
        type: 'number',
        default: 0,
        description: 'Cursor for next page (optional, for cursor-based pagination)',
        resource: 'clientspace',
        operations: ['getMany'],
    }),

    createField({
        displayName: 'Clientspace',
        name: 'clientspaceId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a clientspace from the list or enter its ID',
        resource: 'clientspace',
        operations: ['getById','update','delete'],
        modes: [
            {
                displayName: 'From list',
                name: 'list',
                type: 'list',
                placeholder: 'Select a clientspace...',
                typeOptions: {
                    searchListMethod: 'searchClientspaces',
                    searchable: true,
                    searchFilterRequired: false,
                },
            },
            {
                displayName: 'By ID',
                name: 'id',
                type: 'string',
                placeholder: 'Enter clientspace ID',
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
        description: 'Display name of the clientspace; maximum 256 characters',
        resource: 'clientspace',
        operations: ['create'],
        required: true,
    }),

    createField({
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Field',
        resource: 'clientspace',
        operations: ['create'],
        options: [
            { displayName: 'Separate Credits', name: 'separateCredits', type: 'boolean', default: false },
            { displayName: 'Auto Allocate', name: 'autoAllocate', type: 'boolean', default: false },
            { displayName: 'Credit Amount', name: 'creditAmount', type: 'number', default: 0 }
        ],
    }),

    createField({
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Field',
        resource: 'clientspace',
        operations: ['update'],
        options: [
            { displayName: 'Title', name: 'title', type: 'string', default: '' },
            { displayName: 'Separate Credits', name: 'separateCredits', type: 'boolean', default: false },
            { displayName: 'Auto Allocate', name: 'autoAllocate', type: 'boolean', default: false },
            { displayName: 'Credit Amount', name: 'creditAmount', type: 'number', default: 0 }
        ],
    }),
];
