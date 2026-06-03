import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

const sendingStatusOptions = [
    { name: 'Unknown', value: 'Unknown' },
    { name: 'ESP Match Not Found', value: 'EspMatchNotFound' },
    { name: 'ESP Not Allowed', value: 'EspNotAllowed' },
    { name: 'No Warmup', value: 'NoWarmup' },
    { name: 'NotReceiving', value: 'NotReceiving' },
    { name: 'Warmup Limits', value: 'WarmupLimits' },
    { name: 'Sending Limits', value: 'SendingLimits' },
    { name: 'No Sender', value: 'NoSender' },
    { name: 'Stuck', value: 'Stuck' },
    { name: 'Mailbox Does Not Exist', value: 'MailboxInexistent' },
    { name: 'Empty Subject', value: 'EmptySubject' },
    { name: 'Empty Body', value: 'EmptyBody' },
    { name: 'Missing Placeholder', value: 'MissingPh' },
    { name: 'Invalid', value: 'Invalid' },
    { name: 'Blacklisted', value: 'Blacklisted' },
    { name: 'Stopped', value: 'Stopped' },
    { name: 'Unsubscribed', value: 'Unsub' },
    { name: 'Hard Bounce', value: 'BounceHard' },
    { name: 'Soft Bounce', value: 'BounceSoft' },
    { name: 'Auto No Longer', value: 'AutoNolonger' },
    { name: 'Auto Out of Office', value: 'AutoOoo' },
    { name: 'Auto Reply', value: 'AutoReply' },
    { name: 'Colleague Replied', value: 'CollegueReplied' },
    { name: 'Sender Disconnected', value: 'SenderDisconnected' },
    { name: 'Paused', value: 'Paused' },
    { name: 'Insufficient Credit', value: 'InsufficientCredit' },
    { name: 'Schedule Inactive', value: 'ScheduleInactive' },
    { name: 'Not Interested', value: 'NotInterested' },
    { name: 'NotSet', value: 'NotSet' },
    { name: 'Neutral', value: 'Neutral' },
    { name: 'Maybe Later', value: 'MaybeLater' },
    { name: 'Interested', value: 'Interested' },
    { name: 'Meeting Booked', value: 'MeetingBooked' },
    { name: 'Meeting Completed', value: 'MeetingCompleted' },
    { name: 'Won', value: 'Won' },
    { name: 'Subbed', value: 'Subbed' }
]

