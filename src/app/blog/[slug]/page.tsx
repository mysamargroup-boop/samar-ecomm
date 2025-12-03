import { blogPosts } from '@/lib/placeholder-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: `${post.title} | Samar Store Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article>
        <header className="mb-8">
          <div className="text-sm text-muted-foreground mb-2">
            <span>By {post.author}</span> &middot; <span>{post.date.toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
        </header>

        {post.image && (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8 border">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              data-ai-hint="blog post image"
            />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none text-lg">
          <p>
            {post.content}
          </p>
           <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. 
          </p>
           <p>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. 
          </p>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
    return blogPosts.map(post => ({
        slug: post.slug,
    }));
}
