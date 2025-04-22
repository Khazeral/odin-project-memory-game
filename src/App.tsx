import { useEffect, useState } from "react";
import { PokemonCardType } from "./types/PokemonCard";
import { TableCard } from "./components/common/TableCards";
import { shuffleArray } from "./utils/shuffleArray";
import { Box } from "@chakra-ui/react";

function App() {
  const [pokemons, setPokemons] = useState<PokemonCardType[]>([]);

  useEffect(() => {
    async function fetchPokemons() {
      const responses = await Promise.all(
        Array.from({ length: 20 }, (_, i) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
        )
      );

      const data = await Promise.all(responses.map(res => res.json()));

      const formatted = data.map((poke: any, index: number) => ({
        url: poke.sprites.front_default,
        keyPair: index
      }));

      const pokemonsPairs = formatted.concat(formatted)

      const shuffledPairs = shuffleArray(pokemonsPairs)

      setPokemons(shuffledPairs);
    }

    fetchPokemons();
  }, []);
  return (
    <Box padding={"12px"}>
      <TableCard cards={pokemons}/>
    </Box>
  )
}

export default App
