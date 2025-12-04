
'use client';

import type { BlogPost } from '@/lib/types';
import { BlogCard } from '@/components/blog/blog-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type BlogSectionProps = {
  posts: BlogPost[];
};

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
            From The Blog
          </h2>
          <Link href="/blog">
            <Button variant="ghost">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
        </div>
      </div>
    </section>
  );
}
