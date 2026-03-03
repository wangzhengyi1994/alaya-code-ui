import React, { useEffect, useState } from 'react';
import { API, showError } from '../../helpers';
import StatCard from '../../components/business/StatCard';
import ModelUsageChart from '../../components/business/ModelUsageChart';
import { Activity, Users, Hash, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [modelStats, setModelStats] = useState([]);
  const [, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [overviewRes, modelRes] = await Promise.all([
        API.get('/api/admin/usage/overview'),
        API.get('/api/admin/usage/by-model'),
      ]);

      if (overviewRes.data.success) {
        setOverview(overviewRes.data.data);
      }
      if (modelRes.data.success) {
        setModelStats(modelRes.data.data || []);
      }
    } catch (err) {
      showError(t('admin.dashboard.load_error'));
    }
    setLoading(false);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{t('admin.dashboard.title')}</h1>
        <p className='text-muted-foreground'>{t('admin.dashboard.description')}</p>
      </div>

      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title={t('admin.dashboard.requests_24h')}
          value={overview?.total_requests_24h?.toLocaleString() || '0'}
          icon={Activity}
        />
        <StatCard
          title={t('admin.dashboard.tokens_24h')}
          value={overview?.total_tokens_24h?.toLocaleString() || '0'}
          icon={Hash}
        />
        <StatCard
          title={t('admin.dashboard.quota_24h')}
          value={overview?.total_quota_24h?.toLocaleString() || '0'}
          icon={DollarSign}
        />
        <StatCard
          title={t('admin.dashboard.active_users_24h')}
          value={overview?.active_users_24h?.toLocaleString() || '0'}
          icon={Users}
        />
      </div>

      <ModelUsageChart data={modelStats} title={t('admin.dashboard.model_chart')} />
    </div>
  );
};

export default AdminDashboard;
