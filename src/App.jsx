import React, { useEffect, useState } from 'react';
import HomeContainer from './components/HomeContainer';
import ThreadsContainer from './components/ThreadsContainer';
import { getThread, getThreadsList } from './api/threads';

const formatTime = (d) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function App() {
  const [view, setView] = useState('home');
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [threadsLoading, setThreadsLoading] = useState(true);
  const [threadLoading, setThreadLoading] = useState(false);
  const [threadsError, setThreadsError] = useState('');
  const [threadError, setThreadError] = useState('');
  const [currentTime, setCurrentTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setCurrentTime(formatTime(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadThreads = async () => {
      setThreadsLoading(true);
      setThreadsError('');

      try {
        const threadsList = await getThreadsList();
        if (!ignore) {
          setThreads(threadsList);
        }
      } catch (error) {
        if (!ignore) {
          setThreads([]);
          setThreadsError(error.message);
        }
      } finally {
        if (!ignore) {
          setThreadsLoading(false);
        }
      }
    };

    loadThreads();

    return () => {
      ignore = true;
    };
  }, []);

  const handleTopicClick = async (threadId) => {
      setThreadLoading(true);
      setActiveThread(null);
      setThreadError('');
      setView('threads');

      try {
        const thread = await getThread(threadId);
        setActiveThread(thread);
      } catch (error) {
        setActiveThread(null);
        setThreadError(error.message);
      } finally {
        setThreadLoading(false);
      }
  };

  const handleBack = () => {
      setView('home');
      setActiveThread(null);
      setThreadLoading(false);
  }

  return (
    <div className="app-shell mobile-container">
        {/* Notch / island: desktop phone mock only (hidden below 768px) */}
        <div
          className="pointer-events-none absolute left-[129px] top-[20px] z-50 hidden h-[38.95px] w-[133.56px] rounded-[100px] bg-black md:block"
          aria-hidden
        />

        {/* Status time: desktop phone mock only */}
        <div
          className="pointer-events-none absolute right-[24px] top-[20px] z-50 hidden md:block font-inter font-extrabold text-[12px] text-[#000000] opacity-90 mr-[20px] mt-[10px] mb-[8px]"
          aria-hidden
        >
          {currentTime}
        </div>

        {/* Scrollable Content */}
        <div className="w-full h-full overflow-y-auto no-scrollbar flex-1 pb-[20px] relative transition-transform">
            {view === 'home' ? (
                <HomeContainer
                    threads={threads}
                    isLoading={threadsLoading}
                    error={threadsError}
                    onTopicClick={handleTopicClick}
                />
            ) : (
                <ThreadsContainer 
                    thread={activeThread}
                    isLoading={threadLoading}
                    error={threadError}
                    onBack={handleBack}
                />
            )}
        </div>
    </div>
  );
}

export default App;
