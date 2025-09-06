export interface CabinPricingParams {
  pricePerCabinEur: number;
  numGuests: number;       // 1..6
  spotsLeft: number;       // people remaining
  cabinsTotal?: number;    // default 3
}

export interface CabinPricingResult {
  guests: number;
  cabinsRequired: number;
  cabinsAvailable: number;
  valid: boolean;
  total: number;
  pricePerPerson: number;
  errorMessage?: string;
}

export function calcCabinPricing(params: CabinPricingParams): CabinPricingResult {
  const cabinsTotal = params.cabinsTotal ?? 3;
  const guests = Math.max(1, Math.min(6, Math.floor(params.numGuests || 1)));
  const spotsLeft = Math.max(0, Math.floor(params.spotsLeft || 0));
  const cabinsAvailable = Math.ceil(spotsLeft / 2);
  const cabinsRequired = Math.ceil(guests / 2);

  // Validation checks
  let valid = true;
  let errorMessage: string | undefined;

  if (guests > spotsLeft) {
    valid = false;
    errorMessage = `Only ${spotsLeft} spots left for this trip.`;
  } else if (cabinsRequired > Math.min(cabinsAvailable, cabinsTotal)) {
    valid = false;
    errorMessage = `Only ${cabinsAvailable} cabins left for this trip.`;
  }

  const total = valid ? params.pricePerCabinEur * cabinsRequired : 0;
  const pricePerPerson = valid && guests > 0 ? total / guests : 0;

  return {
    guests,
    cabinsRequired,
    cabinsAvailable,
    valid,
    total,
    pricePerPerson,
    errorMessage,
  };
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper function to get availability message
export function getAvailabilityMessage(spotsLeft: number, cabinsAvailable: number): string {
  if (spotsLeft === 0) {
    return "Trip is fully booked";
  }
  return `${spotsLeft} spots (${cabinsAvailable} cabins) left`;
}
