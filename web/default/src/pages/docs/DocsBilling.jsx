import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DocsBilling = () => {
  const { t } = useTranslation();

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-medium tracking-tight text-[#090e1a]'>{t('docs.billing.title')}</h1>
        <p className='mt-2 text-base font-normal text-[#344256]'>
          {t('docs.billing.description')}
        </p>
      </div>

      {/* Plans overview */}
      <div className='space-y-4'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.billing.plans_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>{t('docs.billing.plans_desc')}</p>
        <div className='overflow-x-auto border border-[#e1e7ef]'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-[#e1e7ef] bg-[#f8fafc]'>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.billing.col_plan')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.billing.col_price')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.billing.col_window_limit')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.billing.col_weekly_limit')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.billing.col_models')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.billing.col_overage')}</th>
              </tr>
            </thead>
            <tbody className='text-[#344256]'>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-medium text-[#090e1a]'>Lite</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_lite_price')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_lite_window')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_lite_weekly')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_lite_models')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_lite_overage')}</td>
              </tr>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-medium text-[#090e1a]'>Pro</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_pro_price')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_pro_window')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_pro_weekly')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_pro_models')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_pro_overage')}</td>
              </tr>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-medium text-[#090e1a]'>Max 5x</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_max5x_price')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_max5x_window')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_max5x_weekly')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_max5x_models')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_max5x_overage')}</td>
              </tr>
              <tr>
                <td className='px-4 py-3 font-medium text-[#090e1a]'>Max 20x</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_max20x_price')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_max20x_window')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_max20x_weekly')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_max20x_models')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.plan_max20x_overage')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className='text-sm font-normal text-[#344256]'>
          {t('docs.billing.plans_compare_hint')}{' '}
          <Link to='/pricing' className='text-xyz-blue-6 hover:text-xyz-blue-5 no-underline'>
            {t('docs.billing.plans_compare_link')}
          </Link>
        </p>
      </div>

      {/* Window quota mechanism */}
      <div className='space-y-4'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.billing.window_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>{t('docs.billing.window_desc')}</p>
        <div className='space-y-0'>
          <div className='border border-[#e1e7ef] p-5'>
            <h3 className='font-medium text-[#090e1a]'>{t('docs.billing.window_how_title')}</h3>
            <ul className='mt-2 list-disc pl-6 text-sm font-normal text-[#344256] space-y-1'>
              <li>{t('docs.billing.window_how_1')}</li>
              <li>{t('docs.billing.window_how_2')}</li>
              <li>{t('docs.billing.window_how_3')}</li>
              <li>{t('docs.billing.window_how_4')}</li>
            </ul>
          </div>
          <div className='border border-t-0 border-[#e1e7ef] p-5'>
            <h3 className='font-medium text-[#090e1a]'>{t('docs.billing.window_example_title')}</h3>
            <p className='mt-2 text-sm font-normal text-[#344256]'>
              {t('docs.billing.window_example_desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Overage policy */}
      <div className='space-y-4'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.billing.overage_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>{t('docs.billing.overage_desc')}</p>
        <div className='overflow-x-auto border border-[#e1e7ef]'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-[#e1e7ef] bg-[#f8fafc]'>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.billing.col_plan')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.billing.overage_col_behavior')}</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-[#344256] uppercase tracking-wider'>{t('docs.billing.overage_col_detail')}</th>
              </tr>
            </thead>
            <tbody className='text-[#344256]'>
              <tr className='border-b border-[#e1e7ef]'>
                <td className='px-4 py-3 font-medium text-[#090e1a]'>Lite</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.overage_lite_behavior')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.overage_lite_detail')}</td>
              </tr>
              <tr>
                <td className='px-4 py-3 font-medium text-[#090e1a]'>Pro / Max</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.overage_pro_behavior')}</td>
                <td className='px-4 py-3 font-normal'>{t('docs.billing.overage_pro_detail')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly spending cap */}
      <div className='space-y-4'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.billing.cap_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>{t('docs.billing.cap_desc')}</p>
        <ul className='list-disc pl-6 text-sm font-normal text-[#344256] space-y-1'>
          <li>{t('docs.billing.cap_1')}</li>
          <li>{t('docs.billing.cap_2')}</li>
          <li>{t('docs.billing.cap_3')}</li>
        </ul>
      </div>

      {/* Booster packs */}
      <div className='space-y-4'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.billing.booster_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>{t('docs.billing.booster_desc')}</p>
        <div className='border border-[#e1e7ef] p-5'>
          <ul className='list-disc pl-6 text-sm font-normal text-[#344256] space-y-1'>
            <li>{t('docs.billing.booster_1')}</li>
            <li>{t('docs.billing.booster_2')}</li>
            <li>{t('docs.billing.booster_3')}</li>
            <li>{t('docs.billing.booster_4')}</li>
          </ul>
        </div>
      </div>

      {/* Subscription management */}
      <div className='space-y-4'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.billing.sub_title')}</h2>
        <div className='space-y-0'>
          <div className='border border-[#e1e7ef] p-5'>
            <h3 className='font-medium text-[#090e1a]'>{t('docs.billing.sub_upgrade_title')}</h3>
            <p className='mt-2 text-sm font-normal text-[#344256]'>{t('docs.billing.sub_upgrade_desc')}</p>
          </div>
          <div className='border border-t-0 border-[#e1e7ef] p-5'>
            <h3 className='font-medium text-[#090e1a]'>{t('docs.billing.sub_downgrade_title')}</h3>
            <p className='mt-2 text-sm font-normal text-[#344256]'>{t('docs.billing.sub_downgrade_desc')}</p>
          </div>
          <div className='border border-t-0 border-[#e1e7ef] p-5'>
            <h3 className='font-medium text-[#090e1a]'>{t('docs.billing.sub_cancel_title')}</h3>
            <p className='mt-2 text-sm font-normal text-[#344256]'>{t('docs.billing.sub_cancel_desc')}</p>
          </div>
          <div className='border border-t-0 border-[#e1e7ef] p-5'>
            <h3 className='font-medium text-[#090e1a]'>{t('docs.billing.sub_renew_title')}</h3>
            <p className='mt-2 text-sm font-normal text-[#344256]'>{t('docs.billing.sub_renew_desc')}</p>
          </div>
        </div>
      </div>

      {/* Billing cycle */}
      <div className='space-y-4'>
        <h2 className='text-xl font-medium text-[#090e1a]'>{t('docs.billing.cycle_title')}</h2>
        <p className='text-sm font-normal text-[#344256]'>{t('docs.billing.cycle_desc')}</p>
        <ul className='list-disc pl-6 text-sm font-normal text-[#344256] space-y-1'>
          <li>{t('docs.billing.cycle_1')}</li>
          <li>{t('docs.billing.cycle_2')}</li>
          <li>{t('docs.billing.cycle_3')}</li>
        </ul>
      </div>

      {/* Where to check */}
      <div className='border border-[#e1e7ef] p-5'>
        <h3 className='font-medium text-[#090e1a]'>{t('docs.billing.check_title')}</h3>
        <p className='mt-1 text-sm font-normal text-[#344256]'>
          {t('docs.billing.check_desc_prefix')}{' '}
          <Link to='/usage' className='text-xyz-blue-6 hover:text-xyz-blue-5 no-underline'>
            {t('docs.billing.check_usage_link')}
          </Link>
          {t('docs.billing.check_desc_middle')}{' '}
          <Link to='/subscription' className='text-xyz-blue-6 hover:text-xyz-blue-5 no-underline'>
            {t('docs.billing.check_sub_link')}
          </Link>
          {t('docs.billing.check_desc_suffix')}
        </p>
      </div>
    </div>
  );
};

export default DocsBilling;
