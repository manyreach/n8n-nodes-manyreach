import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

const messageTypes = [
    { name: 'Sent', value: 'Sent' },
    { name: 'Reply', value: 'Reply' },
    { name: 'SentManual', value: 'SentManual' },
];

const confirmStatus = [
  { name: 'Unknown', value: 'Unknown' },
  { name: 'EspMatchNotFound', value: 'EspMatchNotFound' },
  { name: 'EspNotAllowed', value: 'EspNotAllowed' },
  { name: 'NoWarmup', value: 'NoWarmup' },
  { name: 'NotReceiving', value: 'NotReceiving' },
  { name: 'WarmupLimits', value: 'WarmupLimits' },
  { name: 'SendingLimits', value: 'SendingLimits' },
  { name: 'NoSender', value: 'NoSender' },
  { name: 'Stuck', value: 'Stuck' },
  { name: 'MailboxInexistent', value: 'MailboxInexistent' },
  { name: 'EmptySubject', value: 'EmptySubject' },
  { name: 'EmptyBody', value: 'EmptyBody' },
  { name: 'MissingPlaceholder', value: 'MissingPlaceholder' },
  { name: 'Invalid', value: 'Invalid' },
  { name: 'Blacklisted', value: 'Blacklisted' },
  { name: 'Stopped', value: 'Stopped' },
  { name: 'Unsub', value: 'Unsub' },
  { name: 'BounceHard', value: 'BounceHard' },
  { name: 'BounceSoft', value: 'BounceSoft' },
  { name: 'AutoNolonger', value: 'AutoNolonger' },
  { name: 'AutoOoo', value: 'AutoOoo' },
  { name: 'AutoReply', value: 'AutoReply' },
  { name: 'CollegueReplied', value: 'CollegueReplied' },
  { name: 'SenderDisconnected', value: 'SenderDisconnected' },
  { name: 'Paused', value: 'Paused' },
  { name: 'InsufficientCredit', value: 'InsufficientCredit' },
  { name: 'ScheduleInactive', value: 'ScheduleInactive' },
  { name: 'NotInterested', value: 'NotInterested' },
  { name: 'NotSet', value: 'NotSet' },
  { name: 'Neutral', value: 'Neutral' },
  { name: 'MaybeLater', value: 'MaybeLater' },
  { name: 'Interested', value: 'Interested' },
  { name: 'MeetingBooked', value: 'MeetingBooked' },
  { name: 'MeetingCompleted', value: 'MeetingCompleted' },
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
            { name: 'Create', value: 'create' },
            { name: 'Get Message', value: 'getMessage' },
        ],
    }),
];


export const messageFields: INodeProperties[] = [
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
                placeholder: 'Enter campaign ID',
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
                placeholder: 'Enter sender ID',
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
                placeholder: 'Enter sequence ID',
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
                placeholder: 'Enter followup ID',
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
        displayName: 'Message Type',
        name: 'messageType',
        type: 'options',
        options: messageTypes,
        default: '',
        description: 'Filter messages by type',
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
    { displayName: 'Send As Reply', name: 'sendAsReply', type: 'boolean', default: false },
    { displayName: 'Subject', name: 'subject', type: 'string', default: '' }
    ],
  }
];
