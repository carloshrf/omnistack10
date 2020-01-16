import React, {useState, useEffect} from 'react';

function DevForm ({ onSubmit }) {

    const [latitude, setLatitude] = useState(''); //iniciar com um string vazia ('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithubusername] = useState('');
    const [techs, setTechs] = useState('');

    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            //console.log(position); exibe as ifo de local.
            const {latitude, longitude} = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000, //30s
          }
        );
      }, []); /* executa a ação dependendo do valor aqui inserido [], se for uma variável, executará a funcão a cada mudança da variável. Estando vazio, executará apenas uma vez*/  //Permite que ao disparar uma função uma unica vez na renderização do componente para evitar que a cada mudança o mesmo seja executado.
  
      async function handleSubmit(e) {
          e.preventDefault();//Evita o padrão do html no submit impedindo trocar a pag

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

            setGithubusername('');
            setTechs('');
      }

    return(
        <form onSubmit={handleSubmit}>
            <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
                name="github_username" 
                id="github_username" 
                required 
                value={github_username}
                onChange={e => setGithubusername(e.target.value)}
            />
            </div>

            <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
            name="techs" 
            id="techs" 
            required 
            value={techs}
            onChange = {e => setTechs(e.target.value)}
            />
            </div>
            
            <div className="input-group">
            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}//permite definir o valor do input adquirido pelo target (se refere ao input) com o value (se refere ao value do input)
                />
            </div>

            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange = {e => setLongitude(e.target.value)}
                />
            </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
      );
}

export default DevForm;