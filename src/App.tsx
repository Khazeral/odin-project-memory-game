import { useEffect, useState } from "react";
import { PokemonCardType } from "./types/PokemonCard";
import { TableCard } from "./components/common/TableCards";
import { shuffleArray } from "./utils/shuffleArray";
import { Box, Heading, Text, Spinner, VStack, HStack } from "@chakra-ui/react";

function App() {
  const [pokemons, setPokemons] = useState<PokemonCardType[]>([]);
  const [actualScore, setActualScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemonsFound, setPokemonsFound] = useState<number[]>([]);

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

      const pokemonsPairs = formatted.concat(formatted);
      const shuffledPairs = shuffleArray(pokemonsPairs);

      setPokemons(shuffledPairs);
      setIsLoading(false); 
    }

    fetchPokemons();
  }, []);

  const onFlipped = (keyPair: number) => {
    console.log('ok')
    console.log(keyPair)
    if(pokemonsFound.includes(keyPair)){
      setActualScore(prev => prev + 1)
      if(actualScore > bestScore){
        setBestScore(prev => prev + 1)
      }
    }
    setPokemonsFound(prev => [...prev, keyPair])
  }

  return (
    <Box minH="100vh" bgGradient="linear(to-b, yellow.100, orange.100)" p={6}>
      <VStack align="center">
        <Heading
          size="2xl"
          color="red.500"
          textShadow="1px 1px white"
          fontFamily="'Press Start 2P', cursive"
        >
          🎮 Memory Pokémon
        </Heading>

        <HStack>
          <Box textAlign="center">
            <Text fontSize="md" color="gray.600">
              Score actuel
            </Text>
            <Heading size="lg" color="teal.600">
              {actualScore}
            </Heading>
          </Box>
          <Box textAlign="center">
            <Text fontSize="md" color="gray.600">
              Meilleur score
            </Text>
            <Heading size="lg" color="purple.600">
              {bestScore}
            </Heading>
          </Box>
        </HStack>

        {isLoading ? (
          <Spinner size="xl" color="red.400" />
        ) : (
          <TableCard cards={pokemons} OnFlipped={onFlipped}/>
        )}
      </VStack>
    </Box>
  );
}

export default App;
