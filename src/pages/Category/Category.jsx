import React from 'react';
import './Category.css';
import { useParams } from 'react-router-dom';

function Category({}) {
  const { categoryId } = useParams();
    
  return (
    <div className="category">
      <h1>Category</h1>
    </div>
  );
}

export default Category;
