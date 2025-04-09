import React, { useEffect } from 'react';
import Header from '../components/Header';
import useMessageStore from '../store/useMessage';
import useAuthStore from '../store/useAuth';
import MessageInput from '../components/MessageInput';
import useMatchStore from '../store/useMatch';
import { useParams } from 'react-router-dom';
import LoadingMessagesUI from '../components/LoadingMessagesUI';
import MatchNotFound from '../components/MatchNotFound';

const ChatPage = () => {
  const {getMatches, matches, loadingMatches} = useMatchStore();
  const { messages, getConversation, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
  const { authUser } = useAuthStore();
  const { id } = useParams();
  const match = matches.find((m) => m?.id === id);

  useEffect(() => {
    if(authUser && id){
      getMatches();
      getConversation(id);
      subscribeToMessages();
    }
    return () => {
      unsubscribeFromMessages();
    };
  }, [authUser, getConversation, getMatches, id, subscribeToMessages, unsubscribeFromMessages]);

  if (loadingMatches) return (<LoadingMessagesUI />);
  if (!match) return (<MatchNotFound />);
  return (
    <div className='flex flex-col h-screen bg-gray-100 bg-opacity-50'>
      <Header />
      <div className='flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full'>
        <div className='flex items-center mb-4 bg-white rounded-lg shadow p-3'>
          <img
            src={match?.image || '/avatar-thumbnail.png'}
            className='w-12 h-12 object-cover rounded-full mr-3 border-2 border-pink-300'
          />
          <h2 className='text-xl font-semibold text-gray-800'>{match.name}</h2>
        </div>
        <div className='flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow p-4'>
          {messages.length == 0 ? (
            <p className='text-center text-gray-500 py-8'>Start your conversation with  {match.name}</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 ${message.sender == authUser?.id ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                  message.sender == authUser?.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {message.content}
                </span>
              </div>
            ))
          )}
        </div>
        <MessageInput match={match}/>
      </div>
    </div>
  );
};

export default ChatPage;