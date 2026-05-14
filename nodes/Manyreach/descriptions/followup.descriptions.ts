import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

const waitUnits = [
  { name: 'Minutes', value: 'Minutes' },
  { name: 'Hours', value: 'Hours' },
  { name: 'Days', value: 'Days' }
];

export const followupOperations: INodeProperties[] = [
  createField({
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
				noDataExpression: true,
    resource: 'followup',
    default: '',
    optionsList: [
      { name: 'Create', value: 'create', action: 'Create followup', description: 'Create a new followup step' },
      { name: 'Delete', value: 'delete', action: 'Delete followup', description: 'Delete a followup step permanently' },
      { name: 'Get', value: 'getById', action: 'Get followup', description: 'Retrieve a followup step' },
      { name: 'Update', value: 'update', action: 'Update followup', description: 'Update a followup step' },
    ],
  }),
];

export const followupFields: INodeProperties[] = [

  createField({
    displayName: 'Campaign',
    name: 'campaignId',
    type: 'resourceLocator',
    default: { mode: 'list', value: '' },
    description: 'Select a campaign',
    resource: 'followup',
    operations: ['getById', 'create', 'update', 'delete'],
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
    resource: 'followup',
    operations: ['getById', 'create', 'update', 'delete'],
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
    displayName: 'Followup',
    name: 'followupId',
    type: 'resourceLocator',
    default: { mode: 'list', value: '' },
    description: 'Select a followup to retrieve',
    resource: 'followup',
    operations: ['getById', 'update', 'delete'],
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
    required: true,
  }),

  createField({
    displayName: 'Subject',
    name: 'subject',
    type: 'string',
    default: '',
    resource: 'followup',
    operations: ['create'],
    description: 'Subject line of the followup email',
  }),

  createField({
    displayName: 'Body',
    name: 'body',
    type: 'string',
    default: '',
    resource: 'followup',
    operations: ['create'],
    description: 'Body content of the followup email',
  }),

  createField({
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    default: {},
    placeholder: 'Add Field',
    resource: 'followup',
    operations: ['create'],
    options: [
      { displayName: 'Reply In Thread', name: 'replyInThread', type: 'boolean', default: false, description: 'Whether to send this followup as a reply in the original thread' },
      { displayName: 'Reply In Thread To Followup ID', name: 'replyInThreadToFollowupId', type: 'number', default: 0 },
      { displayName: 'Send In Same Thread', name: 'sendInSameThread', type: 'boolean', default: false, description: 'Whether to send this followup in the same thread' },
      { displayName: 'Use Original Subject', name: 'useOriginalSubject', type: 'boolean', default: false, description: 'Whether to use the original campaign subject line' },
      { displayName: 'Wait Min', name: 'waitMin', type: 'number', default: 0, description: 'Wait time duration before sending this followup; must be an integer between 1 and 1000', required: true },
      { displayName: 'Wait Units', name: 'waitUnits', type: 'options', default: 'Minutes', options: waitUnits }
    ],
  }),

  createField({
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    default: {},
    placeholder: 'Add Field',
    resource: 'followup',
    operations: ['update'],
    options: [
      { displayName: 'Body', name: 'body', type: 'string', default: '', description: 'Body content of the followup email' },
      { displayName: 'Reply In Thread', name: 'replyInThread', type: 'boolean', default: false, description: 'Whether to send this followup as a reply in the original thread' },
      { displayName: 'Reply In Thread To Followup ID', name: 'replyInThreadToFollowupId', type: 'number', default: 0 },
      { displayName: 'Send In Same Thread', name: 'sendInSameThread', type: 'boolean', default: false, description: 'Whether to send this followup in the same thread' },
      { displayName: 'Subject', name: 'subject', type: 'string', default: '', description: 'Subject line of the followup email' },
      { displayName: 'Use Original Subject', name: 'useOriginalSubject', type: 'boolean', default: false, description: 'Whether to use the original campaign subject line' },
      { displayName: 'Wait Min', name: 'waitMin', type: 'number', default: 0, description: 'Wait time duration before sending this followup; must be an integer between 1 and 1000', required: true },
      { displayName: 'Wait Units', name: 'waitUnits', type: 'options', default: 'Minutes', options: waitUnits }
    ],
  }),
];
