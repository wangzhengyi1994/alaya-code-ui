import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
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
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t('docs.home.title')}</h1>
        <p className='mt-2 text-lg text-muted-foreground'>
          {t('docs.home.description')}
        </p>
      </div>

      {/* Step by step guide */}
      <div className='space-y-6'>
        <h2 className='text-2xl font-semibold'>{t('docs.home.steps_title')}</h2>

        <div className='space-y-4'>
          <div className='rounded-lg border p-4'>
            <h3 className='font-semibold'>
              <span className='mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                1
              </span>
              {t('docs.home.step1_title')}
            </h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              {t('docs.home.step1_desc_prefix')}{' '}
              <Link to='/register' className='text-primary hover:underline'>
                {t('docs.home.step1_register_link')}
              </Link>{' '}
              {t('docs.home.step1_desc_middle')}{' '}
              <Link to='/keys' className='text-primary hover:underline'>
                API Keys
              </Link>{' '}
              {t('docs.home.step1_desc_suffix')}
            </p>
          </div>

          <div className='rounded-lg border p-4'>
            <h3 className='font-semibold'>
              <span className='mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                2
              </span>
              {t('docs.home.step2_title')}
            </h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              {t('docs.home.step2_desc')}
            </p>
            <pre className='mt-2 overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>{`# ${t('docs.home.step2_comment')}
export OPENAI_API_BASE=https://api.alayanew.com/v1
export OPENAI_API_KEY=sk-your-api-key-here`}</code>
            </pre>
          </div>

          <div className='rounded-lg border p-4'>
            <h3 className='font-semibold'>
              <span className='mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                3
              </span>
              {t('docs.home.step3_title')}
            </h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              {t('docs.home.step3_desc')}
            </p>
            <pre className='mt-2 overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
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
        <h2 className='text-2xl font-semibold'>{t('docs.home.nav_title')}</h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {quickLinks.map((link) => (
            <Link key={link.to} to={link.to} className='block'>
              <Card className='h-full transition-colors hover:bg-accent/50'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center gap-2'>
                    <link.icon className='h-5 w-5 text-primary' />
                    <CardTitle className='text-base'>{link.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{link.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Supported Models */}
      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold'>{t('docs.home.models_title')}</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='pb-2 text-left font-medium'>{t('docs.home.models_col_model')}</th>
                <th className='pb-2 text-left font-medium'>{t('docs.home.models_col_provider')}</th>
                <th className='pb-2 text-left font-medium'>{t('docs.home.models_col_context')}</th>
                <th className='pb-2 text-left font-medium'>{t('docs.home.models_col_features')}</th>
              </tr>
            </thead>
            <tbody className='text-muted-foreground'>
              <tr className='border-b'>
                <td className='py-2 font-mono text-foreground'>kimi-2.5</td>
                <td className='py-2'>Moonshot AI</td>
                <td className='py-2'>200K</td>
                <td className='py-2'>{t('docs.home.model_kimi_feature')}</td>
              </tr>
              <tr className='border-b'>
                <td className='py-2 font-mono text-foreground'>qwen-3.5</td>
                <td className='py-2'>{t('docs.home.model_qwen_provider')}</td>
                <td className='py-2'>128K</td>
                <td className='py-2'>{t('docs.home.model_qwen_feature')}</td>
              </tr>
              <tr className='border-b'>
                <td className='py-2 font-mono text-foreground'>glm-5</td>
                <td className='py-2'>{t('docs.home.model_glm_provider')}</td>
                <td className='py-2'>128K</td>
                <td className='py-2'>{t('docs.home.model_glm_feature')}</td>
              </tr>
              <tr className='border-b'>
                <td className='py-2 font-mono text-foreground'>deepseek-v3</td>
                <td className='py-2'>DeepSeek</td>
                <td className='py-2'>128K</td>
                <td className='py-2'>{t('docs.home.model_deepseek_feature')}</td>
              </tr>
              <tr>
                <td className='py-2 font-mono text-foreground'>doubao-pro</td>
                <td className='py-2'>{t('docs.home.model_doubao_provider')}</td>
                <td className='py-2'>128K</td>
                <td className='py-2'>{t('docs.home.model_doubao_feature')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className='text-sm text-muted-foreground'>
          {t('docs.home.models_more')}{' '}
          <Link to='/docs/api' className='text-primary hover:underline'>
            {t('docs.home.models_more_link')}
          </Link>
          。
        </p>
      </div>
    </div>
  );
};

export default DocsHome;
