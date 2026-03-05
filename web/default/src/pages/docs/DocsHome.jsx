import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, Wrench, HelpCircle, AlertTriangle, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DocsHome = () => {
  const { t } = useTranslation();

  const quickLinks = [
    {
      icon: BookOpen,
      title: t('docs.home.link_api_title'),
      description: t('docs.home.link_api_desc'),
      to: '/docs/api',
    },
    {
      icon: Code2,
      title: t('docs.home.link_sdk_title'),
      description: t('docs.home.link_sdk_desc'),
      to: '/docs/sdk',
    },
    {
      icon: Wrench,
      title: t('docs.home.link_tools_title'),
      description: t('docs.home.link_tools_desc'),
      to: '/docs/tools',
    },
    {
      icon: Wallet,
      title: t('docs.home.link_billing_title'),
      description: t('docs.home.link_billing_desc'),
      to: '/docs/billing',
    },
    {
      icon: AlertTriangle,
      title: t('docs.home.link_errors_title'),
      description: t('docs.home.link_errors_desc'),
      to: '/docs/errors',
    },
    {
      icon: HelpCircle,
      title: t('docs.home.link_faq_title'),
      description: t('docs.home.link_faq_desc'),
      to: '/docs/faq',
    },
  ];

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-medium tracking-tight text-[#090e1a]'>{t('docs.home.title')}</h1>
        <p className='mt-2 text-base font-normal text-[#344256]'>
          {t('docs.home.description')}
        </p>
      </div>

      {/* Step by step guide */}
      <div className='space-y-6'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.home.steps_title')}</h2>

        <div className='space-y-0'>
          <div className='border border-[#e1e7ef] p-5'>
            <h3 className='font-medium text-[#090e1a]'>
              <span className='mr-2 inline-flex h-6 w-6 items-center justify-center bg-xyz-blue-6 text-xs text-white'>
                1
              </span>
              {t('docs.home.step1_title')}
            </h3>
            <p className='mt-2 text-sm font-normal text-[#344256]'>
              {t('docs.home.step1_desc_prefix')}{' '}
              <Link to='/register' className='text-xyz-blue-6 hover:text-xyz-blue-5 no-underline'>
                {t('docs.home.step1_register_link')}
              </Link>{' '}
              {t('docs.home.step1_desc_middle')}{' '}
              <Link to='/keys' className='text-xyz-blue-6 hover:text-xyz-blue-5 no-underline'>
                API Keys
              </Link>{' '}
              {t('docs.home.step1_desc_suffix')}
            </p>
          </div>

          <div className='border border-t-0 border-[#e1e7ef] p-5'>
            <h3 className='font-medium text-[#090e1a]'>
              <span className='mr-2 inline-flex h-6 w-6 items-center justify-center bg-xyz-blue-6 text-xs text-white'>
                2
              </span>
              {t('docs.home.step2_title')}
            </h3>
            <p className='mt-2 text-sm font-normal text-[#344256]'>
              {t('docs.home.step2_desc')}
            </p>
            <pre className='mt-3 overflow-x-auto border border-[#e1e7ef] bg-[#0a0f1a] p-4 text-sm text-xyz-white-7 font-code'>
              <code>{`# ${t('docs.home.step2_comment')}
export OPENAI_API_BASE=https://api.alayanew.com/v1
export OPENAI_API_KEY=sk-your-api-key-here`}</code>
            </pre>
          </div>

          <div className='border border-t-0 border-[#e1e7ef] p-5'>
            <h3 className='font-medium text-[#090e1a]'>
              <span className='mr-2 inline-flex h-6 w-6 items-center justify-center bg-xyz-blue-6 text-xs text-white'>
                3
              </span>
              {t('docs.home.step3_title')}
            </h3>
            <p className='mt-2 text-sm font-normal text-[#344256]'>
              {t('docs.home.step3_desc')}
            </p>
            <pre className='mt-3 overflow-x-auto border border-[#e1e7ef] bg-[#0a0f1a] p-4 text-sm text-xyz-white-7 font-code'>
              <code>{`curl https://api.alayanew.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-your-api-key-here" \\
  -d '{
    "model": "kimi-2.5",
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className='space-y-4'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.home.nav_title')}</h2>
        <div className='grid gap-0 sm:grid-cols-2 lg:grid-cols-3'>
          {quickLinks.map((link) => (
            <Link key={link.to} to={link.to} className='block no-underline'>
              <div className='border border-[#e1e7ef] p-5 h-full transition-colors hover:bg-[#f8fafc] hover:border-[#c9d3e0]'>
                <div className='flex items-center gap-2 mb-2'>
                  <link.icon className='h-4 w-4 text-xyz-blue-6' />
                  <span className='text-sm font-medium text-[#090e1a]'>{link.title}</span>
                </div>
                <p className='text-xs font-normal text-[#344256] leading-relaxed'>{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Supported Models */}
      <div className='space-y-4'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.home.models_title')}</h2>
        <div className='overflow-x-auto border border-[#e1e7ef]'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-[#e1e7ef] bg-[#f8fafc]'>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.home.models_col_model')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.home.models_col_provider')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.home.models_col_context')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.home.models_col_features')}</th>
              </tr>
            </thead>
            <tbody className='text-[#344256]'>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-code text-[#090e1a]'>kimi-2.5</td>
                <td className='px-4 py-3 font-normal'>Moonshot AI</td>
                <td className='px-4 py-3 font-normal'>200K</td>
                <td className='px-4 py-3 font-normal'>{t('docs.home.model_kimi_feature')}</td>
              </tr>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-code text-[#090e1a]'>qwen-3.5</td>
                <td className='px-4 py-3 font-normal'>{t('docs.home.model_qwen_provider')}</td>
                <td className='px-4 py-3 font-normal'>128K</td>
                <td className='px-4 py-3 font-normal'>{t('docs.home.model_qwen_feature')}</td>
              </tr>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-code text-[#090e1a]'>glm-5</td>
                <td className='px-4 py-3 font-normal'>{t('docs.home.model_glm_provider')}</td>
                <td className='px-4 py-3 font-normal'>128K</td>
                <td className='px-4 py-3 font-normal'>{t('docs.home.model_glm_feature')}</td>
              </tr>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-code text-[#090e1a]'>deepseek-v3</td>
                <td className='px-4 py-3 font-normal'>DeepSeek</td>
                <td className='px-4 py-3 font-normal'>128K</td>
                <td className='px-4 py-3 font-normal'>{t('docs.home.model_deepseek_feature')}</td>
              </tr>
              <tr>
                <td className='px-4 py-3 font-code text-[#090e1a]'>doubao-pro</td>
                <td className='px-4 py-3 font-normal'>{t('docs.home.model_doubao_provider')}</td>
                <td className='px-4 py-3 font-normal'>128K</td>
                <td className='px-4 py-3 font-normal'>{t('docs.home.model_doubao_feature')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className='text-sm font-normal text-[#344256]'>
          {t('docs.home.models_more')}{' '}
          <Link to='/docs/api' className='text-xyz-blue-6 hover:text-xyz-blue-5 no-underline'>
            {t('docs.home.models_more_link')}
          </Link>
          。
        </p>
      </div>
    </div>
  );
};

export default DocsHome;
