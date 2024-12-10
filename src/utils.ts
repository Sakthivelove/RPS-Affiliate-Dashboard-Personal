export function truncateAddress(value: string, length: number = 6): string {
    // Check if the value is a valid string and has sufficient length
    if (!value || value.length <= length * 2) {
        return value;
    }
    // Truncate the address, keeping the first `length` characters and the last `length` characters, and adding ellipsis in the middle
    return `${value.slice(0, length)}...${value.slice(-length)}`;
}

export const getContainerClass = (sidebarActive: boolean): string => {
    return `absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen`;
  };
  
  // src/utils/dateUtils.ts

export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
// Validate URL function
export const validateLink = (url: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*))\\.)+' + // domain name
    '([a-zA-Z]{2,})' + // TLD
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-zA-Z\\d_]*)?$'
  );
  return pattern.test(url);
};
  
  