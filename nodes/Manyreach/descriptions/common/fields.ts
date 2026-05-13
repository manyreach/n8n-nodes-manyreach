import { INodeProperties } from 'n8n-workflow';

/**
 * Universal Field Builder
 */
type BaseFieldOptions = {
  displayName: string;
  name: string;
  description?: string;
  resource?: string;
  required?: boolean;
  operations?: string[];
  placeholder?: string;
  typeOptions?: INodeProperties['typeOptions'];
  modes?: INodeProperties['modes'];
  // Common to some, but optional
  optionsList?: { name: string; value: string | number; description?: string }[];
  options?: INodeProperties['options'];
  noDataExpression?: boolean;
};

type StringFieldOptions = BaseFieldOptions & {
  type: 'string';
  default?: string;
};

type NumberFieldOptions = BaseFieldOptions & {
  type: 'number';
  default?: number;
};

type BooleanFieldOptions = BaseFieldOptions & {
  type: 'boolean';
  default?: boolean;
};

type JsonFieldOptions = BaseFieldOptions & {
  type: 'json';
  default?: Record<string, unknown>;
};

type ResourceLocatorFieldOptions = BaseFieldOptions & {
  type: 'resourceLocator';
  default?: { mode: string; value: string };
};

type OptionsFieldOptions = BaseFieldOptions & {
  type: 'options';
  default?: string | number; // Options can be string or number
};

type MultiOptionsFieldOptions = BaseFieldOptions & {
  type: 'multiOptions';
  default?: string[] | number[];
};

type DateTimeFieldOptions = BaseFieldOptions & {
  type: 'dateTime';
  default?: string;
};

type CollectionFieldOptions = BaseFieldOptions & {
  type: 'collection';
  default?: Record<string, unknown>; // Collections defaults are usually objects
};

type FixedCollectionFieldOptions = BaseFieldOptions & {
  type: 'fixedCollection';
  default?: Record<string, unknown>;
};


export type FieldOptions =
  | StringFieldOptions
  | NumberFieldOptions
  | BooleanFieldOptions
  | JsonFieldOptions
  | ResourceLocatorFieldOptions
  | OptionsFieldOptions
  | MultiOptionsFieldOptions
  | DateTimeFieldOptions
  | CollectionFieldOptions
  | FixedCollectionFieldOptions;


export function createField(options: FieldOptions): INodeProperties {
  const field: INodeProperties = {
    displayName: options.displayName,
    name: options.name,
    type: options.type as INodeProperties['type'], // Cast required as Union vs string literal
    default: (options.default ?? getDefaultForType(options.type)) as INodeProperties['default'],
    required: options.required ?? false,
    noDataExpression: options.noDataExpression ?? false,
  };

  if (options.description) {
    field.description = options.description;
  }

  // If field uses dropdown options
  if (options.type === 'options' && options.optionsList) {
    field.options = options.optionsList;
  }

  if (options.placeholder) field.placeholder = options.placeholder;
  if (options.typeOptions) field.typeOptions = options.typeOptions;
  if (options.modes) {
     // modes is valid on INodeProperties, primarily used for resourceLocator but technically allowed elsewhere
    field.modes = options.modes;
  }
  if (options.required) {
    field.required = options.required;
  }
  if (options.options) {
    field.options = options.options;
  }
  // Add dynamic displayOptions
  if (options.resource && options.operations) {
    field.displayOptions = {
      show: {
        resource: [options.resource],
        operation: options.operations,
      },
    };
  } else if (options.resource) {
    field.displayOptions = {
      show: { resource: [options.resource] },
    };
  }

  return field;
}

/**
 * Default value by field type
 */
function getDefaultForType(type: string) {
  switch (type) {
    case 'string': return '';
    case 'number': return 0;
    case 'boolean': return false;
    case 'json': return {};
    case 'resourceLocator': return { mode: 'list', value: '' };
    default: return '';
  }
}
