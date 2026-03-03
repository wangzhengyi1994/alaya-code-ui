import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFooterHTML, getSystemName } from '../helpers';

const Footer = () => {
  const { t } = useTranslation();
  const systemName = getSystemName();
  const [footer, setFooter] = useState(getFooterHTML());
  let remainCheckTimes = 5;

  const loadFooter = () => {
    let footer_html = localStorage.getItem('footer_html');
    if (footer_html) {
      setFooter(footer_html);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainCheckTimes <= 0) {
        clearInterval(timer);
        return;
      }
      remainCheckTimes--;
      loadFooter();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='border-t py-4'>
      <div className='container mx-auto text-center text-muted-foreground'>
        {footer ? (
          <div
            className='text-sm'
            dangerouslySetInnerHTML={{ __html: footer }}
          ></div>
        ) : (
          <div className='text-sm'>
            &copy; {new Date().getFullYear()} 九章云极 DataCanvas. All rights reserved.
            {' | '}
            <a href='https://alayanew.com' target='_blank' rel='noreferrer'>
              Alaya NeW
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
