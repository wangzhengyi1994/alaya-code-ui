import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { timestamp2string } from '../../helpers';

const BillingTable = ({ orders, loading, page, onPageChange }) => {
  const { t } = useTranslation();

  function renderOrderType(type) {
    const types = {
      1: t('console.billing.order_types.new_subscription'),
      2: t('console.billing.order_types.renewal'),
      3: t('console.billing.order_types.upgrade'),
      4: t('console.billing.order_types.downgrade'),
      5: t('console.billing.order_types.booster'),
    };
    return types[type] || t('console.billing.order_types.unknown');
  }

  function renderOrderStatus(status) {
    switch (status) {
      case 1:
        return <Badge variant='secondary'>{t('console.billing.order_status.pending')}</Badge>;
      case 2:
        return <Badge variant='default'>{t('console.billing.order_status.paid')}</Badge>;
      case 3:
        return <Badge variant='outline'>{t('console.billing.order_status.refunded')}</Badge>;
      case 4:
        return <Badge variant='destructive'>{t('console.billing.order_status.cancelled')}</Badge>;
      case 5:
        return <Badge variant='destructive'>{t('console.billing.order_status.failed')}</Badge>;
      default:
        return <Badge variant='outline'>{t('console.billing.order_status.unknown')}</Badge>;
    }
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('console.billing.table.order_no')}</TableHead>
              <TableHead>{t('console.billing.table.type')}</TableHead>
              <TableHead>{t('console.billing.table.amount')}</TableHead>
              <TableHead>{t('console.billing.table.status')}</TableHead>
              <TableHead>{t('console.billing.table.payment_method')}</TableHead>
              <TableHead>{t('console.billing.table.created_time')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className='text-center py-8 text-muted-foreground'>
                  {t('console.common.loading')}
                </TableCell>
              </TableRow>
            ) : !orders || orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='text-center py-8 text-muted-foreground'>
                  {t('console.billing.no_records')}
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className='font-mono text-xs'>{order.order_no}</TableCell>
                  <TableCell>{renderOrderType(order.type)}</TableCell>
                  <TableCell>¥{(order.amount_cents / 100).toFixed(2)}</TableCell>
                  <TableCell>{renderOrderStatus(order.status)}</TableCell>
                  <TableCell className='text-muted-foreground'>
                    {order.payment_method || '-'}
                  </TableCell>
                  <TableCell className='text-xs text-muted-foreground'>
                    {timestamp2string(order.created_time)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {onPageChange && (
        <div className='flex justify-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            disabled={page === 0}
            onClick={() => onPageChange(Math.max(0, page - 1))}
          >
            {t('console.common.prev_page')}
          </Button>
          <Button
            variant='outline'
            size='sm'
            disabled={!orders || orders.length < 10}
            onClick={() => onPageChange(page + 1)}
          >
            {t('console.common.next_page')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BillingTable;
