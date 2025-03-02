<template>
    <div :class="['code-block', { 'button-only': buttonOnly }]">
        <pre v-if="!buttonOnly"><code :class="['language-' + language]" v-html="highlightedCode"></code></pre>
        <button @click="copyClipboard" class="copy-button" title="Copy to clipboard">
            <svg class="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4v12h12V4H8zm11 11H9V5h10v10zm-3-14H4v12h2V3h10V1zM6 19h2v2h12V9h-2v10H6v-2z"
                    fill="currentColor" />
            </svg>
        </button>
    </div>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';

export default {
    props: {
        text: {
            type: String,
            required: true
        },
        buttonOnly: {
            type: Boolean,
            default: false
        },
        language: {
            type: String,
            default: 'plaintext'
        }
    },
    computed: {
        highlightedCode() {
            if (this.buttonOnly) return this.text;
            return Prism.highlight(
                this.text,
                Prism.languages[this.language] || Prism.languages.plaintext,
                this.language
            );
        }
    },
    methods: {
        copyClipboard() {
            navigator.clipboard.writeText(this.text).then(() => {
                alert('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    }
}
</script>

<style>
/* Override Prism.js styles to match our theme */
code[class*="language-"],
pre[class*="language-"] {
    text-shadow: none !important;
    color: var(--text-secondary) !important;
    background: var(--bg-secondary) !important;
    font-family: 'JetBrains Mono', monospace !important;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
    background: none !important;
}

/* Syntax highlighting colors for dark theme */
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
    color: #6a9955 !important;
}

.token.punctuation {
    color: var(--text-secondary) !important;
}

.token.property,
.token.keyword,
.token.tag {
    color: #569cd6 !important;
}

.token.class-name {
    color: #4ec9b0 !important;
}

.token.string,
.token.attr-value {
    color: #ce9178 !important;
}

.token.number {
    color: #b5cea8 !important;
}

.token.function {
    color: #dcdcaa !important;
}
</style>

<style scoped>
.code-block {
    position: relative;
    border-radius: 4px;
    padding: 1rem;
    margin: 0.5rem 0;
    overflow-x: auto;
    background: var(--bg-secondary);
}

.code-block.button-only {
    background: none;
    padding: 0;
    margin: 0;
}

.code-block pre {
    margin: 0;
    padding-right: 2rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
}

.code-block code {
    font-family: inherit;
    display: block;
}

.copy-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: opacity 0.2s;
    min-width: 24px;
    min-height: 24px;
}

.button-only .copy-button {
    position: static;
}

.copy-button:hover {
    opacity: 1;
}

.copy-icon {
    width: 20px;
    height: 20px;
    color: var(--text-primary);
}

.button-only .copy-icon {
    color: var(--text-primary);
}

@media (max-width: 768px) {
    .copy-button {
        padding: 2px;
        min-width: 20px;
        min-height: 20px;
    }

    .copy-icon {
        width: 16px;
        height: 16px;
    }

    .button-only {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .button-only .copy-button {
        padding: 4px;
    }
}
</style>