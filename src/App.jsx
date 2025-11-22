import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const App = () => {
  const dimensions = [
    {
      name: "Telemetry Collection",
      criteria: [
        { id: 1, text: "Logs collected from applications", weights: [0, 1, 2, 3, 4] },
        { id: 2, text: "Metrics collected systematically", weights: [0, 1, 2, 3, 4] },
        { id: 3, text: "Distributed tracing implemented", weights: [0, 1, 2, 3, 4] },
        { id: 4, text: "Custom instrumentation coverage", weights: [0, 1, 2, 3, 4] },
      ]
    },
    {
      name: "Data Quality & Coverage",
      criteria: [
        { id: 5, text: "Service coverage across stack", weights: [0, 1, 2, 3, 4] },
        { id: 6, text: "Data retention policies", weights: [0, 1, 2, 3, 4] },
        { id: 7, text: "Sampling strategies", weights: [0, 1, 2, 3, 4] },
        { id: 8, text: "Data quality monitoring", weights: [0, 1, 2, 3, 4] },
      ]
    },
    {
      name: "Analysis & Visualization",
      criteria: [
        { id: 9, text: "Dashboards and visualization", weights: [0, 1, 2, 3, 4] },
        { id: 10, text: "Query and analysis capabilities", weights: [0, 1, 2, 3, 4] },
        { id: 11, text: "Correlation across signals", weights: [0, 1, 2, 3, 4] },
        { id: 12, text: "Root cause analysis tools", weights: [0, 1, 2, 3, 4] },
      ]
    },
    {
      name: "Alerting & Response",
      criteria: [
        { id: 13, text: "Alert configuration and management", weights: [0, 1, 2, 3, 4] },
        { id: 14, text: "Alert actionability", weights: [0, 1, 2, 3, 4] },
        { id: 15, text: "Incident response integration", weights: [0, 1, 2, 3, 4] },
        { id: 16, text: "SLO/SLI implementation", weights: [0, 1, 2, 3, 4] },
      ]
    },
    {
      name: "Culture & Practice",
      criteria: [
        { id: 17, text: "Team ownership and accountability", weights: [0, 1, 2, 3, 4] },
        { id: 18, text: "Observability in development lifecycle", weights: [0, 1, 2, 3, 4] },
        { id: 19, text: "Documentation and knowledge sharing", weights: [0, 1, 2, 3, 4] },
        { id: 20, text: "Continuous improvement processes", weights: [0, 1, 2, 3, 4] },
      ]
    },
    {
      name: "Automation & Intelligence",
      criteria: [
        { id: 21, text: "Automated anomaly detection", weights: [0, 1, 2, 3, 4] },
        { id: 22, text: "Auto-remediation capabilities", weights: [0, 1, 2, 3, 4] },
        { id: 23, text: "Predictive analytics", weights: [0, 1, 2, 3, 4] },
        { id: 24, text: "AI/ML-powered insights", weights: [0, 1, 2, 3, 4] },
      ]
    }
  ];

  const maturityLevels = [
    { level: 0, label: "None", description: "Not implemented" },
    { level: 1, label: "Initial", description: "Ad-hoc, reactive" },
    { level: 2, label: "Developing", description: "Basic implementation" },
    { level: 3, label: "Defined", description: "Standardized processes" },
    { level: 4, label: "Advanced", description: "Optimized and proactive" }
  ];

  const [scores, setScores] = useState({});
  const [expandedDimension, setExpandedDimension] = useState(null);

  const handleScoreChange = (criteriaId, score) => {
    setScores(prev => ({ ...prev, [criteriaId]: score }));
  };

  const calculateDimensionScore = (dimension) => {
    const dimensionScores = dimension.criteria.map(c => scores[c.id] || 0);
    const total = dimensionScores.reduce((sum, score) => sum + score, 0);
    const max = dimension.criteria.length * 4;
    return max > 0 ? (total / max) * 100 : 0;
  };

  const calculateOverallMaturity = () => {
    const allScores = dimensions.flatMap(d => d.criteria.map(c => scores[c.id] || 0));
    const total = allScores.reduce((sum, score) => sum + score, 0);
    const max = allScores.length * 4;
    return max > 0 ? (total / max) * 100 : 0;
  };

  const getMaturityLevel = (percentage) => {
    if (percentage >= 87.5) return "Advanced";
    if (percentage >= 62.5) return "Defined";
    if (percentage >= 37.5) return "Developing";
    if (percentage >= 12.5) return "Initial";
    return "None";
  };

  const barChartData = dimensions.map(dim => ({
    name: dim.name,
    score: calculateDimensionScore(dim)
  }));

  const radarChartData = dimensions.map(dim => ({
    dimension: dim.name.split(' ')[0],
    score: calculateDimensionScore(dim)
  }));

  const overallMaturity = calculateOverallMaturity();
  const maturityLevelLabel = getMaturityLevel(overallMaturity);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Observability Maturity Model</h1>
          <p className="text-slate-600 mb-6">Assess your organization's observability capabilities across six key dimensions</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="text-sm font-medium opacity-90">Overall Maturity</div>
              <div className="text-4xl font-bold mt-2">{overallMaturity.toFixed(1)}%</div>
              <div className="text-lg mt-2">{maturityLevelLabel}</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
              <div className="text-sm font-medium opacity-90">Criteria Assessed</div>
              <div className="text-4xl font-bold mt-2">{Object.keys(scores).length}</div>
              <div className="text-lg mt-2">of 24 total</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
              <div className="text-sm font-medium opacity-90">Average Score</div>
              <div className="text-4xl font-bold mt-2">
                {Object.keys(scores).length > 0 
                  ? (Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length).toFixed(1)
                  : '0.0'}
              </div>
              <div className="text-lg mt-2">out of 4.0</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Dimension Scores</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                  <Bar dataKey="score" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Maturity Radar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" fontSize={12} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Maturity" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {dimensions.map((dimension, dimIdx) => {
            const dimensionScore = calculateDimensionScore(dimension);
            const isExpanded = expandedDimension === dimIdx;
            
            return (
              <div key={dimIdx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-slate-700 to-slate-600 p-6 cursor-pointer hover:from-slate-600 hover:to-slate-500 transition-all"
                  onClick={() => setExpandedDimension(isExpanded ? null : dimIdx)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-white">{dimension.name}</h2>
                      <p className="text-slate-200 text-sm mt-1">
                        {dimension.criteria.length} criteria • {dimensionScore.toFixed(1)}% maturity
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{dimensionScore.toFixed(0)}%</div>
                        <div className="text-xs text-slate-200">{getMaturityLevel(dimensionScore)}</div>
                      </div>
                      <svg 
                        className={`w-6 h-6 text-white transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500"
                      style={{ width: `${dimensionScore}%` }}
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-6 bg-slate-50">
                    <div className="space-y-4">
                      {dimension.criteria.map((criterion) => (
                        <div key={criterion.id} className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="mb-3">
                            <label className="font-medium text-slate-800">{criterion.text}</label>
                          </div>
                          <div className="flex gap-2">
                            {maturityLevels.map((level) => (
                              <button
                                key={level.level}
                                onClick={() => handleScoreChange(criterion.id, level.level)}
                                className={`flex-1 py-3 px-2 rounded-lg border-2 transition-all ${
                                  scores[criterion.id] === level.level
                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                }`}
                              >
                                <div className="font-bold text-lg">{level.level}</div>
                                <div className="text-xs font-medium mt-1">{level.label}</div>
                                <div className="text-xs text-slate-600 mt-1">{level.description}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Maturity Level Definitions</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {maturityLevels.map((level) => (
              <div key={level.level} className="border-2 border-slate-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">Level {level.level}</div>
                <div className="font-semibold text-slate-800 mb-2">{level.label}</div>
                <div className="text-sm text-slate-600">{level.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
