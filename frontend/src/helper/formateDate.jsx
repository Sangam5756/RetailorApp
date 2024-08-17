// Format a date string to a readable format (MM/DD/YYYY)
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date as MM/DD/YYYY
};
