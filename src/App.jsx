import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import HomeContainer from './components/HomeContainer';
import ThreadsContainer from './components/ThreadsContainer';
import { getThread, getThreadsList } from './api/threads';

const formatTime = (d) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const AppShell = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setCurrentTime(formatTime(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="app-shell mobile-container">
      <div
        className="pointer-events-none absolute left-[129px] top-[20px] z-50 hidden h-[38.95px] w-[133.56px] rounded-[100px] bg-black md:block"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute right-[24px] top-[20px] z-50 hidden md:block font-inter font-extrabold text-[12px] text-[#000000] opacity-90 mr-[20px] mt-[10px] mb-[8px]"
        aria-hidden
      >
        {currentTime}
      </div>

      <div className="relative h-full w-full flex-1 overflow-y-auto no-scrollbar pb-[20px] transition-transform">
        {children}
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const HomePage = () => {
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadThreads = async () => {
      setIsLoading(true);
      setError('');

      try {
        const threadsList = await getThreadsList();
        if (!ignore) {
          setThreads(threadsList);
        }
      } catch (loadError) {
        if (!ignore) {
          setThreads([]);
          setError(loadError.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadThreads();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <HomeContainer threads={threads} isLoading={isLoading} error={error} />
  );
};

const ThreadPage = () => {
  const navigate = useNavigate();
  const { threadId = '' } = useParams();
  const [thread, setThread] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadThread = async () => {
      setIsLoading(true);
      setThread(null);
      setError('');

      try {
        const threadRecord = await getThread(threadId);
        if (!ignore) {
          setThread(threadRecord);
        }
      } catch (loadError) {
        if (!ignore) {
          setThread(null);
          setError(loadError.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadThread();

    return () => {
      ignore = true;
    };
  }, [threadId]);

  return (
    <ThreadsContainer
      thread={thread}
      threadId={threadId}
      isLoading={isLoading}
      error={error}
      onBack={() => navigate('/')}
    />
  );
};

function App() {
  return (
    <AppShell>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/:threadId" element={<ThreadPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

export default App;
