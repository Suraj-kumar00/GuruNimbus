// "use client";

// import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
// import { PlaceholdersAndVanishInput } from "@/components/ui/text";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useUser } from "@clerk/nextjs";
// import { HeroHighlight } from "@/components/ui/background2";

// interface Message {
//   id: string;
//   role: "user" | "system";
//   content: string;
//   avatar?: string;
// }

// export function Chat() {
//   const { user } = useUser();
//   const placeholders = [
//     "Who is the best professor for introductory biology?",
// "Can you recommend a history professor who gives engaging lectures?",
// "I'm looking for a challenging physics course. Any suggestions?",
// "Which literature professor is known for analyzing modern works?",
// "Is there a psychology professor who focuses on cognitive research?",
// "Who teaches the most practical computer science courses?",
// "I need an economics professor who relates concepts to real-world scenarios.",
// "Are there any environmental science professors with field work opportunities?",
// "Which organic chemistry professor is best for pre-med students?",
// "Who offers the most balanced view in political science classes?",
// "Is there a calculus professor who explains concepts slowly and thoroughly?",
// "Which art history professor covers the widest range of periods?",
// "I'm struggling with biochemistry. Who's the most helpful professor?",
// "Which sociology professor discusses current social issues?",
// "Who makes statistics interesting and applicable to daily life?",
// "Is there a marketing professor with real industry experience?",
// "Which astronomy professor incorporates the latest space discoveries in their lectures?",
// "Who's the most thought-provoking philosophy professor?",
// "I'm interested in neuroscience research. Which professor should I approach?",
// "Who's the best professor for understanding global politics and diplomacy?",
//     // ...additional placeholders
//   ];

//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: Date.now().toString(),
//       role: "system",
//       content: "Hello! Welcome to Guru Nimbus",
//     },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (ref.current) {
//       ref.current.scrollTo(0, ref.current.scrollHeight);
//     }
//   }, [messages]);

//   const sendMessage = async (inputValue: string) => {
//     if (!inputValue.trim()) return;

//     const newMessage: Message = {
//       role: "user",
//       content: inputValue.trim(),
//       id: Date.now().toString(),
//     };
//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedMessages),
//       });

//       if (!response.ok) {
//         throw new Error(`Server responded with status ${response.status}`);
//       }

//       const reader = response.body?.getReader();
//       const decoder = new TextDecoder();
//       let receivedText = "";

//       if (!reader) {
//         throw new Error("Failed to get reader from response body");
//       }

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         receivedText += decoder.decode(value, { stream: true });
//       }

//       const botMessage: Message = {
//         id: Date.now().toString(),
//         role: "system",
//         content: receivedText,
//       };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage: Message = {
//         id: Date.now().toString(),
//         role: "system",
//         content: "Sorry, something went wrong. Please try again.",
//       };
//       setMessages((prevMessages) => [...prevMessages, errorMessage]);
//     }
//   };

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const inputElement = e.target as HTMLFormElement;
//     const inputValue = inputElement.querySelector<HTMLInputElement>("input")
//       ?.value || "";
//     await sendMessage(inputValue);
//   };

//   return (
//     <HeroHighlight>
//       <section className="text-zinc-700 w-full flex justify-center items-center min-h-screen">
//         <div className="w-full max-w-2xl  mx-auto bg-transparent p-6 rounded-3xl shadow-lg">
//           <ScrollArea
//             className="mb-2 h-[500px] rounded-3xl border border-blue-400 p-4"
//             ref={ref}
//           >
//             {messages.map((m) => (
//               <div
//                 key={m.id}
//                 className={`mb-6 flex gap-3 ${
//                   m.role === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//               <Avatar className="p-1">
//               <AvatarImage
//                className="rounded-full"
//                src={m.role === "user" ? user?.imageUrl : m.avatar || ""}
//                alt={m.role}
//               />
//               <AvatarFallback
//                 className={
//                 m.role === "user"
//                 ? "text-sm"
//                 : "bg-blue-50 text-black"
//                 }
//                >
//                {m.role === "user" ? "" : <img src="/gurunimbus.png" alt="Guru Nimbus" className="w-full h-full object-cover" />}
//               </AvatarFallback>
//               </Avatar>

 
//                 <div className="mt-1.5 w-full">
//                   <div className="flex">
//                     <p className="font-semibold text-white/[1]">
//                       {m.role === "user" ? "You" : "GuruNimbus"}
//                     </p>
//                   </div>
//                   <div className="mt-2 text-sm text-white whitespace-pre-wrap">
//                     {m.content}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </ScrollArea>
//           <PlaceholdersAndVanishInput
//             placeholders={placeholders}
//             onChange={() => {}}
//             onSubmit={onSubmit}
//           />
//         </div>
//       </section>
//     </HeroHighlight>
//   );
// }

