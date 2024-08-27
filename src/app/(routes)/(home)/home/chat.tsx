"use client";

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  avatar?: string;
}

export function Chat() {
  const placeholders = [
    "Who is the best professor for introductory biology?",
    "Can you recommend a history professor who gives engaging lectures?",
    "I'm looking for a challenging physics course. Any suggestions?",
    "Which literature professor is known for analyzing modern works?",
    "Is there a psychology professor who focuses on cognitive research?",
    "Who teaches the most practical computer science courses?",
    "I need an economics professor who relates concepts to real-world scenarios.",
    "Are there any environmental science professors with field work opportunities?",
    "Which organic chemistry professor is best for pre-med students?",
    "Who offers the most balanced view in political science classes?",
    "Is there a calculus professor who explains concepts slowly and thoroughly?",
    "Which art history professor covers the widest range of periods?",
    "I'm struggling with biochemistry. Who's the most helpful professor?",
    "Which sociology professor discusses current social issues?",
    "Who makes statistics interesting and applicable to daily life?",
    "Is there a marketing professor with real industry experience?",
    "Which astronomy professor incorporates the latest space discoveries in their lectures?",
    "Who's the most thought-provoking philosophy professor?",
    "I'm interested in neuroscience research. Which professor should I approach?",
    "Who's the best professor for understanding global politics and diplomacy?",
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      role: "assistant",
      content: "Hello! Welcome to Guru Nimbus",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    // Add the user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now().toString(), role: "user", content: message },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let botResponse = ""; // to accumulate the bot's response

      const processText = async ({ done, value }: { done: boolean; value?: Uint8Array }) => {
        if (done) {
          // Finally, add the bot's complete response
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now().toString(), role: "assistant", content: botResponse },
          ]);
          return;
        }
        const text = decoder.decode(value, { stream: true });
        botResponse += text; // accumulate response
        reader?.read().then(processText);
      };

      reader?.read().then(processText);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputElement = e.target as HTMLFormElement;
    const inputValue = inputElement.querySelector<HTMLInputElement>("input")?.value || "";
    sendMessage(inputValue);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-black">
      <section className="text-zinc-700">
        <div className="flex h-screen justify-center items-center">
          <div className="mx-auto mt-3 w-full max-w-xl">
            <ScrollArea className="mb-2 h-[500px] rounded-3xl border p-10" ref={ref}>
              {messages.map((m) => (
                <div key={m.id} className={`mb-6 flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <Avatar className="p-1">
                    <AvatarImage src={m.avatar || ''} alt={m.role} />
                    <AvatarFallback className={m.role === 'user' ? 'text-sm' : 'bg-emerald-400 text-black '}>
                      {m.role === 'user' ? 'U' : 'GN'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-1.5 w-full">
                    <div className="flex">
                      <p className="font-semibold text-white/[1]">{m.role === 'user' ? 'You' : 'GuruNimbus'}</p>
                    </div>
                    <div className="mt-2 text-sm text-white whitespace-pre-wrap">
                      {m.role === 'assistant' ? (
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      ) : (
                        m.content
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
