import Pokemon from "../models/PokemonModel";
  
const PokemonItem : React.FC<{pokemon : Pokemon, selected:Boolean, pokemonSelected: (id:number)=> void }> =  ({pokemon,selected,pokemonSelected}) =>{

  const pokemonSelectedHandler = (event:React.MouseEvent, id:number) => pokemonSelected(id);


return(
  <li className={`pokemon-item-wrapper ${selected ? 'pokemon-item-wrapper-focus' :''}`}  key={pokemon.id}  onClick={(e)=>{pokemonSelectedHandler(e,pokemon.id)}}>
    <div className='pokemon-name-wrapper'>
        <h2>{pokemon.name}</h2>
        <h6 >({pokemon.species.name})</h6>
        <h6 >weight: {pokemon.weight} lbs</h6>
    </div>
     
    <img src={pokemon.pictures.front_default === undefined ? pokemon.pictures.front_shiny : pokemon.pictures.front_default }/>

    <h4 className='pokemon-types'>
      {pokemon.types.map(t => `${t.type.name}${t === pokemon.types[pokemon.types.length-1] ? '' : ' / '}`  )}
    </h4>

    <div className='pokemon-stats'>
      {pokemon.stats.map(s => <div style={{'display': 'flex'}} key={s.stat.name}><h4 >{s.stat.name}:</h4> <p>{s.base_stat}</p></div>)}
    </div>

{selected ? 

    <div className='pokemon-moves-wrapper'>
      <h4 className='moves-header'>moves:</h4>
      <div className='pokemon-stats' style={{'margin':'5px 0px'}}>
        {pokemon.moves.map(m => <p key={m.move.name}>{m.move.name}{m === pokemon.moves[pokemon.moves.length-1] ? '' : ',' } </p> )}
    </div>
    </div>:''}
 </li>
)}

export default PokemonItem;