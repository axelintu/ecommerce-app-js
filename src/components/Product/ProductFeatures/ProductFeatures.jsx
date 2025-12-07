import React from 'react';
import './ProductFeatures.css';
import { getDataType } from '../shared/product';

function ProductFeatures({
  features = { type: '', data: [] },
  productClass = 'default'
}) {
  if (!features) return null;
  const { type, data } = features;
  const ChildElement = type || 'div';
  const ParentWrapper = ChildElement === 'li' ? 'ul' : React.Fragment;

  const typeOfData = getDataType(data);
  if (typeOfData === 'noPrint') return; 

  const renderData = (typeOfData) => {
    
    switch (typeOfData) {
      case 'stringOrNumber':
        return <ChildElement className={`white-space ${type}`}> {data} </ChildElement>;
      case 'object':
        const featureList = Object.entries(data);
        return featureList.map(([key,value])=> {
          return (<ChildElement key={key} className={`white-space ${type}`}><strong>{key}:</strong> {value} </ChildElement>)
        });
      case 'array':
        return data.map((feature, i)=> {
          return (<ChildElement key={i} className={`white-space ${type}`}>{feature}</ChildElement>)
        })
      default:
        break;
    }
  }

  return (
    <div className={`product-${productClass}`}>
      <ParentWrapper>
      { renderData(typeOfData) }
      </ParentWrapper>
    </div>
  );
}

export default ProductFeatures;
