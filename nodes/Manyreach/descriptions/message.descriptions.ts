import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

const messageTypes = [
    { name: 'Sent', value: 'Sent' },
    { name: 'Reply', value: 'Reply' },
    { name: 'Sent Manual', value: 'SentManual' },
];

const confirmStatus = [
  { name: 'Unknown', value: 'Unknown' },
  { name: 'ESP Match Not Found', value: 'EspMatchNotFound' },
  { name: 'ESP Not Allowed', value: 'EspNotAllowed' },
  { name: 'No Warmup', value: 'NoWarmup' },
  { name: 'Not Receiving', value: 'NotReceiving' },
  { name: 'Warmup Limits', value: 'WarmupLimits' },
  { name: 'Sending Limits', value: 'SendingLimits' },
  { name: 'No Sender', value: 'NoSender' },
  { name: 'Stuck', value: 'Stuck' },
  { name: 'Mailbox Inexistent', value: 'MailboxInexistent' },
  { name: 'Empty Subject', value: 'EmptySubject' },
  { name: 'Empty Body', value: 'EmptyBody' },
  { name: 'Missing Placeholder', value: 'MissingPlaceholder' },
  { name: 'Invalid', value: 'Invalid' },
  { name: 'Blacklisted', value: 'Blacklisted' },
  { name: 'Stopped', value: 'Stopped' },
  { name: 'Unsub', value: 'Unsub' },
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
  { name: 'Not Set', value: 'NotSet' },
  { name: 'Neutral', value: 'Neutral' },
  { name: 'Maybe Later', value: 'MaybeLater' },
  { name: 'Interested', value: 'Interested' },
  { name: 'Meeting Booked', value: 'MeetingBooked' },
  { name: 'Meeting Completed', value: 'MeetingCompleted' },
  { name: 'Won', value: 'Won' },
  { name: 'Subbed', value: 'Subbed' }
];


export const messageOperations: INodeProperties[] = [
    createField({
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        resource: 'message',
        default: '',
        optionsList: [
            { name: 'Create', value: 'create', action: 'Create message', description: 'Create a new message' },
            { name: 'Get', value: 'getMessage', action: 'Get message', description: 'Retrieve a message' },
        ],
    }),
];


export const messageFields: INodeProperties[] = [
    
    createField({
        displayName: 'Campaign',
        name: 'campaignId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a campaign from the list or enter its ID',
        resource: 'message',
        
        operations: ['getMessage'],
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
        displayName: 'Sender',
        name: 'senderId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a sender from the list or enter its ID',
        resource: 'message',
        operations: ['getMessage'],
        modes: [
            {
                displayName: 'From list',
                name: 'list',
                type: 'list',
                placeholder: 'Select a sender...',
                typeOptions: {
                    searchListMethod: 'searchSenders',
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
        displayName: 'Sequence',
        name: 'sequenceId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a sequence from the chosen campaign',
        resource: 'message',
        operations: ['getMessage'],
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
    }),
    
    createField({
        displayName: 'Followup',
        name: 'followupId',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: 'Select a followup to retrieve',
        resource: 'message',
        operations: ['getMessage'],
        modes: [
            {
                displayName: 'From list',
                name: 'list',
                type: 'list',
                placeholder: 'Select a followup...',
                typeOptions: {
                    searchListMethod: 'searchFollowups',
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
        displayName: 'Message Type',
        name: 'messageType',
        type: 'options',
        options: messageTypes,
        default: '',
        description: 'Filter messages by type',
        resource: 'message',
        required: true,
        operations: ['getMessage'],
    }),
    
    createField({
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 1,
        resource: 'message',
        operations: ['getMessage'],
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
        resource: 'message',
        operations: ['getMessage'],
    }),

    createField({
        displayName: 'Starting After',
        name: 'startingAfter',
        type: 'dateTime',
        default: '',
        resource: 'message',
        operations: ['getMessage'],
    }),

    createField({
        displayName: 'Confirmed Status',
        name: 'confirmedStatus',
        type: 'options',
        options: confirmStatus,
        default: '',
        description: 'Filter messages by confirmation status',
        resource: 'message',
        operations: ['getMessage'],
    }),
    
    createField({
        displayName: 'Email From',
        name: 'emailFrom',
        type: 'string',
        default: '',
        description: 'Filter messages by sender email address',
        resource: 'message',
        operations: ['getMessage'],
    }),

    createField({
        displayName: 'Email To',
        name: 'emailTo',
        type: 'string',
        default: '',
        description: 'Filter messages by recipient email address',
        resource: 'message',
        operations: ['getMessage'],
    }),

    createField({
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        default: '',
        description: 'Filter messages by subject',
        resource: 'message',
        operations: ['getMessage'],
    }),


    createField({
        displayName: 'Message ID',
        name: 'messageId',
        type: 'string',
        default: '',
        required: true,
        resource: 'message',
        operations: ['create'],
    }),

    {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    default: {},
    placeholder: 'Add Field',
    displayOptions: {
      show: { resource: ['message'], operation: ['create'] },
    },
    options: [
    { displayName: 'Bcc Emails', name: 'bccEmails', type: 'string', default: '' },
    { displayName: 'Body', name: 'body', type: 'string', default: '' },
    { displayName: 'Cc Emails', name: 'ccEmails', type: 'string', default: '' },
    { displayName: 'From Email', name: 'fromEmail', type: 'string', default: '' },
    { displayName: 'Reply To Email', name: 'replyToEmail', type: 'string', default: '' },
    { displayName: 'Send As Reply', name: 'sendAsReply', type: 'boolean', default: false, description: 'Whether to send this message as a reply' },
    { displayName: 'Subject', name: 'subject', type: 'string', default: '' }
    ],
  }
];
