export function getDataType (data) {
  const type = typeof data;
  if (type === 'string' || type === 'number') {
    return 'stringOrNumber';
  } else if (type === 'boolean' || type === 'bigint' || type === 'symbol' || type === 'undefined' || type === 'function' || data === null) {
    return 'noPrint';
  }
  if (Array.isArray(data)) {
    if (data.length !== 0) {
      return 'array';
    } else {
      return 'noPrint'
    }
  }
  if (type === 'object') {
    return 'object';
  }
}

export function returnDataAsString (data) {
  const typeOfData = getDataType(data);
  
  switch (typeOfData) {
    case 'stringOrNumber':
      return String(data);
    case 'array':
      return data.map(item => returnDataAsString(item)).join(', ');
    case 'object':
      return JSON.stringify(data, null, 2);
    case 'noPrint':
    default:
      return '';
  }
}