import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCheck } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const phoneNumber = '263777063455'; // Sean Ceilings direct line

  const quickQuestions = [
    'Hi Sean Ceilings, I need a quotation for a tray ceiling in Harare.',
    'What is your rate per m² for gypsum ceiling skimming?',
    'Can Sean Ceilings do custom bulkheads and LED lighting?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const finalMsg = textToSend || message || 'Hello Sean Ceilings! I would like to inquire about a ceiling or skimming quotation.';
    const encoded = encodeURIComponent(finalMsg);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Expandable Chat Card */}
      {isOpen && (
        <div className="mb-3 w-[320px] sm:w-[360px] rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E7DFD5] dark:border-[#2E2A25] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header with WhatsApp Green */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold font-display text-white text-base">
                  SC
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#25D366]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  Sean Ceilings Zimbabwe
                </h4>
                <p className="text-[11px] text-white/90">
                  +263 77 706 3455 &middot; Online Now
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-black/10 transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#FAF8F5] dark:bg-[#151413] space-y-3">
            <div className="p-3.5 rounded-2xl rounded-tl-xs bg-white dark:bg-[#1E1C19] border border-[#E7DFD5] dark:border-[#2A2622] text-xs text-stone-800 dark:text-stone-200 shadow-2xs leading-relaxed">
              <p className="font-medium text-stone-900 dark:text-white mb-1">
                Welcome to Sean Ceilings.
              </p>
              <p className="text-stone-600 dark:text-stone-400">
                Need modern bulkheads, RhinoBoard skimming, or a ceiling quote in Harare or nationwide? Chat with Sean directly!
              </p>
              <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-stone-400 font-mono">
                <span>Just now</span>
                <CheckCheck className="w-3 h-3 text-[#25D366]" />
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                Quick Inquiries:
              </span>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="w-full text-left text-xs p-2 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E7DFD5] dark:border-[#2A2622] text-stone-700 dark:text-stone-300 hover:border-[#25D366] hover:text-[#25D366] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span className="truncate">{q}</span>
                  <span className="text-[#25D366] text-xs shrink-0 ml-1">&rarr;</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-[#1C1A17] border-t border-[#E7DFD5] dark:border-[#2A2622] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type to chat with Sean..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#151413] border border-[#E7DFD5] dark:border-[#2E2A25] text-stone-900 dark:text-white focus:outline-none focus:border-[#25D366]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xs transition-colors cursor-pointer shrink-0"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button in WhatsApp Green */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Chat with Sean Ceilings on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>

        {/* WhatsApp Icon */}
        <svg 
          className="w-6 h-6 fill-current" 
          viewBox="0 0 24 24"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.06 7.42C8.84 7.42 8.48 7.5 8.19 7.82C7.9 8.14 7.07 8.91 7.07 10.48C7.07 12.05 8.22 13.57 8.38 13.79C8.54 14 10.63 17.24 13.84 18.62C14.6 18.95 15.19 19.15 15.65 19.3C16.42 19.54 17.11 19.51 17.67 19.42C18.29 19.33 19.57 18.65 19.84 17.9C20.1 17.14 20.1 16.5 20.02 16.36C19.94 16.23 19.72 16.15 19.39 15.99C19.06 15.82 17.43 15.02 17.13 14.91C16.83 14.8 16.61 14.74 16.39 15.07C16.17 15.4 15.54 16.15 15.35 16.36C15.16 16.58 14.97 16.61 14.64 16.45C14.31 16.28 13.25 15.93 12 14.82C11.02 13.95 10.36 12.88 10.17 12.55C9.98 12.22 10.15 12.05 10.32 11.88C10.47 11.73 10.65 11.5 10.82 11.31C10.99 11.12 11.04 10.98 11.15 10.76C11.26 10.54 11.21 10.35 11.13 10.18C11.05 10.02 10.42 8.47 10.16 7.84C9.91 7.23 9.65 7.31 9.46 7.3C9.28 7.3 9.06 7.3 8.84 7.3" />
        </svg>

        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          WhatsApp Sean
        </span>
      </button>
    </div>
  );
};
