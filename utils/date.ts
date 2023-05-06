
export const formatDate = (date: string) => {
  const formatter = new Date(date).toLocaleDateString('es-MX',{
    // weekday: 'long', 
    // year: 'numeric', 
    // month: 'long', 
    // day: 'numeric'
    year: '2-digit', 
    month: '2-digit', 
    day: '2-digit'
  })

  return formatter
}