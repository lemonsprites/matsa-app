export const formatTanggal = (data: any) => {
    return Intl.DateTimeFormat('id', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(data))
}