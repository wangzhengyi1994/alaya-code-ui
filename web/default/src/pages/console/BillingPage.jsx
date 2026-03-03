import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API, showError } from '../../helpers';
import BillingTable from '../../components/business/BillingTable';

const BillingPage = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/api/order/self?p=${page}`);
      if (res.data.success) {
        setOrders(res.data.data || []);
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.billing.load_failed'));
    }
    setLoading(false);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{t('console.billing.title')}</h1>
        <p className='text-muted-foreground'>{t('console.billing.subtitle')}</p>
      </div>

      <BillingTable
        orders={orders}
        loading={loading}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default BillingPage;
