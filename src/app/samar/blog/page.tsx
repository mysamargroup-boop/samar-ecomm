
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { blogPosts } from '@/lib/placeholder-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BlogPostsTable } from '@/components/blog/blog-posts-table';

export default function BlogSamarPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline text-center md:text-left">Blog Posts</h1>
        <Link href="/samar/blog/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>
            Create, edit, and manage all of your store's blog posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BlogPostsTable posts={blogPosts} />
        </CardContent>
      </Card>
    </div>
  );
}
