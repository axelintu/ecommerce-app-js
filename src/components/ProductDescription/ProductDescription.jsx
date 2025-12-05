import React from 'react';
import './ProductDescription.css';

function ProductDescription({
    desc = { type: '', data: []}
  }) {
  const { type, data } = desc;
  const ChildElement = type || 'div';
  const ParentWrapper = ChildElement === 'li' ? 'ul' : React.Fragment;

  return (
    <div className="product-description">
      <ParentWrapper>
      { Array.isArray(data) 
        ? data.map((el,i)=> <ChildElement key={i} className={type}>{el}</ChildElement>)
        : typeof data === "string" || "number"
          ? data
          : typeof data === "object" && data !== null
            ? Object.entries(data).map((el,i)=> <ChildElement key={i} className={type}>{el}</ChildElement>)
            : data
      }
      </ParentWrapper>
    </div>
  );
}

export default ProductDescription;
