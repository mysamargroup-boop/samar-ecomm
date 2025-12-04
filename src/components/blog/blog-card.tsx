

'use client';

import type { BlogPost } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react';

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden group">
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
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-2">
          {post.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
        <h3 className="text-lg font-bold mb-3 leading-tight min-h-[3.75rem]">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground mb-4 h-16 overflow-hidden">
          {post.excerpt}
        </p>
        <Link href={`/blog/${post.slug}`}>
          <Button variant="outline" className="rounded-full">
            Read More
            <ArrowRight className="ml-2 h-4 w-4 inline" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
