export const generateSlug = (length:number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let slug = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        slug += chars[randomIndex];
    }
    return slug;
}