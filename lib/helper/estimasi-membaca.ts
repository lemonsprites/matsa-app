export function estimasiMembaca(content: string | null, wordsPerMinute = 200): string {
    if (!content) return "0 min";

    const wordCount = content.split(/\s+/).length; // Count words
    const readTime = Math.ceil(wordCount / wordsPerMinute); // Round up to nearest minute

    return `${readTime} Menit.`;
}
