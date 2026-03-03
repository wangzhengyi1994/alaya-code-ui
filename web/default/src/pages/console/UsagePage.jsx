import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { API, showError, showSuccess, copy, timestamp2string } from '../../helpers';
import { renderQuota, renderColorLabel } from '../../helpers/render';
import StatCard from '../../components/business/StatCard';
import UsageChart from '../../components/business/UsageChart';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Activity,
  Timer,
  RefreshCw,
  Search,
  ArrowUpDown,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
} from 'lucide-react';

const UsagePage = () => {
  const { t } = useTranslation();
  const [quotaData, setQuotaData] = useState(null);
  const [dashboardData, setDashboardData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [logPage, setLogPage] = useState(0);
  const [logType, setLogType] = useState('0');
  const [tokenName, setTokenName] = useState('');
  const [modelName, setModelName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [availableModels, setAvailableModels] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState('desc');
  const timerRef = useRef(null);
  const refreshRef = useRef(null);

  const LOG_TYPE_OPTIONS = [
    { value: '0', label: t('console.usage.log_types.all') },
    { value: '1', label: t('console.usage.log_types.topup') },
    { value: '2', label: t('console.usage.log_types.usage') },
    { value: '3', label: t('console.usage.log_types.admin') },
    { value: '4', label: t('console.usage.log_types.system') },
  ];

  function renderLogType(type) {
    switch (type) {
      case 1:
        return <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200'>{t('console.usage.log_types.topup')}</Badge>;
      case 2:
        return <Badge variant='outline' className='bg-blue-50 text-blue-700 border-blue-200'>{t('console.usage.log_types.usage')}</Badge>;
      case 3:
        return <Badge variant='outline' className='bg-orange-50 text-orange-700 border-orange-200'>{t('console.usage.log_types.admin')}</Badge>;
      case 4:
        return <Badge variant='outline' className='bg-purple-50 text-purple-700 border-purple-200'>{t('console.usage.log_types.system')}</Badge>;
      default:
        return <Badge variant='outline'>{t('console.usage.log_types.unknown')}</Badge>;
    }
  }

  // Load subscription quota data
  const loadQuotaData = useCallback(async () => {
    try {
      const res = await API.get('/api/subscription/quota');
      if (res.data.success) {
        setQuotaData(res.data.data);
      }
    } catch (err) {
      try {
        const res = await API.get('/api/usage/window');
        if (res.data.success) {
          setQuotaData({
            has_subscription: false,
            window_used: res.data.data.request_count || 0,
            window_limit: 0,
            window_duration_sec: res.data.data.window_duration_sec || 18000,
            window_start_time: 0,
          });
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Load dashboard chart data
  const loadDashboardData = useCallback(async () => {
    try {
      const res = await API.get('/api/user/dashboard');
      if (res.data.success) {
        setDashboardData(res.data.data || []);
      }
    } catch (err) {
      // ignore
    }
  }, []);

  // Load available models for filter dropdown
  const loadAvailableModels = useCallback(async () => {
    try {
      const res = await API.get('/api/user/available_models');
      if (res.data.success && Array.isArray(res.data.data)) {
        setAvailableModels(res.data.data);
      }
    } catch (err) {
      // ignore
    }
  }, []);

  // Load logs
  const loadLogs = useCallback(async (page = 0) => {
    setLogsLoading(true);
    try {
      let url = `/api/log/self?p=${page}&type=${logType}`;
      if (tokenName) url += `&token_name=${encodeURIComponent(tokenName)}`;
      if (modelName) url += `&model_name=${encodeURIComponent(modelName)}`;
      if (startTime) {
        url += `&start_timestamp=${Math.floor(new Date(startTime).getTime() / 1000)}`;
      }
      if (endTime) {
        url += `&end_timestamp=${Math.floor(new Date(endTime).getTime() / 1000)}`;
      }
      const res = await API.get(url);
      if (res.data.success) {
        setLogs(res.data.data || []);
      }
    } catch (err) {
      showError(t('console.usage.load_logs_failed'));
    }
    setLogsLoading(false);
  }, [logType, tokenName, modelName, startTime, endTime, t]);

  // Initial data load
  useEffect(() => {
    Promise.all([loadQuotaData(), loadDashboardData(), loadAvailableModels()]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Load logs when page or filters change
  useEffect(() => {
    loadLogs(logPage);
  }, [logPage, loadLogs]);

  // Auto-refresh quota every 30 seconds
  useEffect(() => {
    refreshRef.current = setInterval(() => {
      loadQuotaData();
    }, 30000);
    return () => clearInterval(refreshRef.current);
  }, [loadQuotaData]);

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      if (!quotaData) {
        setCountdown('');
        return;
      }
      if (quotaData.window_end_time) {
        const remainMs = quotaData.window_end_time * 1000 - Date.now();
        if (remainMs <= 0) {
          setCountdown(t('console.usage.resetting_soon'));
          return;
        }
        const h = Math.floor(remainMs / 3600000);
        const m = Math.floor((remainMs % 3600000) / 60000);
        const s = Math.floor((remainMs % 60000) / 1000);
        setCountdown(`${h}h ${m}m ${s}s`);
        return;
      }
      const wdSec = quotaData.window_duration_sec || quotaData.window_duration;
      const wStart = quotaData.window_start_time;
      if (!wStart || !wdSec) {
        setCountdown('');
        return;
      }
      const remainMs = (wStart + wdSec) * 1000 - Date.now();
      if (remainMs <= 0) {
        setCountdown(t('console.usage.resetting_soon'));
        return;
      }
      const h = Math.floor(remainMs / 3600000);
      const m = Math.floor((remainMs % 3600000) / 60000);
      const s = Math.floor((remainMs % 60000) / 1000);
      setCountdown(`${h}h ${m}m ${s}s`);
    };

    updateCountdown();
    timerRef.current = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerRef.current);
  }, [quotaData, t]);

  // Process chart data for 7-day trend
  const processChartData = () => {
    const dailyData = {};
    const maxDate = new Date();
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 6);

    for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      dailyData[dateStr] = { date: dateStr, requests: 0, tokens: 0 };
    }

    if (Array.isArray(dashboardData)) {
      dashboardData.forEach((item) => {
        if (dailyData[item.Day]) {
          dailyData[item.Day].requests += item.RequestCount || 0;
          dailyData[item.Day].tokens += (item.PromptTokens || 0) + (item.CompletionTokens || 0);
        }
      });
    }

    return Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));
  };

  const chartData = processChartData();

  // Sort logs
  const handleSort = (key) => {
    let dir = 'desc';
    if (sortKey === key && sortDir === 'desc') {
      dir = 'asc';
    }
    setSortKey(key);
    setSortDir(dir);
  };

  const sortedLogs = [...logs].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDir === 'asc' ? (aVal || 0) - (bVal || 0) : (bVal || 0) - (aVal || 0);
  });

  // Handle search/filter
  const handleSearch = () => {
    setLogPage(0);
    loadLogs(0);
  };

  const handleReset = () => {
    setTokenName('');
    setModelName('');
    setStartTime('');
    setEndTime('');
    setLogType('0');
    setLogPage(0);
  };

  // Compute window usage status
  const windowDurationSec = quotaData?.window_duration_sec || quotaData?.window_duration || 18000;
  const windowHours = Math.floor(windowDurationSec / 3600);
  const windowUsed = quotaData?.window_used || 0;
  const windowLimit = quotaData?.window_limit || 0;
  const usagePercent = windowLimit > 0 ? Math.min(100, (windowUsed / windowLimit) * 100) : 0;
  const isOverLimit = windowLimit > 0 && windowUsed >= windowLimit;
  const hasSubscription = quotaData?.has_subscription;

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>{t('console.usage.title')}</h1>
          <p className='text-muted-foreground'>{t('console.usage.subtitle')}</p>
        </div>
        <Button variant='outline' size='sm' onClick={() => { loadQuotaData(); loadDashboardData(); }}>
          <RefreshCw className='h-4 w-4 mr-1' />
          {t('console.common.refresh')}
        </Button>
      </div>

      {/* 5-Hour Window Status Area */}
      {hasSubscription && (
        <Card className={isOverLimit ? 'border-destructive' : ''}>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-sm font-medium flex items-center gap-2'>
                <Zap className='h-4 w-4' />
                {quotaData?.plan_name || t('console.usage.subscription_label')} - {t('console.usage.window_quota', { hours: windowHours })}
              </CardTitle>
              {isOverLimit ? (
                <Badge variant='destructive' className='flex items-center gap-1'>
                  <AlertTriangle className='h-3 w-3' />
                  {t('console.usage.over_limit')}
                </Badge>
              ) : (
                <Badge variant='outline' className='flex items-center gap-1 bg-green-50 text-green-700 border-green-200'>
                  <CheckCircle2 className='h-3 w-3' />
                  {t('console.usage.normal')}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 md:grid-cols-2'>
              {/* Usage Progress */}
              <div className='space-y-3'>
                <div className='flex items-end justify-between'>
                  <div>
                    <p className='text-3xl font-bold'>
                      {windowUsed}
                      <span className='text-lg font-normal text-muted-foreground'>
                        {windowLimit > 0 ? ` / ${windowLimit}` : ''}
                      </span>
                    </p>
                    <p className='text-sm text-muted-foreground'>{t('console.usage.requests_unit')}</p>
                  </div>
                  {windowLimit > 0 && (
                    <p className='text-sm font-medium'>
                      {usagePercent.toFixed(0)}%
                    </p>
                  )}
                </div>
                {windowLimit > 0 && (
                  <Progress
                    value={usagePercent}
                    className={`h-3 ${isOverLimit ? '[&>div]:bg-destructive' : ''}`}
                  />
                )}
              </div>

              {/* Countdown */}
              <div className='flex flex-col justify-center items-center rounded-lg bg-muted/50 p-4'>
                <div className='flex items-center gap-2 mb-1'>
                  <Timer className='h-4 w-4 text-muted-foreground' />
                  <p className='text-sm text-muted-foreground'>{t('console.usage.window_reset_countdown')}</p>
                </div>
                <p className='text-2xl font-mono font-bold'>
                  {countdown || t('console.common.loading')}
                </p>
                <p className='text-xs text-muted-foreground mt-1'>{t('console.usage.auto_refresh')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Stats (for non-subscription or additional info) */}
      {!hasSubscription && (
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-3'>
          <StatCard
            title={t('console.usage.current_window_requests', { hours: windowHours })}
            value={windowUsed.toLocaleString()}
            icon={Activity}
          />
          <StatCard
            title={t('console.usage.window_period')}
            value={t('console.usage.hours_label', { hours: windowHours })}
            icon={Clock}
          />
          <StatCard
            title={t('console.usage.today_requests')}
            value={chartData.length > 0 ? chartData[chartData.length - 1].requests.toLocaleString() : '0'}
            icon={Zap}
          />
        </div>
      )}

      {/* 7-Day Charts */}
      <div className='grid gap-4 grid-cols-1 lg:grid-cols-2'>
        <UsageChart
          data={chartData}
          title={t('console.usage.request_trend_7d')}
          dataKey='requests'
          color='#1677ff'
          height={250}
        />
        <UsageChart
          data={chartData}
          title={t('console.usage.token_trend_7d')}
          dataKey='tokens'
          color='#13c2c2'
          height={250}
        />
      </div>

      {/* Log Search and Filter */}
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm font-medium flex items-center gap-2'>
            <Search className='h-4 w-4' />
            {t('console.usage.log_filter')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-1'>
              <label className='text-xs font-medium text-muted-foreground'>{t('console.usage.start_time')}</label>
              <Input
                type='datetime-local'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className='h-9'
              />
            </div>
            <div className='space-y-1'>
              <label className='text-xs font-medium text-muted-foreground'>{t('console.usage.end_time')}</label>
              <Input
                type='datetime-local'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className='h-9'
              />
            </div>
            <div className='space-y-1'>
              <label className='text-xs font-medium text-muted-foreground'>{t('console.usage.model_name')}</label>
              <Select value={modelName} onValueChange={(v) => setModelName(v === '__all__' ? '' : v)}>
                <SelectTrigger className='h-9'>
                  <SelectValue placeholder={t('console.usage.all_models')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='__all__'>{t('console.usage.all_models')}</SelectItem>
                  {availableModels.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1'>
              <label className='text-xs font-medium text-muted-foreground'>{t('console.usage.token_name')}</label>
              <Input
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder={t('console.usage.token_name_placeholder')}
                className='h-9'
              />
            </div>
          </div>
          <div className='flex items-center gap-2 mt-3'>
            <Select value={logType} onValueChange={setLogType}>
              <SelectTrigger className='w-[140px] h-9'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOG_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size='sm' onClick={handleSearch}>
              <Search className='h-4 w-4 mr-1' />
              {t('console.usage.query')}
            </Button>
            <Button size='sm' variant='outline' onClick={handleReset}>
              {t('console.usage.reset')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log Details Table */}
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium'>{t('console.usage.call_details')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className='cursor-pointer select-none'
                    onClick={() => handleSort('created_at')}
                  >
                    <div className='flex items-center gap-1'>
                      {t('console.usage.table.time')}
                      <ArrowUpDown className='h-3 w-3' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer select-none'
                    onClick={() => handleSort('type')}
                  >
                    <div className='flex items-center gap-1'>
                      {t('console.usage.table.type')}
                      <ArrowUpDown className='h-3 w-3' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer select-none'
                    onClick={() => handleSort('model_name')}
                  >
                    <div className='flex items-center gap-1'>
                      {t('console.usage.table.model')}
                      <ArrowUpDown className='h-3 w-3' />
                    </div>
                  </TableHead>
                  <TableHead>{t('console.usage.table.token_name')}</TableHead>
                  <TableHead
                    className='cursor-pointer select-none'
                    onClick={() => handleSort('prompt_tokens')}
                  >
                    <div className='flex items-center gap-1'>
                      {t('console.usage.table.prompt_tokens')}
                      <ArrowUpDown className='h-3 w-3' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer select-none'
                    onClick={() => handleSort('completion_tokens')}
                  >
                    <div className='flex items-center gap-1'>
                      {t('console.usage.table.completion_tokens')}
                      <ArrowUpDown className='h-3 w-3' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer select-none'
                    onClick={() => handleSort('quota')}
                  >
                    <div className='flex items-center gap-1'>
                      {t('console.usage.table.quota')}
                      <ArrowUpDown className='h-3 w-3' />
                    </div>
                  </TableHead>
                  <TableHead>{t('console.usage.table.detail')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logsLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className='text-center py-8 text-muted-foreground'>
                      {t('console.common.loading')}
                    </TableCell>
                  </TableRow>
                ) : sortedLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className='text-center py-8 text-muted-foreground'>
                      {t('console.usage.no_records')}
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className='text-xs whitespace-nowrap'>
                        <span
                          className='cursor-pointer hover:text-primary'
                          onClick={async () => {
                            if (log.request_id && await copy(log.request_id)) {
                              showSuccess(t('console.usage.copied_request_id', { id: log.request_id }));
                            }
                          }}
                          title={log.request_id ? t('console.usage.click_copy_request_id', { id: log.request_id }) : ''}
                        >
                          {timestamp2string(log.created_at)}
                        </span>
                      </TableCell>
                      <TableCell>{renderLogType(log.type)}</TableCell>
                      <TableCell className='text-sm'>
                        {log.model_name ? renderColorLabel(log.model_name) : '-'}
                      </TableCell>
                      <TableCell className='text-sm'>
                        {log.token_name ? renderColorLabel(log.token_name) : '-'}
                      </TableCell>
                      <TableCell className='text-sm'>
                        {log.prompt_tokens || '-'}
                      </TableCell>
                      <TableCell className='text-sm'>
                        {log.completion_tokens || '-'}
                      </TableCell>
                      <TableCell className='text-sm'>
                        {log.quota ? renderQuota(log.quota, (k) => k, 6) : '-'}
                      </TableCell>
                      <TableCell className='text-xs text-muted-foreground max-w-[200px] truncate'>
                        {log.content || '-'}
                        {log.elapsed_time > 0 && (
                          <Badge variant='outline' className='ml-1 text-[10px] px-1 py-0'>
                            {log.elapsed_time}ms
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex justify-center gap-2 mt-4'>
            <Button
              variant='outline'
              size='sm'
              disabled={logPage === 0}
              onClick={() => setLogPage((p) => Math.max(0, p - 1))}
            >
              {t('console.common.prev_page')}
            </Button>
            <span className='flex items-center text-sm text-muted-foreground px-2'>
              {t('console.common.page_number', { page: logPage + 1 })}
            </span>
            <Button
              variant='outline'
              size='sm'
              disabled={logs.length < 10}
              onClick={() => setLogPage((p) => p + 1)}
            >
              {t('console.common.next_page')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsagePage;
