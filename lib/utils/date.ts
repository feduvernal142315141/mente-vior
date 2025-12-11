/**
 * Format date to "Nov 15, 2024, 10:30 AM" format
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return "-";
  
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return "-";
  
  return dateObj.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Format date to "November 15, 2024" format (longer version)
 */
export const formatDateLong = (date: string | Date): string => {
  if (!date) return "-";
  
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return "-";
  
  return dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Format date to "11/15/2024" format
 */
export const formatDateShort = (date: string | Date): string => {
  if (!date) return "-";
  
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return "-";
  
  return dateObj.toLocaleDateString("en-US");
};
