import { Grid, GridItem } from "@chakra-ui/react"
import { PokemonCardType } from "../../types/PokemonCard"
import { PokemonCard } from "./PokemonCard"

export const TableCard = ({cards}: {cards: PokemonCardType[]}) => {
    return(
        <Grid templateColumns={"repeat(10, 1fr)"} gap={5} maxWidth={'95%'} maxHeight={'95%'}>
            {cards.map((card) =>(
                <GridItem>
                     <PokemonCard card={card} />
                </GridItem>  
            ))}
        </Grid>
    )
}