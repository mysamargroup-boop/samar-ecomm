
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Samar Store',
  description: 'Find answers to frequently asked questions about shopping with Samar Store.',
};

export default function FaqPage() {
  const faqItems = [
    {
      question: 'What are your shipping options?',
      answer: 'We offer several shipping options, including Standard (5-7 business days), Expedited (2-3 business days), and Overnight (1 business day). Shipping costs are calculated at checkout. For more details, please visit our Shipping Information page.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order has shipped, you will receive an email with a tracking number and a link to the carrier\'s website. You can use this information to track the status of your delivery.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns on most items within 30 days of delivery. The item must be unused and in its original packaging. Some exclusions apply. Please see our Return Policy page for full details.',
    },
    {
      question: 'How do I make a change to my order?',
      answer: 'Unfortunately, we cannot make changes to an order once it has been placed. However, you may be able to cancel your order and place a new one. Please contact our customer service team for assistance.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within the United States. We are working on expanding our shipping options to include international destinations in the near future.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Find answers to common questions below.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
