import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MarketingHeader = () => {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <header className='fixed top-0 left-0 w-full h-16 flex items-center justify-between pl-10 bg-white border-b border-[#e1e7ef] z-[999]'>
      {/* Left: Logo + Nav */}
      <div className='flex items-center gap-20'>
        <Link to='/' className='flex items-center gap-1 no-underline'>
          <img src={process.env.PUBLIC_URL + '/logo-dark.svg'} alt='Alaya Code' className='h-8 w-8' />
          <span className='font-mono font-medium text-xl leading-7 text-[#090e1a]'>
            Alaya Code
          </span>
        </Link>
        <nav className='flex items-center h-16'>
          <Link
            to='/'
            className='font-normal text-sm text-[#090e1a] no-underline px-6 h-16 flex items-center transition-colors hover:text-xyz-blue-6'
          >
            {t('nav.product')}
          </Link>
          <Link
            to='/pricing'
            className='font-normal text-sm text-[#090e1a] no-underline px-6 h-16 flex items-center transition-colors hover:text-xyz-blue-6'
          >
            {t('nav.pricing')}
          </Link>
          <Link
            to='/docs'
            className='font-normal text-sm text-[#090e1a] no-underline px-6 h-16 flex items-center transition-colors hover:text-xyz-blue-6'
          >
            {t('nav.docs')}
          </Link>
        </nav>
      </div>

      {/* Right: Bell + Lang + Register + Login */}
      <div className='flex items-center h-16'>
        <button className='flex items-center justify-center bg-transparent border-none cursor-pointer text-[#090e1a] px-4 h-full transition-colors hover:text-xyz-blue-6'>
          <Bell className='h-5 w-5' />
        </button>
        <button
          onClick={toggleLanguage}
          className='flex items-center gap-1 bg-transparent border-none cursor-pointer text-[rgba(0,0,0,0.88)] text-sm font-normal px-4 h-full transition-colors hover:text-xyz-blue-6'
        >
          <Globe className='h-5 w-5' />
          <span className='text-sm'>{i18n.language === 'zh' ? 'EN' : '中文'}</span>
        </button>
        <Link
          to='/register'
          className='font-normal text-sm text-[#090e1a] no-underline px-6 h-16 flex items-center transition-colors hover:text-xyz-blue-6'
        >
          {t('nav.register')}
        </Link>
        <Link
          to='/login'
          className='font-normal text-base leading-6 text-white no-underline bg-xyz-blue-6 w-[120px] h-16 flex items-center justify-center gap-2 transition-colors hover:bg-[#3451e6]'
        >
          {t('nav.login')}
          <svg width='18' height='18' viewBox='0 0 14 12' fill='none' className='rotate-[-45deg]'>
            <path d='M1 6H13M13 6L8 1M13 6L8 11' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default MarketingHeader;
