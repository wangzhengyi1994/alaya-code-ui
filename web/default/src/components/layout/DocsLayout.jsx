import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const docsSidebarItemKeys = [
  { key: 'docs.sidebar.quick_start', to: '/docs' },
  { key: 'docs.sidebar.api_docs', to: '/docs/api' },
  { key: 'docs.sidebar.sdk', to: '/docs/sdk' },
  { key: 'docs.sidebar.tools', to: '/docs/tools' },
  { key: 'docs.sidebar.billing', to: '/docs/billing' },
  { key: 'docs.sidebar.errors', to: '/docs/errors' },
  { key: 'docs.sidebar.faq', to: '/docs/faq' },
];

const DocsSidebarNav = ({ className }) => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className={cn('flex flex-col gap-0', className)}>
      {docsSidebarItemKeys.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              'relative px-4 py-2.5 text-sm font-normal transition-colors border-l-2 no-underline',
              isActive
                ? 'border-l-xyz-blue-6 text-xyz-blue-6 bg-xyz-blue-1'
                : 'border-l-transparent text-[#344256] hover:text-[#090e1a] hover:bg-[#f8fafc]'
            )}
          >
            {t(item.key)}
          </Link>
        );
      })}
    </nav>
  );
};

const DocsLayout = () => {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* Header */}
      <header className='sticky top-0 z-50 w-full border-b border-[#e1e7ef] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80'>
        <div className='container mx-auto flex h-14 max-w-screen-xl items-center px-4'>
          <Link to='/' className='mr-6 flex items-center gap-2 no-underline'>
            <img src={process.env.PUBLIC_URL + '/logo-dark.svg'} alt='logo' className='h-6 w-6' />
            <span className='text-lg font-medium text-[#090e1a]' style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Alaya Code
            </span>
          </Link>
          <nav className='hidden md:flex items-center space-x-6 text-sm font-normal'>
            <Link
              to='/docs'
              className='transition-colors text-xyz-blue-6 no-underline'
            >
              {t('nav.docs')}
            </Link>
          </nav>
          <div className='ml-auto flex items-center space-x-2'>
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleLanguage}
              className='gap-1 text-[#344256] hover:text-[#090e1a] hover:bg-[#f8fafc]'
            >
              <Globe className='h-4 w-4' />
              <span className='text-xs'>{i18n.language === 'zh' ? 'EN' : '中文'}</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              asChild
              className='text-[#344256] hover:text-[#090e1a] hover:bg-[#f8fafc]'
            >
              <Link to='/login'>{t('nav.login')}</Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon' className='shrink-0 md:hidden ml-2 border-[#e1e7ef] text-[#090e1a] hover:bg-[#f8fafc]'>
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='bg-white border-r-[#e1e7ef]'>
              <div className='mt-6'>
                <DocsSidebarNav />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      {/* Content */}
      <div className='container mx-auto flex max-w-screen-xl flex-1 px-4'>
        {/* Desktop sidebar */}
        <aside className='hidden md:block md:w-56 md:shrink-0 md:border-r md:border-[#e1e7ef] md:pr-0 md:pt-6'>
          <DocsSidebarNav />
        </aside>
        {/* Main content */}
        <main className='flex-1 py-6 md:pl-8'>
          <div className='max-w-none'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
