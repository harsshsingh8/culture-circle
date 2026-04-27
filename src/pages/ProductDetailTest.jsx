import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';

export default function ProductDetailTest() {
  const { id } = useParams();
  const product = getProductById(id);

  return (
    <div style={{ padding: '40px', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Product Detail Page</h1>
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>Product ID from URL: <strong>{id}</strong></p>
      
      {product ? (
        <div>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>Product Found: <strong>{product.name}</strong></p>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>Price: <strong>${product.price}</strong></p>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '400px', borderRadius: '12px', marginTop: '20px' }}
          />
        </div>
      ) : (
        <p style={{ fontSize: '18px', color: 'red' }}>Product NOT found!</p>
      )}

      <Link to="/" style={{ marginTop: '30px', display: 'inline-block', color: 'blue' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
