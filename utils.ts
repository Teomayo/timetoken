export function convertTimeToTokens(timeString: string) {
  // Parse the date string into a Date object
  interface TokenMap {
    [key: string]: any;
  }

  if (timeString.length == 0) {
    return "";
  } else {
    const tokenMap: TokenMap = {
      // Year
      "%Y": /\b\d{4}\b/, // 4-digit year (e.g., 2023)

      // Day of the Week
      "%A": /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/, // Full weekday name
      "%a": /\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/, // Abbreviated weekday name

      // Time (Hour, Minute, Second)
      "%H": /(?<!:)(0[0-9]|1[0-9]|2[0-4])(?=:)/g, // Hour (00-23)
      "%M": /\:([0-5][0-9])\:/g, // Minutes (00-59)
      "%S": /(\:[0-5][0-9])/g, // Seconds (00-59)
      // Month

      "%m": /\b\/([012][1-9]|3[01])\/\b|\b(?:\/)(0[1-9]|[12][0-9]|3[01])(?=\/)\b|\b(?:\-)(0[1-9]|[12][0-9]|3[01])(?=\-)\b/g, // Month number (01-12)
      "%B": /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/, // Full month name
      "%b": /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/, // Abbreviated month name

      // Day
      "%d": /\b[^\/](0?[1-9]|[12][0-9]|3[01])(?=\/)\b|\b(\-)(0[1-9]|[12][0-9]|3[01])$\b|\s(0[1-9]|[12][0-9]|3[01])\,|(\-)(0[1-9]|[12][0-9]|3[01])T|\s(0[1-9]|[12][0-9]|3[01])\s/g, // Day of the month (01-31)
      "%e": /\b\s([1-9]|[12][0-9]|3[01])\s|[^\/]([1-9]|[12][0-9]|3[01])\/\b/,

      // AM/PM
      "%p": /\b(AM|PM)\b/, // AM/PM

      // Time Zone
      "%Z": /\b([A-Z]{3,4})\b/, // Timezone abbreviation (e.g., GMT, EST)
      "%z": /([+-]\d{4})/,
    };

    // Start with the original datetime string
    let formatString = timeString;

    // Iterate over the token map and replace matches with the token
    for (const [token, regex] of Object.entries(tokenMap)) {
      console.log(regex, token);
      console.log(formatString);
      if (token == "%S") {
        if (countCharInstances(formatString, ":") == 1) {
          formatString = formatString.replace(regex, ":" + "%M");
        } else {
          formatString = formatString.replace(regex, ":" + token);
        }
      }
      if (token == "%M") {
        formatString = formatString.replace(regex, ":" + token + ":");
      }
      if (token == "%H") {
        formatString = formatString.replace(regex, token + "");
      }
      if (token == "%d") {
        if (formatString.includes("T") && formatString.includes("Z")) {
          formatString = formatString.replace(regex, "-" + token + "T");
        } else if (formatString.includes("-")) {
          formatString = formatString.replace(regex, "-" + token);
        } else if (formatString.includes(",")) {
          const match: RegExpMatchArray | null = formatString.match(regex);
          console.log(match?.[0]);
          if (match != null) {
            const value: string = match?.[0].toString();
            const split_vals: Array<string> = value.split("");
            console.log(split_vals);
            const spaces = [split_vals[0], split_vals[split_vals?.length - 1]];
            formatString = formatString.replace(
              regex,
              spaces[0] + token + spaces[1]
            );
          } else {
            formatString = formatString.replace(regex, token);
          }
        } else {
          formatString = formatString.replace(regex, token);
        }
      }
      // if (token == '%Y') {
      //     formatString = formatString.replace(regex, "/" + token);
      // }
      if (token == "%m") {
        if (formatString.includes("/")) {
          formatString = formatString.replace(regex, "/" + token);
        } else if (formatString.includes("-")) {
          formatString = formatString.replace(regex, "-" + token);
        }
      } else {
        formatString = formatString.replace(regex, token);
      }
    }

    return formatString;
  }
}

function countCharInstances(str: string, char: string) {
  return str.split(char).length - 1;
}
