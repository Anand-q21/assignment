// apps/frontend/src/app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

interface Product {
  id: number;
  productCode: string;
  productName: string;
  productDescription: string;
  productRate: number;
}

const initialFormState = {
  productCode: '',
  productName: '',
  productDescription: '',
  productRate: 0,
  productImage: '',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formState, setFormState] = useState(initialFormState);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await apiFetch<Product[]>('/products');
      setProducts(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch products. You might need to log in.');
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: name === 'productRate' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiFetch('/products', {
        method: 'POST',
        body: JSON.stringify(formState),
      });
      setFormState(initialFormState);
      fetchProducts(); // Refresh list
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Failed to create product.');
        }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create a New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="productCode" value={formState.productCode} onChange={handleInputChange} placeholder="Product Code" className="w-full p-2 border rounded"/>
          <input name="productName" value={formState.productName} onChange={handleInputChange} placeholder="Product Name" className="w-full p-2 border rounded"/>
          <input name="productDescription" value={formState.productDescription} onChange={handleInputChange} placeholder="Description" className="w-full p-2 border rounded"/>
          <input name="productRate" type="number" value={formState.productRate} onChange={handleInputChange} placeholder="Rate" className="w-full p-2 border rounded"/>
          <input name="productImage" value={formState.productImage} onChange={handleInputChange} placeholder="Image URL (optional)" className="w-full p-2 border rounded"/>
          {/* 👇 FIX: Display the error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600">Create Product</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Available Products</h2>
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="border-b pb-2">
              <h3 className="font-semibold">{product.productName} ({product.productCode})</h3>
              <p className="text-gray-600">{product.productDescription}</p>
              <p className="text-gray-800 font-bold">${product.productRate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}