const prospectAdditionalFieldOptions: INodeProperties[] = [
    { displayName: 'City', name: 'city', type: 'string', default: '' },
    { displayName: 'Company', name: 'company', type: 'string', default: '' },
    { displayName: 'Company Size', name: 'companySize', type: 'string', default: '' },
    { displayName: 'Company Social', name: 'companySocial', type: 'string', default: '' },
    { displayName: 'Country', name: 'country', type: 'string', default: '' },
    { displayName: 'Custom Image URL', name: 'customImageUrl', type: 'string', default: '' },
    { displayName: 'Custom1', name: 'custom1', type: 'string', default: '' },
    { displayName: 'Custom10', name: 'custom10', type: 'string', default: '' },
    { displayName: 'Custom11', name: 'custom11', type: 'string', default: '' },
    { displayName: 'Custom12', name: 'custom12', type: 'string', default: '' },
    { displayName: 'Custom13', name: 'custom13', type: 'string', default: '' },
    { displayName: 'Custom14', name: 'custom14', type: 'string', default: '' },
    { displayName: 'Custom15', name: 'custom15', type: 'string', default: '' },
    { displayName: 'Custom16', name: 'custom16', type: 'string', default: '' },
    { displayName: 'Custom17', name: 'custom17', type: 'string', default: '' },
    { displayName: 'Custom18', name: 'custom18', type: 'string', default: '' },
    { displayName: 'Custom19', name: 'custom19', type: 'string', default: '' },
    { displayName: 'Custom2', name: 'custom2', type: 'string', default: '' },
    { displayName: 'Custom20', name: 'custom20', type: 'string', default: '' },
    { displayName: 'Custom3', name: 'custom3', type: 'string', default: '' },
    { displayName: 'Custom4', name: 'custom4', type: 'string', default: '' },
    { displayName: 'Custom5', name: 'custom5', type: 'string', default: '' },
    { displayName: 'Custom6', name: 'custom6', type: 'string', default: '' },
    { displayName: 'Custom7', name: 'custom7', type: 'string', default: '' },
    { displayName: 'Custom8', name: 'custom8', type: 'string', default: '' },
    { displayName: 'Custom9', name: 'custom9', type: 'string', default: '' },
    { displayName: 'Domain', name: 'domain', type: 'string', default: '' },
    { displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
    { displayName: 'Icebreaker', name: 'icebreaker', type: 'string', default: '' },
    { displayName: 'Industry', name: 'industry', type: 'string', default: '' },
    { displayName: 'Job Position', name: 'jobPosition', type: 'string', default: '' },
    { displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
    { displayName: 'Location', name: 'location', type: 'string', default: '' },
    { displayName: 'Logo URL', name: 'logoUrl', type: 'string', default: '' },
    { displayName: 'Notes', name: 'notes', type: 'string', default: '' },
    { displayName: 'Personal Social', name: 'personalSocial', type: 'string', default: '' },
    { displayName: 'Phone', name: 'phone', type: 'string', default: '' },
    { displayName: 'Screenshot URL', name: 'screenshotUrl', type: 'string', default: '' },
    { displayName: 'Sending Active', name: 'sendingActive', type: 'boolean', default: true, description: 'Whether the prospect is active for sending' },
    { displayName: 'Sending Status', name: 'sendingStatus', type: 'options', default: 'Unknown', options: sendingStatusOptions, description: 'Sending status of the prospect' },
    { displayName: 'State', name: 'state', type: 'string', default: '' },
    { displayName: 'Website', name: 'website', type: 'string', default: '' }
];

export const prospectOperations: INodeProperties[] = [
    createField({
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        resource: 'prospect',
        default: '',
        optionsList: [
            { name: 'Add in Bulk', value: 'bulk', action: 'Add prospects in bulk', description: 'Add multiple prospects to a campaign or list at once' },
            { name: 'Add Tags', value: 'addTags', action: 'Add tags to prospect', description: 'Add one or more tags to a prospect' },
            { name: 'Create', value: 'create', action: 'Create prospect', description: 'Create a new prospect' },
            { name: 'Delete', value: 'delete', action: 'Delete prospect', description: 'Delete a prospect permanently' },
            { name: 'Get', value: 'getById', action: 'Get prospect', description: 'Retrieve a prospect' },
            { name: 'Get Many', value: 'getMany', action: 'Get many prospects', description: 'Retrieve a list of prospects' },
            { name: 'Get Messages', value: 'getMessages', action: 'Get prospect messages', description: 'Retrieve inbound messages for a prospect' },
            { name: 'Get Tags', value: 'getTags', action: 'Get prospect tags', description: 'Retrieve tags assigned to a prospect' },
            { name: 'Remove Tags', value: 'removeTags', action: 'Remove tags from prospect', description: 'Remove one or more tags from a prospect' },
            { name: 'Update', value: 'update', action: 'Update prospect', description: 'Update a prospect' },
        ],
    }),
];

export const prospectFields: INodeProperties[] = [

    createField({
        displayName: 'Prospect',
        name: 'prospectId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a prospect from the list or enter its ID',
        resource: 'prospect',
        operations: ['getById', 'update', 'delete', 'getTags', 'addTags', 'removeTags', 'getMessages'],
        modes: [
            {
                displayName: 'From list',
                name: 'list',
                type: 'list',
                placeholder: 'Select a prospect...',
                typeOptions: {
                    searchListMethod: 'searchProspects',
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
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 1,
        resource: 'prospect',
        operations: ['getMany', 'getTags', 'getMessages'],
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
        resource: 'prospect',
        operations: ['getMany', 'getTags', 'getMessages'],
    }),

    createField({
        displayName: 'Starting After',
        name: 'startingAfter',
        type: 'number',
        default: 0,
        description: 'Cursor for next page (optional, for cursor-based pagination)',
        resource: 'prospect',
        operations: ['getMany', 'getTags'],
    }),

    createField({
        displayName: 'Simplify',
        name: 'simplify',
        type: 'boolean',
        default: true,
        description: 'Whether to return a simplified version of the response instead of the raw data',
        resource: 'prospect',
        operations: ['getMany'],
    }),

    createField({
        displayName: 'Starting After',
        name: 'startingAfterDate',
        type: 'dateTime',
        default: '',
        required: true,
        resource: 'prospect',
        operations: ['getMessages'],
    }),

    createField({
        displayName: 'Campaign',
        name: 'campaignId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a campaign from the list or enter its ID',
        resource: 'prospect',
        operations: ['bulk'],
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
    }),

    createField({
        displayName: 'List',
        name: 'listId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a list from the list or enter its ID (optional)',
        resource: 'prospect',
        operations: ['bulk', 'create', 'update'],
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
                            regex: '^\\d+$',
                            errorMessage: 'Only numeric IDs are allowed',
                        },
                    },
                ],
            },
        ],
    }),

    createField({
        displayName: 'Add Only If New',
        name: 'addOnlyIfNew',
        type: 'boolean',
        default: false,
        description: 'Whether to skip prospects already in the list/campaign',
        resource: 'prospect',
        operations: ['bulk'],

    }),

    createField({
        displayName: 'Not In Other Campaign',
        name: 'notInOtherCampaign',
        type: 'boolean',
        default: true,
        description: 'Whether to check if prospect is in other campaigns',
        resource: 'prospect',
        operations: ['bulk'],

    }),

    createField({
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        description: 'Filter by tags (comma-separated)',
        resource: 'prospect',
        operations: ['getMany'],

    }),

    createField({
        displayName: 'Search',
        name: 'search',
        type: 'string',
        default: '',
        description: 'Search in email, first name, last name',
        resource: 'prospect',
        operations: ['getMany'],

    }),

    // Email field - REQUIRED for create operation
    createField({
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'e.g. jane@example.com',
        default: '',
        required: true,
        description: 'Email address of the prospect; must be valid email format with maximum 256 characters',
        resource: 'prospect',
        operations: ['create']
    }),

    // Email field - OPTIONAL for getMany operation
    createField({
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'e.g. jane@example.com',
        default: '',
        description: 'Filter prospects by email address',
        resource: 'prospect',
        operations: ['getMany']
    }),

    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Field',
        displayOptions: {
            show: { resource: ['prospect'], operation: ['create', 'update'] },
        },
        options: prospectAdditionalFieldOptions,
    },

    createField({
        displayName: 'Prospects',
        name: 'prospects',
        type: 'fixedCollection',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        resource: 'prospect',
        operations: ['bulk'],
        description: 'List of prospects to add',
        options: [
            {
                name: 'prospectProperties',
                displayName: 'Prospect Properties',
                values: [
                    {
                        displayName: 'Email',
                        name: 'email',
                        type: 'string',
                        placeholder: 'e.g. jane@example.com',
                        default: '',
                        description: 'Email address of the prospect',
                        required: true,
                    },
                    {
                        displayName: 'Additional Fields',
                        name: 'additionalFields',
                        type: 'collection',
                        default: {},
                        placeholder: 'Add Field',
                        options: prospectAdditionalFieldOptions,
                    },
                ],
            },
        ],
    }),

    createField({
        displayName: 'Tag',
        name: 'tagId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a tag from the list or enter the tag ID manually',
        resource: 'prospect',
        operations: ['addTags', 'removeTags'],
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
                            regex: '^[0-9]+$',
                            errorMessage: 'Enter a valid numeric ID',
                        },
                    },
                ],
            },
        ],
    }),

    createField({
        displayName: 'Exclude Campaign Names or IDs',
        name: 'excludeCampaignId',
        type: 'multiOptions',
        default: [],
        description: 'Select campaigns to exclude. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        resource: 'prospect',
        operations: ['getMany'],
        typeOptions: {
            loadOptionsMethod: 'getCampaigns',
        },
    }),

    createField({
        displayName: 'Include Campaign Names or IDs',
        name: 'includeCampaignId',
        type: 'multiOptions',
        default: [],
        description: 'Select campaigns to include. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        resource: 'prospect',
        operations: ['getMany'],
        typeOptions: {
            loadOptionsMethod: 'getCampaigns',
        },
    }),

    createField({
        displayName: 'Exclude List Names or IDs',
        name: 'excludeListId',
        type: 'multiOptions',
        default: [],
        description: 'Select lists to exclude. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        resource: 'prospect',
        operations: ['getMany'],
        typeOptions: {
            loadOptionsMethod: 'getLists',
        },
    }),

    createField({
        displayName: 'Include List Names or IDs',
        name: 'includeListId',
        type: 'multiOptions',
        default: [],
        description: 'Select lists to include. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        resource: 'prospect',
        operations: ['getMany'],
        typeOptions: {
            loadOptionsMethod: 'getLists',
        },
    }),
];
