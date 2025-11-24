import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const App = () => {
  const dimensions = [
    {
      name: "Telemetry Collection",
      criteria: [
        { 
          id: 1, 
          text: "Logs collected from applications", 
          definition: "Application logs are systematically collected, structured, and centralized for analysis. Includes error logs, application events, and debug information.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 2, 
          text: "Metrics collected systematically", 
          definition: "Key performance indicators and system metrics (CPU, memory, latency, throughput) are automatically collected and stored with proper dimensionality.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 3, 
          text: "Distributed tracing implemented", 
          definition: "End-to-end request tracking across services with span context propagation, enabling you to trace requests through your entire system.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 4, 
          text: "Custom instrumentation coverage", 
          definition: "Business-specific metrics and traces are instrumented beyond standard infrastructure metrics, providing domain-specific observability.",
          weights: [0, 1, 2, 3, 4] 
        },
      ]
    },
    {
      name: "Data Quality & Coverage",
      criteria: [
        { 
          id: 5, 
          text: "Service coverage across stack", 
          definition: "All critical services, from frontend to backend, databases, and third-party integrations are instrumented and monitored.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 6, 
          text: "Data retention policies", 
          definition: "Clear policies for how long different types of telemetry data are stored, balancing cost with analytical needs and compliance requirements.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 7, 
          text: "Sampling strategies", 
          definition: "Intelligent sampling of high-volume data (like traces) to reduce costs while maintaining statistical significance and catching important events.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 8, 
          text: "Data quality monitoring", 
          definition: "Monitoring the observability data itself - checking for missing data, schema changes, delayed ingestion, and data accuracy.",
          weights: [0, 1, 2, 3, 4] 
        },
      ]
    },
    {
      name: "Analysis & Visualization",
      criteria: [
        { 
          id: 9, 
          text: "Dashboards and visualization", 
          definition: "Purpose-built dashboards for different audiences (SRE, development, business) showing relevant metrics, trends, and system health.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 10, 
          text: "Query and analysis capabilities", 
          definition: "Powerful query languages and tools to slice, filter, and aggregate telemetry data for ad-hoc investigation and analysis.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 11, 
          text: "Correlation across signals", 
          definition: "Ability to link logs, metrics, and traces together - jumping from a metric spike to related logs and traces for faster troubleshooting.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 12, 
          text: "Root cause analysis tools", 
          definition: "Tools and workflows that help identify the underlying cause of issues, including dependency mapping, anomaly correlation, and historical comparison.",
          weights: [0, 1, 2, 3, 4] 
        },
      ]
    },
    {
      name: "Alerting & Response",
      criteria: [
        { 
          id: 13, 
          text: "Alert configuration and management", 
          definition: "Well-defined alert rules with appropriate thresholds, deduplication, and routing to the right teams through proper channels.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 14, 
          text: "Alert actionability", 
          definition: "Alerts contain sufficient context and remediation steps, reducing noise and ensuring each alert requires and enables specific action.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 15, 
          text: "Incident response integration", 
          definition: "Observability tools integrate with incident management systems, on-call schedules, and communication platforms for coordinated response.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 16, 
          text: "SLO/SLI implementation", 
          definition: "Service Level Indicators and Objectives are defined, measured, and used for alerting based on user-impacting reliability rather than arbitrary thresholds.",
          weights: [0, 1, 2, 3, 4] 
        },
      ]
    },
    {
      name: "Culture & Practice",
      criteria: [
        { 
          id: 17, 
          text: "Team ownership and accountability", 
          definition: "Development teams own the observability of their services, with clear responsibility for instrumentation, dashboards, and responding to issues.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 18, 
          text: "Observability in development lifecycle", 
          definition: "Observability considerations are built into design reviews, code reviews, and testing - not added as an afterthought.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 19, 
          text: "Documentation and knowledge sharing", 
          definition: "Runbooks, dashboard guides, and observability best practices are documented and shared across teams, with regular knowledge transfer sessions.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 20, 
          text: "Continuous improvement processes", 
          definition: "Regular retrospectives on incidents and observability gaps, with action items tracked and completed to iteratively improve the observability posture.",
          weights: [0, 1, 2, 3, 4] 
        },
      ]
    },
    {
      name: "Automation & Intelligence",
      criteria: [
        { 
          id: 21, 
          text: "Automated anomaly detection", 
          definition: "Machine learning or statistical models automatically identify unusual patterns in metrics and logs without manual threshold configuration.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 22, 
          text: "Auto-remediation capabilities", 
          definition: "Common issues are automatically remediated (restarts, scaling, failover) based on observability signals, with proper safeguards and logging.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 23, 
          text: "Predictive analytics", 
          definition: "Forecasting future capacity needs, potential failures, or performance degradation based on historical patterns and trends in telemetry data.",
          weights: [0, 1, 2, 3, 4] 
        },
        { 
          id: 24, 
          text: "AI/ML-powered insights", 
          definition: "Advanced AI assistance for root cause analysis, pattern recognition, and recommendation of fixes based on historical incident data and system behavior.",
          weights: [0, 1, 2, 3, 4] 
        },
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
  const [hoveredCriterion, setHoveredCriterion] = useState(null);
// TEST: Log when state changes
console.log('Hovered criterion:', hoveredCriterion);

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
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="/logo.png" 
              alt="Company Logo" 
              className="h-16 w-16 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="h-16 w-16 bg-blue-600 rounded-lg items-center justify-center text-white text-2xl font-bold hidden">
              OM
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Observability Maturity Model</h1>
              <p className="text-slate-600">Assess your organization's observability capabilities across six key dimensions</p>
            </div>
          </div>
          
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
                          <div className="mb-3 flex items-center gap-2">
                            <label className="font-medium text-slate-800 flex-1">{criterion.text}</label>
                            <div 
                              className="relative"
                              onMouseEnter={() => setHoveredCriterion(criterion.id)}
                              onMouseLeave={() => setHoveredCriterion(null)}
                            >
                              <svg 
                                className="w-5 h-5 text-slate-400 hover:text-blue-500 cursor-help transition-colors"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                                />
                              </svg>
                              {hoveredCriterion === criterion.id && (
                                <div className="absolute z-50 w-80 p-4 bg-slate-800 text-white text-sm rounded-lg shadow-xl -top-2 right-8 transform">
                                  <div className="font-semibold mb-2 text-blue-300">{criterion.text}</div>
                                  <div className="text-slate-200 leading-relaxed">{criterion.definition}</div>
                                  <div className="absolute top-4 -right-2 w-4 h-4 bg-slate-800 transform rotate-45"></div>
                                </div>
                              )}
                            </div>
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
