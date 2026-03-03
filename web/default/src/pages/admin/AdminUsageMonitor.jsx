import React, { useEffect, useState } from 'react';
import { API, showError } from '../../helpers';
import StatCard from '../../components/business/StatCard';
import ModelUsageChart from '../../components/business/ModelUsageChart';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Activity, Hash, DollarSign, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminUsageMonitor = () => {
  const [overview, setOverview] = useState(null);
  const [modelStats, setModelStats] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [overviewRes, modelRes, topUsersRes] = await Promise.all([
        API.get('/api/admin/usage/overview'),
        API.get('/api/admin/usage/by-model'),
        API.get('/api/admin/usage/top-users?limit=20'),
      ]);

      if (overviewRes.data.success) {
        setOverview(overviewRes.data.data);
      }
      if (modelRes.data.success) {
        setModelStats(modelRes.data.data || []);
      }
      if (topUsersRes.data.success) {
        setTopUsers(topUsersRes.data.data || []);
      }
    } catch (err) {
      showError(t('admin.usage.load_error'));
    }
    setLoading(false);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{t('admin.usage.title')}</h1>
        <p className='text-muted-foreground'>{t('admin.usage.description')}</p>
      </div>

      {/* Overview stats */}
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

      {/* Model usage distribution */}
      <ModelUsageChart data={modelStats} title={t('admin.usage.model_chart')} />

      {/* Top users */}
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium'>{t('admin.usage.top_users')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.usage.col_rank')}</TableHead>
                  <TableHead>{t('admin.usage.col_user_id')}</TableHead>
                  <TableHead>{t('admin.usage.col_requests')}</TableHead>
                  <TableHead>{t('admin.usage.col_tokens')}</TableHead>
                  <TableHead>{t('admin.usage.col_quota')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center py-8 text-muted-foreground'>
                      {t('admin.common.no_data')}
                    </TableCell>
                  </TableRow>
                ) : (
                  topUsers.map((user, idx) => (
                    <TableRow key={user.user_id}>
                      <TableCell className='font-medium'>#{idx + 1}</TableCell>
                      <TableCell>{user.user_id}</TableCell>
                      <TableCell>{user.request_count?.toLocaleString()}</TableCell>
                      <TableCell>{user.total_tokens?.toLocaleString()}</TableCell>
                      <TableCell>{user.total_quota?.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsageMonitor;
