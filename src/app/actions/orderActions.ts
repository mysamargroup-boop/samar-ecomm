'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { OrderSchema } from '@/lib/types';

export async function updateOrderStatus(orderId: string, status: z.infer<typeof OrderSchema.shape.status>) {
  const validatedStatus = OrderSchema.shape.status.safeParse(status);

  if (!validatedStatus.success) {
    return { error: 'Invalid status value.' };
  }

  console.log(`Updating order ${orderId} to status: ${validatedStatus.data}`);
  // In a real app, you would update the order in your database.

  revalidatePath('/samar/orders');
  return { message: `Order ${orderId} status updated to ${validatedStatus.data}.` };
}
