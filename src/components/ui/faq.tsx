import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { AccordionHeader } from "@radix-ui/react-accordion"
  
export default function FAQ() {
  return (
    <section className=" text-gray-200 w-full">
   
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger >What is GuruNimbus?</AccordionTrigger>
        <AccordionContent>
        GuruNimbus is a web app that uses Next.js, OpenAI, and Pinecone to deliver personalized professor and mentor insights. It goes beyond conventional rating systems by leveraging AI to offer detailed evaluations, helping students make informed decisions about their courses and instructors.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger >Can I submit my own review on GuruNimbus?</AccordionTrigger>
        <AccordionContent>
        GuruNimbus does not accept user-submitted reviews. Instead, the platform uses RAG to provide feedback based on a curated list of reviews already in our pincone database.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger >How do you ensure the authenticity of reviews?</AccordionTrigger>
        <AccordionContent>
        We use a combination of automated and manual moderation processes to review and verify submissions. This helps ensure that the feedback we publish is authentic and valuable.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How can I contact if I have an issue?</AccordionTrigger>
        <AccordionContent>
        If you have any issues or questions, please use the Contact Us section on the site. Fill out the contact form, and our support team will get back to you as soon as possible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How can I contribute to GuruNimbus?</AccordionTrigger>
        <AccordionContent>
        Well, thanks for taking time to contribute to GuruNimbus, You can check our GitHub repository to read the guidlines to contribute.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
  )
}