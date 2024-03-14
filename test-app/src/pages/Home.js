import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pokeball from '../Assets/pokeballSprite.png'
import pokemonproject from '../Assets/pokemonproject.png'

export default function Home() {
  let sprite
  const navigate = useNavigate()
  const [pokemonList, setPokemonList] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (offset < 20) {
      setOffset(0)
    }
    if (offset > 140) {
      setOffset(140)
    }
    if (offset == 140) {
      //pedir solo 10
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data.results)
          //console.log(offset, ' offset')
          setPokemonList(data.results)
        })
        .catch((err) => {
          console.log(err.message)
        })
    } else {
      //pedir 20
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data.results)
          //console.log(offset, ' offset')
          setPokemonList(data.results)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }, [offset])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-form/bulbasaur')
      .then((response) => response.json())
      .then((data) => {
        sprite = data.sprites.front_default
        document.getElementById('Sprite').src = sprite
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  function handleLoadNext() {
    console.log('load next')
  }

  function handleClick(url) {
    const regex = /\/(\d+)\/$/
    const match = url.match(regex)
    const source = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${match[1]}.png`

    if (match) {
      //console.log(match[1])
      document.getElementById('Sprite').src = source
    } else {
      alert('Number not found')
    }
  }

  function handleDoubleClick(url) {
    const regex = /\/(\d+)\/$/
    const match = url.match(regex)
    navigate('/pokemondetails', { state: { number: match[1] } })
  }

  return (
    <div className="App">
      <div className="LeftPanel" id="left">
        <img src={pokemonproject} className="Logo" alt="Pokemon Logo" />
        <br />
        <img src="" id="Sprite" />
      </div>
      <div className="RightPanel">
        {pokemonList?.map(function (pokemon) {
          //console.log(pokemon)
          return (
            <div
              className="pokemonNameDiv"
              key={pokemon.index}
              onClick={() => handleClick(pokemon.url)}
              onDoubleClick={() => handleDoubleClick(pokemon.url)}
            >
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}

              <img src={pokeball} />
            </div>
          )
        })}
        <button
          onClick={() => {
            setOffset(offset - 20)
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setOffset(offset + 20)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
