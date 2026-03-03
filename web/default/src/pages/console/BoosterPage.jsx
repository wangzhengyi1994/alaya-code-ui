import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API, showError, showSuccess, timestamp2string } from '../../helpers';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Rocket } from 'lucide-react';

const BoosterPage = () => {
  const { t } = useTranslation();
  const [boosterPacks, setBoosterPacks] = useState([]);
  const [myBoosters, setMyBoosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [packsRes, myRes] = await Promise.all([
        API.get('/api/booster/'),
        API.get('/api/booster/self'),
      ]);

      if (packsRes.data.success) {
        setBoosterPacks(packsRes.data.data || []);
      }
      if (myRes.data.success) {
        setMyBoosters(myRes.data.data || []);
      }
    } catch (err) {
      showError(t('console.booster.load_failed'));
    }
    setLoading(false);
  };

  const handlePurchase = async () => {
    if (!selectedPack) return;
    setPurchasing(true);
    try {
      const res = await API.post('/api/booster/purchase', {
        booster_pack_id: selectedPack.id,
      });
      if (res.data.success) {
        showSuccess(t('console.booster.purchase_success'));
        setPurchaseDialogOpen(false);
        loadData();
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.booster.purchase_failed'));
    }
    setPurchasing(false);
  };

  function renderBoosterStatus(status) {
    switch (status) {
      case 1:
        return <Badge variant='default'>{t('console.booster.status.active')}</Badge>;
      case 2:
        return <Badge variant='secondary'>{t('console.booster.status.depleted')}</Badge>;
      case 3:
        return <Badge variant='outline'>{t('console.booster.status.expired')}</Badge>;
      default:
        return <Badge variant='outline'>{t('console.booster.status.unknown')}</Badge>;
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-20 text-muted-foreground'>
        {t('console.common.loading')}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{t('console.booster.title')}</h1>
        <p className='text-muted-foreground'>{t('console.booster.subtitle')}</p>
      </div>

      {/* Available booster packs */}
      <div>
        <h2 className='text-lg font-semibold mb-4'>{t('console.booster.available')}</h2>
        {boosterPacks.length === 0 ? (
          <Card>
            <CardContent className='p-6 text-center text-muted-foreground'>
              {t('console.booster.none_available')}
            </CardContent>
          </Card>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {boosterPacks.map((pack) => (
              <Card key={pack.id}>
                <CardHeader className='pb-2 text-center'>
                  <Rocket className='h-8 w-8 mx-auto text-primary mb-2' />
                  <CardTitle className='text-lg'>
                    {pack.display_name || pack.name}
                  </CardTitle>
                  {pack.description && (
                    <p className='text-sm text-muted-foreground'>{pack.description}</p>
                  )}
                </CardHeader>
                <CardContent className='text-center'>
                  <p className='text-3xl font-bold'>
                    ¥{(pack.price_cents / 100).toFixed(0)}
                  </p>
                  <p className='text-sm text-muted-foreground mt-2'>
                    {t('console.booster.extra_requests', { count: pack.extra_count })}
                  </p>
                  {pack.valid_duration_sec > 0 && (
                    <p className='text-xs text-muted-foreground'>
                      {t('console.booster.valid_days', { days: Math.floor(pack.valid_duration_sec / 86400) })}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className='w-full'
                    onClick={() => {
                      setSelectedPack(pack);
                      setPurchaseDialogOpen(true);
                    }}
                  >
                    {t('console.booster.purchase')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* My booster packs */}
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium'>{t('console.booster.my_boosters')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('console.booster.table.booster')}</TableHead>
                  <TableHead>{t('console.booster.table.remaining')}</TableHead>
                  <TableHead>{t('console.booster.table.status')}</TableHead>
                  <TableHead>{t('console.booster.table.expire_time')}</TableHead>
                  <TableHead>{t('console.booster.table.purchase_time')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myBoosters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center py-8 text-muted-foreground'>
                      {t('console.booster.no_boosters')}
                    </TableCell>
                  </TableRow>
                ) : (
                  myBoosters.map((bp) => (
                    <TableRow key={bp.id}>
                      <TableCell className='font-medium'>#{bp.booster_pack_id}</TableCell>
                      <TableCell>{bp.remain_count}</TableCell>
                      <TableCell>{renderBoosterStatus(bp.status)}</TableCell>
                      <TableCell className='text-xs text-muted-foreground'>
                        {bp.expire_time > 0 ? timestamp2string(bp.expire_time) : t('console.booster.never_expire')}
                      </TableCell>
                      <TableCell className='text-xs text-muted-foreground'>
                        {timestamp2string(bp.created_time)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Purchase dialog */}
      <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('console.booster.confirm_purchase')}</DialogTitle>
            <DialogDescription>
              {t('console.booster.confirm_purchase_desc', {
                name: selectedPack?.display_name || selectedPack?.name,
                price: selectedPack ? (selectedPack.price_cents / 100).toFixed(2) : '0',
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setPurchaseDialogOpen(false)}>
              {t('console.common.cancel')}
            </Button>
            <Button onClick={handlePurchase} disabled={purchasing}>
              {purchasing ? t('console.common.processing') : t('console.booster.confirm_purchase_btn')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BoosterPage;
