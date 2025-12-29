import React from 'react';
import { 
  MessageSquare, 
  Send, 
  TrendingUp, 
  Map, 
  Sparkles, 
  Briefcase, 
  Target, 
  ChevronRight, 
  BrainCircuit,
} from 'lucide-react';

// --- Styles & Fonts ---
const StyleInjector = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');

    .font-instrument-serif {
      font-family: 'Instrument Serif', serif;
    }
    .font-sans {
      font-family: 'Inter', sans-serif;
    }
    
    /* Custom Orange Gradient Text */
    .text-colorfull {
      background: linear-gradient(to right, #fb923c, #ea580c, #fff7ed, #ea580c);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }

    .animate-gradient-x {
      animation: gradient-move 3s linear infinite;
    }
    
    @keyframes gradient-move {
      0% { background-position: 0% 50% }
      100% { background-position: 200% 50% }
    }
  `}</style>
);

// --- Reusable Components ---

const Card = ({ children, className = "", title, icon: Icon, span = "col-span-1" }) => (
  <div className={`relative group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 ${span} ${className}`}>
    
    {/* 1. White Fade Inside Borders (New Effect) */}
    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_1px_rgba(255,255,255,0.06)] group-hover:shadow-[inset_0_0_40px_2px_rgba(255,255,255,0.1)] transition-all duration-500 pointer-events-none z-0" />

    {/* 2. Inner White Fade Border Effect (Inset Ring - Existing but tweaked) */}
    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-500 pointer-events-none z-0" />
    
    {/* 3. Subtle Inner Corner Gradient Fade */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

    {/* Top Orange Line Glow on Hover */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/70 transition-all duration-700 z-10" />
    
    <div className="p-6 h-full flex flex-col relative z-20">
      {title && (
        <div className="flex items-center gap-3 mb-5">
          {Icon && <Icon size={20} className="text-orange-500" />}
          {/* Title Font maintained as requested */}
          <span className="font-instrument-serif text-2xl text-zinc-100 tracking-wide italic">
            {title}
          </span>
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
    </div>
  </div>
);

const OrangeDivider = ({ className = "" }) => (
  <div className={`h-[1px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50 ${className}`} />
);

const ProgressBar = ({ label, percentage }) => (
  <div className="mb-4 last:mb-0 group">
    <div className="flex justify-between text-xs mb-1.5 text-zinc-400 group-hover:text-zinc-200 transition-colors font-sans font-light tracking-wider">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

// --- Specific Widgets ---

const ChatBotWidget = () => (
  <div className="flex flex-col h-full min-h-[300px]">
    <div className="flex-1 space-y-4 mb-4">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center flex-shrink-0">
          <BrainCircuit size={16} className="text-white" />
        </div>
        <div className="bg-zinc-800/50 p-3 rounded-2xl rounded-tl-none border border-zinc-700/50 text-sm text-zinc-300 shadow-sm font-sans font-light tracking-wider">
          I've analyzed your recent project commits. Your Python efficiency has improved by 12% this week!
        </div>
      </div>
      <div className="flex gap-3 flex-row-reverse">
        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-zinc-300">YO</span>
        </div>
        <div className="bg-orange-500/10 p-3 rounded-2xl rounded-tr-none border border-orange-500/20 text-sm text-orange-100 font-sans font-light tracking-wider">
          That's great! What should I focus on next?
        </div>
      </div>
       <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center flex-shrink-0">
          <BrainCircuit size={16} className="text-white" />
        </div>
        <div className="bg-zinc-800/50 p-3 rounded-2xl rounded-tl-none border border-zinc-700/50 text-sm text-zinc-300 shadow-sm font-sans font-light tracking-wider">
          Based on market trends, I suggest diving deeper into <strong>FastAPI</strong> and <strong>AsyncIO</strong> patterns.
        </div>
      </div>
    </div>
    <div className="relative mt-auto">
      <input 
        type="text" 
        placeholder="Ask anything about your data..." 
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 pr-12 text-sm text-zinc-300 focus:outline-none focus:border-orange-500/50 placeholder:text-zinc-600 transition-all font-sans font-light tracking-wider"
      />
      <button className="absolute right-2 top-2 p-1.5 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors">
        <Send size={14} />
      </button>
    </div>
  </div>
);

const ReadinessScore = () => (
  <div className="flex flex-col items-center justify-center h-full py-4">
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full animate-pulse" />
      
      {/* SVG Circle Progress */}
      <svg className="w-full h-full -rotate-90 transform">
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-zinc-800"
        />
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={440}
          strokeDashoffset={440 - (440 * 0.78)}
          strokeLinecap="round"
          className="text-orange-500 transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-instrument-serif text-white tracking-tighter">78%</span>
        <span className="text-xs text-orange-400 font-medium uppercase tracking-wide mt-1 font-sans">Ready</span>
      </div>
    </div>
    <div className="mt-6 text-center font-sans font-light tracking-wider">
      <p className="text-zinc-400 text-sm">You're in the top <span className="text-orange-400 font-medium">15%</span> of candidates for Senior Frontend roles.</p>
    </div>
  </div>
);

const TimelineItem = ({ title, date, status }) => (
  <div className="relative pl-6 pb-6 last:pb-0 border-l border-zinc-800 last:border-transparent font-sans">
    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${status === 'completed' ? 'bg-orange-500 border-orange-500' : status === 'current' ? 'bg-zinc-950 border-orange-500 animate-pulse' : 'bg-zinc-800 border-zinc-600'}`} />
    <h4 className={`text-sm font-medium ${status === 'current' ? 'text-orange-400' : 'text-zinc-200'}`}>{title}</h4>
    <span className="text-xs text-zinc-500 font-light tracking-wider">{date}</span>
  </div>
);

const JobMatchCard = ({ role, company, match, logo }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800/30 border border-zinc-800 hover:border-orange-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer group font-sans">
    <div className="w-10 h-10 rounded-lg bg-zinc-700 flex items-center justify-center text-zinc-300 font-bold font-instrument-serif text-xl italic">
      {logo}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-zinc-200 truncate group-hover:text-orange-400 transition-colors">{role}</h4>
      <p className="text-xs text-zinc-500 truncate font-light tracking-wider">{company}</p>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-xs font-bold text-orange-500">{match}%</span>
      <span className="text-[10px] text-zinc-600 font-light tracking-wider">Match</span>
    </div>
  </div>
);

// --- Main App Component ---

const Page7 = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 p-4 md:p-8 lg:p-12 font-sans selection:bg-orange-500/30">
      <StyleInjector />
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        {/* Main Heading */}
        <h2 className="text-balance font-medium text-5xl tracking-tight max-sm:px-5 sm:text-5xl md:text-7xl text-white mb-6">
          <span className="font-instrument-serif block md:inline">Your Career </span>
          <span className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull">Command Center</span>
        </h2>
        
        {/* Subtitle */}
        <h3 className="w-full select-none text-balance bg-gradient-to-b from-[#edeffd] to-[#7b9cda] bg-clip-text px-4 text-center font-bold font-instrument-serif text-2xl md:text-3xl text-transparent leading-[120%] tracking-wide max-w-4xl mx-auto">
          AI-driven insights tailored to your personal growth. Track skills, get mentorship, and find your dream role.
        </h3>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
        
        {/* Decorative background line */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] -z-10 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent transform -translate-y-1/2" />
        
        {/* 1. Chat Bot - Large Card */}
        <Card 
          title="AI Career Assistant" 
          icon={MessageSquare} 
          span="col-span-1 md:col-span-2 row-span-2"
          className="bg-zinc-900/80"
        >
          <ChatBotWidget />
        </Card>

        {/* 2. Career Readiness Score */}
        <Card title="Readiness Score" icon={Target} span="col-span-1 md:col-span-1">
          <ReadinessScore />
        </Card>

        {/* 3. Skills Progress */}
        <Card title="Skill Gaps" icon={TrendingUp} span="col-span-1 md:col-span-1">
          <div className="space-y-5 pt-2">
            <ProgressBar label="System Design" percentage={92} />
            <ProgressBar label="React Patterns" percentage={85} />
            <ProgressBar label="GraphQL" percentage={64} />
            <div className="pt-2 flex items-center justify-between text-xs text-orange-400 cursor-pointer hover:underline font-sans font-light tracking-wider">
              <span>View detailed report</span>
              <ChevronRight size={12} />
            </div>
          </div>
        </Card>

        {/* Middle Divider for Mobile/Tablet */}
        <div className="col-span-full lg:hidden">
          <OrangeDivider />
        </div>

        {/* 4. Roadmap Timeline */}
        <Card title="Roadmap Timeline" icon={Map} span="col-span-1 md:col-span-1">
          <div className="pt-2">
            <TimelineItem title="Senior Eng. Certification" date="In Progress • Due Oct 24" status="current" />
            <TimelineItem title="Complete System Design" date="Completed • Sep 15" status="completed" />
            <TimelineItem title="Lead a Major Project" date="Completed • Aug 01" status="completed" />
          </div>
        </Card>

        {/* 5. AI Suggestions */}
        <Card title="AI Suggestions" icon={Sparkles} span="col-span-1 md:col-span-1">
          <ul className="space-y-3 font-sans font-light tracking-wider">
            {[
              "Update your portfolio with the 'Finance App' case study.",
              "Connect with Sarah Connor (CTO at TechDyne).",
              "Review 'Advanced Patterns' in TypeScript."
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start p-2 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                <div className="mt-0.5 min-w-[16px]">
                   <div className="w-4 h-4 rounded border border-zinc-600 group-hover:border-orange-500 flex items-center justify-center transition-colors">
                     {i === 0 && <div className="w-2 h-2 bg-orange-500 rounded-sm" />}
                   </div>
                </div>
                <span className="text-sm text-zinc-300 leading-snug group-hover:text-zinc-100">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

         {/* 6. Job Matches - Wide Bottom Card */}
        <Card title="Top Opportunities" icon={Briefcase} span="col-span-full lg:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <JobMatchCard 
              role="Senior Frontend Engineer" 
              company="Stripe" 
              match={98} 
              logo="S"
            />
             <JobMatchCard 
              role="Product Engineer" 
              company="Linear" 
              match={94} 
              logo="L"
            />
             <JobMatchCard 
              role="UI/UX Developer" 
              company="Vercel" 
              match={89} 
              logo="▲"
            />
          </div>
        </Card>

      </div>

      {/* Footer / Caption */}
      <div className="max-w-xl mx-auto text-center relative font-sans font-light tracking-wider">
         <OrangeDivider className="mb-8" />
         
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Everything updates automatically as you grow.
         </div>
         

      </div>

    </div>
  );
};

export default Page7;