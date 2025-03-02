// Common regex patterns for date/time formats
export const DATE_PATTERNS = {
    // Year
    FULL_YEAR: /\b\d{4}\b/, // 4-digit year (e.g., 2023)

    // Month
    MONTH_NUM: /\b(0?[1-9]|1[0-2])\b/, // Month number (01-12)
    MONTH_NAME_FULL: /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/,
    MONTH_NAME_SHORT: /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/,

    // Day
    DAY_NUM: /\b(0?[1-9]|[12][0-9]|3[01])\b/, // Day of month (1-31)
    DAY_NAME_FULL: /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/,
    DAY_NAME_SHORT: /\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/,

    // Time
    HOUR_24: /\b([01][0-9]|2[0-3])\b/, // 24-hour format (00-23)
    MINUTES: /\b([0-5][0-9])\b/, // Minutes (00-59)
    SECONDS: /\b([0-5][0-9])\b/, // Seconds (00-59)
    
    // Timezone
    TIMEZONE_OFFSET: /[+-]\d{2}:?\d{2}/, // e.g., +0200 or +02:00
    TIMEZONE_NAME: /\b([A-Z]{3,4})\b/, // e.g., UTC, GMT

    // Common date formats
    ISO_DATETIME: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/,
    ISO_DATE: /^(\d{4})-(\d{2})-(\d{2})/,
    US_DATE: /^(\d{1,2})\/(\d{1,2})\/(\d{4})/,
    EU_DATE: /^(\d{1,2})-(\d{1,2})-(\d{4})/,
} as const;

export function convertTimeToTokens(timeString: string) {
    if (!timeString?.trim()) return '';

    let formatString = timeString;

    // Handle special cases first
    if (formatString.includes('T') && formatString.includes('Z')) {
        return '%Y-%m-%dT%H:%M:%SZ';
    }

    // Handle complete time format first (to avoid spacing issues with colons)
    const timeMatch = formatString.match(/(\d{2}):(\d{2})(?::(\d{2}))?/);
    if (timeMatch) {
        const [full, hour, minute, second] = timeMatch;
        const replacement = second ? '%H:%M:%S' : '%H:%M';
        formatString = formatString.replace(full, replacement);
    }

    // Handle date formats
    if (formatString.includes('/')) {
        const dateMatch = formatString.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (dateMatch) {
            const [full, first, second, year] = dateMatch;
            const isUS = parseInt(first) <= 12;
            const replacement = isUS ? '%m/%d/%Y' : '%d/%m/%Y';
            formatString = formatString.replace(full, replacement);
        }
    } else if (formatString.includes('-')) {
        const dateMatch = formatString.match(/(\d{4})-(\d{1,2})(?:-(\d{1,2}))?/);
        if (dateMatch) {
            const [full, year, month, day] = dateMatch;
            const replacement = day ? '%Y-%m-%d' : '%Y-%m';
            formatString = formatString.replace(full, replacement);
        }
    }

    // Handle timezone format
    if (formatString.includes('GMT') || formatString.includes('UTC')) {
        formatString = formatString.replace(/GMT\+\d{4}/, '%Z');
        formatString = formatString.replace(/\s*\([A-Z]+\)/, ''); // Remove parenthetical timezone
    }

    const tokenMap = {
        '%Y': DATE_PATTERNS.FULL_YEAR,
        '%A': DATE_PATTERNS.DAY_NAME_FULL,
        '%a': DATE_PATTERNS.DAY_NAME_SHORT,
        '%B': DATE_PATTERNS.MONTH_NAME_FULL,
        '%b': DATE_PATTERNS.MONTH_NAME_SHORT,
        '%Z': /\b[A-Z]{3,4}\b(?!\+)/,
        '%p': /\b(AM|PM)\b/,
    };

    // Handle remaining tokens
    for (const [token, regex] of Object.entries(tokenMap)) {
        formatString = formatString.replace(regex, token);
    }

    // Clean up any remaining numbers that should be tokens
    formatString = formatString.replace(/\b\d{4}\b/g, '%Y');
    formatString = formatString.replace(/\b\d{1,2}\b(?=\s|,|$)/g, '%d');

    // Fix spacing issues
    formatString = formatString
        .replace(/\s*,\s*/g, ', ')  // Fix comma spacing
        .replace(/\s+/g, ' ')       // Normalize spaces
        .replace(/\s*([:-])\s*/g, '$1')  // Remove spaces around colons and dashes
        .trim();

    return formatString;
}

