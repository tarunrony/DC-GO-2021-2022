import { NextRequest, NextResponse } from 'next/server'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

let products = [
  { id: 1, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/300x200?text=Laptop' },
  { id: 2, name: 'Mouse', price: 29.99, image: 'https://via.placeholder.com/300x200?text=Mouse' },
  { id: 3, name: 'Keyboard', price: 79.99, image: 'https://via.placeholder.com/300x200?text=Keyboard' },
]

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  const form = formidable({
    uploadDir: path.join(process.cwd(), 'public/images'),
    keepExtensions: true,
  })

  return new Promise((resolve) => {
    form.parse(request as any, (err, fields, files) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }))
        return
      }

      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name
      const price = Array.isArray(fields.price) ? fields.price[0] : fields.price

      let image = 'https://via.placeholder.com/300x200?text=No+Image'
      if (files.image && !Array.isArray(files.image)) {
        image = `/images/${path.basename(files.image.filepath)}`
      }

      const newProduct = {
        id: products.length + 1,
        name: name as string,
        price: parseFloat(price as string),
        image,
      }
      products.push(newProduct)
      resolve(NextResponse.json(newProduct, { status: 201 }))
    })
  })
}