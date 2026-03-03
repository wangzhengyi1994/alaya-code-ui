import React from 'react';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { useTranslation } from 'react-i18next';

const DocsErrors = () => {
  const { t } = useTranslation();

  const errorCodes = [
    {
      code: 400,
      status: 'Bad Request',
      description: t('docs.errors.400_desc'),
      cause: t('docs.errors.400_cause'),
      solution: t('docs.errors.400_solution'),
    },
    {
      code: 401,
      status: 'Unauthorized',
      description: t('docs.errors.401_desc'),
      cause: t('docs.errors.401_cause'),
      solution: t('docs.errors.401_solution'),
    },
    {
      code: 402,
      status: 'Payment Required',
      description: t('docs.errors.402_desc'),
      cause: t('docs.errors.402_cause'),
      solution: t('docs.errors.402_solution'),
    },
    {
      code: 403,
      status: 'Forbidden',
      description: t('docs.errors.403_desc'),
      cause: t('docs.errors.403_cause'),
      solution: t('docs.errors.403_solution'),
    },
    {
      code: 404,
      status: 'Not Found',
      description: t('docs.errors.404_desc'),
      cause: t('docs.errors.404_cause'),
      solution: t('docs.errors.404_solution'),
    },
    {
      code: 429,
      status: 'Too Many Requests',
      description: t('docs.errors.429_desc'),
      cause: t('docs.errors.429_cause'),
      solution: t('docs.errors.429_solution'),
    },
    {
      code: 500,
      status: 'Internal Server Error',
      description: t('docs.errors.500_desc'),
      cause: t('docs.errors.500_cause'),
      solution: t('docs.errors.500_solution'),
    },
    {
      code: 502,
      status: 'Bad Gateway',
      description: t('docs.errors.502_desc'),
      cause: t('docs.errors.502_cause'),
      solution: t('docs.errors.502_solution'),
    },
    {
      code: 503,
      status: 'Service Unavailable',
      description: t('docs.errors.503_desc'),
      cause: t('docs.errors.503_cause'),
      solution: t('docs.errors.503_solution'),
    },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t('docs.errors.title')}</h1>
        <p className='mt-2 text-lg text-muted-foreground'>
          {t('docs.errors.description')}
        </p>
      </div>

      {/* Error Response Format */}
      <div className='space-y-3'>
        <h2 className='text-2xl font-semibold'>{t('docs.errors.format_title')}</h2>
        <p className='text-muted-foreground'>
          {t('docs.errors.format_desc')}
        </p>
        <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
          <code>{`{
  "error": {
    "message": "Error description",
    "type": "error_type",
    "code": "error_code"
  }
}`}</code>
        </pre>
      </div>

      {/* Error Codes Table */}
      <div className='space-y-3'>
        <h2 className='text-2xl font-semibold'>{t('docs.errors.codes_title')}</h2>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[80px]'>{t('docs.errors.col_code')}</TableHead>
                <TableHead className='w-[120px]'>{t('docs.errors.col_status')}</TableHead>
                <TableHead className='w-[120px]'>{t('docs.errors.col_desc')}</TableHead>
                <TableHead>{t('docs.errors.col_cause')}</TableHead>
                <TableHead>{t('docs.errors.col_solution')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {errorCodes.map((error) => (
                <TableRow key={error.code}>
                  <TableCell>
                    <Badge
                      variant={error.code >= 500 ? 'destructive' : error.code >= 400 ? 'secondary' : 'default'}
                    >
                      {error.code}
                    </Badge>
                  </TableCell>
                  <TableCell className='font-mono text-xs'>
                    {error.status}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {error.description}
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {error.cause}
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {error.solution}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Retry Strategy */}
      <div className='space-y-3'>
        <h2 className='text-2xl font-semibold'>{t('docs.errors.retry_title')}</h2>
        <p className='text-muted-foreground'>
          {t('docs.errors.retry_desc')}
        </p>
        <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
          <code>{`async function callWithRetry(fn, maxRetries = 3) {
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
}`}</code>
        </pre>
      </div>

      {/* Rate Limit Headers */}
      <div className='space-y-3'>
        <h2 className='text-2xl font-semibold'>{t('docs.errors.headers_title')}</h2>
        <p className='text-muted-foreground'>
          {t('docs.errors.headers_desc')}
        </p>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='pb-2 text-left font-medium'>Header</th>
                <th className='pb-2 text-left font-medium'>{t('docs.errors.header_desc_col')}</th>
              </tr>
            </thead>
            <tbody className='text-muted-foreground'>
              <tr className='border-b'>
                <td className='py-2 font-mono text-foreground'>x-ratelimit-limit-requests</td>
                <td className='py-2'>{t('docs.errors.header_limit')}</td>
              </tr>
              <tr className='border-b'>
                <td className='py-2 font-mono text-foreground'>x-ratelimit-remaining-requests</td>
                <td className='py-2'>{t('docs.errors.header_remaining')}</td>
              </tr>
              <tr className='border-b'>
                <td className='py-2 font-mono text-foreground'>x-ratelimit-reset-requests</td>
                <td className='py-2'>{t('docs.errors.header_reset')}</td>
              </tr>
              <tr>
                <td className='py-2 font-mono text-foreground'>retry-after</td>
                <td className='py-2'>{t('docs.errors.header_retry')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className='space-y-3'>
        <h2 className='text-2xl font-semibold'>{t('docs.errors.troubleshoot_title')}</h2>
        <div className='space-y-2 rounded-lg border p-4'>
          <ol className='ml-4 list-decimal space-y-2 text-sm text-muted-foreground'>
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
