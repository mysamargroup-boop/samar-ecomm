import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TriangleAlert } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <TriangleAlert className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-2">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Sorry, we couldn't find the page you were looking for.
        </p>
        <Button size="lg" asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}
