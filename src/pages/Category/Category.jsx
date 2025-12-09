import { useParams } from 'react-router-dom';
import CategoryProducts from '../../components/Categories/CategoryProducts';
import './Category.css';

function Category() {
  const { categoryId } = useParams();
  return <div className='category-container'><CategoryProducts categoryId={categoryId} /></div>
}

export default Category;
