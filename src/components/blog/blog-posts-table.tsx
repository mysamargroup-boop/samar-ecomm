
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/types';
import { MoreHorizontal, Pen, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

export function BlogPostsTable({ posts }: { posts: BlogPost[] }) {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      // In a real app, you'd call a server action here.
      console.log(`Deleting post ${id}`);
      toast({
        title: 'Post Deleted',
        description: 'The blog post has been successfully deleted.',
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt={post.title}
                className="aspect-square rounded-md object-cover"
                height="64"
                src={post.image || '/placeholder.svg'}
                width="64"
                data-ai-hint="blog post image"
              />
            </TableCell>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell>{post.author}</TableCell>
            <TableCell className="hidden md:table-cell">{post.date.toLocaleDateString()}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/blog/${post.slug}/edit`}>
                      <Pen className="mr-2 h-4 w-4" /> Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
