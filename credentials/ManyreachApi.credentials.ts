import type { ICredentialType, INodeProperties } from 'n8n-workflow';
import { BASE_URL } from '../nodes/Manyreach/ManyreachConfig';

export class ManyreachApi implements ICredentialType {
	name = 'manyreachApi';
	displayName = 'Manyreach API';
	documentationUrl = 'https://manyreach.com/docs';
	icon = 'fa:key' as const;

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			description:
				'Enter your Manyreach API key. You can find it in your Manyreach dashboard.',
			typeOptions: {
				password: true,
			},
		},
	];

	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	} as const;

	test = {
		request: {
			baseURL: BASE_URL,
			url: '/tags',
			method: 'GET',
		},
	} as const;
}