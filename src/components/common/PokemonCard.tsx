import { Card, Image } from "@chakra-ui/react";
import { PokemonCardType } from "../../types/PokemonCard";

export const PokemonCard = ({card}: {card:PokemonCardType}) => {
  return (
    <Card.Root w={"fit-content"}>
      <Card.Body >
        <Image src={card.url} h={"75px"} w={"75px"}/>
      </Card.Body>
    </Card.Root>
  );
};
