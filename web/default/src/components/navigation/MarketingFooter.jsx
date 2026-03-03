import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { useTranslation } from 'react-i18next';

const MarketingFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto max-w-screen-xl px-4 py-8'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          <div>
            <h3 className='mb-3 text-sm font-semibold'>{t('marketing_footer.product')}</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <Link to='/' className='hover:text-foreground'>
                  {t('marketing_footer.overview')}
                </Link>
              </li>
              <li>
                <Link to='/pricing' className='hover:text-foreground'>
                  {t('marketing_footer.pricing')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-3 text-sm font-semibold'>{t('marketing_footer.docs_title')}</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <Link to='/docs' className='hover:text-foreground'>
                  {t('marketing_footer.quick_start')}
                </Link>
              </li>
              <li>
                <Link to='/docs/api' className='hover:text-foreground'>
                  {t('marketing_footer.api_docs')}
                </Link>
              </li>
              <li>
                <Link to='/docs/sdk' className='hover:text-foreground'>
                  {t('marketing_footer.sdk_guide')}
                </Link>
              </li>
              <li>
                <Link to='/docs/tools' className='hover:text-foreground'>
                  {t('marketing_footer.tools')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-3 text-sm font-semibold'>{t('marketing_footer.legal')}</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <Link to='/terms' className='hover:text-foreground'>
                  {t('marketing_footer.terms')}
                </Link>
              </li>
              <li>
                <Link to='/privacy' className='hover:text-foreground'>
                  {t('marketing_footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-3 text-sm font-semibold'>{t('marketing_footer.support')}</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <Link to='/docs' className='hover:text-foreground'>
                  {t('marketing_footer.help_center')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <p className='text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} {t('marketing_footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
