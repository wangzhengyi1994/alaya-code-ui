import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Code2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const typewriterLines = [
  '$ export OPENAI_API_BASE=https://api.alayanew.com/v1',
  '$ export OPENAI_API_KEY=sk-xxxxxxxx',
  '$ curl $OPENAI_API_BASE/chat/completions \\',
  '    -H "Authorization: Bearer $OPENAI_API_KEY" \\',
  '    -d \'{"model":"kimi-2.5","messages":[{"role":"user","content":"Hello"}]}\'',
  '',
  '{"choices":[{"message":{"content":"Hello! How can I help you?"}}]}',
];

const TerminalAnimation = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < typewriterLines.length) {
      const timer = setTimeout(
        () => setVisibleLines((v) => v + 1),
        visibleLines === 0 ? 500 : 400
      );
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  return (
    <div className='overflow-hidden rounded-lg border bg-zinc-950 text-zinc-100 shadow-2xl'>
      <div className='flex items-center gap-2 border-b border-zinc-800 px-4 py-3'>
        <div className='h-3 w-3 rounded-full bg-red-500' />
        <div className='h-3 w-3 rounded-full bg-yellow-500' />
        <div className='h-3 w-3 rounded-full bg-green-500' />
        <span className='ml-2 text-xs text-zinc-500'>terminal</span>
      </div>
      <div className='p-4 font-mono text-sm leading-relaxed'>
        {typewriterLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={line === '' ? 'h-4' : ''}>
            {line.startsWith('$') ? (
              <>
                <span className='text-green-400'>$ </span>
                <span className='text-zinc-300'>{line.slice(2)}</span>
              </>
            ) : line.startsWith('{') ? (
              <span className='text-emerald-400'>{line}</span>
            ) : (
              <span className='text-zinc-400'>{line}</span>
            )}
          </div>
        ))}
        {visibleLines < typewriterLines.length && (
          <span className='inline-block h-4 w-2 animate-pulse bg-zinc-400' />
        )}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const { t } = useTranslation();

  const models = [
    {
      name: 'Kimi 2.5',
      provider: 'Moonshot AI',
      context: '200K',
      highlight: t('marketing.models.kimi_highlight'),
      description: t('marketing.models.kimi_desc'),
      badge: t('marketing.models.badge_popular'),
    },
    {
      name: 'Qwen 3.5',
      provider: t('marketing.models.qwen_provider'),
      context: '128K',
      highlight: t('marketing.models.qwen_highlight'),
      description: t('marketing.models.qwen_desc'),
      badge: t('marketing.models.badge_recommended'),
    },
    {
      name: 'GLM 5',
      provider: t('marketing.models.glm_provider'),
      context: '128K',
      highlight: t('marketing.models.glm_highlight'),
      description: t('marketing.models.glm_desc'),
      badge: t('marketing.models.badge_new'),
    },
  ];

  const tools = [
    {
      name: 'Cursor',
      description: t('marketing.tools.cursor_desc'),
      config: 'Settings > Models > OpenAI API Base',
    },
    {
      name: 'Claude Code',
      description: t('marketing.tools.claude_code_desc'),
      config: 'ANTHROPIC_BASE_URL',
    },
    {
      name: 'VSCode + Cline',
      description: t('marketing.tools.cline_desc'),
      config: 'Extension Settings > API Base URL',
    },
    {
      name: 'OpenCode',
      description: t('marketing.tools.opencode_desc'),
      config: 'config.yaml > base_url',
    },
  ];

  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/30'>
        <div className='container mx-auto max-w-screen-xl px-4 py-20 md:py-28'>
          <div className='grid items-center gap-12 lg:grid-cols-2'>
            <div className='space-y-6'>
              <Badge variant='secondary' className='px-3 py-1'>
                <Sparkles className='mr-1 h-3 w-3' />
                {t('marketing.hero.badge')}
              </Badge>
              <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
                {t('marketing.hero.title_line1')}
                <br />
                <span className='text-primary'>{t('marketing.hero.title_line2')}</span>
              </h1>
              <p className='max-w-lg text-lg text-muted-foreground'>
                {t('marketing.hero.description')}
              </p>
              <div className='flex flex-wrap gap-3'>
                <Button size='lg' asChild>
                  <Link to='/register'>
                    {t('marketing.hero.cta_start')}
                    <ArrowRight className='ml-1 h-4 w-4' />
                  </Link>
                </Button>
                <Button size='lg' variant='outline' asChild>
                  <Link to='/pricing'>{t('marketing.hero.cta_pricing')}</Link>
                </Button>
              </div>
              <div className='flex items-center gap-6 text-sm text-muted-foreground'>
                <span className='flex items-center gap-1'>
                  <CheckCircle2 className='h-4 w-4 text-green-500' />
                  {t('marketing.hero.free_trial')}
                </span>
                <span className='flex items-center gap-1'>
                  <CheckCircle2 className='h-4 w-4 text-green-500' />
                  {t('marketing.hero.pay_as_you_go')}
                </span>
                <span className='flex items-center gap-1'>
                  <CheckCircle2 className='h-4 w-4 text-green-500' />
                  {t('marketing.hero.no_vpn')}
                </span>
              </div>
            </div>
            <div className='hidden lg:block'>
              <TerminalAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className='border-b py-20'>
        <div className='container mx-auto max-w-screen-xl px-4'>
          <div className='mx-auto mb-12 max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight'>
              {t('marketing.models.title')}
            </h2>
            <p className='mt-3 text-lg text-muted-foreground'>
              {t('marketing.models.subtitle')}
            </p>
          </div>
          <div className='grid gap-6 md:grid-cols-3'>
            {models.map((model) => (
              <Card key={model.name} className='relative overflow-hidden'>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <Badge variant='outline'>{model.badge}</Badge>
                    <span className='text-xs text-muted-foreground'>
                      {model.provider}
                    </span>
                  </div>
                  <CardTitle className='mt-2 text-xl'>{model.name}</CardTitle>
                  <CardDescription>
                    <span className='font-medium text-primary'>
                      {model.context}
                    </span>{' '}
                    {t('marketing.models.context_label')} &middot; {model.highlight}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    {model.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className='mt-8 text-center'>
            <Button variant='outline' asChild>
              <Link to='/docs'>
                {t('marketing.models.view_all')}
                <ArrowRight className='ml-1 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Integration Section */}
      <section className='border-b bg-muted/30 py-20'>
        <div className='container mx-auto max-w-screen-xl px-4'>
          <div className='mx-auto mb-12 max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight'>
              {t('marketing.tools.title')}
            </h2>
            <p className='mt-3 text-lg text-muted-foreground'>
              {t('marketing.tools.subtitle')}
            </p>
          </div>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {tools.map((tool) => (
              <Card key={tool.name}>
                <CardHeader>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                    <Code2 className='h-5 w-5 text-primary' />
                  </div>
                  <CardTitle className='text-lg'>{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <p className='text-sm text-muted-foreground'>
                    {tool.description}
                  </p>
                  <code className='block rounded bg-muted px-2 py-1 text-xs'>
                    {tool.config}
                  </code>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className='border-b py-20'>
        <div className='container mx-auto max-w-screen-xl px-4'>
          <div className='mx-auto mb-12 max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight'>
              {t('marketing.pricing_preview.title')}
            </h2>
            <p className='mt-3 text-lg text-muted-foreground'>
              {t('marketing.pricing_preview.subtitle')}
            </p>
          </div>
          <div className='mx-auto grid max-w-3xl gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Lite</CardTitle>
                <CardDescription>{t('marketing.pricing_preview.lite_desc')}</CardDescription>
                <div className='mt-2'>
                  <span className='text-3xl font-bold'>{t('marketing.pricing_preview.free')}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  <li className='flex items-center gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-500' />
                    {t('marketing.pricing_preview.lite_feature1')}
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-500' />
                    {t('marketing.pricing_preview.lite_feature2')}
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-500' />
                    {t('marketing.pricing_preview.lite_feature3')}
                  </li>
                </ul>
                <Button variant='outline' className='mt-6 w-full' asChild>
                  <Link to='/register'>{t('marketing.pricing_preview.free_register')}</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className='border-primary'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle>Pro</CardTitle>
                  <Badge>{t('marketing.pricing_preview.badge_recommended')}</Badge>
                </div>
                <CardDescription>{t('marketing.pricing_preview.pro_desc')}</CardDescription>
                <div className='mt-2'>
                  <span className='text-3xl font-bold'>&#xA5;140</span>
                  <span className='text-muted-foreground'>{t('marketing.pricing_preview.per_month')}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  <li className='flex items-center gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-500' />
                    {t('marketing.pricing_preview.pro_feature1')}
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-500' />
                    {t('marketing.pricing_preview.pro_feature2')}
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-500' />
                    {t('marketing.pricing_preview.pro_feature3')}
                  </li>
                </ul>
                <Button className='mt-6 w-full' asChild>
                  <Link to='/register'>{t('marketing.pricing_preview.get_started')}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className='mt-8 text-center'>
            <Button variant='link' asChild>
              <Link to='/pricing'>
                {t('marketing.pricing_preview.view_all')}
                <ArrowRight className='ml-1 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20'>
        <div className='container mx-auto max-w-screen-xl px-4'>
          <div className='mx-auto mb-12 max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight'>
              {t('marketing.features.title')}
            </h2>
          </div>
          <div className='grid gap-8 md:grid-cols-3'>
            <div className='space-y-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                <Globe className='h-5 w-5 text-primary' />
              </div>
              <h3 className='font-semibold'>{t('marketing.features.direct_title')}</h3>
              <p className='text-sm text-muted-foreground'>
                {t('marketing.features.direct_desc')}
              </p>
            </div>
            <div className='space-y-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                <Zap className='h-5 w-5 text-primary' />
              </div>
              <h3 className='font-semibold'>{t('marketing.features.compatible_title')}</h3>
              <p className='text-sm text-muted-foreground'>
                {t('marketing.features.compatible_desc')}
              </p>
            </div>
            <div className='space-y-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                <Shield className='h-5 w-5 text-primary' />
              </div>
              <h3 className='font-semibold'>{t('marketing.features.secure_title')}</h3>
              <p className='text-sm text-muted-foreground'>
                {t('marketing.features.secure_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='border-t bg-muted/30 py-20'>
        <div className='container mx-auto max-w-screen-xl px-4 text-center'>
          <h2 className='text-3xl font-bold tracking-tight'>
            {t('marketing.cta.title')}
          </h2>
          <p className='mx-auto mt-3 max-w-lg text-lg text-muted-foreground'>
            {t('marketing.cta.description')}
          </p>
          <div className='mt-8 flex justify-center gap-4'>
            <Button size='lg' asChild>
              <Link to='/register'>
                {t('marketing.cta.register')}
                <ArrowRight className='ml-1 h-4 w-4' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link to='/docs'>{t('marketing.cta.view_docs')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
