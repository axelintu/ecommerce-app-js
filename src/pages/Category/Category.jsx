import './Category.css';
import { useParams } from 'react-router-dom';
import CategoryProducts from '../../components/Categories/CategoryProducts/CategoryProducts';

function Category() {
  const { categoryId } = useParams();
  return <CategoryProducts categoryId={categoryId} />
}

export default Category;
