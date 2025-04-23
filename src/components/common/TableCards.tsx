import { Grid, GridItem } from "@chakra-ui/react";
import { PokemonCardType } from "../../types/PokemonCard";
import { PokemonCard } from "./PokemonCard";

export const TableCard = ({
  cards,
  OnFlipped,
}: {
  cards: PokemonCardType[];
  OnFlipped: (card: PokemonCardType) => void;
}) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(6, 1fr)",
        xl: "repeat(6, 1fr)",
      }}
      gap={5}
    >
      {cards.map((card, index) => (
        <GridItem key={index}>
          <PokemonCard card={card} OnFlipped={OnFlipped} index={index} />
        </GridItem>
      ))}
    </Grid>
  );
};
