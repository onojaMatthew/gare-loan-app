export const Gender = [
  { id: 1, Type: 'Male' },
  { id: 2, Type: 'Female' },
];

export const MaritalStatus = [
  { id: 1, Status: 'Single' },
  { id: 2, Status: 'Married' },
  { id: 3, Status: 'Divorce' },
  { id: 4, Status: 'Widow' },
  { id: 5, Status: 'Widower' },
  { id: 6, Status: 'Others' },
];

export const IDType = [
  { id: 1, Type: 'International Passport' },
  { id: 2, Type: "Driver's License" },
  { id: 3, Type: "Voter's Card" },
  { id: 4, Type: 'National ID' },
  { id: 5, Type: 'Others' },
];

export const EmploymentType = [
  { id: 1, Type: 'Full Time' },
  { id: 2, Type: 'Part Time' },
  { id: 3, Type: 'Outsourced' },
  { id: 4, Type: 'Contract' },
  { id: 5, Type: 'Self Employed' },
  { id: 5, Type: 'Others' },
];

export const LoanAmount = [
  { id: 1, Amount: 3000 },
  { id: 2, Amount: 10000 },
  { id: 3, Amount: 20000 },
  { id: 4, Amount: 30000 },
  { id: 5, Amount: 50000 },
  { id: 5, Amount: 75000 },
  { id: 5, Amount: 100000 },
  { id: 5, Amount: 150000 },
  { id: 5, Amount: 200000 },
  { id: 5, Amount: 300000 },
  { id: 5, Amount: 500000 },
  { id: 5, Amount: 1000000 },
];

exports.bankEnum = () => {
  return [
    { id: '1', name: 'Access Bank', code: '044' },
    { id: '2', name: 'Citibank', code: '023' },
    { id: '3', name: 'Diamond Bank', code: '063' },
    { id: '4', name: 'Dynamic Standard Bank', code: '' },
    { id: '5', name: 'Ecobank Nigeria', code: '050' },
    { id: '6', name: 'Fidelity Bank Nigeria', code: '070' },
    { id: '7', name: 'First Bank of Nigeria', code: '011' },
    { id: '8', name: 'First City Monument Bank', code: '214' },
    { id: '9', name: 'Guaranty Trust Bank', code: '058' },
    { id: '10', name: 'Heritage Bank Plc', code: '030' },
    { id: '11', name: 'Jaiz Bank', code: '301' },
    { id: '12', name: 'Keystone Bank Limited', code: '082' },
    { id: '13', name: 'Providus Bank Plc', code: '101' },
    { id: '14', name: 'Polaris Bank', code: '076' },
    { id: '15', name: 'Stanbic IBTC Bank Nigeria Limited', code: '221' },
    { id: '16', name: 'Standard Chartered Bank', code: '068' },
    { id: '17', name: 'Sterling Bank', code: '232' },
    { id: '18', name: 'Suntrust Bank Nigeria Limited', code: '100' },
    { id: '19', name: 'Union Bank of Nigeria', code: '032' },
    { id: '20', name: 'United Bank for Africa', code: '033' },
    { id: '21', name: 'Unity Bank Plc', code: '215' },
    { id: '22', name: 'Wema Bank', code: '035' },
    { id: '23', name: 'Zenith Bank', code: '057' },
  ];
}

export const LoanStatus = [
  { id: 1, Status: 'Approved' },
  { id: 2, Status: 'Declined' },
  { id: 3, Status: 'Pending' },
  { id: 4, Status: 'Active' },
  { id: 5, Status: 'Inactive' },
  { id: 6, Status: 'Liquidated' },
];

exports.Get18thYear = () => {
  const today = new Date();
  const date = today.setFullYear(today.getFullYear() - 10);
  return new Date(today);
}