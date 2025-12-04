

'use client';

import { useForm, useFieldArray, useFormState } from 'react-hook-form';
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
import { Sparkles, Loader2, X, ImagePlus, Trash2, CalendarIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { generateDescriptionAction, generateNameAction } from '@/app/actions/aiActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';


const formSchema = ProductSchema.omit({ id: true });

type ProductFormProps = {
  product?: Product;
  categories: Category[];
};

export function ProductForm({ product, categories }: ProductFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingName, setIsGeneratingName] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      shortDescription: product?.shortDescription || '',
      price: product?.price || 0,
      slug: product?.slug || '',
      salePrice: product?.salePrice || undefined,
      salePriceStartDate: product?.salePriceStartDate ? new Date(product.salePriceStartDate) : undefined,
      salePriceEndDate: product?.salePriceEndDate ? new Date(product.salePriceEndDate) : undefined,
      categoryId: product?.categoryId || '',
      inventory: product?.inventory || 0,
      sku: product?.sku || '',
      tags: product?.tags || [],
      images: product?.images || [],
      variants: product?.variants || [],
      weight: product?.weight || undefined,
      dimensions: product?.dimensions || { length: undefined, width: undefined, height: undefined },
      material: product?.material || '',
    },
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: "variants",
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
      if ((key === 'tags' || key === 'images' || key === 'variants' || key === 'dimensions') && (typeof value === 'object' && value !== null)) {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
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
          router.push('/samar/products');
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

    setIsGeneratingDesc(true);
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
      setIsGeneratingDesc(false);
    }
  }

    async function handleGenerateName() {
    const currentTags = form.getValues('tags')?.join(', ');
    if (!currentTags) {
      toast({
        title: 'Tags Required',
        description: 'Please add some tags before generating a name.',
        variant: 'destructive',
      });
      return;
    }

    setIsGeneratingName(true);
    try {
      const result = await generateNameAction({ keywords: currentTags });
      if (result.success && result.productName) {
        form.setValue('name', result.productName);
        toast({
          title: 'Name Generated',
          description: 'The AI-powered product name has been added.',
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'Could not generate a product name at this time.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingName(false);
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
                      <div className="flex items-center justify-between">
                         <FormLabel>Product Name</FormLabel>
                         <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateName}
                          disabled={isGeneratingName}
                        >
                          {isGeneratingName ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                          )}
                          Generate with AI
                        </Button>
                      </div>
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
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief summary for product cards..."
                          {...field}
                        />
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
                        <FormLabel>Full Description</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateDescription}
                          disabled={isGeneratingDesc}
                        >
                          {isGeneratingDesc ? (
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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField
                      control={form.control}
                      name="salePriceStartDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Sale Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date("1900-01-01")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="salePriceEndDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Sale End Date</FormLabel>
                           <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < (form.getValues('salePriceStartDate') || new Date("1900-01-01"))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>
                 <FormDescription>Schedule a start and end date for your sale price.</FormDescription>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Variants</CardTitle>
                    <CardDescription>Add product variants like size or color.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {variantFields.map((field, index) => (
                        <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md">
                            <FormField
                                control={form.control}
                                name={`variants.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Size" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`variants.${index}.value`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Value</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Large" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`variants.${index}.stock`}
                                render={({ field }) => (
                                    <FormItem className="w-24">
                                        <FormLabel>Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="10" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                             <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(index)}>
                                <Trash2 className="h-4 w-4 text-destructive"/>
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendVariant({ id: `var_${Date.now()}`, name: '', value: '', stock: 0 })}>
                        Add Variant
                    </Button>
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
                       <div className="space-y-2">
                        {categories.filter(c => !c.parentId).map(category => (
                            <div key={category.id} className="flex items-start">
                                <div className="flex items-center h-5">
                                    <Checkbox 
                                        id={`cat-${category.id}`} 
                                        // A real multi-select would store an array of IDs.
                                        // For this demo, we'll keep it as a single select.
                                        checked={field.value === category.id}
                                        onCheckedChange={(checked) => {
                                            return checked ? field.onChange(category.id) : field.onChange('');
                                        }}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor={`cat-${category.id}`} className="font-medium text-foreground">{category.name}</label>
                                    {categories.filter(c => c.parentId === category.id).map(subCategory => (
                                        <div key={subCategory.id} className="flex items-center mt-2 ml-4">
                                            <Checkbox 
                                                id={`cat-${subCategory.id}`} 
                                                checked={field.value === subCategory.id}
                                                onCheckedChange={(checked) => {
                                                    return checked ? field.onChange(subCategory.id) : field.onChange('');
                                                }}
                                            />
                                            <label htmlFor={`cat-${subCategory.id}`} className="ml-2 font-normal text-muted-foreground">{subCategory.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                       </div>
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
                <CardTitle>Inventory & Shipping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. HDPHN-WRLS-BLK" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (grams)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="250" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="space-y-2">
                    <FormLabel>Dimensions (cm)</FormLabel>
                    <div className="grid grid-cols-3 gap-2">
                        <FormField
                            control={form.control}
                            name="dimensions.length"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" placeholder="L" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dimensions.width"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" placeholder="W" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dimensions.height"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" placeholder="H" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormMessage>{form.formState.errors.dimensions?.root?.message}</FormMessage>
                 </div>
                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Aluminum, Cotton" {...field} />
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
