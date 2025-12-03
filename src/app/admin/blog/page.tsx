
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

export default function BlogAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Blog Posts</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Post
          </Link>
        </Button>
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
