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