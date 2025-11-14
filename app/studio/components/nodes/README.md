# Nodes Modulares

Esta pasta contém todos os componentes de nodes de rede modulares para uso no ReactFlow.

## Estrutura

- `types.ts` - Definições de tipos TypeScript
- `config.ts` - Configurações centralizadas de todos os nodes e funções utilitárias
- `BaseNode.tsx` - Componente base que todos os nodes herdam
- `*Node.tsx` - Componentes específicos para cada tipo de node (PC, Router, Switch, etc.)
- `index.ts` - Exportações centralizadas

## Uso

### Importar nodeTypes para ReactFlow

```tsx
import { nodeTypes } from "../nodes";

<ReactFlow nodeTypes={nodeTypes} ... />
```

### Criar um node programaticamente

```tsx
import { createNodeFromType } from "../nodes";

const newNode = createNodeFromType("pc", "node-1", { x: 100, y: 100 });
```

### Usar configuração de nodes

```tsx
import { nodeConfigs } from "../nodes";

const pcConfig = nodeConfigs.pc;
```

## Adicionar um novo tipo de node

1. Adicione a configuração em `config.ts`:
```ts
newType: {
  type: "newtype",
  name: "New Type",
  icon: "/path/to/icon.svg",
  dvctype: "Device Type",
  className: "optional-class",
}
```

2. Crie o componente em `NewTypeNode.tsx`:
```tsx
import BaseNode, { BaseNodeProps } from "./BaseNode";

const NewTypeNode: React.FC<BaseNodeProps> = (props) => {
  return <BaseNode {...props} />;
};

export default NewTypeNode;
```

3. Adicione ao `index.ts`:
```ts
export { default as NewTypeNode } from "./NewTypeNode";
// ... e adicione ao nodeTypes
```

## Customização

Cada node pode ser customizado individualmente estendendo o BaseNode ou criando sua própria implementação completa.

