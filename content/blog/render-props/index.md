---
title: Render Props!
date: '2019-02-05T18:56:51.705Z'
---

Dnes, kdy se ve světě Reactu probírají všechna cool támata, jako jsou React
Hooks, Suspense nebo Asynchronous rendering, rád bych prošel táma, které se mi
zdá více praktické. Praktické myšleno především z pohledu denní používatelnosti
a to jak ve vlastním kódu, tak i různých knihoven. Oním tématem jsou návrhové
vzory React komponent, anglicky React Component patterns, a hned prvním z nich,
který se pokusím blíže osvětlit, jsou **Render Props**.

Pravděpodobně se setkáte s případem, kdy funkcionalitu jedné komponenty chcete
použít na vícero místech, ale pokaždé s jiným obsahem. Jedná se o komponenty
jako je modální okno nebo tooltip, kdy pouze změníme obsah, ale funkcionalita
všude zůstává stejná. Prostě chceme oddělit funkční od prezenční vrstvy.

###Proč název "render props"

Původní návrh je, že komponentě vytvoříme `prop` s názvem "render", která bude
mít podobu funkce navracející `React element` k vyrendrování. Pokud komponenta
využívá tento pattern, nazývá se "Render Prop component". Daná `prop` se může
jmenovat libovolně a ne pouze "render".

Po té se ale začala využívat `prop children`, která má onu podobu funkce, neboli
"children as a function".

###Render Prop komponenta

Jako velmi základní příklad si můžeme ukázat zjednoduššenou `Fetch` komponentu,
kterou chceme použít na vícero místech pro různé fetchování dat. Tato komponenta
si do lokálního stavu uloží informaci o stavu naloadování, případný error a i
samotná data. A právě po jejich nafetchování by bylo fajn tyto informace poslat
children komponentně, která bude mít na starosti pouze jejich zobrazení. K tomu
všemu využijeme náš zmíněný `children as a function` pattern 🤘.

```javascript
class Fetch extends Component {
  state = {
    loading: true,
    error: null,
    data: null,
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(data =>
        this.setState({
          loading: false,
          data: data,
        })
      )
      .catch(error =>
        this.setState({
          loading: false,
          error: error,
        })
      )
  }

  render() {
    return this.props.children(this.state)
  }
}
```

A Fetch komponentu použijeme kdekoliv budeme chtít získat data ze zadané URL,
kterou ji pošleme přes `prop url`. V našem případě `prop url` s hodnotou
"renderprops.rocks".

```javascript
class App extends Component {
  render() {
    return (
      <div className="App">
        <Fetch url="renderprops.rocks">
          {({ loading, error, data }) => {
            if (error !== null) {
              return <p>{error.toString()}</p>
            }
            return loading ? (
              <p>'Loading...'</p>
            ) : (
              <p>{data}</p>
            )
          }}
        </Fetch>
      </div>
    )
  }
}
```

Pomocí destructuringu objektu statu z Fetch komponenty rovnou získáme proměnné
`loading`, `error` a `data`. Podle nich můžeme vyrendrovat libovolné informace.

###Alternativy Render Props

Namísto Render props je možné pro oddělení funkční a prezentační vrstvy použít
**Higher-Order Components**, leč HOC se mi zdají už jen pro pochopení
složitější. O nich a dalších tématech zase někdy příště ✌️.
