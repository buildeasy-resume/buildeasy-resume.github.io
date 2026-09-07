import React, { useState, useMemo } from 'react';
import { PortfolioData } from '../../types';
import { analyzeResumeATS } from '../../lib/resume-analysis';
import { TabType } from '../FormBuilder';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Search, 
  Briefcase,
  FileText,
  Target,
  BarChart,
  ArrowRight,
  Info,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ATSTabProps {
  data: PortfolioData;
  onNavigateToTab?: (tabId: TabType) => void;
}

function ScoreCard({ label, score, explanation, isN_A }: { label: string, score: number | null, explanation: string, isN_A?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all">
      <div 
        className="p-3 cursor-pointer hover:bg-slate-50 flex items-start justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">{label}</span>
          <p className={`text-xl font-bold ${isN_A ? 'text-slate-400' : 'text-slate-900'}`}>
            {isN_A ? 'N/A' : score}
          </p>
        </div>
        <button className="text-slate-400 mt-1">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-600 leading-relaxed">
          {explanation}
        </div>
      )}
    </div>
  );
}

export default function ATSTab({ data, onNavigateToTab }: ATSTabProps) {
  const [jobDescription, setJobDescription] = useState('');

  const analysis = useMemo(() => analyzeResumeATS(data, jobDescription), [data, jobDescription]);

  return (
    <div className="space-y-6 bg-white">
      {/* Target Job Description Matcher */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
          <Briefcase className="w-4 h-4 text-slate-600" />
          {analysis.hasJd ? 'Job-Specific ATS Analysis' : 'General ATS Audit'}
        </h3>
        <p className="text-xs text-slate-500">
          Paste a job description below to unlock job-specific keyword matching and relevance scoring.
        </p>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description text here..."
          className="w-full h-28 p-3 text-sm border border-slate-300 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none transition-shadow"
        />
      </div>

      {/* Overall Score Header */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              ATS READINESS
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-4xl font-black text-slate-900">{analysis.overallScore} <span className="text-xl text-slate-400 font-medium">/ 100</span></h2>
            </div>
            <span className="text-sm font-semibold text-slate-600 mt-1 block">
              Status: <strong className={`
                ${analysis.overallScore >= 80 ? 'text-emerald-600' :
                  analysis.overallScore >= 60 ? 'text-blue-600' :
                  analysis.overallScore >= 40 ? 'text-amber-600' : 'text-rose-600'}
              `}>{analysis.overallStatus}</strong>
            </span>
          </div>
        </div>

        {/* Sub Scores Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <ScoreCard 
            label={analysis.atsCompatibility.label} 
            score={analysis.atsCompatibility.score} 
            explanation={analysis.atsCompatibility.explanation} 
          />
          <ScoreCard 
            label={analysis.jobMatch.label} 
            score={analysis.jobMatch.score} 
            explanation={analysis.jobMatch.explanation}
            isN_A={!analysis.hasJd}
          />
          <ScoreCard 
            label={analysis.experienceRelevance.label} 
            score={analysis.experienceRelevance.score} 
            explanation={analysis.experienceRelevance.explanation} 
          />
          <ScoreCard 
            label={analysis.contentQuality.label} 
            score={analysis.contentQuality.score} 
            explanation={analysis.contentQuality.explanation} 
          />
        </div>
      </div>

      {/* Keyword Matcher Section */}
      {analysis.hasJd && (
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
            <Target className="w-4 h-4 text-slate-600" />
            Keyword Match Evidence
          </h3>
          
          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg py-2">
              <span className="block text-emerald-800 text-lg font-bold">{analysis.keywordAnalysis.matched.length}</span>
              <span className="text-[10px] uppercase font-bold text-emerald-600">Matched</span>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg py-2">
              <span className="block text-amber-800 text-lg font-bold">{analysis.keywordAnalysis.partial.length}</span>
              <span className="text-[10px] uppercase font-bold text-amber-600">Partial</span>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-lg py-2">
              <span className="block text-rose-800 text-lg font-bold">{analysis.keywordAnalysis.missing.length}</span>
              <span className="text-[10px] uppercase font-bold text-rose-600">Missing</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Matched */}
            {analysis.keywordAnalysis.matched.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-2">
                  Matched ({analysis.keywordAnalysis.matched.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywordAnalysis.matched.map((kw, i) => (
                    <div key={i} className="flex flex-col bg-emerald-50 border border-emerald-200 rounded-md px-2 py-1.5 relative group cursor-default">
                      <span className="text-[11px] font-bold text-emerald-900">{kw.term}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span className="text-[9px] text-emerald-700 capitalize">{kw.contextualStrength.replace('_', ' ')}</span>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-slate-900 text-white text-[10px] rounded p-2 bottom-full left-1/2 -translate-x-1/2 mb-1 w-32 z-10">
                        Evidence found in: {kw.evidence.join(', ')}
                        <br/>
                        Priority: {kw.priority}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Partial */}
            {analysis.keywordAnalysis.partial.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-2">
                  Partial Credit ({analysis.keywordAnalysis.partial.length})
                </span>
                <p className="text-[10px] text-amber-600 mb-2">These terms appear in your Skills or Summary section, but are missing contextual evidence in your Experience or Projects.</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywordAnalysis.partial.map((kw, i) => (
                    <div key={i} className="flex flex-col bg-amber-50 border border-amber-200 rounded-md px-2 py-1.5 relative group cursor-default">
                      <span className="text-[11px] font-bold text-amber-900">{kw.term}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span className="text-[9px] text-amber-700 capitalize">{kw.contextualStrength.replace('_', ' ')}</span>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-slate-900 text-white text-[10px] rounded p-2 bottom-full left-1/2 -translate-x-1/2 mb-1 w-32 z-10">
                        Found in: {kw.evidence.join(', ')}
                        <br/>
                        Priority: {kw.priority}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing */}
            {analysis.keywordAnalysis.missing.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block mb-2">
                  Missing Requirements ({analysis.keywordAnalysis.missing.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.keywordAnalysis.missing.map((kw, i) => (
                    <span key={i} className={`px-2 py-1 bg-rose-50 border ${kw.priority === 'high' ? 'border-rose-400 font-bold' : 'border-rose-200 font-medium'} text-rose-800 text-[11px] rounded-md`}>
                      {kw.term} {kw.priority === 'high' && <AlertCircle className="w-3 h-3 inline-block ml-0.5" />}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
          <Sparkles className="w-4 h-4 text-slate-600" />
          Actionable Findings ({analysis.recommendations.length})
        </h3>
        {analysis.recommendations.length === 0 ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-sm text-emerald-800 font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            No major warnings found. Your resume aligns well!
          </div>
        ) : (
          <div className="space-y-2.5">
            {analysis.recommendations.map((rec) => (
              <div 
                key={rec.id}
                className={`p-3.5 rounded-xl border text-sm flex items-start gap-3 ${
                  rec.priority === 'high' ? 'bg-rose-50 border-rose-200 text-rose-900' :
                  rec.priority === 'medium' ? 'bg-amber-50 border-amber-200 text-amber-900' :
                  'bg-blue-50 border-blue-200 text-blue-900'
                }`}
              >
                {rec.priority === 'high' ? <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" /> :
                 rec.priority === 'medium' ? <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> :
                 <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider opacity-75 ${rec.priority === 'high' ? 'text-rose-700' : ''}`}>{rec.priority} PRIORITY</span>
                    {rec.tabTarget && onNavigateToTab && (
                      <button
                        type="button"
                        onClick={() => onNavigateToTab(rec.tabTarget as TabType)}
                        className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer bg-white/50 px-2 py-0.5 rounded"
                      >
                        Fix <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <p className="mt-1 leading-relaxed text-[13px]">{rec.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <p className="text-[11px] text-slate-500 text-center pb-4 italic">
        Disclaimer: Never invent experience to match keywords. Only add terms that accurately reflect your skills. ATS algorithms vary widely; this audit is a structural guide, not a guarantee.
      </p>
    </div>
  );
}
