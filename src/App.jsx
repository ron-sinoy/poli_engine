import React, { useEffect, useState } from 'react';
import HomeContainer from './components/HomeContainer';
import ThreadsContainer from './components/ThreadsContainer';

const MOCK_EVENTS = [
    { type: 'card', text: "“എന്ന ചോദ്യത്തിന് കൃത്യമായി പ്രതികരിക്കാൻ അദ്ദേഹം തയ്യാറായതുമില്ല”", authorName: "പിണറായി വിജയൻ", authorColor: "#F48789", imageSrc: "/src/politician001.png" },
    { type: 'card', text: "“എന്ന ചോദ്യത്തിന് കൃത്യമായി പ്രതികരിക്കാൻ അദ്ദേഹം തയ്യാറായതുമില്ല”", authorName: "ശശി തരൂർ", authorColor: "#94BEF2", imageSrc: "/src/politician001.png" },
    { type: 'text', text: "സ്ഥാനാർഥി നിർണയത്തിൽ അതൃപ്തിയുണ്ടോ എന്ന ചോദ്യത്തിന് കൃത്യമായി പ്രതികരിക്കാൻ അദ്ദേഹം തയ്യാറായതുമില്ല" },
    { type: 'text', text: "സ്ഥാനാർഥി നിർണയത്തിൽ അതൃപ്തിയുണ്ടോ എന്ന ചോദ്യത്തിന് കൃത്യമായി പ്രതികരിക്കാൻ അദ്ദേഹം തയ്യാറായതുമില്ല" },
    { type: 'card', text: "“എന്ന ചോദ്യത്തിന് കൃത്യമായി പ്രതികരിക്കാൻ അദ്ദേഹം തയ്യാറായതുമില്ല”", authorName: "പിണറായി വിജയൻ", authorColor: "#F48789", imageSrc: "/src/politician001.png" }
];

const formatTime = (d) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function App() {
  const [view, setView] = useState('home');
  const [activeThread, setActiveThread] = useState({
        title: "സുധാകരൻ കുടുംബാംഗങ്ങളോടൊപ്പം",
        subtitle: "",
        events: MOCK_EVENTS
  });
  const [currentTime, setCurrentTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setCurrentTime(formatTime(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleTopicClick = (topicId) => {
      setActiveThread({
          title: "സുധാകരൻ കുടുംബാംഗങ്ങളോടൊപ്പം",
          subtitle: "",
          events: MOCK_EVENTS
      });
      setView('threads');
  };

  const handleBack = () => {
      setView('home');
      setActiveThread(null);
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
                <HomeContainer onTopicClick={handleTopicClick} />
            ) : (
                <ThreadsContainer 
                    title={activeThread.title}
                    events={activeThread.events}
                    onBack={handleBack}
                />
            )}
        </div>
    </div>
  );
}

export default App;
