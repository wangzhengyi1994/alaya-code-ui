import React from 'react';
import { useTranslation } from 'react-i18next';

const CodeBlock = ({ children }) => (
  <pre className='overflow-x-auto border border-[#e1e7ef] bg-[#0a0f1a] p-4 text-sm text-xyz-white-7 font-code'>
    <code>{children}</code>
  </pre>
);

const DocsErrors = () => {
  const { t } = useTranslation();

  const errorCodes = [
    { code: 400, status: 'Bad Request', description: t('docs.errors.400_desc'), cause: t('docs.errors.400_cause'), solution: t('docs.errors.400_solution') },
    { code: 401, status: 'Unauthorized', description: t('docs.errors.401_desc'), cause: t('docs.errors.401_cause'), solution: t('docs.errors.401_solution') },
    { code: 402, status: 'Payment Required', description: t('docs.errors.402_desc'), cause: t('docs.errors.402_cause'), solution: t('docs.errors.402_solution') },
    { code: 403, status: 'Forbidden', description: t('docs.errors.403_desc'), cause: t('docs.errors.403_cause'), solution: t('docs.errors.403_solution') },
    { code: 404, status: 'Not Found', description: t('docs.errors.404_desc'), cause: t('docs.errors.404_cause'), solution: t('docs.errors.404_solution') },
    { code: 429, status: 'Too Many Requests', description: t('docs.errors.429_desc'), cause: t('docs.errors.429_cause'), solution: t('docs.errors.429_solution') },
    { code: 500, status: 'Internal Server Error', description: t('docs.errors.500_desc'), cause: t('docs.errors.500_cause'), solution: t('docs.errors.500_solution') },
    { code: 502, status: 'Bad Gateway', description: t('docs.errors.502_desc'), cause: t('docs.errors.502_cause'), solution: t('docs.errors.502_solution') },
    { code: 503, status: 'Service Unavailable', description: t('docs.errors.503_desc'), cause: t('docs.errors.503_cause'), solution: t('docs.errors.503_solution') },
  ];

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-medium tracking-tight text-[#090e1a]'>{t('docs.errors.title')}</h1>
        <p className='mt-2 text-base font-normal text-[#344256]'>
          {t('docs.errors.description')}
        </p>
      </div>

      {/* Error Response Format */}
      <div className='space-y-3'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.errors.format_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>{t('docs.errors.format_desc')}</p>
        <CodeBlock>{`{
  "error": {
    "message": "Error description",
    "type": "error_type",
    "code": "error_code"
  }
}`}</CodeBlock>
      </div>

      {/* Error Codes Table */}
      <div className='space-y-3'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.errors.codes_title')}</h2>
        <div className='overflow-x-auto border border-[#e1e7ef]'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-[#e1e7ef] bg-[#f8fafc]'>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider w-[80px]'>{t('docs.errors.col_code')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider w-[120px]'>{t('docs.errors.col_status')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider w-[120px]'>{t('docs.errors.col_desc')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.errors.col_cause')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.errors.col_solution')}</th>
              </tr>
            </thead>
            <tbody className='text-[#344256]'>
              {errorCodes.map((error) => (
                <tr key={error.code} className='border-b border-[#e1e7ef]'>
                  <td className='px-4 py-3'>
                    <span className={`text-xs font-medium px-2 py-0.5 ${error.code >= 500 ? 'bg-red-50 text-red-600' : 'bg-[#f0f5ff] text-[#090e1a]'}`}>
                      {error.code}
                    </span>
                  </td>
                  <td className='px-4 py-3 font-code text-xs text-[#344256]'>{error.status}</td>
                  <td className='px-4 py-3 font-medium text-[#090e1a]'>{error.description}</td>
                  <td className='px-4 py-3 font-normal'>{error.cause}</td>
                  <td className='px-4 py-3 font-normal'>{error.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Retry Strategy */}
      <div className='space-y-3'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.errors.retry_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>{t('docs.errors.retry_desc')}</p>
        <CodeBlock>{`async function callWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 || error.status >= 500) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}`}</CodeBlock>
      </div>

      {/* Rate Limit Headers */}
      <div className='space-y-3'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.errors.headers_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>{t('docs.errors.headers_desc')}</p>
        <div className='overflow-x-auto border border-[#e1e7ef]'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-[#e1e7ef] bg-[#f8fafc]'>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>Header</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.errors.header_desc_col')}</th>
              </tr>
            </thead>
            <tbody className='text-[#344256]'>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-code text-[#090e1a]'>x-ratelimit-limit-requests</td>
                <td className='px-4 py-3 font-normal'>{t('docs.errors.header_limit')}</td>
              </tr>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-code text-[#090e1a]'>x-ratelimit-remaining-requests</td>
                <td className='px-4 py-3 font-normal'>{t('docs.errors.header_remaining')}</td>
              </tr>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-code text-[#090e1a]'>x-ratelimit-reset-requests</td>
                <td className='px-4 py-3 font-normal'>{t('docs.errors.header_reset')}</td>
              </tr>
              <tr>
                <td className='px-4 py-3 font-code text-[#090e1a]'>retry-after</td>
                <td className='px-4 py-3 font-normal'>{t('docs.errors.header_retry')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className='space-y-3'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.errors.troubleshoot_title')}</h2>
        <div className='border border-[#e1e7ef] p-5'>
          <ol className='ml-4 list-decimal space-y-2 text-sm font-normal text-[#344256]'>
            <li>{t('docs.errors.troubleshoot_1')}</li>
            <li>{t('docs.errors.troubleshoot_2')}</li>
            <li>{t('docs.errors.troubleshoot_3')}</li>
            <li>{t('docs.errors.troubleshoot_4')}</li>
            <li>{t('docs.errors.troubleshoot_5')}</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DocsErrors;
