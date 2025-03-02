<template>
    <div class="code-examples">
        <h3>Code Examples</h3>
        <div class="language-tabs">
            <button v-for="lang in languages" :key="lang" :class="['tab-button', { active: selectedLanguage === lang }]"
                @click="selectedLanguage = lang">
                {{ lang }}
            </button>
        </div>
        <div class="code-content">
            <div class="section">
                <h4>Time Conversion</h4>
                <CopyComponent :text="getConversionExample" :language="getLanguageClass" />
            </div>
            <div class="section">
                <h4>String Formatting</h4>
                <CopyComponent :text="getFormattingExample" :language="getLanguageClass" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import CopyComponent from './CopyComponent.vue';
import { convertTimeToTokens } from '../utils';

export default {
    props: {
        timestamp: { type: String, required: true },
        isoDate: { type: String, required: true }
    },
    data() {
        return {
            selectedLanguage: 'Python',
            languages: ['Python', 'JavaScript', 'Go', 'Rust']
        };
    },
    computed: {
        getLanguageClass(): string {
            return this.selectedLanguage.toLowerCase();
        },
        formatTokens(): string {
            return convertTimeToTokens(this.isoDate);
        },
        getConversionExample(): string {
            const examples: Record<string, string> = {
                Python: `
# Convert ISO string to Unix timestamp
from datetime import datetime
import pytz

iso_date = "${this.isoDate}"
dt = datetime.fromisoformat(iso_date)
unix_timestamp = int(dt.timestamp())  # ${this.timestamp}

# Convert Unix timestamp back to ISO string
from datetime import datetime
timestamp = ${this.timestamp}
dt = datetime.fromtimestamp(timestamp, tz=pytz.UTC)
iso_string = dt.isoformat()  # "${this.isoDate}"`,
                JavaScript: `
// Convert ISO string to Unix timestamp
const isoDate = "${this.isoDate}";
const unixTimestamp = Math.floor(new Date(isoDate).getTime() / 1000);  // ${this.timestamp}

// Convert Unix timestamp back to ISO string
const timestamp = ${this.timestamp};
const date = new Date(timestamp * 1000);
const isoString = date.toISOString();  // "${this.isoDate}"`,
                Go: `
// Convert ISO string to Unix timestamp
package main

import (
    "time"
)

func main() {
    isoDate := "${this.isoDate}"
    t, _ := time.Parse(time.RFC3339, isoDate)
    unixTimestamp := t.Unix()  // ${this.timestamp}

    // Convert Unix timestamp back to ISO string
    timestamp := int64(${this.timestamp})
    t = time.Unix(timestamp, 0).UTC()
    isoString := t.Format(time.RFC3339)  // "${this.isoDate}"
}`,
                Rust: `
// Convert ISO string to Unix timestamp
use chrono::{DateTime, Utc};

let iso_date = "${this.isoDate}";
let dt = DateTime::parse_from_rfc3339(iso_date).unwrap();
let unix_timestamp = dt.timestamp();  // ${this.timestamp}

// Convert Unix timestamp back to ISO string
let timestamp = ${this.timestamp};
let dt = Utc.timestamp_opt(timestamp, 0).unwrap();
let iso_string = dt.to_rfc3339();  // "${this.isoDate}"`
            };
            return examples[this.selectedLanguage] || '';
        },
        getFormattingExample(): string {
            const examples: Record<string, string> = {
                Python: `
# Format current time using strftime
from datetime import datetime

current_time = datetime.now()
formatted = current_time.strftime('${this.formatTokens}')
print(formatted)  # Example output: ${this.isoDate}

# Parse formatted string back to datetime
parsed_time = datetime.strptime("${this.isoDate}", '${this.formatTokens}')`,
                JavaScript: `
// Format current time
const now = new Date();
const formatted = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC'
}).format(now);
console.log(formatted);  // Example output: ${this.isoDate}

// Parse formatted string
const [month, day, year] = formatted.split('/');
const [hours, minutes, seconds] = formatted.split(' ')[1].split(':');
const parsedDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));`,
                Go: `
// Format current time
package main

import (
    "time"
    "fmt"
)

func main() {
    now := time.Now().UTC()
    formatted := now.Format("${this.formatTokens}")
    fmt.Println(formatted)  // Example output: ${this.isoDate}

    // Parse formatted string
    parsed, err := time.Parse("${this.formatTokens}", "${this.isoDate}")
    if err != nil {
        panic(err)
    }
}`,
                Rust: `
use chrono::{DateTime, Utc};
use chrono::format::strftime::StrftimeItems;

// Format current time
let now: DateTime<Utc> = Utc::now();
let formatted = now.format("${this.formatTokens}").to_string();
println!("{}", formatted);  // Example output: ${this.isoDate}

// Parse formatted string
let parsed = DateTime::parse_from_str(
    "${this.isoDate}",
    "${this.formatTokens}"
).unwrap();`
            };
            return examples[this.selectedLanguage] || '';
        }
    },
    components: {
        CopyComponent
    }
};
</script>

<style scoped>
.code-examples {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 1.5rem;
}

.code-examples h3 {
    color: var(--text-primary);
    margin: 0 0 1.5rem 0;
    font-size: 1.2rem;
    text-align: center;
}

.language-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tab-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s ease;
}

.tab-button:hover {
    background-color: var(--hover-color);
}

.tab-button.active {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
}

.code-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.section {
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 1rem;
}

.section h4 {
    color: var(--text-primary);
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 500;
}

:deep(.copy-button-small) {
    .code-block {
        margin: 0;
        padding: 0;
        background: none;
    }

    .copy-button {
        position: static;
        opacity: 0.8;
    }

    .copy-icon {
        color: var(--text-primary);
    }
}
</style>