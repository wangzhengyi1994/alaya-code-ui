import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useTranslation } from 'react-i18next';

const DocsApi = () => {
  const { t } = useTranslation();

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t('docs.api.title')}</h1>
        <p className='mt-2 text-lg text-muted-foreground'>
          {t('docs.api.description')}
        </p>
      </div>

      {/* Base URL */}
      <div className='space-y-3'>
        <h2 className='text-2xl font-semibold'>Base URL</h2>
        <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
          <code>https://api.alayanew.com</code>
        </pre>
      </div>

      {/* Authentication */}
      <div className='space-y-3'>
        <h2 className='text-2xl font-semibold'>{t('docs.api.auth_title')}</h2>
        <p className='text-muted-foreground'>
          {t('docs.api.auth_desc')}
        </p>
        <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
          <code>Authorization: Bearer sk-your-api-key-here</code>
        </pre>
        <p className='text-sm text-muted-foreground'>
          {t('docs.api.auth_manage_prefix')}{' '}
          <Link to='/keys' className='text-primary hover:underline'>
            {t('docs.api.auth_manage_link')}
          </Link>{' '}
          {t('docs.api.auth_manage_suffix')}
        </p>
      </div>

      {/* API Endpoints */}
      <div className='space-y-6'>
        <h2 className='text-2xl font-semibold'>{t('docs.api.endpoints_title')}</h2>

        <Tabs defaultValue='openai'>
          <TabsList>
            <TabsTrigger value='openai'>{t('docs.api.tab_openai')}</TabsTrigger>
            <TabsTrigger value='anthropic'>{t('docs.api.tab_anthropic')}</TabsTrigger>
          </TabsList>

          <TabsContent value='openai' className='space-y-6 pt-4'>
            {/* Chat Completions */}
            <div className='space-y-3 rounded-lg border p-4'>
              <div className='flex items-center gap-2'>
                <Badge className='bg-green-600 text-white'>POST</Badge>
                <code className='text-sm font-semibold'>/v1/chat/completions</code>
              </div>
              <p className='text-sm text-muted-foreground'>
                {t('docs.api.chat_desc')}
              </p>
              <h4 className='text-sm font-semibold'>{t('docs.api.request_example')}</h4>
              <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
                <code>{`curl https://api.alayanew.com/v1/chat/completions \\
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
  }'`}</code>
              </pre>
              <h4 className='text-sm font-semibold'>{t('docs.api.response_example')}</h4>
              <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
                <code>{`{
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
}`}</code>
              </pre>
              <h4 className='text-sm font-semibold'>{t('docs.api.common_params')}</h4>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b'>
                      <th className='pb-2 text-left font-medium'>{t('docs.api.param_name')}</th>
                      <th className='pb-2 text-left font-medium'>{t('docs.api.param_type')}</th>
                      <th className='pb-2 text-left font-medium'>{t('docs.api.param_desc')}</th>
                    </tr>
                  </thead>
                  <tbody className='text-muted-foreground'>
                    <tr className='border-b'>
                      <td className='py-2 font-mono text-foreground'>model</td>
                      <td className='py-2'>string</td>
                      <td className='py-2'>{t('docs.api.param_model_desc')}</td>
                    </tr>
                    <tr className='border-b'>
                      <td className='py-2 font-mono text-foreground'>messages</td>
                      <td className='py-2'>array</td>
                      <td className='py-2'>{t('docs.api.param_messages_desc')}</td>
                    </tr>
                    <tr className='border-b'>
                      <td className='py-2 font-mono text-foreground'>temperature</td>
                      <td className='py-2'>number</td>
                      <td className='py-2'>{t('docs.api.param_temperature_desc')}</td>
                    </tr>
                    <tr className='border-b'>
                      <td className='py-2 font-mono text-foreground'>stream</td>
                      <td className='py-2'>boolean</td>
                      <td className='py-2'>{t('docs.api.param_stream_desc')}</td>
                    </tr>
                    <tr>
                      <td className='py-2 font-mono text-foreground'>max_tokens</td>
                      <td className='py-2'>integer</td>
                      <td className='py-2'>{t('docs.api.param_max_tokens_desc')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Embeddings */}
            <div className='space-y-3 rounded-lg border p-4'>
              <div className='flex items-center gap-2'>
                <Badge className='bg-green-600 text-white'>POST</Badge>
                <code className='text-sm font-semibold'>/v1/embeddings</code>
              </div>
              <p className='text-sm text-muted-foreground'>
                {t('docs.api.embeddings_desc')}
              </p>
              <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
                <code>{`curl https://api.alayanew.com/v1/embeddings \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-xxx" \\
  -d '{
    "model": "text-embedding-v3",
    "input": "Hello world"
  }'`}</code>
              </pre>
            </div>

            {/* Models */}
            <div className='space-y-3 rounded-lg border p-4'>
              <div className='flex items-center gap-2'>
                <Badge className='bg-blue-600 text-white'>GET</Badge>
                <code className='text-sm font-semibold'>/v1/models</code>
              </div>
              <p className='text-sm text-muted-foreground'>
                {t('docs.api.models_desc')}
              </p>
              <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
                <code>{`curl https://api.alayanew.com/v1/models \\
  -H "Authorization: Bearer sk-xxx"`}</code>
              </pre>
            </div>
          </TabsContent>

          <TabsContent value='anthropic' className='space-y-6 pt-4'>
            <div className='space-y-3 rounded-lg border p-4'>
              <div className='flex items-center gap-2'>
                <Badge className='bg-green-600 text-white'>POST</Badge>
                <code className='text-sm font-semibold'>/anthropic/v1/messages</code>
              </div>
              <p className='text-sm text-muted-foreground'>
                {t('docs.api.anthropic_desc')}
              </p>
              <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
                <code>{`curl https://api.alayanew.com/anthropic/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: sk-xxx" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "kimi-2.5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'`}</code>
              </pre>
              <p className='mt-2 text-sm text-muted-foreground'>
                {t('docs.api.anthropic_note')}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rate Limits */}
      <div className='space-y-3'>
        <h2 className='text-2xl font-semibold'>{t('docs.api.rate_limits_title')}</h2>
        <p className='text-muted-foreground'>
          {t('docs.api.rate_limits_desc')}
        </p>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='pb-2 text-left font-medium'>{t('docs.api.rate_plan')}</th>
                <th className='pb-2 text-left font-medium'>{t('docs.api.rate_rpm')}</th>
                <th className='pb-2 text-left font-medium'>{t('docs.api.rate_tpm')}</th>
              </tr>
            </thead>
            <tbody className='text-muted-foreground'>
              <tr className='border-b'>
                <td className='py-2 font-medium text-foreground'>Lite</td>
                <td className='py-2'>20</td>
                <td className='py-2'>40,000</td>
              </tr>
              <tr className='border-b'>
                <td className='py-2 font-medium text-foreground'>Pro</td>
                <td className='py-2'>60</td>
                <td className='py-2'>200,000</td>
              </tr>
              <tr className='border-b'>
                <td className='py-2 font-medium text-foreground'>Max 5x</td>
                <td className='py-2'>120</td>
                <td className='py-2'>500,000</td>
              </tr>
              <tr>
                <td className='py-2 font-medium text-foreground'>Max 20x</td>
                <td className='py-2'>300</td>
                <td className='py-2'>1,000,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocsApi;
