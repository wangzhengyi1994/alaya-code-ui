import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Copy } from 'lucide-react';
import { copy, showSuccess, showError } from '../../helpers';

const ApiKeyCopyButton = ({ tokenKey }) => {
  const { t } = useTranslation();
  const baseUrl = window.location.origin;

  const copyFormats = [
    {
      label: t('console.api_key_copy.copy_key'),
      getValue: () => tokenKey,
    },
    {
      label: t('console.api_key_copy.cursor'),
      getValue: () => `OPENAI_API_KEY=${tokenKey}\nOPENAI_BASE_URL=${baseUrl}/v1`,
    },
    {
      label: t('console.api_key_copy.claude_code'),
      getValue: () => JSON.stringify({
        name: 'Alaya Code',
        baseUrl: `${baseUrl}/anthropic/v1`,
        apiKey: tokenKey,
      }, null, 2),
    },
    {
      label: t('console.api_key_copy.openai_sdk'),
      getValue: () => `from openai import OpenAI\nclient = OpenAI(api_key="${tokenKey}", base_url="${baseUrl}/v1")`,
    },
  ];

  const handleCopy = async (format) => {
    const text = format.getValue();
    const ok = await copy(text);
    if (ok) {
      showSuccess(t('console.api_key_copy.copied', { label: format.label }));
    } else {
      showError(t('console.api_key_copy.copy_failed'));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='h-6 w-6'>
          <Copy className='h-3 w-3' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {copyFormats.map((format, i) => (
          <DropdownMenuItem key={i} onClick={() => handleCopy(format)}>
            {format.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyCopyButton;
