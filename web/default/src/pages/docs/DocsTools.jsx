import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useTranslation } from 'react-i18next';

const CodeBlock = ({ children }) => (
  <pre className='overflow-x-auto border border-[#e1e7ef] bg-[#0a0f1a] p-4 text-sm text-xyz-white-7 font-code'>
    <code>{children}</code>
  </pre>
);

const InlineCode = ({ children }) => (
  <code className='bg-[#f0f5ff] px-1.5 py-0.5 text-xyz-blue-6 font-code text-xs'>{children}</code>
);

const DocsTools = () => {
  const { t } = useTranslation();

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-medium tracking-tight text-[#090e1a]'>{t('docs.tools.title')}</h1>
        <p className='mt-2 text-base font-normal text-[#344256]'>
          {t('docs.tools.description')}
        </p>
      </div>

      <Tabs defaultValue='cursor'>
        <TabsList className='flex-wrap bg-[#f8fafc] border border-[#e1e7ef]'>
          <TabsTrigger value='cursor' className='data-[state=active]:bg-xyz-blue-6 data-[state=active]:text-white text-[#344256]'>Cursor</TabsTrigger>
          <TabsTrigger value='claude-code' className='data-[state=active]:bg-xyz-blue-6 data-[state=active]:text-white text-[#344256]'>Claude Code</TabsTrigger>
          <TabsTrigger value='cline' className='data-[state=active]:bg-xyz-blue-6 data-[state=active]:text-white text-[#344256]'>VSCode + Cline</TabsTrigger>
          <TabsTrigger value='opencode' className='data-[state=active]:bg-xyz-blue-6 data-[state=active]:text-white text-[#344256]'>OpenCode</TabsTrigger>
        </TabsList>

        <TabsContent value='cursor' className='pt-4'>
          <div className='border border-[#e1e7ef] p-6 space-y-5'>
            <div>
              <h3 className='text-lg font-medium text-[#090e1a]'>{t('docs.tools.cursor_title')}</h3>
              <p className='mt-1 text-sm font-normal text-[#344256]'>{t('docs.tools.cursor_desc')}</p>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.cursor_step1')}</h4>
              <p className='text-sm font-normal text-[#344256]'>{t('docs.tools.cursor_step1_desc')}</p>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.cursor_step2')}</h4>
              <p className='text-sm font-normal text-[#344256]'>{t('docs.tools.cursor_step2_desc')}</p>
              <ul className='ml-4 list-disc space-y-1 text-sm font-normal text-[#344256]'>
                <li><strong className='text-[#090e1a]'>Model Name:</strong> <InlineCode>kimi-2.5</InlineCode></li>
                <li><strong className='text-[#090e1a]'>API Key:</strong> {t('docs.tools.your_api_key')}</li>
                <li><strong className='text-[#090e1a]'>API Base URL:</strong> <InlineCode>https://api.alayanew.com/v1</InlineCode></li>
              </ul>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.cursor_step3')}</h4>
              <p className='text-sm font-normal text-[#344256]'>{t('docs.tools.cursor_step3_desc')}</p>
            </div>

            <div className='border-l-2 border-xyz-blue-6 bg-[#f0f5ff] pl-4 py-3'>
              <p className='text-sm font-normal text-[#344256]'>
                <strong className='text-[#090e1a]'>{t('docs.tools.tip')}:</strong> {t('docs.tools.cursor_tip')}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='claude-code' className='pt-4'>
          <div className='border border-[#e1e7ef] p-6 space-y-5'>
            <div>
              <h3 className='text-lg font-medium text-[#090e1a]'>{t('docs.tools.claude_title')}</h3>
              <p className='mt-1 text-sm font-normal text-[#344256]'>{t('docs.tools.claude_desc')}</p>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.claude_method1')}</h4>
              <p className='text-sm font-normal text-[#344256]'>{t('docs.tools.claude_method1_desc')}</p>
              <CodeBlock>{`# ~/.bashrc or ~/.zshrc
export ANTHROPIC_BASE_URL=https://api.alayanew.com/anthropic
export ANTHROPIC_API_KEY=sk-your-api-key`}</CodeBlock>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.claude_method2')}</h4>
              <CodeBlock>{`ANTHROPIC_BASE_URL=https://api.alayanew.com/anthropic \\
ANTHROPIC_API_KEY=sk-your-api-key \\
claude`}</CodeBlock>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.verify_connection')}</h4>
              <CodeBlock>{`# Start Claude Code
claude

# Test with a question
> Hello, please introduce yourself`}</CodeBlock>
            </div>

            <div className='border-l-2 border-xyz-blue-6 bg-[#f0f5ff] pl-4 py-3'>
              <p className='text-sm font-normal text-[#344256]'>
                <strong className='text-[#090e1a]'>{t('docs.tools.note')}:</strong> {t('docs.tools.claude_note')}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='cline' className='pt-4'>
          <div className='border border-[#e1e7ef] p-6 space-y-5'>
            <div>
              <h3 className='text-lg font-medium text-[#090e1a]'>{t('docs.tools.cline_title')}</h3>
              <p className='mt-1 text-sm font-normal text-[#344256]'>{t('docs.tools.cline_desc')}</p>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.cline_step1')}</h4>
              <p className='text-sm font-normal text-[#344256]'>{t('docs.tools.cline_step1_desc')}</p>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.cline_step2')}</h4>
              <p className='text-sm font-normal text-[#344256]'>{t('docs.tools.cline_step2_desc')}</p>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.cline_step3')}</h4>
              <p className='text-sm font-normal text-[#344256]'>{t('docs.tools.cline_step3_desc')}</p>
              <ul className='ml-4 list-disc space-y-1 text-sm font-normal text-[#344256]'>
                <li><strong className='text-[#090e1a]'>API Base URL:</strong> <InlineCode>https://api.alayanew.com/v1</InlineCode></li>
                <li><strong className='text-[#090e1a]'>API Key:</strong> {t('docs.tools.your_api_key')}</li>
                <li><strong className='text-[#090e1a]'>Model ID:</strong> <InlineCode>kimi-2.5</InlineCode></li>
              </ul>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.cline_step4')}</h4>
              <p className='text-sm font-normal text-[#344256]'>{t('docs.tools.cline_step4_desc')}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='opencode' className='pt-4'>
          <div className='border border-[#e1e7ef] p-6 space-y-5'>
            <div>
              <h3 className='text-lg font-medium text-[#090e1a]'>{t('docs.tools.opencode_title')}</h3>
              <p className='mt-1 text-sm font-normal text-[#344256]'>{t('docs.tools.opencode_desc')}</p>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.opencode_config')}</h4>
              <p className='text-sm font-normal text-[#344256]'>{t('docs.tools.opencode_config_desc')}</p>
              <CodeBlock>{`# ~/.opencode/config.yaml
providers:
  alayacode:
    type: openai
    base_url: https://api.alayanew.com/v1
    api_key: sk-your-api-key
    models:
      - kimi-2.5
      - qwen-3.5
      - glm-5

default_provider: alayacode
default_model: kimi-2.5`}</CodeBlock>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-[#090e1a]'>{t('docs.tools.opencode_env')}</h4>
              <CodeBlock>{`export OPENAI_API_BASE=https://api.alayanew.com/v1
export OPENAI_API_KEY=sk-your-api-key
opencode`}</CodeBlock>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* General Tips */}
      <div className='space-y-3'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.tools.general_tips')}</h2>
        <div className='border border-[#e1e7ef] p-5'>
          <ul className='ml-4 list-disc space-y-2 text-sm font-normal text-[#344256]'>
            <li>{t('docs.tools.tip1')}</li>
            <li>{t('docs.tools.tip2')}</li>
            <li>{t('docs.tools.tip3')}</li>
            <li>{t('docs.tools.tip4')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocsTools;
