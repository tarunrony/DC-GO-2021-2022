'use client'

import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { cart } = useCart()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">E-Commerce</Link>
        <div className="space-x-4 flex items-center">
          <Link href="/products">Products</Link>
          <Link href="/cart" className="relative">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/admin">Admin</Link>
        </div>
      </nav>
    </header>
  )
}