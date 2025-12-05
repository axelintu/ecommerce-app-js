import React from 'react';
import './ProductFeatures.css';

function ProductFeatures({
  features = { type: '', data: []}
}) {
  const { type, data } = features;
  const ChildElement = type || 'div';
  const ParentWrapper = ChildElement === 'li' ? 'ul' : React.Fragment;
  const getType = (data) => {
    // typeOfData
    return Array.isArray(data) 
    ? 'array' 
    : typeof data === "object" && typeof data === null
      ? 'object'
      : 'default';
  }

  function getTypeOfFeatures(variable) {
    const type = typeof variable;
    if (type === 'string' || type === 'number') {
      return 'stringOrNumber';
    } else if (type === 'boolean' || type === 'bigint' || type === 'symbol' || type === 'undefined' || type === 'function' || variable === null) {
      return `'noPrint'`;
    }
    if (Array.isArray(variable)) {
      return 'array';
    }
    if (type === 'object') {
      return 'object';
    }
  }

  if (getTypeOfFeatures(data) === 'noPrint') {
    return;
  } else {
    
  }

  console.log(getType({}))
  
  const featureList = Object.entries(data);

  return (
    <div className="product-features">
      <ParentWrapper>
      {featureList.map(([key,value])=>{
        return (
          <ChildElement key={key} className={type} style={{whiteSpace: "pre-wrap"}}>
          <strong>{key}:</strong> {value}
          </ChildElement>
        )
      })}
      </ParentWrapper>
    </div>
  );
}

export default ProductFeatures;
