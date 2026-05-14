import { INodeProperties } from 'n8n-workflow';
import { createField } from './common/fields';

export const whitelabelOperations: INodeProperties[] = [
  createField({
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
				noDataExpression: true,
    resource: 'whitelabel',
    default: '',
    optionsList: [
      { name: 'Update', value: 'update', action: 'Update whitelabel settings', description: 'Update the whitelabel configuration' },
    ],
  }),
];

export const whitelabelFields: INodeProperties[] = [

  createField({
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
				default: {},
    placeholder: 'Add Field',
    resource: 'whitelabel',
    operations: ['update'],
    options: [
    { displayName: 'Color', name: 'color', type: 'color', default: '' , description: 'Hex color code for the whitelabel theme', placeholder: 'e.g. #00aaff' },
    { displayName: 'Custom Domain', name: 'customDomain', type: 'string', default: '', placeholder: 'e.g. mail.yourdomain.com' },
    { displayName: 'Logo Image URL', name: 'logoImageUrl', type: 'string', default: '' , description: 'Base64-encoded logo image', placeholder: 'e.g. data:image/png;base64,abc123' },
    ],
  })

];
