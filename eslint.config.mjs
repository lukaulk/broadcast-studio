import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Adicionando regras gerais e de React para garantir a consistência do código
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      // Regras de `eslint:recommended`
      "no-unused-vars": "warn",
      "no-console": "warn",
      "no-extra-boolean-cast": "error",
      "no-unreachable": "error",
      
      // Regras de `react/recommended`
      "react/prop-types": "off", // Desativa a verificação de PropTypes se você usa TypeScript
      "react/react-in-jsx-scope": "off", // Obrigatório para a nova forma de usar o React (desde a v17)
      "react/self-closing-comp": "warn", // Componentes sem filhos devem ser auto-fechados
      "react/display-name": "off", // Útil para desabilitar a regra de nomes de exibição

      // Regras de `react-hooks/recommended`
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
