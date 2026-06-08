import React from 'react';
import brandConfig from '../config/brand';

const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Footer = () => {
  const { copy, fonts } = brandConfig;
  const { footer } = copy;

  const renderIcon = (iconName) => {
    switch (iconName.toLowerCase()) {
      case 'facebook':
        return <FacebookIcon size={18} />;
      case 'instagram':
        return <InstagramIcon size={18} />;
      case 'linkedin':
        return <LinkedinIcon size={18} />;
      case 'tiktok':
        return <TikTokIcon size={18} />;
      default:
        return null;
    }
  };

  return (
    <footer className="relative w-full bg-[#030303] border-t border-white/5 py-16 px-6 md:px-12 lg:px-24 overflow-hidden z-20">
      {/* Radial-gradient orb */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0">
        
        {/* Left Side */}
        <div className="flex flex-col gap-6">
          {/* Logo Section */}
          <a href="https://almassestates.co.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 mb-2 hover:opacity-80 transition-opacity">
            <img 
              src={footer.logo.src} 
              alt={footer.logo.text} 
              className="w-12 h-12 object-contain"
            />
            <span 
              className="text-gradient-gold italic pr-1.5 text-2xl md:text-3xl font-medium tracking-tight"
              style={{ fontFamily: fonts.serif[0] }}
            >
              {footer.logo.text}
            </span>
          </a>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm text-[#C8C4BC] font-medium">
            {footer.links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3 mt-4">
            <a href={`tel:${footer.contact.phone.replace(/\s+/g, '')}`} className="text-[#F0EDE8] text-lg hover:text-white transition-colors">
              {footer.contact.phone}
            </a>
            <a href={`mailto:${footer.contact.email}`} className="text-[#C8C4BC] hover:text-white transition-colors">
              {footer.contact.email}
            </a>
            <span className="text-[#888780]">{footer.contact.location}</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-start md:items-end gap-10 md:gap-12 w-full md:w-auto">
          {/* Social Icons */}
          <div className="flex gap-4">
            {footer.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] flex items-center justify-center text-white transition-colors"
                aria-label={social.platform}
              >
                {renderIcon(social.icon)}
              </a>
            ))}
          </div>

          {/* Copyright & Powered By */}
          <div className="flex flex-col gap-3 text-sm text-[#C8C4BC] md:text-right mt-auto">
            <p>{footer.copyright}</p>
            <a 
              href={footer.poweredByUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              {footer.poweredBy}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
