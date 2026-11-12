import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ScanLine,
  Stethoscope,
  Dna,
  Bot,
  Plus,
  Image as ImageIcon,
  FileText,
  Activity,
  Clock,
  ArrowRight,
  TrendingUp,
  Calendar,
  Heart,
  ShieldCheck,
  BookOpen,
  Microscope,
  Droplets,
  Wind,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button, Card, Badge } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { useActivity } from '../context/ActivityContext';

/* ── Animation variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ── Real & Sample chart data ── */
const realWeeklyData = [
  { name: 'Mon', analyses: 0 },
  { name: 'Tue', analyses: 0 },
  { name: 'Wed', analyses: 0 },
  { name: 'Thu', analyses: 0 },
  { name: 'Fri', analyses: 0 },
  { name: 'Sat', analyses: 0 },
  { name: 'Sun', analyses: 0 },
];

const realMonthlyData = [
  { name: 'Week 1', analyses: 0 },
  { name: 'Week 2', analyses: 0 },
  { name: 'Week 3', analyses: 0 },
  { name: 'Week 4', analyses: 0 },
];

const sampleWeeklyData = [
  { name: 'Mon', analyses: 2 },
  { name: 'Tue', analyses: 5 },
  { name: 'Wed', analyses: 3 },
  { name: 'Thu', analyses: 7 },
  { name: 'Fri', analyses: 4 },
  { name: 'Sat', analyses: 1 },
  { name: 'Sun', analyses: 3 },
];

const sampleMonthlyData = [
  { name: 'Week 1', analyses: 14 },
  { name: 'Week 2', analyses: 22 },
  { name: 'Week 3', analyses: 18 },
  { name: 'Week 4', analyses: 26 },
];

/* ── Overview stat cards data ── */
const overviewCards = [
  { label: 'Image Analyses', value: '0', icon: ImageIcon, color: 'primary', bgClass: 'bg-primary-50', iconClass: 'text-primary' },
  { label: 'Symptom Assessments', value: '0', icon: Stethoscope, color: 'secondary', bgClass: 'bg-secondary-50', iconClass: 'text-secondary' },
  { label: 'Saved Reports', value: '0', icon: FileText, color: 'amber', bgClass: 'bg-amber-50', iconClass: 'text-amber-600' },
  { label: 'Recent Activity', value: 'None', icon: Activity, color: 'violet', bgClass: 'bg-violet-50', iconClass: 'text-violet-600', isText: true },
];

/* ── AI Screening modules ── */
const screeningModules = [
  {
    title: 'Skin Image Analysis',
    description: 'Explore AI-assisted screening of selected skin conditions using medical images.',
    icon: Microscope,
    bgGradient: 'from-primary-500 to-primary-700',
    btnLabel: 'Open Skin Analysis',
    path: '/image-analysis/skin',
  },
  {
    title: 'Lung Image Analysis',
    description: 'Explore chest X-ray image classification for pneumonia-associated patterns.',
    icon: Wind,
    bgGradient: 'from-secondary-500 to-secondary-700',
    btnLabel: 'Open Lung Analysis',
    path: '/image-analysis/lung',
  },
  {
    title: 'Blood Smear Analysis',
    description: 'Explore blood smear image classification for malaria-associated parasites.',
    icon: Droplets,
    bgGradient: 'from-rose-500 to-rose-700',
    btnLabel: 'Open Blood Analysis',
    path: '/image-analysis/blood',
  },
];

