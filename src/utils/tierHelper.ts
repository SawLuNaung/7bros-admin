/**
 * Tier Helper Utility
 * 
 * Determines the tier of a driver based on their driver ID
 * Tier system:
 * - Tier 1: 7B001-7B099
 * - Tier 2: 7B100-7B199
 */

export interface TierInfo {
  tier: number;
  tierName: string;
  color: string;
}

/**
 * Get tier information from driver ID
 * @param driverId - Driver ID in format 7BXXX
 * @returns Tier information object
 */
export function getTierFromDriverId(driverId: string): TierInfo {
  if (!driverId || !driverId.startsWith('7B')) {
    return {
      tier: 0,
      tierName: 'Unknown',
      color: 'gray'
    };
  }

  // Extract the numeric part (e.g., "001" from "7B001")
  const numericPart = driverId.substring(2);
  const number = parseInt(numericPart, 10);

  if (isNaN(number)) {
    return {
      tier: 0,
      tierName: 'Unknown',
      color: 'gray'
    };
  }

  // Determine tier based on number range
  if (number >= 1 && number <= 99) {
    return {
      tier: 1,
      tierName: 'Tier 1',
      color: 'blue'
    };
  } else if (number >= 100 && number <= 199) {
    return {
      tier: 2,
      tierName: 'Tier 2',
      color: 'green'
    };
  } else {
    // Future expansion for more tiers
    return {
      tier: 0,
      tierName: 'Unknown',
      color: 'gray'
    };
  }
}

/**
 * Get tier badge color classes for Tailwind CSS
 * @param tier - Tier number
 * @returns Object with background and text color classes
 */
export function getTierColorClasses(tier: number): {
  bg: string;
  text: string;
  border: string;
} {
  switch (tier) {
    case 1:
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300'
      };
    case 2:
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300'
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        border: 'border-gray-300'
      };
  }
}

/**
 * Get all available tiers
 * @returns Array of tier objects
 */
export function getAllTiers(): Array<{ value: number; label: string }> {
  return [
    { value: 1, label: 'Tier 1 (7B001-7B099)' },
    { value: 2, label: 'Tier 2 (7B100-7B199)' }
  ];
}

/**
 * Sort drivers by tier and driver ID
 * @param drivers - Array of driver objects
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array of drivers
 */
export function sortDriversByTier<T extends { driver_id: string }>(
  drivers: T[],
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...drivers].sort((a, b) => {
    const tierA = getTierFromDriverId(a.driver_id).tier;
    const tierB = getTierFromDriverId(b.driver_id).tier;
    
    if (tierA !== tierB) {
      return order === 'asc' ? tierA - tierB : tierB - tierA;
    }
    
    // If same tier, sort by driver_id
    return order === 'asc' 
      ? a.driver_id.localeCompare(b.driver_id)
      : b.driver_id.localeCompare(a.driver_id);
  });
}

/**
 * Filter drivers by tier
 * @param drivers - Array of driver objects
 * @param tier - Tier number to filter by (0 = all tiers)
 * @returns Filtered array of drivers
 */
export function filterDriversByTier<T extends { driver_id: string }>(
  drivers: T[],
  tier: number
): T[] {
  if (tier === 0) {
    return drivers; // Return all if tier is 0
  }
  
  return drivers.filter(driver => {
    const driverTier = getTierFromDriverId(driver.driver_id).tier;
    return driverTier === tier;
  });
}
