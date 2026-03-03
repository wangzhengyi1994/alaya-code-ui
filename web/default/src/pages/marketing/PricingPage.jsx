import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import { CheckCircle2, Minus, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

const CellValue = ({ value }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckCircle2 className='mx-auto h-4 w-4 text-green-500' />
    ) : (
      <Minus className='mx-auto h-4 w-4 text-muted-foreground' />
    );
  }
  return <span className='text-sm'>{value}</span>;
};

const PricingPage = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: 'Lite',
      description: t('pricing.plans.lite_desc'),
      price: t('pricing.plans.free'),
      priceSuffix: '',
      features: [
        t('pricing.plans.lite_f1'),
        t('pricing.plans.lite_f2'),
        t('pricing.plans.lite_f3'),
        t('pricing.plans.lite_f4'),
      ],
      cta: t('pricing.plans.free_register'),
      ctaVariant: 'outline',
      highlighted: false,
    },
    {
      name: 'Pro',
      description: t('pricing.plans.pro_desc'),
      price: '¥140',
      priceSuffix: t('pricing.plans.per_month'),
      features: [
        t('pricing.plans.pro_f1'),
        t('pricing.plans.pro_f2'),
        t('pricing.plans.pro_f3'),
        t('pricing.plans.pro_f4'),
        t('pricing.plans.pro_f5'),
      ],
      cta: t('pricing.plans.get_started'),
      ctaVariant: 'default',
      highlighted: true,
    },
    {
      name: 'Max 5x',
      description: t('pricing.plans.max5x_desc'),
      price: '¥700',
      priceSuffix: t('pricing.plans.per_month'),
      features: [
        t('pricing.plans.max5x_f1'),
        t('pricing.plans.max5x_f2'),
        t('pricing.plans.max5x_f3'),
        t('pricing.plans.max5x_f4'),
        t('pricing.plans.max5x_f5'),
      ],
      cta: t('pricing.plans.get_started'),
      ctaVariant: 'outline',
      highlighted: false,
    },
    {
      name: 'Max 20x',
      description: t('pricing.plans.max20x_desc'),
      price: '¥1400',
      priceSuffix: t('pricing.plans.per_month'),
      features: [
        t('pricing.plans.max20x_f1'),
        t('pricing.plans.max20x_f2'),
        t('pricing.plans.max20x_f3'),
        t('pricing.plans.max20x_f4'),
        t('pricing.plans.max20x_f5'),
      ],
      cta: t('pricing.plans.contact_us'),
      ctaVariant: 'outline',
      highlighted: false,
    },
  ];

  const comparisonFeatures = [
    { feature: t('pricing.compare.basic_models'), lite: true, pro: true, max5x: true, max20x: true },
    { feature: t('pricing.compare.advanced_models'), lite: false, pro: true, max5x: true, max20x: true },
    { feature: t('pricing.compare.dedicated'), lite: false, pro: false, max5x: false, max20x: true },
    { feature: t('pricing.compare.window_limit'), lite: t('pricing.compare.10_req'), pro: t('pricing.compare.45_req'), max5x: t('pricing.compare.225_req'), max20x: t('pricing.compare.900_req') },
    { feature: t('pricing.compare.overage'), lite: t('pricing.compare.pause'), pro: t('pricing.compare.api_rate'), max5x: t('pricing.compare.api_rate'), max20x: t('pricing.compare.api_rate') },
    { feature: t('pricing.compare.monthly_cap'), lite: '-', pro: t('pricing.compare.configurable'), max5x: t('pricing.compare.configurable'), max20x: t('pricing.compare.configurable') },
    { feature: t('pricing.compare.booster'), lite: false, pro: true, max5x: true, max20x: true },
    { feature: t('pricing.compare.priority_support'), lite: false, pro: true, max5x: true, max20x: true },
  ];

  const faqs = [
    { question: t('pricing.faq.q1'), answer: t('pricing.faq.a1') },
    { question: t('pricing.faq.q2'), answer: t('pricing.faq.a2') },
    { question: t('pricing.faq.q3'), answer: t('pricing.faq.a3') },
    { question: t('pricing.faq.q4'), answer: t('pricing.faq.a4') },
    { question: t('pricing.faq.q5'), answer: t('pricing.faq.a5') },
  ];

  return (
    <div className='flex flex-col'>
      {/* Hero */}
      <section className='border-b py-16'>
        <div className='container mx-auto max-w-screen-xl px-4 text-center'>
          <h1 className='text-4xl font-bold tracking-tight'>
            {t('pricing.hero.title')}
          </h1>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            {t('pricing.hero.description')}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className='border-b py-16'>
        <div className='container mx-auto max-w-screen-xl px-4'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  'flex flex-col',
                  plan.highlighted && 'border-primary shadow-lg'
                )}
              >
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-xl'>{plan.name}</CardTitle>
                    {plan.highlighted && <Badge>{t('pricing.badge_recommended')}</Badge>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className='mt-3'>
                    <span className='text-3xl font-bold'>{plan.price}</span>
                    {plan.priceSuffix && (
                      <span className='text-muted-foreground'>
                        {plan.priceSuffix}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className='flex-1'>
                  <ul className='space-y-2.5'>
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className='flex items-start gap-2 text-sm text-muted-foreground'
                      >
                        <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-green-500' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.ctaVariant}
                    className='w-full'
                    asChild
                  >
                    <Link to='/register'>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className='border-b py-16'>
        <div className='container mx-auto max-w-screen-xl px-4'>
          <h2 className='mb-8 text-center text-2xl font-bold tracking-tight'>
            {t('pricing.compare.title')}
          </h2>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[200px]'>{t('pricing.compare.feature')}</TableHead>
                  <TableHead className='text-center'>Lite</TableHead>
                  <TableHead className='text-center'>Pro</TableHead>
                  <TableHead className='text-center'>Max 5x</TableHead>
                  <TableHead className='text-center'>Max 20x</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonFeatures.map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell className='font-medium'>
                      {row.feature}
                    </TableCell>
                    <TableCell className='text-center'>
                      <CellValue value={row.lite} />
                    </TableCell>
                    <TableCell className='text-center'>
                      <CellValue value={row.pro} />
                    </TableCell>
                    <TableCell className='text-center'>
                      <CellValue value={row.max5x} />
                    </TableCell>
                    <TableCell className='text-center'>
                      <CellValue value={row.max20x} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='border-b py-16'>
        <div className='container mx-auto max-w-screen-xl px-4'>
          <h2 className='mb-8 text-center text-2xl font-bold tracking-tight'>
            {t('pricing.faq.title')}
          </h2>
          <div className='mx-auto max-w-3xl'>
            <Accordion type='single' collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className='text-muted-foreground'>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16'>
        <div className='container mx-auto max-w-screen-xl px-4 text-center'>
          <h2 className='text-2xl font-bold tracking-tight'>
            {t('marketing.cta.title')}
          </h2>
          <p className='mx-auto mt-3 max-w-lg text-muted-foreground'>
            {t('pricing.cta.description')}
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

export default PricingPage;