/* ── Quick actions ── */
const quickActions = [
  { label: 'Analyze Medical Image', icon: ScanLine, path: '/image-analysis', color: 'bg-primary-50 text-primary border-primary-100' },
  { label: 'Assess Symptoms', icon: Stethoscope, path: '/symptom-analysis', color: 'bg-secondary-50 text-secondary border-secondary-100' },
  { label: 'Explore Human Anatomy', icon: Dna, path: '/biological-explorer', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { label: 'Ask AI Biology Assistant', icon: Bot, path: '/ai-assistant', color: 'bg-violet-50 text-violet-600 border-violet-100' },
];

/* ── Health Insights ── */
const healthInsights = [
  {
    title: 'Importance of Early Detection',
    summary: 'Early disease detection significantly improves treatment outcomes and survival rates across many conditions.',
    icon: Heart,
    color: 'text-rose-500',
    bgClass: 'bg-rose-50',
  },
  {
    title: 'Understanding Medical Imaging',
    summary: 'Medical imaging techniques like X-rays and dermoscopy help visualize internal structures for non-invasive assessment.',
    icon: ImageIcon,
    color: 'text-primary',
    bgClass: 'bg-primary-50',
  },
  {
    title: 'Role of AI in Healthcare',
    summary: 'AI assists healthcare professionals by analyzing patterns in medical data, supporting faster and more consistent screening.',
    icon: TrendingUp,
    color: 'text-secondary',
    bgClass: 'bg-secondary-50',
  },
  {
    title: 'Professional Medical Evaluation',
    summary: 'AI screening tools are educational aids. Always consult qualified healthcare professionals for diagnosis and treatment.',
    icon: ShieldCheck,
    color: 'text-amber-600',
    bgClass: 'bg-amber-50',
  },
];

/* ── Custom tooltip for Recharts ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface rounded-xl shadow-large border border-border px-3 py-2">
        <p className="text-xs font-medium text-text-primary">{label}</p>
        <p className="text-xs text-text-secondary">{payload[0].value} analyses</p>
      </div>
    );
  }
  return null;
};

/* ════════════════════════════════════════════════════
   Dashboard Page
   ════════════════════════════════════════════════════ */
const DashboardPage = () => {
  const { user } = useAuth();
  const { stats, activities } = useActivity();
  const [chartPeriod, setChartPeriod] = useState('weekly');
  const [showSampleData, setShowSampleData] = useState(false);

  const dynamicOverviewCards = [
    {
      label: 'Image Analyses',
      value: String(stats.imageAnalyses),
      icon: ImageIcon,
      color: 'primary',
      bgClass: 'bg-primary-50',
      iconClass: 'text-primary',
      path: '/analysis-history',
    },
    {
      label: 'Symptom Assessments',
      value: String(stats.symptomAssessments),
      icon: Stethoscope,
      color: 'secondary',
      bgClass: 'bg-secondary-50',
      iconClass: 'text-secondary',
      path: '/analysis-history',
    },
    {
      label: 'Saved Reports',
      value: String(stats.savedReports),
      icon: FileText,
      color: 'amber',
      bgClass: 'bg-amber-50',
      iconClass: 'text-amber-600',
      path: '/saved-reports',
    },
    {
      label: 'Recent Activity',
      value: stats.recentActivity,
      icon: Activity,
      color: 'violet',
      bgClass: 'bg-violet-50',
      iconClass: 'text-violet-600',
      isText: true,
      path: '/analysis-history',
    },
  ];

  const activeDataSet = showSampleData
    ? (chartPeriod === 'weekly' ? sampleWeeklyData : sampleMonthlyData)
    : (chartPeriod === 'weekly' ? realWeeklyData : realMonthlyData);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      {/* ── Header ── */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Welcome back, {user?.name || 'User'} 👋
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Your AI-assisted health screening workspace.
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
            <Calendar size={13} />
            <span>{currentDate}</span>
          </div>
        </div>
        <Link to="/image-analysis">
          <Button icon={Plus} size="md">Start New Analysis</Button>
        </Link>
      </motion.div>

      {/* ── Overview Cards ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dynamicOverviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} to={card.path}>
              <Card hoverable padding="md" className="h-full">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-medium text-text-secondary mb-1">{card.label}</p>
                    <p className={`text-2xl font-bold truncate ${card.isText ? 'text-text-primary text-sm' : 'text-text-primary'}`}>
                      {card.value}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${card.bgClass} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={card.iconClass} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </motion.div>

      {/* ── AI Screening Modules ── */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">AI Screening Modules</h2>
          <Badge variant="primary" dot>3 Available</Badge>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {screeningModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.title}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-surface rounded-2xl border border-border shadow-soft overflow-hidden"
              >
                {/* Gradient header */}
                <div className={`bg-gradient-to-r ${mod.bgGradient} px-5 py-6 relative`}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{mod.title}</h3>
                </div>
                {/* Body */}
                <div className="px-5 py-4">
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {mod.description}
                  </p>
                  <Link to={mod.path}>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={ArrowRight}
                      iconPosition="right"
                      className="w-full"
                    >
                      {mod.btnLabel}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} to={action.path}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center gap-2.5 px-4 py-5 rounded-2xl border cursor-pointer transition-shadow duration-200 hover:shadow-medium ${action.color}`}
                >
                  <Icon size={22} />
                  <span className="text-xs font-semibold text-center leading-tight">{action.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* ── Chart + Recent Activity row ── */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-5 gap-5">
        {/* Analytics Chart — takes 3 cols */}
        <Card className="lg:col-span-3" padding="md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-text-primary">Analysis Activity</h3>
                {showSampleData && (
                  <Badge variant="warning" size="sm">Sample Demonstration Data</Badge>
                )}
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                {showSampleData
                  ? 'Demonstrating visual trends with sample screening data'
                  : 'Real recorded screening sessions over time'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSampleData((prev) => !prev)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                  showSampleData
                    ? 'border-amber-300 bg-amber-50 text-amber-700 font-medium'
                    : 'border-border text-text-secondary hover:text-text-primary'
                }`}
              >
                {showSampleData ? 'Show Real (0)' : 'Preview Sample Trends'}
              </button>

              <div className="flex bg-background rounded-lg border border-border p-0.5">
                {['weekly', 'monthly'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      chartPeriod === p
                        ? 'bg-surface text-primary shadow-soft'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeDataSet} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="analyses"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAnalyses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[10px] text-text-secondary/60 mt-3 text-center">
            {showSampleData
              ? 'Notice: Displaying illustrative sample data. Actual user screening metrics remain at 0.'
              : 'Zero active analyses recorded. Chart will automatically update with your live screenings.'}
          </p>
        </Card>

        {/* Recent Activity — takes 2 cols */}
        <Card className="lg:col-span-2" padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-text-primary">Recent Activity</h3>
            <Link to="/analysis-history">
              <button className="text-xs font-semibold text-primary hover:text-primary-700 transition-colors flex items-center gap-1">
                View All <ArrowRight size={12} />
              </button>
            </Link>
          </div>

          {activities.length > 0 ? (
            <div className="space-y-3">
              {activities.slice(0, 4).map((act) => (
                <Link
                  key={act.id}
                  to="/analysis-history"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between gap-3 group border border-slate-100"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Activity size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                        {act.title}
                      </p>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {act.status}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {new Date(act.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                <Clock size={24} className="text-text-secondary/40" />
              </div>
              <h4 className="text-sm font-semibold text-text-primary mb-1">No activity yet</h4>
              <p className="text-xs text-text-secondary max-w-[200px] mb-4">
                Your analysis history will appear here once you start using the screening modules.
              </p>
              <Link to="/image-analysis">
                <Button variant="outline" size="sm" icon={Plus}>
                  Start First Analysis
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </motion.div>

      {/* ── Health Insights ── */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Health Insights</h2>
            <p className="text-xs text-text-secondary mt-0.5">Educational information about AI-assisted healthcare</p>
          </div>
          <BookOpen size={18} className="text-text-secondary" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {healthInsights.map((insight) => {
            const Icon = insight.icon;
            return (
              <Card key={insight.title} hoverable padding="md">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${insight.bgClass} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={insight.color} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-1">{insight.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{insight.summary}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* ── Medical Disclaimer ── */}
      <motion.div variants={itemVariants}>
        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl px-5 py-4">
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Medical Disclaimer</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                MediScan AI is an educational research prototype designed to demonstrate AI-assisted disease screening.
                It does not provide medical diagnoses or replace qualified healthcare professionals.
                Always consult a licensed medical professional for health concerns.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