"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PlaceholdersAndVanishInput } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@clerk/nextjs";
import { HeroHighlight } from "@/components/ui/background2";

interface Message {
  id: string;
  role: "user" | "system";
  content: string;
  avatar?: string;
}

export function Chat() {
  const { user } = useUser();
  const placeholders = [
    "Who is the best professor for introductory biology?",
// "Can you recommend a history professor who gives engaging lectures?",
// "I'm looking for a challenging physics course. Any suggestions?",
// "Which literature professor is known for analyzing modern works?",
// "Is there a psychology professor who focuses on cognitive research?",
// "Who teaches the most practical computer science courses?",
// "I need an economics professor who relates concepts to real-world scenarios.",
// "Are there any environmental science professors with field work opportunities?",
// "Which organic chemistry professor is best for pre-med students?",
// "Who offers the most balanced view in political science classes?",
// "Is there a calculus professor who explains concepts slowly and thoroughly?",
// "Which art history professor covers the widest range of periods?",
// "I'm struggling with biochemistry. Who's the most helpful professor?",
// "Which sociology professor discusses current social issues?",
// "Who makes statistics interesting and applicable to daily life?",
// "Is there a marketing professor with real industry experience?",
// "Which astronomy professor incorporates the latest space discoveries in their lectures?",
// "Who's the most thought-provoking philosophy professor?",
// "I'm interested in neuroscience research. Which professor should I approach?",
// "Who's the best professor for understanding global politics and diplomacy?",
//     // ...additional placeholders
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      role: "system",
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

  const sendMessage = async (inputValue: string) => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      role: "user",
      content: inputValue.trim(),
      id: Date.now().toString(),
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMessages),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let receivedText = "";

      if (!reader) {
        throw new Error("Failed to get reader from response body");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        receivedText += decoder.decode(value, { stream: true });
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        role: "system",
        content: receivedText,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "system",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputElement = e.target as HTMLFormElement;
    const inputValue = inputElement.querySelector<HTMLInputElement>("input")
      ?.value || "";
    await sendMessage(inputValue);
  };

  return (
    <HeroHighlight>
      <section className="text-zinc-700 w-full flex justify-center items-center min-h-screen">
        <div className="w-full max-w-2xl mx-auto bg-transparent p-6 rounded-3xl shadow-lg">
          <ScrollArea
            className="mb-2 h-[500px] rounded-3xl border border-blue-400 p-4"
            ref={ref}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`mb-6 flex gap-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Avatar className="p-1">
                  <AvatarImage
                    className="rounded-full"
                    src={m.role === "user" ? user?.imageUrl : m.avatar || ""}
                    alt={m.role}
                  />
                  <AvatarFallback
                    className={
                      m.role === "user"
                        ? "text-sm"
                        : "bg-blue-50 text-black"
                    }
                  >
                    {m.role === "user" ? "" : (
                      <img
                        src="/gurunimbus.png"
                        alt="Guru Nimbus"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className="mt-1.5 w-full">
                  <div className="flex">
                    <p className="font-semibold text-white/[1]">
                      {m.role === "user" ? "You" : "GuruNimbus"}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-white whitespace-pre-wrap">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={() => {}}
            onSubmit={onSubmit}
          />
        </div>
      </section>
    </HeroHighlight>
  );
}
