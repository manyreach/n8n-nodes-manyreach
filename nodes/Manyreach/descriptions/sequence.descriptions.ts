import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

const conditionReplyOptions = [
    { name: 'All', value: 'All' },
    { name: 'Opened', value: 'Opened' },
    { name: 'NotOpened', value: 'NotOpened' },
    { name: 'NotReplied', value: 'NotReplied' },
    { name: 'Replied', value: 'Replied' },
    { name: 'RepliedInterested', value: 'RepliedInterested' },
    { name: 'RepliedNotInterested', value: 'RepliedNotInterested' },
    { name: 'RepliedNeutral', value: 'RepliedNeutral' },
    { name: 'RepliedMaybeLater', value: 'RepliedMaybeLater' },
    { name: 'Converted', value: 'Converted' },
    { name: 'NotConverted', value: 'NotConverted' }
];

const conditionOperatorOptions = [
    { name: 'GreaterThanOrEqual', value: 'GreaterThanOrEqual' },
    { name: 'LessThanOrEqual', value: 'LessThanOrEqual' },
    { name: 'Equal', value: 'Equal' },
    { name: 'NotEqual', value: 'NotEqual' },
    { name: 'GreaterThan', value: 'GreaterThan' },
    { name: 'LessThan', value: 'LessThan' }
];

const conditionActionOptions = [
    { name: 'Opened', value: 'Opened' },
    { name: 'Clicked', value: 'Clicked' },
    { name: 'Bounced', value: 'Bounced' },
    { name: 'Unsubscribed', value: 'Unsubscribed' },
    { name: 'Converted', value: 'Converted' }
];


export const sequenceOperations: INodeProperties[] = [
    createField({
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        resource: 'sequence',
        default: '',
        optionsList: [
            { name: 'Create', value: 'create', action: 'Create sequence', description: 'Create a new sequence' },
            { name: 'Delete', value: 'delete', action: 'Delete sequence', description: 'Delete a sequence permanently' },
            { name: 'Get Many', value: 'getMany', action: 'Get many sequences', description: 'Retrieve a list of sequences' },
            { name: 'Update', value: 'update', action: 'Update sequence', description: 'Update a sequence' },
        ],
    }),
];

export const sequenceFields: INodeProperties[] = [

        createField({
        displayName: 'Campaign',
        name: 'campaignId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a campaign',
        resource: 'sequence',
        operations: ['getMany', 'create','update', 'delete'],
        modes: [
            {
                displayName: 'From list',
                name: 'list',
                type: 'list',
                placeholder: 'Select a campaign...',
                typeOptions: {
                    searchListMethod: 'searchCampaigns',
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
        required: true,
    }),

    createField({
        displayName: 'Sequence',
        name: 'sequenceId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a sequence from the chosen campaign',
        resource: 'sequence',
        operations: ['update', 'delete'],
        modes: [
            {
                displayName: 'From list',
                name: 'list',
                type: 'list',
                placeholder: 'Select a sequence...',
                typeOptions: {
                    searchListMethod: 'searchSequences',
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
        required: true,
    }),

    createField({
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        resource: 'sequence',
        operations: ['create'],
        required: true,
    }),

    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Field',
        displayOptions: {
            show: { resource: ['sequence'], operation: ['create'] },
        },
        options: [
            { displayName: 'Condition Action', name: 'conditionAction', type: 'options', default: 'Opened', options: [{ name: 'Bounced', value: 'Bounced' }, { name: 'Clicked', value: 'Clicked' }, { name: 'Converted', value: 'Converted' }, { name: 'Opened', value: 'Opened' }, { name: 'Unsubscribed', value: 'Unsubscribed' }] },
            { displayName: 'Condition Extra', name: 'conditionExtra', type: 'boolean', default: false, description: 'Whether to enable extra condition matching' },
            { displayName: 'Condition Negate', name: 'conditionNegate', type: 'boolean', default: false, description: 'Whether to negate the condition' },
            { displayName: 'Condition Operator', name: 'conditionOperator', type: 'options', default: 'GreaterThanOrEqual', options: [{ name: 'Equal', value: 'Equal' }, { name: 'GreaterThan', value: 'GreaterThan' }, { name: 'GreaterThanOrEqual', value: 'GreaterThanOrEqual' }, { name: 'LessThan', value: 'LessThan' }, { name: 'LessThanOrEqual', value: 'LessThanOrEqual' }, { name: 'NotEqual', value: 'NotEqual' }] },
            { displayName: 'Condition Reply', name: 'conditionReply', type: 'options', default: 'All', options: [{ name: 'All', value: 'All' }, { name: 'Converted', value: 'Converted' }, { name: 'NotConverted', value: 'NotConverted' }, { name: 'NotOpened', value: 'NotOpened' }, { name: 'NotReplied', value: 'NotReplied' }, { name: 'Opened', value: 'Opened' }, { name: 'Replied', value: 'Replied' }, { name: 'RepliedInterested', value: 'RepliedInterested' }, { name: 'RepliedMaybeLater', value: 'RepliedMaybeLater' }, { name: 'RepliedNeutral', value: 'RepliedNeutral' }, { name: 'RepliedNotInterested', value: 'RepliedNotInterested' }] },
            { displayName: 'Condition Times', name: 'conditionTimes', type: 'number', default: 0 },
            { displayName: 'Short Name', name: 'shortName', type: 'string', default: '' }
        ],
    },
    createField({
        displayName: 'Simplify',
        name: 'simplify',
        type: 'boolean',
        default: true,
        description: 'Whether to return a simplified version of the response instead of the raw data',
        resource: 'sequence',
        operations: ['getMany'],
    }),

    createField({
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Field',
        resource: 'sequence',
        operations: ['update'],
        options: [
            { displayName: 'Condition Action', name: 'conditionAction', type: 'options', default: 'Opened', options: conditionActionOptions },
            { displayName: 'Condition Extra', name: 'conditionExtra', type: 'boolean', default: false, description: 'Whether to enable extra condition matching' },
            { displayName: 'Condition Negate', name: 'conditionNegate', type: 'boolean', default: false, description: 'Whether to negate the condition' },
            { displayName: 'Condition Operator', name: 'conditionOperator', type: 'options', default: 'GreaterThanOrEqual', options: conditionOperatorOptions },
            { displayName: 'Condition Reply', name: 'conditionReply', type: 'options', default: 'All', options: conditionReplyOptions },
            { displayName: 'Condition Times', name: 'conditionTimes', type: 'number', default: 0 },
            { displayName: 'Name', name: 'name', type: 'string', default: '' },
            { displayName: 'Short Name', name: 'shortName', type: 'string', default: '' }
        ],
    }),
];