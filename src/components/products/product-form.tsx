
'use client';

import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product, Category, ProductSchema } from '@/lib/types';
import { createProduct, updateProduct } from '@/app/actions/productActions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, X, ImagePlus, Trash2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { generateDescriptionAction } from '@/app/actions/aiActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const formSchema = ProductSchema.omit({ id: true });

type ProductFormProps = {
  product?: Product;
  categories: Category[];
};

export function ProductForm({ product, categories }: ProductFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      slug: product?.slug || '',
      salePrice: product?.salePrice || undefined,
      categoryId: product?.categoryId || '',
      inventory: product?.inventory || 0,
      tags: product?.tags || [],
      images: product?.images || [],
    },
  });
  
  const { isSubmitting } = useFormState({ control: form.control });
  const tags = form.watch('tags', product?.tags || []);
  const images = form.watch('images', product?.images || []);

  const [tagInput, setTagInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tagInput) {
      event.preventDefault();
      const newTags = [...tags, tagInput.trim()];
      if (!tags.includes(tagInput.trim())) {
        form.setValue('tags', newTags);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue('tags', tags.filter(tag => tag !== tagToRemove));
  };

  const addImage = () => {
    if (imageInput && !images.includes(imageInput)) {
        try {
            z.string().url().parse(imageInput);
            form.setValue('images', [...images, imageInput]);
            setImageInput('');
        } catch (error) {
            toast({
                title: 'Invalid URL',
                description: 'Please enter a valid image URL.',
                variant: 'destructive',
            });
        }
    }
  };

  const removeImage = (imageToRemove: string) => {
    form.setValue('images', images.filter(img => img !== imageToRemove));
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'tags' && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'images' && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      }
      else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    startTransition(async () => {
        const result = product
          ? await updateProduct(product.id, formData)
          : await createProduct(formData);

        if (result.message) {
          toast({
            title: product ? 'Product Updated' : 'Product Created',
            description: result.message,
          });
          router.push('/admin/products');
        } else {
           toast({
            title: 'Error',
            description: 'Something went wrong.',
            variant: 'destructive',
          });
        }
    });
  }

  async function handleGenerateDescription() {
    const productName = form.getValues('name');
    if (!productName) {
      toast({
        title: 'Product Name Required',
        description: 'Please enter a product name before generating a description.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateDescriptionAction({ productName, keywords: productName });
      if (result.success && result.description) {
        form.setValue('description', result.description);
        toast({
          title: 'Description Generated',
          description: 'The AI-powered description has been added.',
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'Could not generate a description at this time.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Core Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Wireless Headphones" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. wireless-headphones" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Description</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateDescription}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                          )}
                          Generate with AI
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your product..."
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Images</CardTitle>
                    <CardDescription>Add and manage product images.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input 
                            value={imageInput} 
                            onChange={e => setImageInput(e.target.value)} 
                            placeholder="https://.../image.png" 
                        />
                        <Button type="button" onClick={addImage} variant="outline" size="icon">
                            <ImagePlus className="h-4 w-4"/>
                        </Button>
                    </div>
                     <FormField
                        control={form.control}
                        name="images"
                        render={() => (
                           <FormItem>
                             {images.length > 0 && (
                                <div className="space-y-2">
                                  {images.map((image, index) => (
                                    <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                                        <img src={image} alt={`Product image ${index + 1}`} className="w-12 h-12 object-cover rounded-md" />
                                        <p className="flex-1 text-sm truncate text-muted-foreground">{image}</p>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeImage(image)}>
                                            <Trash2 className="h-4 w-4 text-destructive"/>
                                        </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <FormMessage />
                           </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g. 999.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value))}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Price</FormLabel>
                       <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g. 799.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || undefined)}/>
                      </FormControl>
                      <FormDescription>Leave blank if not on sale.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <div>
                          <Input 
                            placeholder="e.g. audio, tech" 
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                          />
                           <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map(tag => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                                <button type="button" className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5" onClick={() => removeTag(tag)}>
                                  <X className="h-3 w-3"/>
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>Press Enter to add a tag.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="inventory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

          </div>
        </div>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting || isPending}>
              {(isSubmitting || isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {product ? 'Update Product' : 'Create Product'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
