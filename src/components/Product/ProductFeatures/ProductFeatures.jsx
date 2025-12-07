import React from 'react';
import './ProductFeatures.css';
import { getDataType } from '../shared/product';

function ProductFeatures({
  features = { type: '', data: [] },
  productClass = 'default'
}) {
  const { type, data } = features;
  const ChildElement = type || 'div';
  const ParentWrapper = ChildElement === 'li' ? 'ul' : React.Fragment;
  const whiteSpace = {whiteSpace: "pre-wrap"};

  const typeOfData = getDataType(data);
  
  if (typeOfData === 'noPrint') return; 

  const renderData = (typeOfData) => {
    
    switch (typeOfData) {
      case 'stringOrNumber':
        return <ChildElement className={`whiteSpace ${type}`}> {data} </ChildElement>;
      case 'object':
        const featureList = Object.entries(data);
        return featureList.map(([key,value])=> {
          return (<ChildElement key={key} className={`whiteSpace ${type}`}><strong>{key}:</strong> {value} </ChildElement>)
        });
        break;
      case 'array':
        return data.map((feature, i)=> {
          return (<ChildElement key={i} className={`whiteSpace ${type}`}>{feature}</ChildElement>)
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
