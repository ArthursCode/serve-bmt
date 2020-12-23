export const dateFormat = 'MM-DD-YYYY';
export const tableDateFormat = 'MMM DD, YYYY';
export const infoDateFormat = 'MM/DD/YYYY';
export const dateTimeFormat = 'MM/DD/YYYY HH:mm';

export const categoryAllItems = [
  { label: 'Other', key: 'other', group: null, child: { state: 'Active' } },
  { label: 'Employee salaries', key: 'salaries', group: 'Staff and benefits', child: { state: 'Active' } },
  { label: 'Payroll taxes', key: 'taxes', group: 'Staff and benefits', child: { state: 'Active' } },
  { label: 'Employee Benefits and Pensions', key: 'benefits', group: 'Staff and benefits', child: { state: 'Active' } },
  { label: 'Insurances', key: 'insurances', group: 'Staff and benefits', child: { state: 'Active' } },

  { label: 'Utilities and phone', key: 'utilities', group: 'Operating costs', child: { state: 'Active' } },
  { label: 'Building rent and expenses', key: 'building', group: 'Operating costs', child: { state: 'Active' } },
  { label: 'Equipment lease', key: 'equipment_leases', group: 'Operating costs', child: { state: 'Active' } },
  { label: 'Equipment expenses', key: 'equipment_expenses', group: 'Operating costs', child: { state: 'Active' } },

  { label: 'Advertising', key: 'advertising', group: 'Administrative costs', child: { state: 'Active' } },
  { label: 'Dues and subscriptions', key: 'subscriptions', group: 'Administrative costs', child: { state: 'Active' } },
  { label: 'Legal and accounting', key: 'accounting', group: 'Administrative costs', child: { state: 'Active' } },
  { label: 'Repairs an maintenance', key: 'repairs', group: 'Administrative costs', child: { state: 'Active' } },
  { label: 'Office and computer supplies', key: 'supplies', group: 'Administrative costs', child: { state: 'Active' } },
];

export const getCategoryName = {
  other: 'Other',
  staff: 'Staff and benefits',
  operating: 'Operating costs',
  admin: 'Administrative costs'
};

export const getSubCategoryName = {
  // staff and benefits
  salaries: 'Employee salaries',
  taxes: 'Payroll taxes',
  benefits: 'Employee Benefits and Pensions',
  insurances: 'Insurances',
  // operating costs
  utilities: 'Utilities and phone',
  building: 'Building rent and expenses',
  equipment_leases: 'Equipment lease',
  equipment_expenses: 'Equipment expenses',
  // admin costs
  advertising: 'Advertising',
  subscriptions: 'Dues and subscriptions',
  accounting: 'Legal and accounting',
  repairs: 'Repairs an maintenance',
  supplies: 'Office and computer supplies'
};
