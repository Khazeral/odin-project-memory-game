import { useEffect, useState } from "react";
import { PokemonCardType } from "./types/PokemonCard";
import { TableCard } from "./components/common/TableCards";
import { shuffleArray } from "./utils/shuffleArray";
import { Box, Heading, Spinner, VStack } from "@chakra-ui/react";

function App() {
  const [pokemons, setPokemons] = useState<PokemonCardType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [flippedCard, setFlippedCard] = useState<PokemonCardType[]>([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      const responses = await Promise.all(
        Array.from({ length: 18 }, (_, i) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
        )
      );

      const data = await Promise.all(responses.map(res => res.json()));

      const formatted = data.map((poke: any, index: number) => ({
        url: poke.sprites.front_default,
        keyPair: index,
        id: index
      }));

      const pokemonsPairs = formatted.flatMap(card => [
        { ...card, id: card.id, flipped: false },
        { ...card, id: card.id + 26, flipped: false }
      ]);

      const shuffledPairs = shuffleArray(pokemonsPairs);

      setPokemons(shuffledPairs);
      setIsLoading(false);
    }

    fetchPokemons();
  }, []);

  const onFlipped = (card: PokemonCardType) => {
    if (!canFlip || card.flipped) return;

    const updatedPokemons = pokemons.map(p =>
      p.id === card.id ? { ...p, flipped: true } : p
    );
    setPokemons(updatedPokemons);

    const newFlipped = [...flippedCard, card];
    setFlippedCard(newFlipped);

    if (newFlipped.length === 2) {
      setCanFlip(false);
      const [first, second] = newFlipped;

      if (first.keyPair === second.keyPair) {
        setTimeout(() => {
          setFlippedCard([]);
          setCanFlip(true);
        }, 500);
      } else {
        setTimeout(() => {
          const reset = updatedPokemons.map(p =>
            p.id === first.id || p.id === second.id
              ? { ...p, flipped: false }
              : p
          );
          setPokemons(reset);
          setFlippedCard([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

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

        {isLoading ? (
          <Spinner size="xl" color="red.400" />
        ) : (
          <TableCard cards={pokemons} OnFlipped={onFlipped} />
        )}
      </VStack>
    </Box>
  );
}

export default App;
