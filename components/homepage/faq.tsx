"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-12">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>Will this help me bypass AI detectors like Turnitin or GPTZero?</AccordionTrigger>
            <AccordionContent>
            Yes. Writoma is built to help you bypass AI detection tools by rewriting content to sound natural and human. Many users have successfully passed checks from tools like Turnitin, GPTZero, and others using our platform.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do you store my content?</AccordionTrigger>
            <AccordionContent>
             
We take privacy seriously. Your text is processed securely, and we never use your content for training or resale purposes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is there a free trial?</AccordionTrigger>
            <AccordionContent>
              No free trial.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
            Do I need to create an account to use the tool?
            </AccordionTrigger>
            <AccordionContent>
             
Yes, you’ll need to create an account to access the full features of Writoma — including unlimited AI text humanization and advanced rewrite options.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-5">
            <AccordionTrigger>
            What if the rewrite still sounds robotic?
            </AccordionTrigger>
            <AccordionContent>
            You can edit the original input slightly and run it again for a more natural result. Our system is optimized to produce human-sounding text that helps you bypass AI detectors while maintaining the meaning and flow of your content.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

export default FAQ

