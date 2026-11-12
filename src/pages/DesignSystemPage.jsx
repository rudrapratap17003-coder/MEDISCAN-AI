import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palette,
  Plus,
  Download,
  Search,
  Mail,
  Lock,
  User,
  ArrowRight,
  Heart,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import {
  Button,
  Input,
  Card,
  Modal,
  Badge,
  LoadingSpinner,
  PageHeader,
  EmptyState,
  ErrorState,
} from '../components/common';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const colors = [
  { name: 'Primary', value: '#2563EB', class: 'bg-primary' },
  { name: 'Secondary', value: '#0D9488', class: 'bg-secondary' },
  { name: 'Background', value: '#F8FAFC', class: 'bg-background border' },
  { name: 'Surface', value: '#FFFFFF', class: 'bg-surface border' },
  { name: 'Text Primary', value: '#0F172A', class: 'bg-text-primary' },
  { name: 'Text Secondary', value: '#64748B', class: 'bg-text-secondary' },
  { name: 'Border', value: '#E2E8F0', class: 'bg-border' },
  { name: 'Success', value: '#16A34A', class: 'bg-success' },
  { name: 'Warning', value: '#F59E0B', class: 'bg-warning' },
  { name: 'Danger', value: '#DC2626', class: 'bg-danger' },
];

const DesignSystemPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 pb-16"
    >
      {/* Page Header */}
      <PageHeader
        title="Design System"
        description="MediScan AI component library and visual identity reference"
        icon={Palette}
      />

      {/* ── Typography ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Typography</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-secondary mb-1 font-mono">h1 — text-3xl / text-4xl · bold</p>
              <h1>MediScan AI Platform</h1>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1 font-mono">h2 — text-2xl · semibold</p>
              <h2>Disease Screening Dashboard</h2>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1 font-mono">h3 — text-xl · semibold</p>
              <h3>Analysis Results</h3>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1 font-mono">h4 — text-lg · medium</p>
              <h4>Patient Information</h4>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1 font-mono">body — text-base</p>
              <p className="text-base text-text-primary">
                MediScan AI provides advanced medical image analysis powered by artificial intelligence, helping healthcare professionals make faster and more accurate diagnoses.
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1 font-mono">small — text-sm</p>
              <p className="text-sm text-text-secondary">
                Results are for informational purposes only and should be reviewed by a qualified medical professional.
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1 font-mono">caption — text-xs</p>
              <p className="text-xs text-text-secondary">
                Font: Plus Jakarta Sans · Last updated: Phase 1
              </p>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* ── Color Palette ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Color Palette</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {colors.map((color) => (
            <Card key={color.name} padding="sm" className="text-center">
              <div className={`w-full h-14 rounded-xl mb-3 ${color.class}`} />
              <p className="text-sm font-medium text-text-primary">{color.name}</p>
              <p className="text-xs text-text-secondary font-mono">{color.value}</p>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* ── Buttons ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Buttons</h2>
        <Card>
          <div className="space-y-6">
            {/* Variants */}
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            {/* With icons */}
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">With Icons</p>
              <div className="flex flex-wrap gap-3">
                <Button icon={Plus}>Add New</Button>
                <Button variant="secondary" icon={Download}>Download</Button>
                <Button variant="outline" icon={ArrowRight} iconPosition="right">Continue</Button>
                <Button variant="ghost" icon={Heart}>Favorite</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">States</p>
              <div className="flex flex-wrap gap-3">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* ── Inputs ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Inputs</h2>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" placeholder="John Doe" icon={User} />
            <Input label="Email Address" type="email" placeholder="john@example.com" icon={Mail} />
            <Input label="Password" type="password" placeholder="Enter your password" icon={Lock} />
            <Input label="Search" placeholder="Search patients..." icon={Search} hint="Search by name or ID" />
            <Input label="With Error" placeholder="Invalid input" error="This field is required" />
            <Input label="Disabled" placeholder="Cannot edit" disabled />
          </div>
        </Card>
      </motion.section>

      {/* ── Cards ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary">
                <CheckCircle size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">Standard Card</h4>
                <p className="text-xs text-text-secondary">Default styling</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">A basic card with soft shadow and rounded corners for content grouping.</p>
          </Card>

          <Card hoverable>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center text-secondary">
                <Star size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">Hoverable Card</h4>
                <p className="text-xs text-text-secondary">Interactive elevation</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">Hover over this card to see the lift animation and border accent effect.</p>
          </Card>

          <Card hoverable>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-warning">
                <Info size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">Feature Card</h4>
                <p className="text-xs text-text-secondary">For feature highlights</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">Use hoverable cards for interactive feature lists and clickable content.</p>
          </Card>
        </div>
      </motion.section>

      {/* ── Badges ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Badges</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">Variants</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">With Status Dot</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success" dot>Active</Badge>
                <Badge variant="warning" dot>Pending</Badge>
                <Badge variant="danger" dot>Critical</Badge>
                <Badge variant="primary" dot>Processing</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">Sizes</p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* ── Loading Spinner ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Loading Spinner</h2>
        <Card>
          <div className="flex flex-wrap items-end justify-center gap-12 py-4">
            <LoadingSpinner size="sm" label="SM" />
            <LoadingSpinner size="md" label="MD" />
            <LoadingSpinner size="lg" label="LG" />
            <LoadingSpinner size="xl" label="XL" />
          </div>
        </Card>
      </motion.section>

      {/* ── Modal ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Modal</h2>
        <Card>
          <Button onClick={() => setModalOpen(true)} icon={Plus}>
            Open Modal
          </Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm Analysis"
            size="md"
          >
            <p className="text-sm text-text-secondary mb-6">
              Are you sure you want to start the medical image analysis? This process may take a few minutes to complete.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>
        </Card>
      </motion.section>

      {/* ── Empty & Error States ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <EmptyState
              title="No Results Yet"
              description="Upload a medical image to begin your first analysis."
              actionLabel="Upload Image"
              onAction={() => {}}
            />
          </Card>
          <Card>
            <ErrorState
              title="Analysis Failed"
              description="The image could not be processed. Please try a different format."
              onRetry={() => {}}
            />
          </Card>
        </div>
      </motion.section>

      {/* ── Spacing Reference ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Spacing Scale</h2>
        <Card>
          <div className="space-y-2">
            {[
              { label: '4px', size: 'w-1' },
              { label: '8px', size: 'w-2' },
              { label: '12px', size: 'w-3' },
              { label: '16px', size: 'w-4' },
              { label: '24px', size: 'w-6' },
              { label: '32px', size: 'w-8' },
              { label: '48px', size: 'w-12' },
              { label: '64px', size: 'w-16' },
              { label: '96px', size: 'w-24' },
            ].map(({ label, size }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-xs text-text-secondary font-mono w-12">{label}</span>
                <div className={`h-3 ${size} bg-primary/20 rounded-full border border-primary/30`} />
              </div>
            ))}
          </div>
        </Card>
      </motion.section>

      {/* ── Shadow Reference ── */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Shadows</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Soft', class: 'shadow-soft' },
            { label: 'Medium', class: 'shadow-medium' },
            { label: 'Large', class: 'shadow-large' },
            { label: 'XL', class: 'shadow-xl' },
          ].map(({ label, class: cls }) => (
            <div key={label} className={`bg-surface rounded-2xl border border-border p-6 text-center ${cls}`}>
              <p className="text-sm font-medium text-text-primary">{label}</p>
              <p className="text-xs text-text-secondary font-mono mt-1">{cls}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default DesignSystemPage;
