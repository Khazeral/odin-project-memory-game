import { Grid, GridItem } from "@chakra-ui/react"
import { PokemonCardType } from "../../types/PokemonCard"
import { PokemonCard } from "./PokemonCard"

export const TableCard = ({cards,OnFlipped}: {cards: PokemonCardType[], OnFlipped: (keyPair: number) => void}) => {
    return(
        <Grid templateColumns={"repeat(8, 1fr)"} gap={5}>
            {cards.map((card) =>(
                <GridItem>
                    <PokemonCard card={card} OnFlipped={OnFlipped} />
                </GridItem>  
            ))}
        </Grid>
    )
}