import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

import * as cheerio from 'cheerio';

export class WebScraper implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Web Scraper',
		name: 'webScraper',
		group: ['transform'],
		version: 1,
		description: 'Extract data from websites using CSS selectors or automatic content extraction',
		defaults: {
			name: 'Web Scraper',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://example.com',
				description: 'The URL of the webpage to scrape',
			},
			{
				displayName: 'Extraction Mode',
				name: 'extractionMode',
				type: 'options',
				options: [
					{
						name: 'Simple (Auto-Extract Content)',
						value: 'simple',
						description: 'Automatically extract main content (articles, blog posts, documentation)',
					},
					{
						name: 'Advanced (CSS Selectors)',
						value: 'advanced',
						description: 'Define specific fields to extract using CSS selectors',
					},
				],
				default: 'simple',
				description: 'Choose how to extract data from the webpage',
			},
			{
				displayName: 'Fields to Extract',
				name: 'extractFields',
				type: 'fixedCollection',
				placeholder: 'Add Field',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						extractionMode: ['advanced'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						values: [
							{
						displayName: 'CSS Selector',
						name: 'cssSelector',
						type: 'string',
						default: '',
						placeholder: 'e.g., h1.product-name,	.price,	#description',
						description: 'CSS selector to find the element. Right-click element	→	Inspect	→	Copy selector.',
							},
							{
						displayName: 'Custom Attribute Name',
						name: 'customAttribute',
						type: 'string',
						default: '',
						placeholder: 'e.g., data-ID',
						description: 'Name of the custom attribute to extract',
							},
							{
						displayName: 'Extract',
						name: 'extractAttribute',
						type: 'options',
						options: [
									{
										name: 'Alt (Alt Text)',
										value: 'alt',
										description: 'Extract the alt attribute',
									},
									{
										name: 'Custom Attribute',
										value: 'custom',
										description: 'Extract a custom attribute',
									},
									{
										name: 'Href (Link)',
										value: 'href',
										description: 'Extract the href attribute (for links)',
									},
									{
										name: 'HTML Content',
										value: 'html',
										description: 'Extract the inner HTML',
									},
									{
										name: 'Src (Source)',
										value: 'src',
										description: 'Extract the src attribute (for images)',
									},
									{
										name: 'Text Content',
										value: 'text',
										description: 'Extract the text inside the element',
									},
									{
										name: 'Value',
										value: 'value',
										description: 'Extract the value attribute (for inputs)',
									},
								],
						default: 'text',
						description: 'What to extract from the selected element',
							},
							{
						displayName: 'Field Name',
						name: 'fieldName',
						type: 'string',
						default: '',
						placeholder: 'e.g., productTitle',
						description: 'Name for this field in the output',
							},
							{
						displayName: 'Return Multiple',
						name: 'returnMultiple',
						type: 'boolean',
						default: false,
						description: 'Whether to return all matching elements as an array (true) or just the first match (false)',
							},
					],
					},
				],
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'User Agent',
						name: 'userAgent',
						type: 'options',
						options: [
							{
								name: 'Default',
								value: 'default',
							},
							{
								name: 'Desktop Chrome',
								value: 'desktop',
							},
							{
								name: 'Mobile Safari',
								value: 'mobile',
							},
							{
								name: 'Bot',
								value: 'bot',
							},
						],
						default: 'default',
						description: 'User agent to use for the request',
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 10000,
						description: 'Request timeout in milliseconds',
					},
					{
						displayName: 'Include Metadata',
						name: 'includeMetadata',
						type: 'boolean',
						default: false,
						description: 'Whether to include page metadata (title, description, etc.) in the output',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const userAgents = {
			default: 'n8n-WebScraper/1.0',
			desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
			mobile: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
			bot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const url = this.getNodeParameter('url', i) as string;
				const extractionMode = this.getNodeParameter('extractionMode', i) as string;
				const options = this.getNodeParameter('options', i, {}) as {
					userAgent?: keyof typeof userAgents;
					timeout?: number;
					includeMetadata?: boolean;
				};

				if (!url) {
					throw new NodeOperationError(this.getNode(), 'URL is required');
				}

				// Fetch the webpage
				const response = await fetch(url, {
					headers: {
						'User-Agent': userAgents[options.userAgent || 'default'],
					},
					signal: AbortSignal.timeout(options.timeout || 10000),
				});

				if (!response.ok) {
					throw new NodeOperationError(
						this.getNode(),
						`Failed to fetch URL: ${response.status} ${response.statusText}`,
					);
				}

				const html = await response.text();
				const $ = cheerio.load(html);
				const result: any = {};

				// Add metadata if requested
				if (options.includeMetadata) {
					result.metadata = {
						url,
						title: $('title').text() || '',
						description: $('meta[name="description"]').attr('content') || '',
						author: $('meta[name="author"]').attr('content') || '',
						timestamp: new Date().toISOString(),
					};
				}

				if (extractionMode === 'simple') {
					// Simple mode: Extract main content
					// Remove script and style elements
					$('script, style, nav, header, footer, aside').remove();
					
					// Get main content areas
					const contentSelectors = ['main', 'article', '.content', '#content', '.post', '.entry-content'];
					let content = '';
					
					for (const selector of contentSelectors) {
						const element = $(selector);
						if (element.length > 0) {
							content = element.text().trim();
							break;
						}
					}
					
					// Fallback to body if no content area found
					if (!content) {
						content = $('body').text().trim();
					}
					
					// Clean up whitespace
					content = content.replace(/\s+/g, ' ').trim();
					
					result.content = content;
				} else {
					// Advanced mode: Extract specific fields
					const extractFields = this.getNodeParameter('extractFields.fields', i, []) as Array<{
						fieldName: string;
						cssSelector: string;
						extractAttribute: string;
						customAttribute?: string;
						returnMultiple: boolean;
					}>;

					for (const field of extractFields) {
						if (!field.fieldName || !field.cssSelector) {
							continue;
						}

						const elements = $(field.cssSelector);
						
						if (elements.length === 0) {
							result[field.fieldName] = field.returnMultiple ? [] : null;
							continue;
						}

						if (field.returnMultiple) {
							// Return array of all matches
							const values: any[] = [];
							elements.each((_, elem) => {
								const value = extractValue(elem, field.extractAttribute, field.customAttribute);
								if (value !== null) {
									values.push(value);
								}
							});
							result[field.fieldName] = values;
						} else {
							// Return first match only
							const value = extractValue(elements[0], field.extractAttribute, field.customAttribute);
							result[field.fieldName] = value;
						}
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

function extractValue(element: any, attribute: string, customAttribute?: string): any {
	const $elem = cheerio.load('')(element);
	
	switch (attribute) {
		case 'text':
			return $elem.text().trim();
		case 'html':
			return $elem.html();
		case 'href':
		case 'src':
		case 'alt':
		case 'value':
			return $elem.attr(attribute) || null;
		case 'custom':
			return customAttribute ? $elem.attr(customAttribute) || null : null;
		default:
			return $elem.text().trim();
	}
}