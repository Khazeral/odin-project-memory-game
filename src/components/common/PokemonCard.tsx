import { Box, Image } from "@chakra-ui/react";
import { PokemonCardType } from "../../types/PokemonCard";
import { useState } from "react";
import pokeball from "../../asset/pokeball.png";

export const PokemonCard = ({
  card,
  OnFlipped,
}: {
  card: PokemonCardType;
  OnFlipped: (keyPair:number) => void;
}) => {
  const [isFlip, setIsFlip] = useState(false);

  const handleFlipCard = () => {
    if (!isFlip) {
      setIsFlip(true);
      OnFlipped(card.keyPair);
    }
  };

  return (
    <Box
      w="120px"
      h="120px"
      perspective="1000px"
      onClick={isFlip ? undefined : handleFlipCard}
      cursor="pointer"
    >
      <Box
        w="100%"
        h="100%"
        position="relative"
        transformStyle="preserve-3d"
        transition="transform 0.6s"
        transform={isFlip ? "rotateY(180deg)" : "rotateY(0deg)"}
      >
        <Box
          position="absolute"
          w="100%"
          h="100%"
          backfaceVisibility="hidden"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={pokeball} boxSize="fit-content" />
        </Box>

        <Box
          position="absolute"
          w="100%"
          h="100%"
          transform="rotateY(180deg)"
          backfaceVisibility="hidden"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={card.url} boxSize="fit-content" />
        </Box>
      </Box>
    </Box>
  );
};
