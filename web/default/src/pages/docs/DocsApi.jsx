import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useTranslation } from 'react-i18next';

const CodeBlock = ({ children }) => (
  <pre className='overflow-x-auto border border-[#e1e7ef] bg-[#0a0f1a] p-4 text-sm text-xyz-white-7 font-code'>
    <code>{children}</code>
  </pre>
);

const DocsApi = () => {
  const { t } = useTranslation();

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-medium tracking-tight text-[#090e1a]'>{t('docs.api.title')}</h1>
        <p className='mt-2 text-base font-normal text-[#344256]'>
          {t('docs.api.description')}
        </p>
      </div>

      {/* Base URL */}
      <div className='space-y-3'>
        <h2 className='text-xl font-medium text-[#090e1a]'>Base URL</h2>
        <CodeBlock>https://api.alayanew.com</CodeBlock>
      </div>

      {/* Authentication */}
      <div className='space-y-3'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.api.auth_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>
          {t('docs.api.auth_desc')}
        </p>
        <CodeBlock>Authorization: Bearer sk-your-api-key-here</CodeBlock>
        <p className='text-sm font-normal text-[#344256]'>
          {t('docs.api.auth_manage_prefix')}{' '}
          <Link to='/keys' className='text-xyz-blue-6 hover:text-xyz-blue-5 no-underline'>
            {t('docs.api.auth_manage_link')}
          </Link>{' '}
          {t('docs.api.auth_manage_suffix')}
        </p>
      </div>

      {/* API Endpoints */}
      <div className='space-y-6'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.api.endpoints_title')}</h2>

        <Tabs defaultValue='openai'>
          <TabsList className='bg-[#f8fafc] border border-[#e1e7ef]'>
            <TabsTrigger value='openai' className='data-[state=active]:bg-xyz-blue-6 data-[state=active]:text-white text-[#344256]'>{t('docs.api.tab_openai')}</TabsTrigger>
            <TabsTrigger value='anthropic' className='data-[state=active]:bg-xyz-blue-6 data-[state=active]:text-white text-[#344256]'>{t('docs.api.tab_anthropic')}</TabsTrigger>
          </TabsList>

          <TabsContent value='openai' className='space-y-6 pt-4'>
            {/* Chat Completions */}
            <div className='space-y-4 border border-[#e1e7ef] p-5'>
              <div className='flex items-center gap-2'>
                <span className='text-xs font-medium text-white bg-green-600 px-2 py-0.5'>POST</span>
                <code className='text-sm font-medium text-[#090e1a] font-code'>/v1/chat/completions</code>
              </div>
              <p className='text-sm font-normal text-[#344256]'>
                {t('docs.api.chat_desc')}
              </p>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.api.request_example')}</h4>
              <CodeBlock>{`curl https://api.alayanew.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-xxx" \\
  -d '{
    "model": "kimi-2.5",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant"},
      {"role": "user", "content": "Hello"}
    ],
    "temperature": 0.7,
    "stream": false
  }'`}</CodeBlock>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.api.response_example')}</h4>
              <CodeBlock>{`{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "kimi-2.5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 15,
    "total_tokens": 35
  }
}`}</CodeBlock>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.api.common_params')}</h4>
              <div className='overflow-x-auto border border-[#e1e7ef]'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b border-[#e1e7ef] bg-[#f8fafc]'>
                      <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.api.param_name')}</th>
                      <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.api.param_type')}</th>
                      <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.api.param_desc')}</th>
                    </tr>
                  </thead>
                  <tbody className='text-[#344256]'>
                    <tr className='border-b border-[#e1e7ef]'>
                      <td className='px-4 py-3 font-code text-[#090e1a]'>model</td>
                      <td className='px-4 py-3 font-normal'>string</td>
                      <td className='px-4 py-3 font-normal'>{t('docs.api.param_model_desc')}</td>
                    </tr>
                    <tr className='border-b border-[#e1e7ef]'>
                      <td className='px-4 py-3 font-code text-[#090e1a]'>messages</td>
                      <td className='px-4 py-3 font-normal'>array</td>
                      <td className='px-4 py-3 font-normal'>{t('docs.api.param_messages_desc')}</td>
                    </tr>
                    <tr className='border-b border-[#e1e7ef]'>
                      <td className='px-4 py-3 font-code text-[#090e1a]'>temperature</td>
                      <td className='px-4 py-3 font-normal'>number</td>
                      <td className='px-4 py-3 font-normal'>{t('docs.api.param_temperature_desc')}</td>
                    </tr>
                    <tr className='border-b border-[#e1e7ef]'>
                      <td className='px-4 py-3 font-code text-[#090e1a]'>stream</td>
                      <td className='px-4 py-3 font-normal'>boolean</td>
                      <td className='px-4 py-3 font-normal'>{t('docs.api.param_stream_desc')}</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-3 font-code text-[#090e1a]'>max_tokens</td>
                      <td className='px-4 py-3 font-normal'>integer</td>
                      <td className='px-4 py-3 font-normal'>{t('docs.api.param_max_tokens_desc')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Embeddings */}
            <div className='space-y-4 border border-[#e1e7ef] p-5'>
              <div className='flex items-center gap-2'>
                <span className='text-xs font-medium text-white bg-green-600 px-2 py-0.5'>POST</span>
                <code className='text-sm font-medium text-[#090e1a] font-code'>/v1/embeddings</code>
              </div>
              <p className='text-sm font-normal text-[#344256]'>
                {t('docs.api.embeddings_desc')}
              </p>
              <CodeBlock>{`curl https://api.alayanew.com/v1/embeddings \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-xxx" \\
  -d '{
    "model": "text-embedding-v3",
    "input": "Hello world"
  }'`}</CodeBlock>
            </div>

            {/* Models */}
            <div className='space-y-4 border border-[#e1e7ef] p-5'>
              <div className='flex items-center gap-2'>
                <span className='text-xs font-medium text-white bg-xyz-blue-6 px-2 py-0.5'>GET</span>
                <code className='text-sm font-medium text-[#090e1a] font-code'>/v1/models</code>
              </div>
              <p className='text-sm font-normal text-[#344256]'>
                {t('docs.api.models_desc')}
              </p>
              <CodeBlock>{`curl https://api.alayanew.com/v1/models \\
  -H "Authorization: Bearer sk-xxx"`}</CodeBlock>
            </div>
          </TabsContent>

          <TabsContent value='anthropic' className='space-y-6 pt-4'>
            <div className='space-y-4 border border-[#e1e7ef] p-5'>
              <div className='flex items-center gap-2'>
                <span className='text-xs font-medium text-white bg-green-600 px-2 py-0.5'>POST</span>
                <code className='text-sm font-medium text-[#090e1a] font-code'>/anthropic/v1/messages</code>
              </div>
              <p className='text-sm font-normal text-[#344256]'>
                {t('docs.api.anthropic_desc')}
              </p>
              <CodeBlock>{`curl https://api.alayanew.com/anthropic/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: sk-xxx" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "kimi-2.5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'`}</CodeBlock>
              <p className='mt-2 text-sm font-normal text-[#344256]'>
                {t('docs.api.anthropic_note')}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rate Limits */}
      <div className='space-y-3'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.api.rate_limits_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>
          {t('docs.api.rate_limits_desc')}
        </p>
        <div className='overflow-x-auto border border-[#e1e7ef]'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-[#e1e7ef] bg-[#f8fafc]'>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.api.rate_plan')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.api.rate_rpm')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.api.rate_tpm')}</th>
              </tr>
            </thead>
            <tbody className='text-[#344256]'>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-medium text-[#090e1a]'>Lite</td>
                <td className='px-4 py-3 font-normal'>20</td>
                <td className='px-4 py-3 font-normal'>40,000</td>
              </tr>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-medium text-[#090e1a]'>Pro</td>
                <td className='px-4 py-3 font-normal'>60</td>
                <td className='px-4 py-3 font-normal'>200,000</td>
              </tr>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-medium text-[#090e1a]'>Max 5x</td>
                <td className='px-4 py-3 font-normal'>120</td>
                <td className='px-4 py-3 font-normal'>500,000</td>
              </tr>
              <tr>
                <td className='px-4 py-3 font-medium text-[#090e1a]'>Max 20x</td>
                <td className='px-4 py-3 font-normal'>300</td>
                <td className='px-4 py-3 font-normal'>1,000,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocsApi;
