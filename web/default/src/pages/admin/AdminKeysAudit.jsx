import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { API, showError, showSuccess } from '../../helpers';
import {
  renderGroup,
  renderNumber,
  renderQuota,
} from '../../helpers/render';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  ShieldCheck,
  ShieldMinus,
  Ban,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 10;

const AdminKeysAudit = () => {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { t } = useTranslation();

  function renderRole(role) {
    switch (role) {
      case 1:
        return <Badge variant='secondary'>{t('admin.users.role_normal')}</Badge>;
      case 10:
        return <Badge variant='default'>{t('admin.users.role_admin')}</Badge>;
      case 100:
        return <Badge variant='destructive'>{t('admin.users.role_super')}</Badge>;
      default:
        return <Badge variant='outline'>{t('admin.users.role_unknown')}</Badge>;
    }
  }

  function renderStatus(status) {
    switch (status) {
      case 1:
        return <Badge className='bg-green-100 text-green-800 border-green-300 hover:bg-green-100'>{t('admin.users.status_active')}</Badge>;
      case 2:
        return <Badge variant='destructive'>{t('admin.users.status_banned')}</Badge>;
      default:
        return <Badge variant='outline'>{t('admin.users.status_unknown')}</Badge>;
    }
  }

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get(`/api/user/?p=${page}&order=${orderBy}`);
      const { success, message, data } = res.data;
      if (success) {
        setUsers(data || []);
      } else {
        showError(message);
      }
    } catch (err) {
      showError(t('admin.users.load_error'));
    }
    setLoading(false);
  }, [page, orderBy, t]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const searchUsers = async () => {
    if (!searchKeyword) {
      setPage(0);
      loadUsers();
      return;
    }
    setLoading(true);
    try {
      const res = await API.get(`/api/user/search?keyword=${searchKeyword}`);
      const { success, message, data } = res.data;
      if (success) {
        setUsers(data || []);
        setPage(0);
      } else {
        showError(message);
      }
    } catch (err) {
      showError(t('admin.users.search_error'));
    }
    setLoading(false);
  };

  const manageUser = async (username, action, idx) => {
    try {
      const res = await API.post('/api/user/manage', { username, action });
      const { success, message } = res.data;
      if (success) {
        showSuccess(t('admin.users.operation_success'));
        if (action === 'delete') {
          setUsers((prev) => prev.filter((_, i) => i !== idx));
        } else {
          const user = res.data.data;
          setUsers((prev) => {
            const next = [...prev];
            next[idx] = { ...next[idx], status: user.status, role: user.role };
            return next;
          });
        }
      } else {
        showError(message);
      }
    } catch (err) {
      showError(t('admin.users.operation_error'));
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    manageUser(deleteTarget.username, 'delete', deleteTarget.idx);
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const handleOrderByChange = (value) => {
    setOrderBy(value === '__default__' ? '' : value);
    setPage(0);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>{t('admin.users.title')}</h1>
          <p className='text-muted-foreground'>
            {t('admin.users.description')}
          </p>
        </div>
        <Button asChild>
          <Link to='/user/add'>
            <Plus className='h-4 w-4 mr-1' />
            {t('admin.users.create')}
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium'>{t('admin.users.list_title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-2 mb-4'>
            <div className='relative flex-1 max-w-sm'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder={t('admin.users.search_placeholder')}
                className='pl-8'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchUsers()}
              />
            </div>
            <Button variant='outline' size='sm' onClick={searchUsers}>
              {t('admin.users.search')}
            </Button>
            <Select value={orderBy || '__default__'} onValueChange={handleOrderByChange}>
              <SelectTrigger className='w-[160px]'>
                <SelectValue placeholder={t('admin.users.sort_by')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='__default__'>{t('admin.users.sort_default')}</SelectItem>
                <SelectItem value='quota'>{t('admin.users.sort_quota')}</SelectItem>
                <SelectItem value='used_quota'>{t('admin.users.sort_used')}</SelectItem>
                <SelectItem value='request_count'>{t('admin.users.sort_requests')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[60px]'>ID</TableHead>
                  <TableHead>{t('admin.users.col_username')}</TableHead>
                  <TableHead>{t('admin.users.col_display_name')}</TableHead>
                  <TableHead>{t('admin.users.col_group')}</TableHead>
                  <TableHead>{t('admin.users.col_role')}</TableHead>
                  <TableHead>{t('admin.users.col_status')}</TableHead>
                  <TableHead>{t('admin.users.col_remaining_quota')}</TableHead>
                  <TableHead>{t('admin.users.col_used_quota')}</TableHead>
                  <TableHead>{t('admin.users.col_requests')}</TableHead>
                  <TableHead className='w-[60px]'>{t('admin.users.col_actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} className='text-center py-8 text-muted-foreground'>
                      {t('admin.common.loading')}
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className='text-center py-8 text-muted-foreground'>
                      {t('admin.common.no_data')}
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user, idx) => (
                    <TableRow key={user.id}>
                      <TableCell className='font-mono text-xs'>{user.id}</TableCell>
                      <TableCell className='font-medium'>{user.username}</TableCell>
                      <TableCell>{user.display_name || '-'}</TableCell>
                      <TableCell>{renderGroup(user.group)}</TableCell>
                      <TableCell>{renderRole(user.role)}</TableCell>
                      <TableCell>{renderStatus(user.status)}</TableCell>
                      <TableCell className='font-mono text-sm'>
                        {renderQuota(user.quota, (key, opts) => {
                          if (key === 'common.quota.display_short') return `$${opts.amount}`;
                          return '';
                        })}
                      </TableCell>
                      <TableCell className='font-mono text-sm'>
                        {renderQuota(user.used_quota, (key, opts) => {
                          if (key === 'common.quota.display_short') return `$${opts.amount}`;
                          return '';
                        })}
                      </TableCell>
                      <TableCell className='font-mono text-sm'>
                        {renderNumber(user.request_count)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon' className='h-8 w-8'>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem asChild>
                              <Link to={`/user/edit/${user.id}`} className='flex items-center'>
                                <Pencil className='h-4 w-4 mr-2' />
                                {t('admin.users.action_edit')}
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              disabled={user.role === 100}
                              onClick={() => manageUser(user.username, 'promote', idx)}
                            >
                              <ShieldCheck className='h-4 w-4 mr-2' />
                              {t('admin.users.action_promote')}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={user.role === 100}
                              onClick={() => manageUser(user.username, 'demote', idx)}
                            >
                              <ShieldMinus className='h-4 w-4 mr-2' />
                              {t('admin.users.action_demote')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              disabled={user.role === 100}
                              onClick={() =>
                                manageUser(
                                  user.username,
                                  user.status === 1 ? 'disable' : 'enable',
                                  idx
                                )
                              }
                            >
                              {user.status === 1 ? (
                                <>
                                  <Ban className='h-4 w-4 mr-2' />
                                  {t('admin.users.action_disable')}
                                </>
                              ) : (
                                <>
                                  <CheckCircle className='h-4 w-4 mr-2' />
                                  {t('admin.users.action_enable')}
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              disabled={user.role === 100}
                              className='text-destructive focus:text-destructive'
                              onClick={() => {
                                setDeleteTarget({ username: user.username, idx });
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className='h-4 w-4 mr-2' />
                              {t('admin.users.action_delete')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <p className='text-sm text-muted-foreground'>
              {t('admin.users.page_info', { page: page + 1 })} {users.length > 0 && `· ${t('admin.users.page_count', { count: users.length })}`}
            </p>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                <ChevronLeft className='h-4 w-4 mr-1' />
                {t('admin.users.prev_page')}
              </Button>
              <Button
                variant='outline'
                size='sm'
                disabled={users.length < ITEMS_PER_PAGE}
                onClick={() => setPage((p) => p + 1)}
              >
                {t('admin.users.next_page')}
                <ChevronRight className='h-4 w-4 ml-1' />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.users.delete_title')}</DialogTitle>
            <DialogDescription>
              {t('admin.users.delete_confirm', { username: deleteTarget?.username })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setDeleteDialogOpen(false)}>
              {t('admin.users.cancel')}
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              <Trash2 className='h-4 w-4 mr-1' />
              {t('admin.users.confirm_delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminKeysAudit;
