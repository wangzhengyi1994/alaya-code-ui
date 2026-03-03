import React from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import { useTranslation } from 'react-i18next';

const DocsFaq = () => {
  const { t } = useTranslation();

  const faqCategories = [
    {
      title: t('docs.faq.cat_account'),
      items: [
        { q: t('docs.faq.account_q1'), a: t('docs.faq.account_a1') },
        { q: t('docs.faq.account_q2'), a: t('docs.faq.account_a2') },
        { q: t('docs.faq.account_q3'), a: t('docs.faq.account_a3') },
      ],
    },
    {
      title: t('docs.faq.cat_billing'),
      items: [
        { q: t('docs.faq.billing_q1'), a: t('docs.faq.billing_a1') },
        { q: t('docs.faq.billing_q2'), a: t('docs.faq.billing_a2') },
        { q: t('docs.faq.billing_q3'), a: t('docs.faq.billing_a3') },
        { q: t('docs.faq.billing_q4'), a: t('docs.faq.billing_a4') },
        { q: t('docs.faq.billing_q5'), a: t('docs.faq.billing_a5') },
      ],
    },
    {
      title: t('docs.faq.cat_usage'),
      items: [
        { q: t('docs.faq.usage_q1'), a: t('docs.faq.usage_a1') },
        { q: t('docs.faq.usage_q2'), a: t('docs.faq.usage_a2') },
        { q: t('docs.faq.usage_q3'), a: t('docs.faq.usage_a3') },
        { q: t('docs.faq.usage_q4'), a: t('docs.faq.usage_a4') },
        { q: t('docs.faq.usage_q5'), a: t('docs.faq.usage_a5') },
      ],
    },
    {
      title: t('docs.faq.cat_security'),
      items: [
        { q: t('docs.faq.security_q1'), a: t('docs.faq.security_a1') },
        { q: t('docs.faq.security_q2'), a: t('docs.faq.security_a2') },
      ],
    },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t('docs.faq.title')}</h1>
        <p className='mt-2 text-lg text-muted-foreground'>
          {t('docs.faq.description')}
        </p>
      </div>

      {faqCategories.map((category) => (
        <div key={category.title} className='space-y-3'>
          <h2 className='text-2xl font-semibold'>{category.title}</h2>
          <Accordion type='single' collapsible>
            {category.items.map((item, i) => (
              <AccordionItem key={i} value={`${category.title}-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>
                  <p className='text-muted-foreground'>{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}

      <div className='rounded-lg border p-4'>
        <h3 className='font-semibold'>{t('docs.faq.more_questions')}</h3>
        <p className='mt-1 text-sm text-muted-foreground'>
          {t('docs.faq.more_questions_prefix')}{' '}
          <Link to='/docs' className='text-primary hover:underline'>
            {t('docs.faq.full_docs_link')}
          </Link>{' '}
          {t('docs.faq.more_questions_or')}{' '}
          <Link to='/docs/errors' className='text-primary hover:underline'>
            {t('docs.faq.errors_link')}
          </Link>
          {t('docs.faq.more_questions_suffix')}
        </p>
      </div>
    </div>
  );
};

export default DocsFaq;
