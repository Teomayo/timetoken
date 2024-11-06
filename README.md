## TimeToken

This project was inspired by me never remembering what the tokens are that represent various datetime string formats.

The web application takes in various datetime strings and returns a representation in their datetime token equivalents.

Currently it's not completetly accurate and I will update it whenever I have time.

| **Datetime String**                       | **Token Representation**     | **Explanation**                                      |
| ----------------------------------------- | ---------------------------- | ---------------------------------------------------- |
| `Fri Oct 18 2013 18:53:14 GMT+1000 (EST)` | `%a %b %d %Y %H:%M:%S %Z`    | Full datetime with timezone and weekday              |
| `18/01/2024 18:11:24`                     | `%d/%m/%Y %H:%M:%S`          | Day/Month/Year with time                             |
| `18:53:14`                                | `%H:%M:%S`                   | Time only (24-hour format)                           |
| `2024-01-18`                              | `%Y-%m-%d`                   | Year-Month-Day                                       |
| `18/01/2024`                              | `%d/%m/%Y`                   | Day/Month/Year                                       |
| `January 18, 2024 18:53`                  | `%B %d, %Y %H:%M`            | Month name, day, year, and time                      |
| `Jan 18, 2024 18:53`                      | `%b %d, %Y %H:%M`            | Abbreviated month name, day, year, and time          |
| `01/18/2024 06:30:00 PM`                  | `%m/%d/%Y %I:%M:%S %p`       | Month/Day/Year with 12-hour time and seconds (AM/PM) |
| `01/18/2024 06:30 PM`                     | `%m/%d/%Y %I:%M %p`          | Month/Day/Year with 12-hour time, no seconds (AM/PM) |
| `3/5/2024`                                | `%d/%m/%Y`                   | Day/Month/Year with single-digit day and month       |
| `2024-01`                                 | `%Y-%m`                      | Year and month only                                  |
| `2024`                                    | `%Y`                         | Year only                                            |
| `2024-01-18T18:11:24Z`                    | `%Y-%m-%dT%H:%M:%S%Z`        | ISO 8601 format with UTC timezone                    |
| `Thu, 18 Jan 2024 18:11:24 GMT`           | `%a, %d %b %Y %H:%M:%S %Z`   | RFC 2822 format with abbreviated day and month       |
| `18 Jan 2024`                             | `%d %b %Y`                   | Day, abbreviated month, and year                     |
| `Thu, 18-Jan-24 18:11:24 GMT`             | `%a, %d-%b-%y %H:%M:%S %Z`   | RFC 822 format with short year                       |
| `2024-W03-4`                              | `%G-W%V-%u`                  | ISO week date (Year, week, and weekday)              |
| `2024-01-18 06:30:00 AM UTC+1000`         | `%Y-%m-%d %I:%M:%S %p UTC%Z` | Date with 12-hour time, seconds, and UTC offset      |
| `18th January, 2024 at 6:30 PM`           | `%dth %B, %Y at %I:%M %p`    | Day with suffix, full month, year, and 12-hour time  |
