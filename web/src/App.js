import React, { useEffect, useState } from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
//Main é a área da lista de devs
import './Main.css';
import api from './services/api';
import DevItem from './components/Devitem';
import DevForm from './components/DevForm';
// import React, { useState } from 'react';
// Component: Bloco isolado de HTM CSS e JS o qual não interfere no restante da aplicação
// Propertie: Informações que o componente pai passa para o componente Filho
// State: É a informação mantida pelo componente, lida e atualizada. (imutabilidade)

function App() {
  /*
  const [counter, setCounter] = useState(0); useState foi invocado pelo import no topo da página
  
  function incrementCounter() {
      // counter++; não pode ser utilizado pela regra da imutabilidade, tão pouco counter = 10;
      setCounter(counter + 1);
  }

  return (
    //uso de <> "fragment" é necessário para se utilizar vários componentes seguidos sem estar por volta de um
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementador</button>
    </>
  );
  // Tip! se o "open settings json" acessivel pelo control+shift+p tiver as linhas
      "emmet.syntaxProfiles": {
        "javascript": "jsx",
    },
    "emmet.includeLanguages": {
        "javascript": "javascriptreact",
    },
  // será possivel autopreencher as class de um div dando enter na sintaxe escrita " div.nomedaclasse "
  */
    const [devs, setDevs] = useState([]);


    
    useEffect(() => {
      async function loadDevs(){
        const response = await api.get('/devs');
        setDevs(response.data);
        //console.log(response.data); 
      }

      loadDevs();
    }, []);
    // insere os devs
    async function handleAddDev(data) {
      
      const response = await api.post('/devs', data);


      //atualiza a lista visual de devs ao inserir novo
      //...devs adquire o vetor para add os dados registrados no response
      setDevs([...devs, response.data]);
      //console.log(response.data);
    }

    return (
      <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
        </aside>
        <main>
          <ul>
            {devs.map(dev => (
              <DevItem  key={dev._id} dev={dev} /> //passa para DevItem o valor de dev
            ))}
          </ul>
        </main>
      </div>
    );
}

export default App;
