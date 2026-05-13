import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function createSender(this: IExecuteFunctions, index: number) {
	const body: IDataObject = {};

	// Required fields
	const requiredFields = [
		'email',
		'dailyLimit',
		'customSmtpServer',
		'customSmtpPort',
		'customSmtpPass',
		'customImapServer',
		'customImapPort',
		'customImapPass',
	];

	for (const field of requiredFields) {
		body[field] = this.getNodeParameter(field, index);
	}

	// Optional fields
	const additionalFields = this.getNodeParameter(
		'additionalFields',
		index,
		{},
	) as IDataObject;

	mapAdditionalFields(additionalFields, body);

	// API Call
	return await apiRequest.call(this, 'POST', '/senders', body);
}