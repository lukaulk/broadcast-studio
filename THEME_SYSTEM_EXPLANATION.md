# Como Funciona o Sistema de Temas (Dark/Light Mode)

## 📋 Visão Geral

O sistema de temas funciona através de uma combinação de:
1. **next-themes** (biblioteca React) - gerencia o estado do tema
2. **CSS Variables** (variáveis CSS) - armazena as cores de cada tema
3. **Tailwind CSS** - aplica as classes condicionalmente
4. **localStorage** - persiste a preferência do usuário

---

## 🔄 Fluxo de Funcionamento

### 1. **Inicialização** (`app/layout.tsx`)

```tsx
<ThemeProvider
  attribute="class"        // Adiciona/remove a classe "dark" no elemento HTML
  defaultTheme="system"   // Tema padrão: segue preferência do sistema
  enableSystem            // Permite detectar preferência do sistema
  disableTransitionOnChange  // Desabilita transições durante mudança
>
```

**O que acontece:**
- O `ThemeProvider` envolve toda a aplicação
- Ele adiciona ou remove a classe `dark` no elemento `<html>` baseado no tema atual
- Salva a preferência no `localStorage` (chave: `theme`)

---

### 2. **Controle do Usuário** (`components/theme-toggle.tsx`)

```tsx
const { setTheme, theme } = useTheme()

// Quando o usuário clica em uma opção:
setTheme("light")  // Remove classe "dark" do <html>
setTheme("dark")   // Adiciona classe "dark" no <html>
setTheme("system") // Segue preferência do sistema operacional
```

**O que acontece:**
- O hook `useTheme()` fornece o tema atual e função para alterar
- Ao chamar `setTheme()`, o `next-themes`:
  1. Atualiza o estado React
  2. Adiciona/remove a classe `dark` no `<html>`
  3. Salva no `localStorage`

---

### 3. **Definição das Cores** (`src/styles/globals.css`)

#### **Tema Light (padrão - `:root`)**
```css
:root {
  --background: #121212;
  --foreground: #121212;
  --card: #121212;
  /* ... outras variáveis ... */
}
```

#### **Tema Dark (quando `.dark` está presente)**
```css
.dark {
  --background: #000000;
  --foreground: oklch(0.985 0.002 247.839);
  --card: #303337;
  /* ... outras variáveis ... */
}
```

**Como funciona:**
- Quando o `<html>` **NÃO** tem a classe `dark`: usa as variáveis de `:root`
- Quando o `<html>` **TEM** a classe `dark`: sobrescreve com as variáveis de `.dark`

---

### 4. **Detecção pelo Tailwind** (`src/styles/globals.css`)

```css
@custom-variant dark (&:is(.dark *));
```

**O que faz:**
- Configura o Tailwind para detectar a classe `.dark` em qualquer elemento pai
- Permite usar classes como `dark:bg-gray-800` que só aplicam quando `.dark` existe

**Exemplo de uso:**
```tsx
<div className="bg-white dark:bg-gray-900">
  {/* Branco no light, cinza escuro no dark */}
</div>
```

---

## 📁 Arquivos Envolvidos

### **Arquivos Principais:**

1. **`app/layout.tsx`**
   - Configura o `ThemeProvider` globalmente
   - Define o comportamento padrão do tema

2. **`components/theme-provider.tsx`**
   - Wrapper do `ThemeProvider` do `next-themes`
   - Facilita tipagem TypeScript

3. **`components/theme-toggle.tsx`**
   - Componente UI para o usuário alternar temas
   - Usa `useTheme()` para ler/alterar o tema

4. **`src/styles/globals.css`**
   - Define todas as variáveis CSS para Light e Dark
   - Configura o Tailwind para detectar `.dark`

### **Arquivos que Usam o Tema:**

- Qualquer componente que usa classes Tailwind com `dark:`
- Componentes que usam variáveis CSS como `var(--background)`
- O componente `Toaster` que adapta seu tema automaticamente

---

## 🗄️ Persistência de Dados

### **localStorage**

O `next-themes` salva automaticamente no `localStorage` do navegador:

```javascript
// Chave: "theme"
// Valores possíveis: "light" | "dark" | "system"
localStorage.setItem("theme", "dark")
```

**Onde fica:**
- No navegador do usuário
- Persiste entre sessões
- Não é enviado ao servidor

---

## 🎨 Como Adicionar Novas Cores

### **1. Adicionar variável CSS em `globals.css`:**

```css
:root {
  /* Tema Light */
  --minha-cor: #ffffff;
}

.dark {
  /* Tema Dark */
  --minha-cor: #000000;
}
```

### **2. Usar no componente:**

```tsx
<div style={{ backgroundColor: 'var(--minha-cor)' }}>
  {/* Ou usar com Tailwind */}
</div>
```

### **3. Ou usar com Tailwind:**

```tsx
<div className="bg-[var(--minha-cor)]">
  {/* Usa a variável CSS */}
</div>
```

---

## 🔍 Como Verificar o Tema Atual

### **No Console do Navegador:**

```javascript
// Ver tema salvo
localStorage.getItem("theme")

// Ver se a classe dark está presente
document.documentElement.classList.contains("dark")

// Ver todas as variáveis CSS
getComputedStyle(document.documentElement).getPropertyValue("--background")
```

### **No Código React:**

```tsx
import { useTheme } from "next-themes"

function MeuComponente() {
  const { theme, resolvedTheme } = useTheme()
  
  // theme: "light" | "dark" | "system"
  // resolvedTheme: "light" | "dark" (resolvido, mesmo se for "system")
  
  return <div>Tema atual: {resolvedTheme}</div>
}
```

---

## 🚀 Resumo do Fluxo Completo

1. **Usuário clica no ThemeToggle** → `setTheme("dark")`
2. **next-themes atualiza estado** → Adiciona classe `dark` no `<html>`
3. **CSS detecta `.dark`** → Sobrescreve variáveis CSS
4. **Tailwind aplica classes** → `dark:bg-gray-900` é ativado
5. **Componentes re-renderizam** → Novas cores são aplicadas
6. **localStorage salva** → Preferência persiste

---

## 💡 Pontos Importantes

- ✅ O tema é aplicado via **classe CSS** (não via JavaScript inline)
- ✅ As cores são definidas em **variáveis CSS** (fácil manutenção)
- ✅ A preferência é **persistida automaticamente**
- ✅ Funciona com **Server-Side Rendering** (SSR) do Next.js
- ✅ **Sem flash** de conteúdo incorreto (hidratação correta)

