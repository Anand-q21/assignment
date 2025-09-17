// apps/frontend/src/app/orders/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { apiFetch } from '../../lib/api';

interface Product {
  id: number;
  productName: string;
  productRate: number;
}

interface Order {
  id: number;
  customerDetails: { name: string; phone: string };
  products: { productId: number; quantity: number; unitPrice: number }[];
  totalAmount: number;
}

interface OrderLineItem {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export default function OrdersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customer, setCustomer] = useState({ name: '', phone: '' });
  const [items, setItems] = useState<OrderLineItem[]>([{ productId: 0, quantity: 1, unitPrice: 0 }]);
  const [error, setError] = useState('');

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }, [items]);

  const fetchData = async () => {
    try {
      const [productsData, ordersData] = await Promise.all([
        apiFetch<Product[]>('/products'),
        apiFetch<Order[]>('/orders'),
      ]);
      setProducts(productsData);
      setOrders(ordersData);
    } catch (err) { // 👇 FIX: Safely handle the error type
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch data. Please log in.');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemChange = (index: number, field: keyof OrderLineItem, value: string | number) => {
    const newItems = [...items];
    const item = { ...newItems[index], [field]: value };

    if (field === 'productId') {
        const product = products.find(p => p.id === Number(value));
        item.unitPrice = product ? product.productRate : 0;
    }

    newItems[index] = item;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { productId: 0, quantity: 1, unitPrice: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify({ customerDetails: customer, products: items, totalAmount }),
      });
      // Reset form
      setCustomer({ name: '', phone: '' });
      setItems([{ productId: 0, quantity: 1, unitPrice: 0 }]);
      fetchData(); // Refresh list
    } catch (err) { // 👇 FIX: Safely handle the error type
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create order.');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create a New Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} placeholder="Customer Name" className="w-full p-2 border rounded"/>
            <input value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} placeholder="Customer Phone" className="w-full p-2 border rounded"/>

            <h3 className="font-semibold mt-4">Products</h3>
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <select value={item.productId} onChange={(e) => handleItemChange(index, 'productId', e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Select a product</option>
                        {products.map(p => <option key={p.id} value={p.id}>{p.productName}</option>)}
                    </select>
                    <input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))} className="w-20 p-2 border rounded" min="1"/>
                    <button type="button" onClick={() => removeItem(index)} className="px-2 py-1 bg-red-500 text-white rounded">&times;</button>
                </div>
            ))}
            <button type="button" onClick={addItem} className="text-blue-500 hover:underline">+ Add Product</button>

            <div className="text-right font-bold text-lg">Total: ${totalAmount.toFixed(2)}</div>
            {/* 👇 FIX: Display the error message */}
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600">Create Order</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border-b pb-2">
              <h3 className="font-semibold">Order #{order.id} for {order.customerDetails.name}</h3>
              <ul className="list-disc list-inside text-gray-600">
                {order.products.map((p, i) => <li key={i}>{products.find(prod => prod.id === p.productId)?.productName || `Product ID ${p.productId}`} - Qty: {p.quantity}</li>)}
              </ul>
              <p className="text-gray-800 font-bold mt-2">Total: ${order.totalAmount}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}