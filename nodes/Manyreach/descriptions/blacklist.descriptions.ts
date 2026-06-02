import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

export const blacklistOperations: INodeProperties[] = [
  createField({
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    resource: 'blacklist',
    default: '',
    optionsList: [
      { name: 'Add Domains', value: 'addDomains', action: 'Add domains to blacklist', description: 'Add one or more domains to the blacklist' },
      { name: 'Add Emails', value: 'addEmails', action: 'Add emails to blacklist', description: 'Add one or more emails to the blacklist' },
      { name: 'Check Domain', value: 'checkDomain', action: 'Check domain blacklist status', description: 'Check if a domain is blacklisted' },
      { name: 'Check Email', value: 'checkEmail', action: 'Check email blacklist status', description: 'Check if an email is blacklisted' },
      { name: 'Delete Domain', value: 'deleteDomain', action: 'Remove domain from blacklist', description: 'Remove a domain entry from the blacklist by ID' },
      { name: 'Delete Email', value: 'deleteEmail', action: 'Remove email from blacklist', description: 'Remove an email entry from the blacklist by ID' },
      { name: 'Get Domains', value: 'getDomains', action: 'Get all blacklisted domains', description: 'Retrieve a list of blacklisted domains' },
      { name: 'Get Emails', value: 'getEmails', action: 'Get all blacklisted emails', description: 'Retrieve a list of blacklisted emails' },
    ],
  }),
];

export const blacklistFields: INodeProperties[] = [
  // Page field for Get Domains and Get Emails
  createField({
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    description: 'Page number for pagination',
    resource: 'blacklist',
    operations: ['getDomains', 'getEmails'],
  }),

  // Limit field for Get Domains and Get Emails
  createField({
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: {
      minValue: 1,
    },
    default: 50,
    description: 'Max number of results to return',
    resource: 'blacklist',
    operations: ['getDomains', 'getEmails'],
  }),

  // Search field for Get Domains and Get Emails
  createField({
    displayName: 'Search',
    name: 'search',
    type: 'string',
    default: '',
    description: 'Case-insensitive search term to filter entries',
    resource: 'blacklist',
    operations: ['getDomains', 'getEmails'],
  }),

  // Domain field for Check Domain
  createField({
    displayName: 'Domain',
    name: 'domain',
    type: 'string',
    default: '',
    required: true,
    description: 'Domain name to check (e.g., example.com)',
    resource: 'blacklist',
    operations: ['checkDomain'],
  }),

  // Email field for Check Email
  createField({
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    default: '',
    required: true,
    description: 'Email address to check (e.g., test@example.com)',
    resource: 'blacklist',
    operations: ['checkEmail'],
  }),

  // Domains list field for Add Domains
  createField({
    displayName: 'Domains',
    name: 'domains',
    type: 'string',
    default: '',
    required: true,
    description: 'Domains to add, comma or newline separated',
    resource: 'blacklist',
    operations: ['addDomains'],
  }),

  // Emails list field for Add Emails
  createField({
    displayName: 'Emails',
    name: 'emails',
    type: 'string',
    default: '',
    required: true,
    description: 'Emails to add, comma or newline separated',
    resource: 'blacklist',
    operations: ['addEmails'],
  }),

  // ID field for Delete Domain and Delete Email
  createField({
    displayName: 'Entry ID',
    name: 'id',
    type: 'number',
    default: 0,
    required: true,
    description: 'Block/Entry ID to delete from the blacklist',
    resource: 'blacklist',
    operations: ['deleteDomain', 'deleteEmail'],
  }),
];
