"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AIBotProps = {
  username?: string;
};

export default function AIBot({
  username = "",
}: AIBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi${username ? ` ${username}` : ""}! I'm your SpendWise AI assistant. Ask me about your spending, budget, or financial habits.`,
    },
  ]);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const sendMessage = async (
    messageText?: string
  ) => {
    const message =
      messageText?.trim() || input.trim();

    if (!message || loading) {
      return;
    }

    setInput("");

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: message,
      },
    ]);

    setLoading(true);

    try {
      const savedUser =
        localStorage.getItem("spendwiseUser");

      const user = savedUser
        ? JSON.parse(savedUser)
        : null;

      if (!user?.id) {
        throw new Error(
          "User information not found."
        );
      }

      const response = await fetch(
        "http://localhost:5000/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            message: message,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to get AI response."
        );
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            "I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error(
        "AI request failed:",
        error
      );

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the AI assistant right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "How much did I spend this month?",
    "Where am I spending the most?",
    "How much budget do I have left?",
    "Give me some spending advice",
  ];

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open SpendWise AI"
          className="fixed bottom-6 right-6 z-50 flex cursor-pointer items-center gap-3 rounded-full bg-[#183B2A] px-5 py-3.5 text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-[#24553D] hover:shadow-xl"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg">
            ✦
          </span>

          <span className="text-sm font-semibold">
            SpendWise AI
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[620px] w-[390px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-3xl border border-[#DCE5DE] bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-[#183B2A] px-5 py-4 text-white">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl">
                ✦
              </div>

              <div>
                <h2 className="font-bold">
                  SpendWise AI
                </h2>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#A8D5B5]" />

                  <p className="text-xs text-[#D5E4D9]">
                    Your financial assistant
                  </p>
                </div>
              </div>

            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI assistant"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl text-[#D5E4D9] transition hover:bg-white/10 hover:text-white"
            >
              ×
            </button>

          </div>

          {/* Safety Status */}
          <div className="border-b border-[#E8EEE8] bg-white px-5 py-2.5">

            <div className="flex items-center gap-2">

              <span className="text-sm">
                🛡
              </span>

              <span className="text-xs font-semibold text-[#526158]">
                User Safety:
              </span>

              <span className="text-xs font-semibold text-[#3F7A50]">
                Safe
              </span>

            </div>

          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#F7F8F3] px-4 py-5">

            {messages.map(
              (message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {message.role === "assistant" && (
                    <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F0E8] text-sm text-[#183B2A]">
                      ✦
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-md bg-[#183B2A] text-white"
                        : "rounded-bl-md border border-[#E1E9E2] bg-white text-[#34433A]"
                    }`}
                  >
                    {message.content}
                  </div>

                </div>
              )
            )}

            {/* Loading */}
            {loading && (
              <div className="mb-4 flex items-center">

                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F0E8] text-sm text-[#183B2A]">
                  ✦
                </div>

                <div className="rounded-2xl rounded-bl-md border border-[#E1E9E2] bg-white px-4 py-3">

                  <div className="flex items-center gap-1.5">

                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#668172]" />

                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#668172]"
                      style={{
                        animationDelay: "150ms",
                      }}
                    />

                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#668172]"
                      style={{
                        animationDelay: "300ms",
                      }}
                    />

                  </div>

                </div>

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && !loading && (
            <div className="border-t border-[#E8EEE8] bg-white px-4 py-3">

              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8A968E]">
                Try asking
              </p>

              <div className="flex flex-wrap gap-2">

                {quickPrompts.map(
                  (prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() =>
                        sendMessage(prompt)
                      }
                      className="cursor-pointer rounded-full border border-[#DCE5DE] bg-[#F7F8F3] px-3 py-2 text-left text-xs font-medium text-[#526158] transition hover:border-[#668172] hover:bg-[#E8F0E8] hover:text-[#183B2A]"
                    >
                      {prompt}
                    </button>
                  )
                )}

              </div>

            </div>
          )}

          {/* Input */}
          <div className="border-t border-[#E1E9E2] bg-white p-4">

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 rounded-2xl border border-[#DCE5DE] bg-[#F7F8F3] p-1.5 transition focus-within:border-[#668172] focus-within:ring-2 focus-within:ring-[#E8F0E8]"
            >

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Ask SpendWise AI..."
                disabled={loading}
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[#183B2A] outline-none placeholder:text-[#9AA59E] disabled:cursor-not-allowed"
              />

              <button
                type="submit"
                disabled={
                  !input.trim() || loading
                }
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#183B2A] text-white transition hover:bg-[#24553D] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ➤
              </button>

            </form>

            <p className="mt-2 text-center text-[10px] text-[#9AA59E]">
              SpendWise AI can make mistakes.
              Check important financial information.
            </p>

          </div>

        </div>
      )}
    </>
  );
}