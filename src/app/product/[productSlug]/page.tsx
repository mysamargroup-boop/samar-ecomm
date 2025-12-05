
import { ProductPageClient } from '@/components/products/product-page-client';
import { products } from '@/lib/placeholder-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { Product } from '@/lib/types';


type Props = {
  params: { productSlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { firestore } = initializeFirebase();
  const q = query(collection(firestore, 'products'), where('slug', '==', params.productSlug));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
     return {
      title: 'Product Not Found',
    };
  }
  const product = snapshot.docs[0].data() as Product;

  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { productSlug: string } }) {  
  return <ProductPageClient productSlug={params.productSlug} />;
}

export async function generateStaticParams() {
  const { firestore } = initializeFirebase();
  const productsCollection = collection(firestore, 'products');
  const snapshot = await getDocs(productsCollection);
  
  return snapshot.docs.map(doc => ({
    productSlug: doc.data().slug,
  }));
}

    