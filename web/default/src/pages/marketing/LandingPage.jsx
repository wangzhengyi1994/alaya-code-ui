import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BlurText, FadeIn, StaggerIn, PixelCard, PixelBlast, SvgParticleMorph } from '../../components/animations';

/* ── Tool brand logos (official Simple Icons SVG paths) ── */
const CursorLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-xyz-gray-10">
    <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23"/>
  </svg>
);

const ClaudeCodeLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#D97757">
    <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/>
  </svg>
);

const VSCodeClineLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#007ACC">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
  </svg>
);

const OpenCodeLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#211E1E"/>
    <rect x="6" y="6" width="12" height="12" fill="#CFCECD"/>
  </svg>
);

const toolLogos = {
  'Cursor': <CursorLogo />,
  'Claude Code': <ClaudeCodeLogo />,
  'VSCode + Cline': <VSCodeClineLogo />,
  'OpenCode': <OpenCodeLogo />,
};

/* ── Typewriter terminal animation (XYZ style) ── */
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
    <div className='border border-xyz-white-2 bg-[#0d1220] overflow-hidden'>
      <div className='flex gap-2.5 p-4'>
        <div className='w-3 h-3 rounded-full bg-xyz-blue-6' />
        <div className='w-3 h-3 rounded-full border border-xyz-white-4' />
        <div className='w-3 h-3 rounded-full border border-xyz-white-4' />
      </div>
      <div className='px-5 pb-5 font-code text-xs leading-[1.8] text-xyz-white-6'>
        {typewriterLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={line === '' ? 'h-4' : ''}>
            {line.startsWith('$') ? (
              <>
                <span className='text-xyz-blue-6'>$ </span>
                <span className='text-white'>{line.slice(2)}</span>
              </>
            ) : line.startsWith('{') ? (
              <span className='text-xyz-blue-5'>{line}</span>
            ) : (
              <span className='text-xyz-white-6'>{line}</span>
            )}
          </div>
        ))}
        {visibleLines < typewriterLines.length && (
          <span className='inline-block h-4 w-2 animate-pulse bg-xyz-white-5' />
        )}
      </div>
    </div>
  );
};

