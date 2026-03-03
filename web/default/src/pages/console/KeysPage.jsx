import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import ApiKeyTable from '../../components/business/ApiKeyTable';
import ToolConfigSnippet from '../../components/business/ToolConfigSnippet';
import { API } from '../../helpers';

const KeysPage = () => {
  const { t } = useTranslation();
  const [firstKey, setFirstKey] = useState(null);

  useEffect(() => {
    loadFirstKey();
  }, []);

  const loadFirstKey = async () => {
    try {
      const res = await API.get('/api/token/?p=0');
      if (res.data.success && res.data.data && res.data.data.length > 0) {
        setFirstKey(`sk-${res.data.data[0].key}`);
      }
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{t('console.keys.title')}</h1>
        <p className='text-muted-foreground'>
          {t('console.keys.subtitle')}
        </p>
      </div>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium'>{t('console.keys.key_list')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ApiKeyTable />
        </CardContent>
      </Card>

      <ToolConfigSnippet apiKey={firstKey} />
    </div>
  );
};

export default KeysPage;