export function convertDateTimeToUnix(dateTime: string): number {
    if (!dateTime?.trim()) return NaN;

    const TZ_OFFSETS: { [key: string]: number } = {
        'AEST': 10, 'AEDT': 11,
        'GMT': 0, 'UTC': 0,
        'EST': -5, 'EDT': -4,
        'PST': -8, 'PDT': -7,
    };

    let dateStr = dateTime;

    // Handle timezone abbreviations
    for (const [abbr, offset] of Object.entries(TZ_OFFSETS)) {
        if (dateTime.includes(abbr)) {
            // Extract the time portion before applying timezone offset
            const timeMatch = dateTime.match(/(\d{2}):(\d{2}):(\d{2})/);
            if (timeMatch) {
                const [fullTime, hours, minutes, seconds] = timeMatch;
                // Calculate UTC time by subtracting the offset
                const utcHours = (24 + parseInt(hours) - offset) % 24;
                dateStr = dateTime.replace(
                    fullTime,
                    `${utcHours.toString().padStart(2, '0')}:${minutes}:${seconds}`
                ).replace(abbr, 'Z');
            }
            break;
        }
    }

    // Parse various formats and convert to ISO string
    const formats = [
        // US format: MM/DD/YYYY
        {
            regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})/,
            handler: (match: RegExpMatchArray) => {
                const [_, month, day, year] = match;
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
        },
        // EU format: DD-MM-YYYY
        {
            regex: /^(\d{1,2})-(\d{1,2})-(\d{4})/,
            handler: (match: RegExpMatchArray) => {
                const [_, day, month, year] = match;
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
        },
        // Written format: Month DD, YYYY
        {
            regex: /^(?:(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*)\s+(\d{1,2}),?\s+(\d{4})/,
            handler: (match: RegExpMatchArray) => {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const [_, month, day, year] = match;
                const monthIndex = months.findIndex(m => month.startsWith(m)) + 1;
                return `${year}-${monthIndex.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
        }
    ];

    // Try to convert to ISO format first
    for (const format of formats) {
        const match = dateStr.match(format.regex);
        if (match) {
            const isoDate = format.handler(match);
            // Keep any existing time component
            const timeMatch = dateStr.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(?:(AM|PM))?/i);
            if (timeMatch) {
                let [_, hours, minutes, seconds = '00', ampm] = timeMatch;
                if (ampm) {
                    let hour = parseInt(hours);
                    if (ampm.toUpperCase() === 'PM' && hour < 12) hour += 12;
                    if (ampm.toUpperCase() === 'AM' && hour === 12) hour = 0;
                    hours = hour.toString().padStart(2, '0');
                }
                dateStr = `${isoDate}T${hours}:${minutes}:${seconds}Z`;
            } else {
                dateStr = `${isoDate}T00:00:00Z`;
            }
            break;
        }
    }

    // Try parsing the resulting string
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
        return Math.floor(date.getTime() / 1000);
    }

    // If we haven't successfully parsed it yet, try direct parsing with UTC
    const directDate = new Date(dateTime);
    if (!isNaN(directDate.getTime())) {
        // Ensure we're using UTC
        const utcDate = new Date(Date.UTC(
            directDate.getUTCFullYear(),
            directDate.getUTCMonth(),
            directDate.getUTCDate(),
            directDate.getUTCHours(),
            directDate.getUTCMinutes(),
            directDate.getUTCSeconds()
        ));
        return Math.floor(utcDate.getTime() / 1000);
    }

    return NaN;
}

export function convertUnixToDateTime(unix: number) {
    return new Date(unix * 1000).toISOString();
}

function countCharInstances(str: string, char: string) {
    return str.split(char).length - 1;
}

export function getCurrentTime() {
    return new Date().toISOString();
}