---
title: Render Props!
date: '2019-02-05T18:56:51.705Z'
---

Dnes, kdy se ve světě Reactu probírají všechna cool támata, jako jsou React Hooks,
Suspense nebo Asynchronous rendering, rád bych se přeci jenvrátil zpět na pomyslenou
zem a prošel téma, které se mi zdá velmi praktické. A tou jsou návrhové vzory
React komponent, nebo-li React Component patterns.

Pravděpodobně se setkáte s případem, kdy jednu komponentu budete chtít použít na více místech, jedná
se o komponenty jako je modální okno, tooltip, kdy pouze změníme obsah, ale funkcionalita všude zůstává stejná.

###Proč název "render props"

Původní návrh je, že komponentě vytvoříme `prop` s názvem 'render', která bude mít podobu funkce
navracející `React element` k vyrendrování.
````javascript

````

Po té se ale začalo využívat `prop` children, která má onu podobu funkce,  čehož dále 
