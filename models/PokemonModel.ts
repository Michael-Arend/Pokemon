import Sprites from "./SpritesModel";
import Species from "./SpeciesModel";
import Types from "./TypesModel";
import Move from "./MovesModel";
import Stats from "./StatsModel";
import { stat } from "fs";

class Pokemon {
  name: string;
  pictures: Sprites;
  species: Species;
  types: Types[];
  weight: number;
  moves: Move[];
  stats: Stats[];
  id: number;

  constructor(
    name: string,
    pictures: Sprites,
    species: Species,
    types: Types[],
    weight: number,
    moves: Move[],
    stats: Stats[],
    id: number
  ) {
    this.name = name;
    this.id = id;
    this.pictures = pictures;
    this.species = species;
    this.types = types;
    this.weight = weight;
    this.stats = stats;
    this.moves = moves;
  }
}

export default Pokemon;
