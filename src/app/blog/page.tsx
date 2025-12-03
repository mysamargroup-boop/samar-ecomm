import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Samar Store',
  description: 'Latest news, articles, and insights from Samar Store.',
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
          The Samar Store Blog
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground">
          Your source for the latest trends, tips, and stories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="blog post image"
                />
              </div>
            </Link>
            <CardHeader>
              <div className="text-sm text-muted-foreground mb-2">{post.date.toLocaleDateString()}</div>
              <CardTitle className="text-xl">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
               <div className="text-sm text-muted-foreground">By {post.author}</div>
               <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary hover:underline">
                  Read More
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
