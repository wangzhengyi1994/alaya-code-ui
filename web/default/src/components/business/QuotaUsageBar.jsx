import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Progress } from '../ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const QuotaUsageBar = ({ quotaInfo }) => {
  const { t } = useTranslation();
  const [windowCountdown, setWindowCountdown] = useState('');
  const [weeklyCountdown, setWeeklyCountdown] = useState('');

  useEffect(() => {
    if (!quotaInfo || !quotaInfo.has_subscription) return;

    const updateCountdowns = () => {
      // Window countdown
      if (quotaInfo.window_end_time) {
        const remainMs = quotaInfo.window_end_time * 1000 - Date.now();
        if (remainMs <= 0) {
          setWindowCountdown(t('console.quota_bar.resetting_soon'));
        } else {
          const h = Math.floor(remainMs / 3600000);
          const m = Math.floor((remainMs % 3600000) / 60000);
          const s = Math.floor((remainMs % 60000) / 1000);
          setWindowCountdown(t('console.quota_bar.reset_countdown', { time: `${h}h ${m}m ${s}s` }));
        }
      } else {
        const windowSec = quotaInfo.window_duration_sec || quotaInfo.window_duration || 18000;
        const hours = Math.floor(windowSec / 3600);
        const minutes = Math.floor((windowSec % 3600) / 60);
        setWindowCountdown(t('console.quota_bar.window_period', { time: `${hours}h ${minutes}m` }));
      }

      // Weekly countdown
      if (quotaInfo.weekly_end_time) {
        const remainMs = quotaInfo.weekly_end_time * 1000 - Date.now();
        if (remainMs <= 0) {
          setWeeklyCountdown(t('console.quota_bar.resetting_soon'));
        } else {
          const d = Math.floor(remainMs / 86400000);
          const h = Math.floor((remainMs % 86400000) / 3600000);
          const m = Math.floor((remainMs % 3600000) / 60000);
          setWeeklyCountdown(t('console.quota_bar.reset_countdown', { time: `${d}d ${h}h ${m}m` }));
        }
      }
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [quotaInfo, t]);

  if (!quotaInfo || !quotaInfo.has_subscription) {
    return (
      <Card>
        <CardContent className='p-6 text-center text-muted-foreground'>
          {t('console.quota_bar.no_active_subscription')}
        </CardContent>
      </Card>
    );
  }

  const total = (quotaInfo.window_limit || 0) + (quotaInfo.booster_extra || 0);
  const used = quotaInfo.window_used || 0;
  const remaining = quotaInfo.remaining || 0;
  const percentage = total > 0 ? Math.min((used / total) * 100, 100) : 0;

  const weeklyLimit = quotaInfo.weekly_limit || 0;
  const weeklyUsed = quotaInfo.weekly_used || 0;
  const weeklyRemaining = quotaInfo.weekly_remaining || 0;
  const weeklyPercentage = weeklyLimit > 0 ? Math.min((weeklyUsed / weeklyLimit) * 100, 100) : 0;

  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-sm font-medium'>{t('console.quota_bar.request_quota')}</CardTitle>
          <span className='text-xs text-muted-foreground'>{windowCountdown}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {/* Window quota */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-medium text-muted-foreground'>{t('console.quota_bar.window_quota')}</span>
              <span className='text-xs text-muted-foreground'>{t('console.quota_bar.remaining', { count: remaining })}</span>
            </div>
            <Progress value={percentage} className='h-2' />
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>{t('console.quota_bar.used', { used, total })}</span>
              <span>{percentage.toFixed(1)}%</span>
            </div>
            {quotaInfo.booster_extra > 0 && (
              <p className='text-xs text-muted-foreground'>
                {t('console.quota_bar.includes_booster', { count: quotaInfo.booster_extra })}
              </p>
            )}
            {quotaInfo.overage_rate_type === 'api' && percentage >= 100 && (
              <p className='text-xs text-orange-600'>
                {t('console.quota_bar.overage_pay_per_use')}
              </p>
            )}
            {quotaInfo.overage_rate_type === 'blocked' && percentage >= 100 && (
              <p className='text-xs text-red-600'>
                {t('console.quota_bar.window_limit_reached')}
              </p>
            )}
          </div>

          {/* Weekly quota */}
          {weeklyLimit > 0 && (
            <div className='space-y-2 border-t pt-3'>
              <div className='flex items-center justify-between'>
                <span className='text-xs font-medium text-muted-foreground'>{t('console.quota_bar.weekly_quota')}</span>
                <span className='text-xs text-muted-foreground'>
                  {weeklyCountdown && <>{weeklyCountdown} · </>}{t('console.quota_bar.remaining', { count: weeklyRemaining })}
                </span>
              </div>
              <Progress value={weeklyPercentage} className='h-2' />
              <div className='flex justify-between text-xs text-muted-foreground'>
                <span>{t('console.quota_bar.used', { used: weeklyUsed, total: weeklyLimit })}</span>
                <span>{weeklyPercentage.toFixed(1)}%</span>
              </div>
              {weeklyPercentage >= 90 && weeklyPercentage < 100 && (
                <p className='text-xs text-orange-600'>{t('console.quota_bar.weekly_quota_running_out')}</p>
              )}
              {weeklyPercentage >= 100 && (
                <p className='text-xs text-red-600'>{t('console.quota_bar.weekly_limit_reached')}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuotaUsageBar;
