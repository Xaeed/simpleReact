import  * as React   from 'react';


export interface IProps {
    Name?: String,
    LastName?: string,
}

export interface IState
{
    error: boolean,
    name: string,
    numberOfAbilities: number,
        baseExp: number,
        imageUr:string

}
export class  SearchPokemon extends React.Component<IProps,IState>
  {
    pokemonRef: React.RefObject<HTMLInputElement>;

constructor(props:IProps)
{
    super(props);
    this.state ={
        error: false,
        name:'',
        numberOfAbilities:0,
        baseExp:0,
        imageUr:''
    }
    this.pokemonRef=React.createRef();
}
onSearchClick= (): void =>{
const  inputval = this.pokemonRef.current.value;
console.log('Value from input is ......', inputval);
fetch(`https://pokeapi.co/api/v2/pokemon/${inputval}`)
       .then((res) => 
            {
      if (res.status !== 200) {
        this.setState({ error: true  });
        return;
      }
     res.json().then(data =>
    this.setState({
    error:false,
    name:data.name,
    numberOfAbilities: data.abilities.length,
    baseExp:data.base_experience,
    imageUr:data.sprites.front_default
}) 
)
    }
    )
}
render()
      {
          const { Name , LastName }= this.props;
          const { name,imageUr,numberOfAbilities,baseExp,error} = this.state;
          let htmlResult;
          if(error)
          {
              htmlResult = <h1> we have some error {error} Please try with different Pokemon name</h1>
          }
          else 
          {
              htmlResult= <div>
                  <img  src={imageUr} alt="pokemon"  width="20%" height="20%"/>
                  <p>
                      Name of Pokemon is : {name}
                      Abilities of Pokemon is: {numberOfAbilities}
                      Experience of Pokemon is: {baseExp}
                      
                  </p>

              </div>
          }
          return (
          <div>

              {/* <h1> Name of Pokemone is {name} and numberOfAbilities is {numberOfAbilities} </h1>
              <p> saeed has {Name} 
              {LastName &&
              <span> Pokemone and it's lastname is {LastName}</span>
              }  
              </p> */}
              <input type ="text" ref={this.pokemonRef}/>
              <button  onClick= {this.onSearchClick}  className="my-button">  Search </button>
              {htmlResult}
          </div>
          )}
  }
export default  SearchPokemon
