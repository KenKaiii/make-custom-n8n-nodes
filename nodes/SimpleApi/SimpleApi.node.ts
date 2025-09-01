import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IHttpRequestMethods,
	NodeConnectionType,
	NodeOperationError,
	ICredentialDataDecryptedObject,
} from 'n8n-workflow';

export class SimpleAPI implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Simple API',
		name: 'simpleApi',
		group: ['transform'],
		version: 1,
		description: 'Make authenticated API requests with API key authentication',
		defaults: {
			name: 'Simple API',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'simpleApi',
				required: false,
				displayOptions: {
					show: {
						authentication: ['apiKey'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'None',
						value: 'none',
						description: 'No authentication required',
					},
					{
						name: 'API Key',
						value: 'apiKey',
						description: 'Use API key authentication',
					},
				],
				default: 'none',
				description: 'How to authenticate with the API',
			},
			{
				displayName: 'HTTP Method',
				name: 'method',
				type: 'options',
				options: [
					{
						name: 'DELETE',
						value: 'DELETE',
						description: 'Delete data',
					},
					{
						name: 'GET',
						value: 'GET',
						description: 'Retrieve data from the API',
					},
					{
						name: 'HEAD',
						value: 'HEAD',
						description: 'Get headers only',
					},
					{
						name: 'PATCH',
						value: 'PATCH',
						description: 'Partially update data',
					},
					{
						name: 'POST',
						value: 'POST',
						description: 'Send data to the API',
					},
					{
						name: 'PUT',
						value: 'PUT',
						description: 'Update existing data',
					},
				],
				default: 'GET',
				description: 'The HTTP method to use',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://api.example.com/v1/endpoint',
				description: 'The API endpoint URL',
			},
			{
				displayName: 'Headers',
				name: 'headers',
				type: 'fixedCollection',
				placeholder: 'Add Header',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						displayName: 'Header',
						name: 'header',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								placeholder: 'Content-Type',
								description: 'Name of the header',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								placeholder: 'application/json',
								description: 'Value of the header',
							},
						],
					},
				],
				description: 'Custom headers to send with the request',
			},
			{
				displayName: 'Query Parameters',
				name: 'queryParams',
				type: 'fixedCollection',
				placeholder: 'Add Parameter',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						displayName: 'Parameter',
						name: 'parameter',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								placeholder: 'page',
								description: 'Name of the query parameter',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								placeholder: '1',
								description: 'Value of the query parameter',
							},
						],
					},
				],
				description: 'Query parameters to append to the URL',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				displayOptions: {
					show: {
						method: ['POST', 'PUT', 'PATCH'],
					},
				},
				default: '{}',
				placeholder: '{\n  "key": "value"\n}',
				description: 'The request body as JSON',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Follow Redirects',
						name: 'followRedirect',
						type: 'boolean',
						default: true,
						description: 'Whether to follow HTTP redirects',
					},
					{
						displayName: 'Ignore SSL Issues',
						name: 'ignoreSSL',
						type: 'boolean',
						default: false,
						description: 'Whether to ignore SSL certificate issues (use with caution)',
					},
					{
						displayName: 'Response Format',
						name: 'responseFormat',
						type: 'options',
						options: [
							{
								name: 'JSON',
								value: 'json',
								description: 'Parse response as JSON',
							},
							{
								name: 'Text',
								value: 'text',
								description: 'Return response as plain text',
							},
							{
								name: 'Binary',
								value: 'binary',
								description: 'Return response as binary data',
							},
						],
						default: 'json',
						description: 'How to parse the response',
					},
					{
						displayName: 'Return Full Response',
						name: 'fullResponse',
						type: 'boolean',
						default: false,
						description: 'Whether to return the full response object including headers and status',
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 10000,
						description: 'Request timeout in milliseconds',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const method = this.getNodeParameter('method', i) as IHttpRequestMethods;
				const url = this.getNodeParameter('url', i) as string;
				const authentication = this.getNodeParameter('authentication', i) as string;
				const headers = this.getNodeParameter('headers.header', i, []) as Array<{
					name: string;
					value: string;
				}>;
				const queryParams = this.getNodeParameter('queryParams.parameter', i, []) as Array<{
					name: string;
					value: string;
				}>;
				const options = this.getNodeParameter('options', i, {}) as {
					responseFormat?: string;
					timeout?: number;
					followRedirect?: boolean;
					ignoreSSL?: boolean;
					fullResponse?: boolean;
				};

				if (!url) {
					throw new NodeOperationError(this.getNode(), 'URL is required');
				}

				// Build the request options
				const requestOptions: IHttpRequestOptions = {
					method,
					url,
					returnFullResponse: options.fullResponse || false,
					ignoreHttpStatusErrors: true,
				};

				// Add headers
				const requestHeaders: { [key: string]: string } = {};
				for (const header of headers) {
					if (header.name && header.value) {
						requestHeaders[header.name] = header.value;
					}
				}

				// Add authentication if configured
				if (authentication === 'apiKey') {
					const credentials = await this.getCredentials('simpleApi') as ICredentialDataDecryptedObject;
					
					if (!credentials) {
						throw new NodeOperationError(this.getNode(), 'API Key credentials are not configured');
					}

					const apiKey = credentials.apiKey as string;
					const apiKeyLocation = credentials.apiKeyLocation as string;
					const apiKeyName = credentials.apiKeyName as string;
					const apiKeyPrefix = credentials.apiKeyPrefix as string;

					if (apiKeyLocation === 'header') {
						const keyValue = apiKeyPrefix ? `${apiKeyPrefix} ${apiKey}` : apiKey;
						requestHeaders[apiKeyName] = keyValue;
					} else if (apiKeyLocation === 'query') {
						// Add to query parameters
						queryParams.push({
							name: apiKeyName,
							value: apiKey,
						});
					}
				}

				// Add headers to request
				if (Object.keys(requestHeaders).length > 0) {
					requestOptions.headers = requestHeaders;
				}

				// Add query parameters
				if (queryParams.length > 0) {
					const qs: { [key: string]: string } = {};
					for (const param of queryParams) {
						if (param.name && param.value) {
							qs[param.name] = param.value;
						}
					}
					requestOptions.qs = qs;
				}

				// Add body for POST, PUT, PATCH
				if (['POST', 'PUT', 'PATCH'].includes(method)) {
					const body = this.getNodeParameter('body', i, {}) as string | object;
					if (typeof body === 'string') {
						try {
							requestOptions.body = JSON.parse(body);
						} catch (e) {
							requestOptions.body = body;
						}
					} else {
						requestOptions.body = body;
					}
				}

				// Add timeout
				if (options.timeout) {
					requestOptions.timeout = options.timeout;
				}

				// Handle SSL
				if (options.ignoreSSL) {
					requestOptions.skipSslCertificateValidation = true;
				}

				// Make the request
				const response = await this.helpers.httpRequest(requestOptions);

				// Process the response based on format option
				let result: any;
				if (options.fullResponse) {
					result = response;
				} else {
					if (options.responseFormat === 'text') {
						result = { text: response };
					} else if (options.responseFormat === 'binary') {
						result = { data: response };
					} else {
						// Default to JSON
						result = response;
					}
				}

				returnData.push({
					json: result,
					pairedItem: i,
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
							statusCode: error.statusCode,
							details: error.description,
						},
						pairedItem: i,
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}