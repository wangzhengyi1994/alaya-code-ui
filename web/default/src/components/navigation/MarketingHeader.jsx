import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MarketingHeader = () => {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-14 max-w-screen-xl items-center px-4'>
        <Link to='/' className='mr-6 flex items-center space-x-2'>
          <img src='/logo.svg' alt='Alaya Code' className='h-8' />
        </Link>
        <nav className='flex items-center space-x-6 text-sm font-medium'>
          <Link
            to='/'
            className='transition-colors hover:text-foreground/80 text-foreground/60'
          >
            {t('nav.product')}
          </Link>
          <Link
            to='/pricing'
            className='transition-colors hover:text-foreground/80 text-foreground/60'
          >
            {t('nav.pricing')}
          </Link>
          <Link
            to='/docs'
            className='transition-colors hover:text-foreground/80 text-foreground/60'
          >
            {t('nav.docs')}
          </Link>
        </nav>
        <div className='ml-auto flex items-center space-x-2'>
          <Button variant='ghost' size='sm' onClick={toggleLanguage} className='gap-1'>
            <Globe className='h-4 w-4' />
            <span className='text-xs'>{i18n.language === 'zh' ? 'EN' : '中文'}</span>
          </Button>
          <Button variant='ghost' size='sm' asChild>
            <Link to='/login'>{t('nav.login')}</Link>
          </Button>
          <Button size='sm' asChild>
            <Link to='/register'>{t('nav.register')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MarketingHeader;
