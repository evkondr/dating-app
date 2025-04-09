import React, { useEffect, useRef, useState } from 'react';
import { User } from '../models/user';
import { Send, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import useMessageStore from '../store/useMessage';

interface IProp {
  match: User
}
const MessageInput = ({ match }:IProp) => {
  const [message, setMessage] = useState<string>('');
  const emojiPickerRef = useRef<null | HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { sendMessage } = useMessageStore();
  const handleSendMessage = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(message.trim()) {
      sendMessage(match.id, message);
      setMessage('');
    }
  };
  const handleClickOutside = (e:MouseEvent) => {
    if(emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as HTMLDivElement)) {
      setShowEmojiPicker(false);
    }
  };
  useEffect(() => {
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <form onSubmit={handleSendMessage} className='flex relative'>
      <button
        type='button'
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 focus:outline-none'
      >
        <Smile size={24} />
      </button>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='flex-grow p-3 pl-12 rounded-l-lg border-2 border-pink-500 
        focus:outline-none focus:ring-2 focus:ring-pink-300'
        placeholder='Type a message...'
      />
      <button
        type='submit'
        className='bg-pink-500 text-white p-3 rounded-r-lg 
        hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300'
      >
        <Send size={24} />
      </button>
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className='absolute bottom-20 left-4'>
          <EmojiPicker
            onEmojiClick={(emojiObject) => {
              setMessage((prevMessage) => prevMessage + emojiObject.emoji);
            }}
          />
        </div>
      )}
    </form>
  );
};

export default MessageInput;