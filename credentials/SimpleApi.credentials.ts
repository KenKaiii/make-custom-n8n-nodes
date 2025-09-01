import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SimpleApi implements ICredentialType {
	name = 'simpleApi';
	displayName = 'Simple API';
	documentationUrl = 'https://example.com/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			placeholder: 'Enter your API key',
			description: 'The API key for authentication',
		},
		{
			displayName: 'API Key Location',
			name: 'apiKeyLocation',
			type: 'options',
			options: [
				{
					name: 'Header',
					value: 'header',
					description: 'Send API key in request header',
				},
				{
					name: 'Query Parameter',
					value: 'query',
					description: 'Send API key as URL query parameter',
				},
			],
			default: 'header',
			description: 'Where to send the API key',
		},
		{
			displayName: 'API Key Name',
			name: 'apiKeyName',
			type: 'string',
			typeOptions: { password: true },
			default: 'X-API-Key',
			required: true,
			placeholder: 'e.g., X-API-Key, api_key, apikey',
			description: 'The name of the header or query parameter',
			hint: 'Common header names: X-API-Key, Authorization, API-Key. Common query names: api_key, apikey, key',
		},
		{
			displayName: 'API Key Prefix',
			name: 'apiKeyPrefix',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			displayOptions: {
				show: {
					apiKeyLocation: ['header'],
				},
			},
			placeholder: 'e.g., Bearer, Token',
			description: 'Optional prefix for the API key (e.g., "Bearer " for Authorization header)',
		},
	];
}