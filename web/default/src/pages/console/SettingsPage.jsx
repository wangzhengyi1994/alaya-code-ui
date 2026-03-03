import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API, copy, showError, showInfo, showSuccess } from '../../helpers';
import { renderQuota } from '../../helpers/render';
import { UserContext } from '../../context/User';
import { onGitHubOAuthClicked, onLarkOAuthClicked } from '../../components/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  User,
  Key,
  Link2,
  Shield,
  Trash2,
  Copy,
  RefreshCw,
  Gift,
  Github,
  Mail,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

const SettingsPage = () => {
  const { t } = useTranslation();
  const [, userDispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [systemToken, setSystemToken] = useState('');
  const [affLink, setAffLink] = useState('');
  const [redemptionCode, setRedemptionCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmName, setDeleteConfirmName] = useState('');
  const [status, setStatus] = useState({});

  // Email binding dialog
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailCountdown, setEmailCountdown] = useState(0);

  // WeChat binding dialog
  const [wechatDialogOpen, setWechatDialogOpen] = useState(false);
  const [wechatCode, setWechatCode] = useState('');

  useEffect(() => {
    loadUser();
    const stored = localStorage.getItem('status');
    if (stored) {
      setStatus(JSON.parse(stored));
    }
  }, []);

  // Email countdown timer
  useEffect(() => {
    if (emailCountdown <= 0) return;
    const timer = setInterval(() => {
      setEmailCountdown((c) => c - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [emailCountdown]);

  const loadUser = async () => {
    try {
      const res = await API.get('/api/user/self');
      if (res.data.success) {
        setUser(res.data.data);
        setDisplayName(res.data.data.display_name || '');
      }
    } catch (err) {
      showError(t('console.settings.load_user_failed'));
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const body = { display_name: displayName };
      if (password) {
        if (password !== confirmPassword) {
          showError(t('console.settings.password_mismatch'));
          setLoading(false);
          return;
        }
        if (password.length < 8) {
          showError(t('console.settings.password_too_short'));
          setLoading(false);
          return;
        }
        body.password = password;
      }
      const res = await API.put('/api/user/self', body);
      if (res.data.success) {
        showSuccess(t('console.settings.update_success'));
        setPassword('');
        setConfirmPassword('');
        loadUser();
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.settings.update_failed'));
    }
    setLoading(false);
  };

  const handleGenerateToken = async () => {
    try {
      const res = await API.get('/api/user/token');
      if (res.data.success) {
        const token = res.data.data;
        setSystemToken(token);
        await copy(token);
        showSuccess(t('console.settings.token_generated'));
        loadUser();
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.settings.token_generate_failed'));
    }
  };

  const handleCopyToken = async () => {
    const token = systemToken || user?.access_token;
    if (token) {
      if (await copy(token)) {
        showSuccess(t('console.settings.token_copied'));
      }
    }
  };

  const handleGetAffLink = async () => {
    try {
      const res = await API.get('/api/user/aff');
      if (res.data.success) {
        const link = `${window.location.origin}/register?aff=${res.data.data}`;
        setAffLink(link);
        await copy(link);
        showSuccess(t('console.settings.invite_link_copied'));
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.settings.invite_link_failed'));
    }
  };

  const handleTopUp = async () => {
    if (!redemptionCode.trim()) {
      showInfo(t('console.settings.enter_redemption_code'));
      return;
    }
    setIsRedeeming(true);
    try {
      const res = await API.post('/api/user/topup', { key: redemptionCode.trim() });
      if (res.data.success) {
        showSuccess(t('console.settings.redeem_success'));
        setRedemptionCode('');
        loadUser();
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.settings.redeem_failed'));
    }
    setIsRedeeming(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmName !== user?.username) {
      showError(t('console.settings.delete_confirm_error'));
      return;
    }
    try {
      const res = await API.delete('/api/user/self');
      if (res.data.success) {
        showSuccess(t('console.settings.account_deleted'));
        await API.get('/api/user/logout');
        userDispatch({ type: 'logout' });
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.settings.delete_failed'));
    }
  };

  // --- Email Binding ---
  const sendEmailVerification = async () => {
    if (!emailInput) return;
    setEmailLoading(true);
    try {
      const res = await API.get(`/api/verification?email=${emailInput}`);
      if (res.data.success) {
        showSuccess(t('console.settings.verification_sent'));
        setEmailCountdown(30);
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.settings.verification_failed'));
    }
    setEmailLoading(false);
  };

  const bindEmail = async () => {
    if (!emailCode) return;
    setEmailLoading(true);
    try {
      const res = await API.get(
        `/api/oauth/email/bind?email=${emailInput}&code=${emailCode}`
      );
      if (res.data.success) {
        showSuccess(t('console.settings.email_bound'));
        setEmailDialogOpen(false);
        setEmailInput('');
        setEmailCode('');
        loadUser();
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.settings.bind_failed'));
    }
    setEmailLoading(false);
  };

  // --- WeChat Binding ---
  const bindWeChat = async () => {
    if (!wechatCode) return;
    try {
      const res = await API.get(`/api/oauth/wechat/bind?code=${wechatCode}`);
      if (res.data.success) {
        showSuccess(t('console.settings.wechat_bound'));
        setWechatDialogOpen(false);
        setWechatCode('');
        loadUser();
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(t('console.settings.bind_failed'));
    }
  };

  const currentToken = systemToken || user?.access_token;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{t('console.settings.title')}</h1>
        <p className='text-muted-foreground'>{t('console.settings.subtitle')}</p>
      </div>

      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle className='text-sm font-medium flex items-center gap-2'>
            <User className='h-4 w-4' />
            {t('console.settings.personal_info')}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Label>{t('console.settings.username')}</Label>
              <Input value={user?.username || ''} disabled />
            </div>
            <div className='space-y-2'>
              <Label>{t('console.settings.email_label')}</Label>
              <Input value={user?.email || t('console.settings.not_bound')} disabled />
            </div>
          </div>
          <div className='space-y-2'>
            <Label>{t('console.settings.display_name')}</Label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={t('console.settings.display_name_placeholder')}
            />
          </div>

          <Separator />

          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Label>{t('console.settings.new_password')}</Label>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('console.settings.new_password_placeholder')}
              />
            </div>
            <div className='space-y-2'>
              <Label>{t('console.settings.confirm_password')}</Label>
              <Input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('console.settings.confirm_password_placeholder')}
              />
            </div>
          </div>

          <Button onClick={handleUpdateProfile} disabled={loading}>
            {loading ? t('console.settings.saving') : t('console.settings.save_changes')}
          </Button>
        </CardContent>
      </Card>

      {/* System Token */}
      <Card>
        <CardHeader>
          <CardTitle className='text-sm font-medium flex items-center gap-2'>
            <Key className='h-4 w-4' />
            {t('console.settings.system_token')}
          </CardTitle>
          <CardDescription>
            {t('console.settings.system_token_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          {currentToken && (
            <div className='flex items-center gap-2'>
              <div className='flex-1 bg-muted rounded-md p-3'>
                <code className='text-xs break-all'>{currentToken}</code>
              </div>
              <Button variant='outline' size='icon' onClick={handleCopyToken} title={t('console.settings.copy_label')} aria-label={t('console.settings.copy_token_label')}>
                <Copy className='h-4 w-4' />
              </Button>
            </div>
          )}
          <Button variant='outline' onClick={handleGenerateToken}>
            <RefreshCw className='h-4 w-4 mr-2' />
            {t('console.settings.generate_token')}
          </Button>
        </CardContent>
      </Card>

      {/* Invite Link */}
      <Card>
        <CardHeader>
          <CardTitle className='text-sm font-medium flex items-center gap-2'>
            <Link2 className='h-4 w-4' />
            {t('console.settings.invite_link')}
          </CardTitle>
          <CardDescription>
            {t('console.settings.invite_link_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          {affLink && (
            <div className='flex items-center gap-2'>
              <div className='flex-1 bg-muted rounded-md p-3'>
                <code className='text-xs break-all'>{affLink}</code>
              </div>
              <Button variant='outline' size='icon' onClick={async () => {
                if (await copy(affLink)) showSuccess(t('console.common.copied'));
              }} title={t('console.settings.copy_label')}>
                <Copy className='h-4 w-4' />
              </Button>
            </div>
          )}
          {!affLink && user?.aff_code && (
            <p className='text-sm text-muted-foreground'>
              {t('console.settings.invite_code')}: <code className='bg-muted px-1 rounded'>{user.aff_code}</code>
            </p>
          )}
          <Button variant='outline' onClick={handleGetAffLink}>
            <Link2 className='h-4 w-4 mr-2' />
            {t('console.settings.get_invite_link')}
          </Button>
        </CardContent>
      </Card>

      {/* Account Binding */}
      <Card>
        <CardHeader>
          <CardTitle className='text-sm font-medium flex items-center gap-2'>
            <Shield className='h-4 w-4' />
            {t('console.settings.account_binding')}
          </CardTitle>
          <CardDescription>
            {t('console.settings.account_binding_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-3 sm:grid-cols-2'>
            {/* GitHub */}
            <div className='flex items-center justify-between rounded-lg border p-3'>
              <div className='flex items-center gap-3'>
                <Github className='h-5 w-5' />
                <div>
                  <p className='text-sm font-medium'>GitHub</p>
                  <p className='text-xs text-muted-foreground'>
                    {user?.github_id ? t('console.settings.bound') : t('console.settings.not_bound')}
                  </p>
                </div>
              </div>
              {user?.github_id ? (
                <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200'>
                  <CheckCircle2 className='h-3 w-3 mr-1' />
                  {t('console.settings.bound')}
                </Badge>
              ) : status.github_oauth ? (
                <Button variant='outline' size='sm' onClick={() => onGitHubOAuthClicked(status.github_client_id)}>
                  {t('console.settings.bind')}
                </Button>
              ) : (
                <Badge variant='outline' className='text-muted-foreground'>
                  <XCircle className='h-3 w-3 mr-1' />
                  {t('console.settings.not_enabled')}
                </Badge>
              )}
            </div>

            {/* Email */}
            <div className='flex items-center justify-between rounded-lg border p-3'>
              <div className='flex items-center gap-3'>
                <Mail className='h-5 w-5' />
                <div>
                  <p className='text-sm font-medium'>{t('console.settings.email_label')}</p>
                  <p className='text-xs text-muted-foreground'>
                    {user?.email ? user.email : t('console.settings.not_bound')}
                  </p>
                </div>
              </div>
              {user?.email ? (
                <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200'>
                  <CheckCircle2 className='h-3 w-3 mr-1' />
                  {t('console.settings.bound')}
                </Badge>
              ) : (
                <Button variant='outline' size='sm' onClick={() => setEmailDialogOpen(true)}>
                  {t('console.settings.bind')}
                </Button>
              )}
            </div>

            {/* WeChat */}
            <div className='flex items-center justify-between rounded-lg border p-3'>
              <div className='flex items-center gap-3'>
                <MessageSquare className='h-5 w-5' />
                <div>
                  <p className='text-sm font-medium'>{t('console.settings.wechat')}</p>
                  <p className='text-xs text-muted-foreground'>
                    {user?.wechat_id ? t('console.settings.bound') : t('console.settings.not_bound')}
                  </p>
                </div>
              </div>
              {user?.wechat_id ? (
                <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200'>
                  <CheckCircle2 className='h-3 w-3 mr-1' />
                  {t('console.settings.bound')}
                </Badge>
              ) : status.wechat_login ? (
                <Button variant='outline' size='sm' onClick={() => setWechatDialogOpen(true)}>
                  {t('console.settings.bind')}
                </Button>
              ) : (
                <Badge variant='outline' className='text-muted-foreground'>
                  <XCircle className='h-3 w-3 mr-1' />
                  {t('console.settings.not_enabled')}
                </Badge>
              )}
            </div>

            {/* Lark */}
            <div className='flex items-center justify-between rounded-lg border p-3'>
              <div className='flex items-center gap-3'>
                <ExternalLink className='h-5 w-5' />
                <div>
                  <p className='text-sm font-medium'>{t('console.settings.lark')}</p>
                  <p className='text-xs text-muted-foreground'>
                    {user?.lark_id ? t('console.settings.bound') : t('console.settings.not_bound')}
                  </p>
                </div>
              </div>
              {user?.lark_id ? (
                <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200'>
                  <CheckCircle2 className='h-3 w-3 mr-1' />
                  {t('console.settings.bound')}
                </Badge>
              ) : status.lark_client_id ? (
                <Button variant='outline' size='sm' onClick={() => onLarkOAuthClicked(status.lark_client_id)}>
                  {t('console.settings.bind')}
                </Button>
              ) : (
                <Badge variant='outline' className='text-muted-foreground'>
                  <XCircle className='h-3 w-3 mr-1' />
                  {t('console.settings.not_enabled')}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top-up / Redemption */}
      <Card>
        <CardHeader>
          <CardTitle className='text-sm font-medium flex items-center gap-2'>
            <Gift className='h-4 w-4' />
            {t('console.settings.redemption')}
          </CardTitle>
          <CardDescription>
            {t('console.settings.redemption_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center gap-4 rounded-lg bg-muted/50 p-4'>
            <div>
              <p className='text-sm text-muted-foreground'>{t('console.settings.current_balance')}</p>
              <p className='text-2xl font-bold'>
                {user ? renderQuota(user.quota, (key, opts) => {
                  if (key === 'common.quota.display_short') return `$${opts.amount}`;
                  return '';
                }) : '--'}
              </p>
            </div>
          </div>
          <div className='flex gap-2'>
            <Input
              value={redemptionCode}
              onChange={(e) => setRedemptionCode(e.target.value)}
              placeholder={t('console.settings.redemption_placeholder')}
              className='flex-1'
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTopUp();
              }}
              onPaste={(e) => {
                e.preventDefault();
                const text = e.clipboardData.getData('text');
                setRedemptionCode(text.trim());
              }}
            />
            <Button onClick={handleTopUp} disabled={isRedeeming}>
              {isRedeeming ? t('console.settings.redeeming') : t('console.settings.redeem')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className='border-destructive/50'>
        <CardHeader>
          <CardTitle className='text-sm font-medium flex items-center gap-2 text-destructive'>
            <AlertTriangle className='h-4 w-4' />
            {t('console.settings.danger_zone')}
          </CardTitle>
          <CardDescription>
            {t('console.settings.danger_zone_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-between rounded-lg border border-destructive/30 p-4'>
            <div>
              <p className='text-sm font-medium'>{t('console.settings.delete_account')}</p>
              <p className='text-xs text-muted-foreground'>
                {t('console.settings.delete_account_desc')}
              </p>
            </div>
            <Button
              variant='destructive'
              size='sm'
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className='h-4 w-4 mr-1' />
              {t('console.settings.delete_account')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2 text-destructive'>
              <AlertTriangle className='h-5 w-5' />
              {t('console.settings.confirm_delete_account')}
            </DialogTitle>
            <DialogDescription>
              {t('console.settings.delete_account_warning')}
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-3 py-2'>
            <p className='text-sm'>
              {t('console.settings.enter_username_confirm', { username: user?.username }).replace(/<1>|<\/1>/g, '')}
              {' '}<code className='bg-muted px-1.5 py-0.5 rounded font-bold'>{user?.username}</code>
            </p>
            <Input
              value={deleteConfirmName}
              onChange={(e) => setDeleteConfirmName(e.target.value)}
              placeholder={t('console.settings.username_confirm_placeholder')}
            />
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => {
              setShowDeleteDialog(false);
              setDeleteConfirmName('');
            }}>
              {t('console.common.cancel')}
            </Button>
            <Button
              variant='destructive'
              onClick={handleDeleteAccount}
              disabled={deleteConfirmName !== user?.username}
            >
              {t('console.settings.confirm_delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Binding Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('console.settings.bind_email')}</DialogTitle>
            <DialogDescription>{t('console.settings.bind_email_desc')}</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-2'>
            <div className='flex gap-2'>
              <Input
                className='flex-1'
                type='email'
                placeholder={t('console.settings.email_placeholder')}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Button
                variant='outline'
                onClick={sendEmailVerification}
                disabled={emailCountdown > 0 || emailLoading || !emailInput}
              >
                {emailCountdown > 0 ? `${emailCountdown}s` : t('console.settings.get_verification')}
              </Button>
            </div>
            <Input
              placeholder={t('console.settings.verification_placeholder')}
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setEmailDialogOpen(false)}>
              {t('console.common.cancel')}
            </Button>
            <Button onClick={bindEmail} disabled={emailLoading || !emailCode}>
              {emailLoading ? t('console.settings.binding') : t('console.settings.confirm_bind')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* WeChat Binding Dialog */}
      <Dialog open={wechatDialogOpen} onOpenChange={setWechatDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('console.settings.bind_wechat')}</DialogTitle>
            <DialogDescription>{t('console.settings.bind_wechat_desc')}</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-2'>
            {status.wechat_qrcode && (
              <div className='flex justify-center'>
                <img
                  src={status.wechat_qrcode}
                  alt={t('console.settings.wechat_qrcode_alt')}
                  className='max-w-[200px] rounded-md'
                />
              </div>
            )}
            <Input
              placeholder={t('console.settings.wechat_code_placeholder')}
              value={wechatCode}
              onChange={(e) => setWechatCode(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setWechatDialogOpen(false)}>
              {t('console.common.cancel')}
            </Button>
            <Button onClick={bindWeChat} disabled={!wechatCode}>
              {t('console.settings.confirm_bind')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
