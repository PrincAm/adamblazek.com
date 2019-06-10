---
title: React Europe workshop!
date: '2019-10-06'
draft: true
---

## ReactEurope: React.js workshop

Prvni den

React.js workshop jsem navštívil podruhé, po roce a začal jako vzdy na starem
znamem miste Espace Charenton. Není to extra místo, ale frnacouzské občerstvení
vše vynahradí. Kroasántíčky s kávičkou a obložené bagety byly výborné. Ackoliv
avizovali probrani vsech featur Reactu 17, cely workshop se tocil okolo Hooks ve
spojeni s jednotlivymi tematy. Byly jimo DataFetching a jak fetchovat data
pomoci useEfektu, dale vyuziti cutom Hooku. Po te jsme si ukazali osetrovani
chyb pomoci ErrorBounderis ve spojeni s RenderProps, ktere stale jeste nejsou
mrtve a provdepodobne se nimi budeme jeste chvili vidat. Pote se pouzil dalsi
hook useReducer. Nejzajimavejsi mi prisel koncept Scalable Components, kdy
prednasejici popsali vytvareni spravneho API komponenty, se kterym se setkali
pri tvorbe jejich UI kitu - Material UI a Smooth UI. Na zaver jsme na nasi
aplikaci pripojili kontext a nastavili internacionalizaci nasi komponenty.

Druhy den jiz byl volnejsi a hlavne jsme se zamerili na hook useRef()

Worshop byl veden Gregem Berge, zakladatelem SmoothUI, ShipIt nebo SVGR a
Oliverem Tassiari, ktery zalozil Material-UI. Ucelenym tematem celeho workshopu
byl ReackHooks, ktere jsou soucasti Reactu Unora 2019. Dale se zminolo, ze jiz
brzy se muzeme tesit na Concurent Mode, ktery nam umozni schedulovani
renderovani, coz nam zlepsi performance. Suspense byla dalsi zminena featura pro
zjednoduseni fetchovani dat, ktera by mela byt brzy venku. SSR, vyuziti zejmeno
pro SEO a performance, kdy nam server prvnim requestem rovnou vrati HTML na
vyrenderovani stranky. PWA, offline aplikace, nice to have. Po te se proslo
zakladni tema, jake jsou Primitives - JSX, element, komponenty, rozdily mezi
komponentami atd. Life cycle komponenty. Face mount, update a unmount. Strucne
receno, behem mount faze se vklada element do domu, pokud se element updatne je
tato zmena reflektovana i do DOMU a behem unmount faze se element odstrani z
DOMu. Render vs commit. React nejdrive posbira veskere zmeny behem render kroku
a pote je commitne v celku. Hlavnim tematem celeho workshopu byly Hooks, tedy co
to vlastne ten React Hook je. Je to specialni funkce, ktera nam dovoluje
zachazet s novym React featurami ivnitr komponenty. Jsou zakladni tri hooky
useState, useEffect, useContext, pak je nekolik dalsich, pokrocilych. Zakldanim
pravidlem je, ze hooky funguji ve functional komponentach. Od zakladniho popisu
a ukazce, jak pouzit hooks na klasickem countery, jsme postupne prosli k
kontrolovanym vs. nekotrolovanym komponentam, pouziti effectu a jejich
lifecyklu. Custom hooks, ErrorBoundaries. hCo bych zde vice popsal je pouziti
Render props dohromady s React Hooks. Pokud bychom vzali nasledujici priklad

ReactEurope worshop State

- () => ‘’ as default value Canceling
- const CancelToken = axios.CancelToken
- const source = CancelToken.source()

Refactor MRL Search

- use hooks
- responsive design
- design better error messages - ErrorBoundaries
- scalable components - material UI vs Ant - rozdily v API - co nejmensi
  komponenty kopirujici DOM? - zacni s jendosuddim API, pak jej rozsir -
  nepuzivej inline styles - bez prefixeru - Render Props
- with hooks - to isolate logic and error handling - dopsat do blogu Global
  state
- immer js

Druhy den React.ref

- ref.current - dohledat informace
- useImperativeHandle - predani napriklad vysky elementu
- split code into smaller part - custom hooks
- save listener to useRef and reference not to update avery time with
  rerendering and add event listener only once on mounting of component
- react have polyfill to provide names of code kyes events - PressDown, PressUp,
  …
- useMemo - for performance considaration - useForkRef - setting two
  references - importance of “key” useLayoutEffect
- commmit phaze
- change height useDebugEffect
- for debugging hooks - expose state etc. ConcurentMode
- previsously called “async mode”
- prepare for that
  - no warnings - see slides
- hidden prop - prerender
- how to access DOM in node - example with measuring height Testing of Hooks
- react-testing-library - providing plenty of options - console.log(options)
  Tips
- react- fast-form
- dont use rect loadable
- jest
- npmtrends.com
- compare traffic of libraries
- npms.io
- typescript tax article

### Render Props a Reack Hooks

Ale co zde trochu více rád probral je využití Render Props s React Hooks. Tedy,
jak bude vidět, Render Props ještě nejsou mrtvý! Pokud bych měl tento Hook, již
zmíněný counter:

```javascript
function useCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCount(count => count + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  return count
}
```

Kde použijeme hook `useState()` pro nastavení lokálního statu a `useEffect()`
pro spuštění hooku každou sekundu. A použili jej v komponentě

```javascript
function Example() {
  const count = useCounter()

  return (
    <div>
      <OtherStuff />
      <div>{count}</div>
    </div>
  )
}
```

Pak každý tick intevalu, `setCount()` je zavolán, nová hodnota state je
generována a `Example` se přerendruje. Ale kromě něj se přerendruje i
`OtherStuff`! Který ale `count` nepoužívá. Navíc, pokud by `useCounter` vyhodilo
chybu, která komponenta bude ta s chybou? `Example`! A proto budeme izolovat
logiku přes Render Props následovně.

```javascript
function Counter({ children }) {
  const count = useCounter()

  return children(count)
}
```

Children je obvykle `node` element, ale zde má podobu funkce - `Render Prop`!

```javascript
function Example() {
    return(
        <div>
            <OtherStuff />
            <Counter>{(count) => <div>{count}</div>}</Couunter>
        </div>
    )
}
```

Co se tedy změnilo, `Example` se nepřerenderuje a ani `OtherStuff`. `Counter`
ale ano a pokaždé zavolá children funkci. Tedy nám Render Props dovolili pěkně
odizolovat renderování :) A pokud bychom dále zabalili `Counter` do
`ErrorBoundaries`, dovolí nám i pěkně odchytnout chybu.

Následovalo probrání kapitoly `useReducer()` pro případ řízení globálního statu.
Pěkný příklad byl pro `Styled Components`. Uloží styly společně s elementem.
Mělo by to vyřešit klasický scénář, kdy pro jednoduchou komponentu nám PO nařídí
udělat jen malou změnu, kdybychom například z kartičky měli odstranit titulek.
Po té se vyjádří UX designer, že titulek má mít zelené pozadí a nakonec z
oddělení marketingu chtěji, aby obsahoval malý ad banner. Tyto požadavky jsou
nekonečné a postupné změny s využitím `Styled Components` mohou být mnohem
jednodušší. Doporučuje se začít co nejblíže k samotnému DOM nodu a neabstrahovat
příliš brzo.

Dále jsme se zaměřili na Context a použití `useMemo`, které nám uloží hodnoty
dokud nedojde me změně.

Následoval hook `useRef` a interakce s DOMEM.
