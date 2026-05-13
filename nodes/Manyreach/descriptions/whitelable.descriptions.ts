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
      { name: 'Update', value: 'update' }
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
    { displayName: 'Color', name: 'color', type: 'color', default: '' , description: 'Hex color code for the theme'},
    { displayName: 'Custom Domain', name: 'customDomain', type: 'string', default: '' },
    { displayName: 'Logo Image Url', name: 'logoImageUrl', type: 'string', default: '' , description: 'Base64 for the logo image'},
    ],
  })

];
