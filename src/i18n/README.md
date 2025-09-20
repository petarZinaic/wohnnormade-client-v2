# Internationalization (i18n) Setup

This project uses `i18next` and `react-i18next` for internationalization support with English and German languages.

## Structure

```
src/i18n/
├── index.ts              # i18n configuration
├── locales/
│   ├── en.json          # English translations
│   └── de.json          # German translations
└── README.md            # This file
```

## Usage

### 1. Using translations in components

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("navigation.home")}</h1>
      <p>{t("common.loading")}</p>
    </div>
  );
}
```

### 2. Using the language context

```tsx
import { useLanguage } from "@/context/LanguageContext";

function MyComponent() {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  return (
    <div>
      <p>Current language: {currentLanguage}</p>
      <button onClick={() => changeLanguage("de")}>Switch to German</button>
    </div>
  );
}
```

### 3. Adding new translations

1. Add the translation key to both `en.json` and `de.json` files
2. Use the key in your components with `t('your.key')`

Example:

```json
// en.json
{
  "newSection": {
    "title": "New Title",
    "description": "New description"
  }
}

// de.json
{
  "newSection": {
    "title": "Neuer Titel",
    "description": "Neue Beschreibung"
  }
}
```

### 4. Language Selector Component

The `LanguageSelector` component is already integrated into the navbar and provides:

- Dropdown with flag icons
- Language switching functionality
- Persistent language selection (stored in localStorage)
- Responsive design for mobile and desktop

## Configuration

The i18n configuration is in `src/i18n/index.ts` and includes:

- Language detection from localStorage, browser, or HTML tag
- Fallback to English if language is not found
- Debug mode in development
- Automatic language persistence

## Available Languages

- **English (en)**: Default language
- **German (de)**: Secondary language

## Adding New Languages

1. Create a new JSON file in `src/i18n/locales/` (e.g., `fr.json`)
2. Add the language to the `resources` object in `src/i18n/index.ts`
3. Add the language to the `availableLanguages` array in `src/context/LanguageContext.tsx`
4. Add appropriate flag emoji in the `LanguageSelector` component

## Best Practices

1. Use nested objects for organizing translations by feature/page
2. Use descriptive keys that indicate the context
3. Keep translations consistent across languages
4. Test both languages thoroughly
5. Consider text length differences between languages in your UI design
