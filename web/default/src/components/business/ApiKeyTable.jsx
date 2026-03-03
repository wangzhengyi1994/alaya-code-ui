import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  API,
  copy,
  showError,
  showSuccess,
  showWarning,
  timestamp2string,
} from '../../helpers';
import { renderQuota } from '../../helpers/render';
import {
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Search,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Pencil,
  Copy,
  ExternalLink,
  Infinity,
} from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const ApiKeyTable = ({ isAdmin = false }) => {
  const { t } = useTranslation();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [showKey, setShowKey] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [sortKey, setSortKey] = useState('');

  function renderStatus(status) {
    switch (status) {
      case 1:
        return <Badge variant='default'>{t('console.api_keys.status.enabled')}</Badge>;
      case 2:
        return <Badge variant='destructive'>{t('console.api_keys.status.disabled')}</Badge>;
      case 3:
        return <Badge variant='secondary'>{t('console.api_keys.status.expired')}</Badge>;
      case 4:
        return <Badge variant='outline'>{t('console.api_keys.status.depleted')}</Badge>;
      default:
        return <Badge variant='outline'>{t('console.api_keys.status.unknown')}</Badge>;
    }
  }

  const SORT_OPTIONS = [
    { value: '', label: t('console.api_keys.sort.default') },
    { value: 'name', label: t('console.api_keys.sort.by_name') },
    { value: 'status', label: t('console.api_keys.sort.by_status') },
    { value: 'used_quota', label: t('console.api_keys.sort.by_used_quota') },
    { value: 'remain_quota', label: t('console.api_keys.sort.by_remain_quota') },
    { value: 'created_time', label: t('console.api_keys.sort.by_created_time') },
  ];

  const loadTokens = async () => {
    setLoading(true);
    try {
      const orderParam = sortKey === 'used_quota' || sortKey === 'remain_quota' ? sortKey : '';
      const res = await API.get(`/api/token/?p=${page}&order=${orderParam}`);
      const { success, message, data } = res.data;
      if (success) {
        let result = data || [];
        if (sortKey && sortKey !== 'used_quota' && sortKey !== 'remain_quota') {
          result = sortTokensLocal(result, sortKey);
        }
        setTokens(result);
      } else {
        showError(message);
      }
    } catch (err) {
      showError(t('console.api_keys.load_failed'));
    }
    setLoading(false);
  };

  const sortTokensLocal = (list, key) => {
    const sorted = [...list];
    sorted.sort((a, b) => {
      if (!isNaN(a[key])) {
        return a[key] - b[key];
      }
      return ('' + a[key]).localeCompare(b[key]);
    });
    return sorted;
  };

  const searchTokens = async () => {
    if (!searchKeyword) {
      loadTokens();
      return;
    }
    setLoading(true);
    try {
      const res = await API.get(`/api/token/search?keyword=${searchKeyword}`);
      const { success, message, data } = res.data;
      if (success) {
        setTokens(data || []);
      } else {
        showError(message);
      }
    } catch (err) {
      showError(t('console.api_keys.search_failed'));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTokens();
  }, [page, sortKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleToken = async (id, status) => {
    const newStatus = status === 1 ? 2 : 1;
    try {
      const res = await API.put('/api/token/?status_only=true', {
        id,
        status: newStatus,
      });
      if (res.data.success) {
        showSuccess(t('console.api_keys.status_updated'));
        loadTokens();
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.api_keys.operation_failed'));
    }
  };

  const deleteToken = async () => {
    if (!deleteTarget) return;
    try {
      const res = await API.delete(`/api/token/${deleteTarget}`);
      if (res.data.success) {
        showSuccess(t('console.api_keys.delete_success'));
        setDeleteDialogOpen(false);
        setDeleteTarget(null);
        loadTokens();
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.api_keys.delete_failed'));
    }
  };

  const toggleShowKey = (id) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const maskKey = (key) => {
    if (!key) return '';
    if (key.length <= 8) return key;
    return key.substring(0, 4) + '****' + key.substring(key.length - 4);
  };

  const getServerAddress = () => {
    let status = localStorage.getItem('status');
    let serverAddress = '';
    if (status) {
      status = JSON.parse(status);
      serverAddress = status.server_address;
    }
    if (serverAddress === '') {
      serverAddress = window.location.origin;
    }
    return serverAddress;
  };

  const onCopyConfigLink = async (type, key) => {
    const serverAddress = getServerAddress();
    const encodedServerAddress = encodeURIComponent(serverAddress);
    const chatLink = localStorage.getItem('chat_link');

    let url;
    switch (type) {
      case 'next': {
        const nextBase = chatLink || 'https://app.nextchat.dev';
        url = nextBase + `/#/?settings={"key":"sk-${key}","url":"${serverAddress}"}`;
        break;
      }
      case 'ama':
        url = `ama://set-api-key?server=${encodedServerAddress}&key=sk-${key}`;
        break;
      case 'opencat':
        url = `opencat://team/join?domain=${encodedServerAddress}&token=sk-${key}`;
        break;
      case 'lobechat': {
        const lobeBase = chatLink || '';
        url = lobeBase + `/?settings={"keyVaults":{"openai":{"apiKey":"sk-${key}","baseURL":"${serverAddress}/v1"}}}`;
        break;
      }
      case 'cursor':
        url = `OPENAI_API_KEY=sk-${key}\nOPENAI_BASE_URL=${serverAddress}/v1`;
        break;
      case 'claude-code':
        url = JSON.stringify({
          name: 'Alaya Code',
          baseUrl: `${serverAddress}/anthropic/v1`,
          apiKey: `sk-${key}`,
        }, null, 2);
        break;
      default:
        url = `sk-${key}`;
    }

    if (await copy(url)) {
      showSuccess(t('console.common.copied'));
    } else {
      showWarning(t('console.api_keys.copy_failed'));
    }
  };

  const onOpenLink = (type, key) => {
    const serverAddress = getServerAddress();
    const encodedServerAddress = encodeURIComponent(serverAddress);
    const chatLink = localStorage.getItem('chat_link');

    let url;
    switch (type) {
      case 'next': {
        const nextBase = chatLink || 'https://app.nextchat.dev';
        url = nextBase + `/#/?settings={"key":"sk-${key}","url":"${serverAddress}"}`;
        break;
      }
      case 'ama':
        url = `ama://set-api-key?server=${encodedServerAddress}&key=sk-${key}`;
        break;
      case 'opencat':
        url = `opencat://team/join?domain=${encodedServerAddress}&token=sk-${key}`;
        break;
      case 'lobechat': {
        const lobeBase = chatLink || '';
        url = lobeBase + `/?settings={"keyVaults":{"openai":{"apiKey":"sk-${key}","baseURL":"${serverAddress}/v1"}}}`;
        break;
      }
      default: {
        const defaultBase = chatLink || 'https://app.nextchat.dev';
        url = defaultBase + `/#/?settings={"key":"sk-${key}","url":"${serverAddress}"}`;
      }
    }
    window.open(url, '_blank');
  };

  const renderExpiredTime = (expiredTime) => {
    if (expiredTime === -1) {
      return <span className='text-xs text-muted-foreground'>{t('console.api_keys.never_expire')}</span>;
    }
    const now = Math.floor(Date.now() / 1000);
    const isExpired = expiredTime > 0 && expiredTime < now;
    return (
      <span className={`text-xs ${isExpired ? 'text-destructive' : 'text-muted-foreground'}`}>
        {timestamp2string(expiredTime)}
      </span>
    );
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2 flex-wrap'>
        <div className='relative flex-1 min-w-[200px] max-w-sm'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder={t('console.api_keys.search_placeholder')}
            className='pl-8'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchTokens()}
          />
        </div>
        <Button variant='outline' size='sm' onClick={searchTokens}>
          {t('console.common.search')}
        </Button>
        <Select
          value={sortKey || '__default__'}
          onValueChange={(v) => setSortKey(v === '__default__' ? '' : v)}
        >
          <SelectTrigger className='w-[140px] h-9'>
            <SelectValue placeholder={t('console.api_keys.sort.default')} />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value || '__default__'} value={opt.value || '__default__'}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant='outline'
          size='icon'
          className='h-9 w-9'
          onClick={loadTokens}
          title={t('console.common.refresh')}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
        <div className='flex-1' />
        <Button size='sm' onClick={() => (window.location.href = '/token/add')}>
          <Plus className='h-4 w-4 mr-1' />
          {t('console.api_keys.create')}
        </Button>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('console.api_keys.table.name')}</TableHead>
              <TableHead>{t('console.api_keys.table.key')}</TableHead>
              <TableHead>{t('console.api_keys.table.status')}</TableHead>
              <TableHead>{t('console.api_keys.table.used_quota')}</TableHead>
              <TableHead>{t('console.api_keys.table.remaining_quota')}</TableHead>
              <TableHead>{t('console.api_keys.table.created_time')}</TableHead>
              <TableHead>{t('console.api_keys.table.expired_time')}</TableHead>
              <TableHead className='text-right'>{t('console.api_keys.table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className='text-center py-8 text-muted-foreground'>
                  {t('console.common.loading')}
                </TableCell>
              </TableRow>
            ) : tokens.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className='text-center py-8 text-muted-foreground'>
                  {t('console.api_keys.no_keys')}
                </TableCell>
              </TableRow>
            ) : (
              tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell className='font-medium'>{token.name || t('console.api_keys.unnamed')}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-1'>
                      <code className='text-xs bg-muted px-1 py-0.5 rounded'>
                        {showKey[token.id] ? `sk-${token.key}` : maskKey(`sk-${token.key}`)}
                      </code>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-6 w-6'
                        onClick={() => toggleShowKey(token.id)}
                        aria-label={showKey[token.id] ? t('console.api_keys.hide_key') : t('console.api_keys.show_key')}
                      >
                        {showKey[token.id] ? (
                          <EyeOff className='h-3 w-3' />
                        ) : (
                          <Eye className='h-3 w-3' />
                        )}
                      </Button>
                      {/* Copy dropdown with config links */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon' className='h-6 w-6' aria-label={t('console.api_keys.copy_options_label')}>
                            <Copy className='h-3 w-3' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => onCopyConfigLink('', token.key)}>
                            {t('console.api_keys.copy_key')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onCopyConfigLink('cursor', token.key)}>
                            {t('console.api_keys.copy_cursor')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onCopyConfigLink('claude-code', token.key)}>
                            {t('console.api_keys.copy_claude_code')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onCopyConfigLink('next', token.key)}>
                            {t('console.api_keys.copy_nextchat')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onCopyConfigLink('lobechat', token.key)}>
                            {t('console.api_keys.copy_lobechat')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onCopyConfigLink('ama', token.key)}>
                            {t('console.api_keys.copy_ama')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onCopyConfigLink('opencat', token.key)}>
                            {t('console.api_keys.copy_opencat')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onOpenLink('next', token.key)}>
                            <ExternalLink className='h-3 w-3 mr-2' />
                            {t('console.api_keys.open_nextchat')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onOpenLink('lobechat', token.key)}>
                            <ExternalLink className='h-3 w-3 mr-2' />
                            {t('console.api_keys.open_lobechat')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                  <TableCell>{renderStatus(token.status)}</TableCell>
                  <TableCell className='text-xs'>
                    {renderQuota(token.used_quota)}
                  </TableCell>
                  <TableCell className='text-xs'>
                    {token.unlimited_quota ? (
                      <Badge variant='secondary' className='gap-1'>
                        <Infinity className='h-3 w-3' />
                        {t('console.api_keys.unlimited')}
                      </Badge>
                    ) : (
                      renderQuota(token.remain_quota, undefined, 2)
                    )}
                  </TableCell>
                  <TableCell className='text-xs text-muted-foreground'>
                    {timestamp2string(token.created_time)}
                  </TableCell>
                  <TableCell>
                    {renderExpiredTime(token.expired_time)}
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex items-center justify-end gap-1'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-7 w-7'
                        asChild
                      >
                        <Link to={`/token/edit/${token.id}`} title={t('console.api_keys.edit')}>
                          <Pencil className='h-4 w-4' />
                        </Link>
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-7 w-7'
                        onClick={() => toggleToken(token.id, token.status)}
                        title={token.status === 1 ? t('console.api_keys.disable') : t('console.api_keys.enable')}
                      >
                        {token.status === 1 ? (
                          <ToggleRight className='h-4 w-4 text-green-600' />
                        ) : (
                          <ToggleLeft className='h-4 w-4 text-muted-foreground' />
                        )}
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-7 w-7'
                        onClick={() => {
                          setDeleteTarget(token.id);
                          setDeleteDialogOpen(true);
                        }}
                        aria-label={t('console.common.delete')}
                      >
                        <Trash2 className='h-4 w-4 text-destructive' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex justify-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          {t('console.common.prev_page')}
        </Button>
        <Button
          variant='outline'
          size='sm'
          disabled={tokens.length < ITEMS_PER_PAGE}
          onClick={() => setPage((p) => p + 1)}
        >
          {t('console.common.next_page')}
        </Button>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('console.api_keys.confirm_delete')}</DialogTitle>
            <DialogDescription>
              {t('console.api_keys.confirm_delete_desc')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setDeleteDialogOpen(false)}>
              {t('console.common.cancel')}
            </Button>
            <Button variant='destructive' onClick={deleteToken}>
              {t('console.common.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiKeyTable;
