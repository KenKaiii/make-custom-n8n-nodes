import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

export class DataTransform implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Data Transform',
		name: 'dataTransform',
		icon: 'file:dataTransform.svg',
		group: ['transform'],
		version: 1,
		description: 'Transform data between different formats and structures',
		defaults: {
			name: 'Data Transform',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'CSV to JSON',
						value: 'csvToJson',
						description: 'Convert CSV text to JSON array',
						action: 'Convert CSV text to JSON array',
					},
					{
						name: 'Field Mapper',
						value: 'fieldMapper',
						description: 'Map fields from one structure to another',
						action: 'Map fields from one structure to another',
					},
					{
						name: 'Filter Data',
						value: 'filterData',
						description: 'Filter items based on conditions',
						action: 'Filter items based on conditions',
					},
					{
						name: 'Flatten Object',
						value: 'flatten',
						description: 'Flatten nested objects to single level',
						action: 'Flatten nested objects to single level',
					},
					{
						name: 'JSON to CSV',
						value: 'jsonToCsv',
						description: 'Convert JSON array to CSV format',
						action: 'Convert JSON array to CSV format',
					},
					{
						name: 'Unflatten Object',
						value: 'unflatten',
						description: 'Convert flat object to nested structure',
						action: 'Convert flat object to nested structure',
					},
				],
				default: 'jsonToCsv',
			},
			// JSON to CSV options
			{
				displayName: 'Fields',
				name: 'csvFields',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['jsonToCsv'],
					},
				},
				default: '',
				placeholder: 'name,email,age',
				description: 'Comma-separated list of fields to include in CSV. Leave empty to include all fields.',
			},
			{
				displayName: 'Delimiter',
				name: 'delimiter',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['jsonToCsv', 'csvToJson'],
					},
				},
				options: [
					{
						name: 'Comma',
						value: ',',
					},
					{
						name: 'Semicolon',
						value: ';',
					},
					{
						name: 'Tab',
						value: '\t',
					},
					{
						name: 'Pipe',
						value: '|',
					},
				],
				default: ',',
				description: 'Character to separate fields',
			},
			{
				displayName: 'Include Headers',
				name: 'includeHeaders',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['jsonToCsv'],
					},
				},
				default: true,
				description: 'Whether to include field names as the first row',
			},
			// CSV to JSON options
			{
				displayName: 'CSV Input',
				name: 'csvInput',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				displayOptions: {
					show: {
						operation: ['csvToJson'],
					},
				},
				default: '',
				placeholder: 'name,email,age\nJohn,john@example.com,30\nJane,jane@example.com,25',
				description: 'The CSV data to convert',
			},
			{
				displayName: 'Has Headers',
				name: 'hasHeaders',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['csvToJson'],
					},
				},
				default: true,
				description: 'Whether the first row contains field names',
			},
			// Field Mapper options
			{
				displayName: 'Field Mappings',
				name: 'fieldMappings',
				type: 'fixedCollection',
				placeholder: 'Add Mapping',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['fieldMapper'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Mapping',
						name: 'mapping',
						values: [
							{
								displayName: 'Source Field',
								name: 'sourceField',
								type: 'string',
								default: '',
								placeholder: 'user.name',
								description: 'Path to the source field (supports dot notation)',
							},
							{
								displayName: 'Target Field',
								name: 'targetField',
								type: 'string',
								default: '',
								placeholder: 'fullName',
								description: 'Name of the target field',
							},
							{
								displayName: 'Default Value',
								name: 'defaultValue',
								type: 'string',
								default: '',
								placeholder: 'N/A',
								description: 'Value to use if source field is missing',
							},
						],
					},
				],
			},
			{
				displayName: 'Keep Unmapped Fields',
				name: 'keepUnmapped',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['fieldMapper'],
					},
				},
				default: false,
				description: 'Whether to keep fields that are not explicitly mapped',
			},
			// Filter Data options
			{
				displayName: 'Filter Rules',
				name: 'filterRules',
				type: 'fixedCollection',
				placeholder: 'Add Rule',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['filterData'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Rule',
						name: 'rule',
						values: [
							{
								displayName: 'Field',
								name: 'field',
								type: 'string',
								default: '',
								placeholder: 'status',
								description: 'Field to check (supports dot notation)',
							},
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{
										name: 'Contains',
										value: 'contains',
									},
									{
										name: 'Equals',
										value: 'equals',
									},
									{
										name: 'Greater Than',
										value: 'greaterThan',
									},
									{
										name: 'Is Empty',
										value: 'isEmpty',
									},
									{
										name: 'Is Not Empty',
										value: 'isNotEmpty',
									},
									{
										name: 'Less Than',
										value: 'lessThan',
									},
									{
										name: 'Not Contains',
										value: 'notContains',
									},
									{
										name: 'Not Equals',
										value: 'notEquals',
									},
								],
								default: 'equals',
								description: 'Comparison operator',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								displayOptions: {
									hide: {
										operator: ['isEmpty', 'isNotEmpty'],
									},
								},
								default: '',
								description: 'Value to compare against',
							},
						],
					},
				],
			},
			{
				displayName: 'Combine Rules',
				name: 'combineRules',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['filterData'],
					},
				},
				options: [
					{
						name: 'All Rules (AND)',
						value: 'and',
						description: 'Item must match all rules',
					},
					{
						name: 'Any Rule (OR)',
						value: 'or',
						description: 'Item must match at least one rule',
					},
				],
				default: 'and',
				description: 'How to combine multiple filter rules',
			},
			// Flatten/Unflatten options
			{
				displayName: 'Separator',
				name: 'separator',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['flatten', 'unflatten'],
					},
				},
				default: '.',
				description: 'Character to use for separating nested keys',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let result: any;

				switch (operation) {
					case 'jsonToCsv':
						result = await DataTransform.prototype.jsonToCsv.call(this, this, items, i);
						break;
					case 'csvToJson':
						result = await DataTransform.prototype.csvToJson.call(this, this, i);
						break;
					case 'fieldMapper':
						result = await DataTransform.prototype.fieldMapper.call(this, this, items[i], i);
						break;
					case 'filterData':
						const filtered = await DataTransform.prototype.filterData.call(this, this, items[i], i);
						if (filtered !== null) {
							result = filtered;
						} else {
							continue; // Skip filtered out items
						}
						break;
					case 'flatten':
						result = await DataTransform.prototype.flattenObject.call(this, this, items[i], i);
						break;
					case 'unflatten':
						result = await DataTransform.prototype.unflattenObject.call(this, this, items[i], i);
						break;
					default:
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
				}

				if (result !== undefined) {
					returnData.push({
						json: result,
						pairedItem: i,
					});
				}
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

	private async jsonToCsv(context: IExecuteFunctions, items: INodeExecutionData[], index: number): Promise<any> {
		const delimiter = context.getNodeParameter('delimiter', index) as string;
		const includeHeaders = context.getNodeParameter('includeHeaders', index) as boolean;
		const csvFields = context.getNodeParameter('csvFields', index) as string;
		
		const data = items.map(item => item.json);
		const fields = csvFields ? csvFields.split(',').map(f => f.trim()) : Object.keys(data[0] || {});
		
		const rows: string[] = [];
		
		if (includeHeaders) {
			rows.push(fields.join(delimiter));
		}
		
		for (const item of data) {
			const row = fields.map(field => {
				const value = DataTransform.getFieldValue(item, field);
				// Escape values containing delimiter, quotes, or newlines
				if (typeof value === 'string' && (value.includes(delimiter) || value.includes('"') || value.includes('\n'))) {
					return `"${value.replace(/"/g, '""')}"`;
				}
				return value ?? '';
			});
			rows.push(row.join(delimiter));
		}
		
		return { csv: rows.join('\n') };
	}

	private async csvToJson(context: IExecuteFunctions, index: number): Promise<any> {
		const csvInput = context.getNodeParameter('csvInput', index) as string;
		const delimiter = context.getNodeParameter('delimiter', index) as string;
		const hasHeaders = context.getNodeParameter('hasHeaders', index) as boolean;
		
		if (!csvInput) {
			return [];
		}
		
		const lines = csvInput.split('\n').filter(line => line.trim());
		const result: any[] = [];
		
		let headers: string[] = [];
		let startIndex = 0;
		
		if (hasHeaders && lines.length > 0) {
			headers = DataTransform.parseCSVLine(lines[0], delimiter);
			startIndex = 1;
		} else {
			// Generate headers as column1, column2, etc.
			const firstLine = lines[0] ? DataTransform.parseCSVLine(lines[0], delimiter) : [];
			headers = firstLine.map((_, i) => `column${i + 1}`);
		}
		
		for (let i = startIndex; i < lines.length; i++) {
			const values = DataTransform.parseCSVLine(lines[i], delimiter);
			const obj: any = {};
			headers.forEach((header, index) => {
				obj[header] = values[index] || '';
			});
			result.push(obj);
		}
		
		return result;
	}

	private static parseCSVLine(line: string, delimiter: string): string[] {
		const result: string[] = [];
		let current = '';
		let inQuotes = false;
		
		for (let i = 0; i < line.length; i++) {
			const char = line[i];
			const nextChar = line[i + 1];
			
			if (char === '"') {
				if (inQuotes && nextChar === '"') {
					current += '"';
					i++; // Skip next quote
				} else {
					inQuotes = !inQuotes;
				}
			} else if (char === delimiter && !inQuotes) {
				result.push(current);
				current = '';
			} else {
				current += char;
			}
		}
		
		result.push(current);
		return result;
	}

	private async fieldMapper(context: IExecuteFunctions, item: INodeExecutionData, index: number): Promise<any> {
		const mappings = context.getNodeParameter('fieldMappings.mapping', index, []) as Array<{
			sourceField: string;
			targetField: string;
			defaultValue: string;
		}>;
		const keepUnmapped = context.getNodeParameter('keepUnmapped', index) as boolean;
		
		const result: any = keepUnmapped ? { ...item.json } : {};
		
		for (const mapping of mappings) {
			const sourceValue = DataTransform.getFieldValue(item.json, mapping.sourceField);
			const value = sourceValue !== undefined ? sourceValue : mapping.defaultValue;
			
			if (mapping.targetField) {
				result[mapping.targetField] = value;
			}
		}
		
		return result;
	}

	private async filterData(context: IExecuteFunctions, item: INodeExecutionData, index: number): Promise<any> {
		const rules = context.getNodeParameter('filterRules.rule', index, []) as Array<{
			field: string;
			operator: string;
			value: string;
		}>;
		const combineRules = context.getNodeParameter('combineRules', index) as string;
		
		if (rules.length === 0) {
			return item.json;
		}
		
		const results = rules.map(rule => {
			const fieldValue = DataTransform.getFieldValue(item.json, rule.field);
			return DataTransform.evaluateCondition(fieldValue, rule.operator, rule.value);
		});
		
		const passes = combineRules === 'and' 
			? results.every(r => r) 
			: results.some(r => r);
		
		return passes ? item.json : null;
	}

	private static evaluateCondition(fieldValue: any, operator: string, compareValue: string): boolean {
		switch (operator) {
			case 'equals':
				return String(fieldValue) === compareValue;
			case 'notEquals':
				return String(fieldValue) !== compareValue;
			case 'contains':
				return String(fieldValue).includes(compareValue);
			case 'notContains':
				return !String(fieldValue).includes(compareValue);
			case 'greaterThan':
				return Number(fieldValue) > Number(compareValue);
			case 'lessThan':
				return Number(fieldValue) < Number(compareValue);
			case 'isEmpty':
				return fieldValue === null || fieldValue === undefined || fieldValue === '';
			case 'isNotEmpty':
				return fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
			default:
				return false;
		}
	}

	private async flattenObject(context: IExecuteFunctions, item: INodeExecutionData, index: number): Promise<any> {
		const separator = context.getNodeParameter('separator', index) as string;
		
		const flatten = (obj: any, prefix = ''): any => {
			const result: any = {};
			
			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					const newKey = prefix ? `${prefix}${separator}${key}` : key;
					
					if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
						Object.assign(result, flatten(obj[key], newKey));
					} else {
						result[newKey] = obj[key];
					}
				}
			}
			
			return result;
		};
		
		return flatten(item.json);
	}

	private async unflattenObject(context: IExecuteFunctions, item: INodeExecutionData, index: number): Promise<any> {
		const separator = context.getNodeParameter('separator', index) as string;
		
		const result: any = {};
		
		for (const key in item.json) {
			if (item.json.hasOwnProperty(key)) {
				const keys = key.split(separator);
				let current = result;
				
				for (let i = 0; i < keys.length - 1; i++) {
					if (!(keys[i] in current)) {
						current[keys[i]] = {};
					}
					current = current[keys[i]];
				}
				
				current[keys[keys.length - 1]] = item.json[key];
			}
		}
		
		return result;
	}

	private static getFieldValue(obj: any, path: string): any {
		const keys = path.split('.');
		let current = obj;
		
		for (const key of keys) {
			if (current === null || current === undefined) {
				return undefined;
			}
			current = current[key];
		}
		
		return current;
	}
}