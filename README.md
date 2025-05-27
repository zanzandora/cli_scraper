# web-scraper

A simple CLI tool to extract content from web pages using CSS selectors and save the results to a file.

## Features

- Fetches HTML from a given URL
- Extracts content using one or more CSS selectors
- Saves results as a JSON file

## Installation

1. Clone this repository or copy the source code.
2. Install dependencies:

   ```bash
   npm install

   ```

3. (Optional) Install `tsx` globally if you want to run TypeScript files directly:
   ```bash
   npm install -g tsx
   ```

## Usage

```bash
npx tsx src/index.ts <url> <selectors...> [options]
```

- `<url>`: The URL of the web page to scrape.
- `<selectors...>`: One or more CSS selectors to extract content.
- `-o, --output <file>`: (Optional) Output file name (default: `results.json`).

### Example

```bash
npx tsx src/index.ts https://example.com h1 .title --output output.json
```

This command will:

- Fetch `https://example.com`
- Extract content of all `<h1>` and elements with class `.title`
- Save the results to `output.json`

## Output

The output file will be a JSON object, for example:

```json
{
  "h1": ["Example Domain"],
  ".title": ["Welcome to Example"]
}
```

## Notes

- Make sure the target website allows scraping.
- For best results, use valid CSS selectors.

---

```

```