/* ── SVG shapes for particle morph (Features section) ── */
const featureParticleShapes = [
  {
    // Lightning bolt (Lucide zap) — 国内直连
    viewBox: '0 0 24 24',
    paths: [
      { d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z', fill: '#fff' },
    ],
  },
  {
    // OpenAI logo — OpenAI 兼容
    viewBox: '0 0 24 24',
    paths: [
      { d: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z', fill: '#fff' },
    ],
  },
  {
    // Shield check (Lucide) — 安全可靠
    viewBox: '0 0 24 24',
    paths: [
      { d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', stroke: '#fff', strokeWidth: 1.5, fill: 'none' },
      { d: 'm9 12 2 2 4-4', stroke: '#fff', strokeWidth: 1.5, fill: 'none' },
    ],
  },
];

/* ── Landing Page ── */
const LandingPage = () => {
  const { t } = useTranslation();
  const [activeFeature, setActiveFeature] = useState(0);

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
    { name: 'Cursor', description: t('marketing.tools.cursor_desc'), config: 'Settings > Models > OpenAI API Base' },
    { name: 'Claude Code', description: t('marketing.tools.claude_code_desc'), config: 'ANTHROPIC_BASE_URL' },
    { name: 'VSCode + Cline', description: t('marketing.tools.cline_desc'), config: 'Extension Settings > API Base URL' },
    { name: 'OpenCode', description: t('marketing.tools.opencode_desc'), config: 'config.yaml > base_url' },
  ];

  return (
    <div className='flex flex-col'>

      {/* ══════ Hero Section (深色背景) ══════ */}
      <section className='relative min-h-[684px] bg-xyz-gray-10 overflow-hidden flex flex-col items-center justify-center'>
        <div className='absolute inset-0 z-[1]'>
          <PixelBlast
            color='#4362ff'
            variant='square'
            pixelSize={4}
            patternScale={2}
            patternDensity={1.5}
            speed={0.3}
            enableRipples={false}
            edgeFade={0.35}
            transparent={true}
          />
        </div>
        <div className='relative z-10 text-center max-w-[695px] px-5 py-32'>
          <h1 className='text-[72px] font-medium leading-[80px] text-white mb-4'>
            <BlurText
              text='面向开发者的'
              delay={80}
              animateBy='words'
              direction='bottom'
              className='justify-center'
            />
            <br />
            <BlurText
              text='AICoding 助手平台'
              delay={80}
              animateBy='words'
              direction='bottom'
              className='justify-center whitespace-nowrap'
              stepDuration={0.4}
            />
          </h1>
          <FadeIn delay={0.4} distance={20}>
            <div className='flex flex-col gap-1 items-center'>
              <p className='text-base font-normal leading-6 text-xyz-white-9 m-0'>
                Alaya Code 聚合 Kimi、通义千问、智谱 GLM 等国产大模型，提供 OpenAI 兼容接口。
              </p>
              <p className='text-base font-normal leading-6 text-xyz-white-9 m-0'>
                无需切换 SDK，一行配置即可接入 Cursor、Claude Code 等 AI 工具链。
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.6} distance={20}>
            <div className='flex justify-center pt-6'>
              <Link
                to='/register'
                className='inline-flex items-center justify-center gap-2 bg-xyz-blue-6 text-white text-base font-normal h-10 w-[200px] no-underline transition-colors hover:bg-[#3451e6]'
              >
                立即开始
                <svg width='18' height='18' viewBox='0 0 14 12' fill='none' className='rotate-[-45deg]'>
                  <path d='M1 6H13M13 6L8 1M13 6L8 11' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                </svg>
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.8} distance={15}>
            <div className='flex justify-center gap-8 pt-4 text-base font-normal text-xyz-white-9'>
              <span className='flex items-center gap-2'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' className='text-xyz-white-9'>
                  <path d='M20 12v10H4V12' /><path d='M2 7h20v5H2z' /><path d='M12 22V7' /><path d='M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z' /><path d='M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' />
                </svg>
                免费试用
              </span>
              <span className='flex items-center gap-2'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' className='text-xyz-white-9'>
                  <line x1='12' y1='1' x2='12' y2='23' /><path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                </svg>
                按量计费
              </span>
              <span className='flex items-center gap-2'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' className='text-xyz-white-9'>
                  <circle cx='12' cy='12' r='10' /><path d='M2 12h20' /><path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
                </svg>
                无需翻墙
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════ Pricing Preview (白底 LIGHT) — Figma 对齐 ══════ */}
      <section className='xyz-section-light'>
        <div className='max-w-xyz mx-auto'>
          <div className='xyz-section-light-inner px-5 py-20'>
            <FadeIn className='text-center mb-10'>
              <h2 className='text-[40px] font-medium leading-[48px] text-[#090e1a] mb-4'>
                <BlurText
                  text='简单透明的定价'
                  delay={60}
                  animateBy='words'
                  direction='bottom'
                  className='justify-center'
                  animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
                  animationTo={[
                    { filter: 'blur(5px)', opacity: 0.5, y: -5 },
                    { filter: 'blur(0px)', opacity: 1, y: 0 },
                  ]}
                />
              </h2>
              <FadeIn delay={0.2} distance={15}>
                <p className='text-base font-normal leading-6 text-[#344256]'>
                  从免费试用开始，按需升级
                </p>
              </FadeIn>
            </FadeIn>
            <StaggerIn
              staggerDelay={0.1}
              direction='up'
              distance={40}
              className='grid grid-cols-4 mx-auto'
              style={{ gap: '20px' }}
            >
              {[
                {
                  tier: 'GLOW',
                  price: '免费',
                  priceNum: false,
                  priceNote: '',
                  desc: '个人开发者入门',
                  icon: '/membership/glow-free.png',
                  features: ['5 个模型可用', '100 次/天调用', '社区支持'],
                  cta: '立即使用',
                  ctaStyle: 'blue',
                  recommended: false,
                },
                {
                  tier: 'GLOW',
                  price: '¥99',
                  priceNum: true,
                  priceNote: '/月',
                  desc: '个人开发者入门',
                  icon: '/membership/glow-paid.png',
                  features: ['20+ 模型可用', '5,000 次/天调用', '邮件支持'],
                  cta: '立即购买',
                  ctaStyle: 'blue',
                  recommended: false,
                },
                {
                  tier: 'SOLAR',
                  price: '¥299',
                  priceNum: true,
                  priceNote: '/月',
                  desc: '团队协作首选',
                  icon: '/membership/solar.png',
                  features: ['全部模型可用', '50,000 次/天调用', '专属客服'],
                  cta: '立即购买',
                  ctaStyle: 'blue',
                  recommended: true,
                },
                {
                  tier: 'GALAXY',
                  price: '定制',
                  priceNum: false,
                  priceNote: '',
                  desc: '企业级定制方案',
                  icon: '/membership/galaxy.png',
                  features: ['无限模型 & 调用', '私有化部署', 'SLA 保障'],
                  cta: '联系客服',
                  ctaStyle: 'dark',
                  recommended: false,
                },
              ].map((plan, planIdx) => (
                <div
                  key={`${plan.tier}-${planIdx}`}
                  className='bg-white border border-[#e1e7ef] flex flex-col transition-all duration-300 hover:border-xyz-gray-5'
                  style={{ padding: '40px 20px', gap: '24px' }}
                >
                  {/* Card Header: left name+desc, right icon */}
                  <div className='flex items-start justify-between' style={{ gap: '8px' }}>
                    <div className='flex flex-col' style={{ gap: '8px' }}>
                      <div className='flex items-center' style={{ gap: '4px' }}>
                        <h3 className='text-[28px] font-medium leading-8 text-[#090e1a] m-0 font-mono'>
                          {plan.tier}
                        </h3>
                        {plan.recommended && (
                          <span
                            className='text-xs font-normal text-white leading-5 px-1 flex-shrink-0'
                            style={{
                              background: 'linear-gradient(to right, #ff6321, #ff3212)',
                              borderRadius: '4px',
                            }}
                          >
                            推荐
                          </span>
                        )}
                      </div>
                      <p className='text-sm font-normal leading-[22px] text-[#344256] m-0'>
                        {plan.desc}
                      </p>
                    </div>
                    <img
                      src={process.env.PUBLIC_URL + plan.icon}
                      alt={plan.tier}
                      className='w-12 h-12 flex-shrink-0'
                    />
                  </div>

                  {/* Price */}
                  <div className='flex items-end' style={{ gap: '4px' }}>
                    {plan.priceNum ? (
                      <>
                        <span
                          className='text-[40px] font-normal leading-10 text-[#344256]'
                          style={{ fontFamily: "'D-DIN', 'JetBrains Mono', monospace" }}
                        >
                          {plan.price}
                        </span>
                        <span className='text-sm font-medium leading-[22px] text-[#344256]'>
                          {plan.priceNote}
                        </span>
                      </>
                    ) : (
                      <span className='text-[32px] font-medium leading-10 text-[#090e1a]'>
                        {plan.price}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className='list-none p-0 m-0 flex flex-col flex-1' style={{ gap: '8px' }}>
                    {plan.features.map((f, i) => (
                      <li key={i} className='flex items-center text-sm font-normal leading-[22px] text-[#344256]' style={{ gap: '4px' }}>
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#4362ff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='flex-shrink-0'>
                          <polyline points='20 6 9 17 4 12' />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <Link
                    to={plan.ctaStyle === 'dark' ? '/contact' : '/register'}
                    className={`block w-full text-center text-base font-medium h-10 leading-10 no-underline transition-colors ${
                      plan.ctaStyle === 'dark'
                        ? 'bg-[#0f1728] text-white hover:bg-xyz-gray-8'
                        : 'bg-xyz-blue-6 text-white hover:bg-[#3451e6]'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </StaggerIn>
            <FadeIn delay={0.3} className='mt-10 text-center'>
              <Link
                to='/pricing'
                className='inline-flex items-center gap-2 text-sm font-normal text-xyz-blue-6 no-underline transition-colors hover:text-xyz-blue-8'
              >
                {t('marketing.pricing_preview.view_all')}
                <svg width='14' height='12' viewBox='0 0 14 12' fill='none'>
                  <path d='M1 6H13M13 6L8 1M13 6L8 11' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                </svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════ Models Section (白底 LIGHT) ══════ */}
      <section className='xyz-section-light'>
        <div className='max-w-xyz mx-auto'>
          <div className='xyz-section-light-inner px-5 py-20'>
            <FadeIn className='text-center mb-20'>
              <h2 className='text-5xl font-medium leading-[56px] text-xyz-gray-10 mb-4'>
                <BlurText
                  text={t('marketing.models.title')}
                  delay={60}
                  animateBy='words'
                  direction='bottom'
                  className='justify-center'
                  animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
                  animationTo={[
                    { filter: 'blur(5px)', opacity: 0.5, y: -5 },
                    { filter: 'blur(0px)', opacity: 1, y: 0 },
                  ]}
                />
              </h2>
              <FadeIn delay={0.2} distance={15}>
                <p className='text-lg font-normal text-xyz-gray-6'>
                  {t('marketing.models.subtitle')}
                </p>
              </FadeIn>
            </FadeIn>
            <StaggerIn
              staggerDelay={0.12}
              direction='up'
              distance={40}
              className='grid gap-0 md:grid-cols-3'
            >
              {models.map((model) => (
                <div
                  key={model.name}
                  className='border border-xyz-gray-3 p-5 transition-all duration-300 hover:border-xyz-gray-5 hover:bg-xyz-gray-1'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-xs font-medium text-xyz-blue-6 border border-xyz-blue-6/30 px-2 py-0.5'>
                      {model.badge}
                    </span>
                    <span className='text-xs font-normal text-xyz-gray-5'>
                      {model.provider}
                    </span>
                  </div>
                  <h3 className='text-xl font-medium text-xyz-gray-10 mb-2'>{model.name}</h3>
                  <p className='text-sm font-normal text-xyz-gray-6 mb-4'>
                    <span className='text-xyz-blue-6 font-medium'>{model.context}</span>{' '}
                    {t('marketing.models.context_label')} &middot; {model.highlight}
                  </p>
                  <p className='text-sm font-normal text-xyz-gray-6 leading-relaxed'>
                    {model.description}
                  </p>
                </div>
              ))}
            </StaggerIn>
            <FadeIn delay={0.3} className='mt-10 text-center'>
              <Link
                to='/docs'
                className='inline-flex items-center gap-2 text-sm font-normal text-xyz-blue-6 no-underline transition-colors hover:text-xyz-blue-8'
              >
                {t('marketing.models.view_all')}
                <svg width='14' height='12' viewBox='0 0 14 12' fill='none'>
                  <path d='M1 6H13M13 6L8 1M13 6L8 11' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                </svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════ Tools Integration (白底 LIGHT) — 四个均分 + logo ══════ */}
      <section className='xyz-section-light'>
        <div className='max-w-xyz mx-auto'>
          <div className='xyz-section-light-inner px-5 py-20'>
            <FadeIn className='text-center mb-20'>
              <h2 className='text-5xl font-medium leading-[56px] text-xyz-gray-10 mb-4'>
                <BlurText
                  text={t('marketing.tools.title')}
                  delay={60}
                  animateBy='words'
                  direction='bottom'
                  className='justify-center'
                  animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
                  animationTo={[
                    { filter: 'blur(5px)', opacity: 0.5, y: -5 },
                    { filter: 'blur(0px)', opacity: 1, y: 0 },
                  ]}
                />
              </h2>
              <FadeIn delay={0.2} distance={15}>
                <p className='text-lg font-normal text-xyz-gray-6'>
                  {t('marketing.tools.subtitle')}
                </p>
              </FadeIn>
            </FadeIn>
            <StaggerIn
              staggerDelay={0.1}
              direction='up'
              distance={30}
              className='grid grid-cols-4 gap-0'
            >
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className='border border-xyz-gray-3 p-5 flex flex-col gap-4 transition-all duration-300 hover:border-xyz-gray-5 hover:bg-xyz-gray-1'
                >
                  <div className='flex items-center gap-3'>
                    {toolLogos[tool.name]}
                    <h3 className='text-lg font-medium text-xyz-gray-10'>{tool.name}</h3>
                  </div>
                  <p className='text-sm font-normal text-xyz-gray-6 leading-relaxed flex-1'>
                    {tool.description}
                  </p>
                  <code className='block text-xs font-code text-xyz-gray-7 bg-xyz-gray-1 px-3 py-2'>
                    {tool.config}
                  </code>
                </div>
              ))}
            </StaggerIn>
          </div>
        </div>
      </section>

      {/* ══════ Features (深色 DARK) ══════ */}
      <section className='bg-xyz-gray-10'>
        <div className='max-w-xyz mx-auto'>
          <div className='xyz-section-inner px-5 py-20'>
            <div className='grid items-stretch gap-0 lg:grid-cols-2'>
              <div className='feature-menu-list' style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <FadeIn>
                  <h2 className='text-5xl font-medium leading-[56px] text-white mb-4'>
                    <BlurText
                      text={t('marketing.features.title')}
                      delay={60}
                      animateBy='words'
                      direction='bottom'
                    />
                  </h2>
                </FadeIn>
                {[
                  { title: t('marketing.features.direct_title'), desc: t('marketing.features.direct_desc'), delay: 0.1 },
                  { title: t('marketing.features.compatible_title'), desc: t('marketing.features.compatible_desc'), delay: 0.2 },
                  { title: t('marketing.features.secure_title'), desc: t('marketing.features.secure_desc'), delay: 0.3 },
                ].map((item, idx) => {
                  const isActive = activeFeature === idx;
                  return (
                    <FadeIn key={idx} delay={item.delay} direction='left' distance={30}>
                      <div
                        onMouseEnter={() => setActiveFeature(idx)}
                        className={`feature-menu-item${isActive ? ' active' : ''} w-full text-left py-5 pl-4 pr-4 cursor-pointer hover:bg-white/[0.03]`}
                      >
                        <h3
                          className='text-xl font-medium mb-2'
                          style={{
                            color: isActive ? '#ffffff' : 'rgba(255,255,255,0.40)',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className='text-sm font-normal leading-relaxed'
                          style={{
                            color: isActive ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.25)',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
              <FadeIn direction='right' distance={50} delay={0.2}>
                <div className='w-full h-[480px]'>
                  <SvgParticleMorph
                    svgPaths={featureParticleShapes}
                    activeIndex={activeFeature}
                    particleCount={4000}
                    color='#ffffff'
                    size={1.2}
                    jitter={0.12}
                    morphDuration={1000}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CTA Section (深色 DARK + PixelCard hover) ══════ */}
      <section className='bg-xyz-gray-10'>
        <div className='max-w-xyz mx-auto'>
          <PixelCard
            gap={6}
            speed={40}
            colors='#4362ff,#6b89ff,#1d2cb3,#0f188c'
            noFocus
            className='xyz-section-inner px-5 py-20 text-center'
          >
            <div className='relative z-10'>
              <FadeIn>
                <h2 className='text-5xl font-medium leading-[56px] text-white mb-4'>
                  <BlurText
                    text={t('marketing.cta.title')}
                    delay={60}
                    animateBy='words'
                    direction='bottom'
                    className='justify-center'
                  />
                </h2>
              </FadeIn>
              <FadeIn delay={0.2} distance={15}>
                <p className='text-lg font-normal text-xyz-white-6 max-w-lg mx-auto mb-10'>
                  {t('marketing.cta.description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.4} distance={20}>
                <div className='flex justify-center gap-4'>
                  <Link
                    to='/register'
                    className='inline-flex items-center justify-center gap-2 bg-white text-xyz-blue-6 text-base font-normal h-10 px-6 no-underline transition-colors hover:bg-xyz-gray-1'
                  >
                    {t('marketing.cta.register')}
                    <svg width='14' height='12' viewBox='0 0 14 12' fill='none' className='rotate-[-45deg]'>
                      <path d='M1 6H13M13 6L8 1M13 6L8 11' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                  </Link>
                  <Link
                    to='/docs'
                    className='inline-flex items-center justify-center gap-2 border border-xyz-white-3 text-white text-base font-normal h-10 px-6 no-underline transition-colors hover:border-xyz-white-5'
                  >
                    {t('marketing.cta.view_docs')}
                  </Link>
                </div>
              </FadeIn>
            </div>
          </PixelCard>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
