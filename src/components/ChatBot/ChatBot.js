import { useState } from 'react';
import Message from "./ChatMessage";
import { fetchChatAssistantOpenAI } from '@/utils/OpenaiAPI';

function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
  
    const sendMessage = async (event) => {
      event.preventDefault();
      const userMessage = input.trim();
  
      if (!userMessage) return;
      
      setMessages(messages => [...messages, { content: userMessage, role: "user" }]);
      setInput('');
  
      const response = await fetchChatAssistantOpenAI(userMessage);
      setMessages(messages => [...messages, { content: response, role: "system" }]);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage(event);
        }
    }

    return (
        <div
            className="box-border flex relative flex-col shrink-0 p-5 rounded-xl shadow-sm min-h-[100px]"
            style={{ maxWidth: 1200 }}
        >
            <section className="box-border flex relative flex-col grow shrink-0 self-stretch p-5 mx-auto w-full rounded-xl shadow-sm shadow-black max-w-[1200px] min-h-[100px]">
                <header className="box-border relative shrink-0 mx-auto mt-5 h-auto">
                    <h2 className="text-lg font-bold">Virtual Assistant</h2>
                </header>
                <div className="box-border flex relative flex-col shrink-0 pb-8 mt-5 h-auto">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className="box-border flex relative flex-row shrink-0 pb-8 mt-5"
                        >
                            <Message content={message.content} role={message.role}/>
                        </div>
                    ))}
                </div>
                <label htmlFor="userInput" className="box-border flex relative flex-col shrink-0 mt-5">
                    <p>User Message:</p>
                </label>
                <input
                    type="text"
                    id="userInput"
                    placeholder="Please provide your message"
                    name="userInput"
                    className="box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300"
                    aria-label="User message input"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="box-border relative shrink-0 px-6 py-4 mx-auto mt-5 text-center rounded appearance-none cursor-pointer bg-[black] text-[white] w-[200px]"
                    onClick={sendMessage}
                >
                    Send message
                </button>
            </section>
        </div>
    );
}

export default ChatBot;
