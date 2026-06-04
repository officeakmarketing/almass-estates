import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MessageCircle, X } from 'lucide-react';
import brandConfig from '../config/brand';

const Chat = () => {
    const [showChatPopup, setShowChatPopup] = useState(false);
    const chatCopy = brandConfig.copy.chat;

  return (
    <>
          {/* --- FLOATING CHAT WIDGET --- */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 2xl:bottom-12 2xl:right-12 flex flex-col items-end gap-3 sm:gap-4 z-50">
        
        <AnimatePresence>
          {showChatPopup && (
            <motion.div 
              // Added transform origin so it scales out from the bottom right (where the button is)
              style={{ transformOrigin: 'bottom right' }}
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: 20, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 280, damping: 25 }}
              className="relative bg-[#111111] border border-white/10 p-3 sm:p-4 2xl:p-5 rounded-xl flex items-start gap-3 sm:gap-4 w-[calc(100vw-2.5rem)] sm:w-72 md:w-72 2xl:w-80 shadow-2xl"
            >
              <button 
                onClick={() => setShowChatPopup(false)}
                className="absolute top-1 sm:top-2 right-1 sm:right-2 text-brand-muted hover:text-white transition-colors p-1"
              >
                <X size={14} className="2xl:w-4 2xl:h-4" />
              </button>

              <div className="relative shrink-0">
                <img 
                  src={chatCopy.botAvatar} 
                  alt={chatCopy.botName} 
                  className="w-8 h-8 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 rounded-full object-cover mt-1"
                />
              </div>
              
              <div className="text-xs sm:text-[13px] 2xl:text-[15px] text-brand-secondary leading-relaxed pr-2 sm:pr-4 font-light">
                <p>{chatCopy.greeting}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          onClick={() => setShowChatPopup(!showChatPopup)}
          // If the chat is open, make the button slightly darker to show it's active
          className={`p-3 sm:p-3.5 2xl:p-5 rounded-full text-[#111111] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${
            showChatPopup ? 'bg-[#c2aa84]' : 'bg-[#d8c29d]'
          }`}
        >
          {/* Change icon to X when open, or Message when closed */}
          {showChatPopup ? (
             <X size={22} className="sm:w-6 sm:h-6 2xl:w-8 2xl:h-8" />
          ) : (
             <MessageCircle size={22} fill="currentColor" strokeWidth={1} className="sm:w-6 sm:h-6 2xl:w-8 2xl:h-8" />
          )}
        </motion.button>
      </div>
    </>
  )
}

export default Chat
