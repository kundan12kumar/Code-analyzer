import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = ({ variant = 'default' }) => {
  const isMinimal = variant === 'minimal';

  const usageStats = {
    totalRequests: 10,
    usedRequests: 5,
    remainingRequests: 5
  };

  const footerLinks = [
    { label: 'Documentation', href: '/docs', icon: 'Book' },
    { label: 'API Reference', href: '/api', icon: 'Code' },
    { label: 'Support', href: '/support', icon: 'HelpCircle' },
    { label: 'Privacy Policy', href: '/privacy', icon: 'Shield' },
    { label: 'Terms of Service', href: '/terms', icon: 'FileText' }
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: 'Github' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'Twitter' },
    { label: 'Discord', href: 'https://discord.com', icon: 'MessageCircle' }
  ];

  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isMinimal ? (
          <div className="py-8">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Usage Statistics */}
              <div className="space-y-4">
                <h3 className="text-heading-3 text-text-primary-light dark:text-text-primary-dark">
                  Usage Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-body-small text-text-secondary-light dark:text-text-secondary-dark">
                      Requests Used
                    </span>
                    <span className="text-body-small font-medium text-text-primary-light dark:text-text-primary-dark">
                      {usageStats.usedRequests}/{usageStats.totalRequests}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(usageStats.usedRequests / usageStats.totalRequests) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                    {usageStats.remainingRequests} requests remaining this month
                  </div>
                  <Link
                    to="/subscription-upgrade-modal"
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover transition-colors duration-200 text-body-small font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  >
                    <Icon name="Crown" size={16} />
                    <span>Upgrade Plan</span>
                  </Link>
                </div>
              </div>

              {/* Documentation Links */}
              <div className="space-y-4">
                <h3 className="text-heading-3 text-text-primary-light dark:text-text-primary-dark">
                  Documentation
                </h3>
                <ul className="space-y-2">
                  {footerLinks.slice(0, 3).map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="flex items-center space-x-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                      >
                        <Icon name={link.icon} size={16} />
                        <span className="text-body-small">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div className="space-y-4">
                <h3 className="text-heading-3 text-text-primary-light dark:text-text-primary-dark">
                  Legal
                </h3>
                <ul className="space-y-2">
                  {footerLinks.slice(3).map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="flex items-center space-x-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                      >
                        <Icon name={link.icon} size={16} />
                        <span className="text-body-small">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-heading-3 text-text-primary-light dark:text-text-primary-dark">
                  Community
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label={`Follow us on ${link.label}`}
                    >
                      <Icon name={link.icon} size={20} />
                    </a>
                  ))}
                </div>
                <div className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                  Join our community for updates and support
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="bg-primary p-1.5 rounded">
                  <Icon name="Code" size={16} color="white" />
                </div>
                <span className="text-body-small font-medium text-text-primary-light dark:text-text-primary-dark">
                  CodeAnalyzer
                </span>
              </div>
              <div className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                © 2024 CodeAnalyzer. All rights reserved.
              </div>
            </div>
          </div>
        ) : (
          /* Minimal Footer */
          <div className="py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="text-body-small text-text-secondary-light dark:text-text-secondary-dark">
                  Usage: {usageStats.usedRequests}/{usageStats.totalRequests}
                </div>
                <Link
                  to="/subscription-upgrade-modal"
                  className="text-primary hover:text-primary-hover transition-colors duration-200 text-body-small font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  Upgrade
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/docs"
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors duration-200 text-body-small focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  Docs
                </Link>
                <Link
                  to="/support"
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors duration-200 text-body-small focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  Support
                </Link>
                <div className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                  © 2024 CodeAnalyzer
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;