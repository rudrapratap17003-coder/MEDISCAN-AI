import { Link } from 'react-router-dom';
import { ScanLine } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#why-mediscan' },
  ],
  Company: [
    { label: 'About Us', href: '#why-mediscan' },
    { label: 'Contact', href: 'mailto:contact@mediscan.ai' },
    { label: 'Privacy Policy', href: '#' },
  ],
};

const Footer = () => {
  const handleClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.getElementById(href.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-white/10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <ScanLine size={18} className="text-white" />
              </div>
              <div>
                <span className="text-base font-bold leading-none">MediScan</span>
                <span className="text-[10px] font-semibold text-primary-300 tracking-wider uppercase ml-1">AI</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              An educational research prototype demonstrating AI-assisted disease screening through medical image analysis, symptom assessment and interactive biological insights.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-white mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Medical disclaimer */}
        <div className="py-6 border-b border-white/10">
          <p className="text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto text-center">
            <span className="font-semibold text-slate-400">Medical Disclaimer:</span>{' '}
            MediScan AI is an educational research prototype designed to demonstrate AI-assisted disease screening.
            It does not provide medical diagnoses or replace qualified healthcare professionals.
            Always consult a licensed medical professional for health concerns.
          </p>
        </div>

        {/* Bottom */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} MediScan AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with React &middot; Vite &middot; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
