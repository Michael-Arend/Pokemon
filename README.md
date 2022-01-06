# Pokemon

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Additional Infos](#additional-infos)
* [Setup](#setup)
* [Todo](#todo)

## General info
This project uses the Pokemon API (https://pokeapi.co/) to give a graphical overview of over 1000 Pokemons and there properties. The Pokemons are filterable by name.
	
## Technologies
Project is created with:
* react 17.0.2
* next 11.1.2
* https://pokeapi.co/ as data-source

## Additional Infos
### Data-fetching
the data fetching occurs via "getStaticProps" on building and with a weekly revalidation time span.
A custom hook (useFetchPokemons) is used. An initial list of pokemons (name,url) is fetched with an recursive request, to handle increasing numbers of pokemons (>1200) in the future. The custom hook also holds the convertion into a class of pokemon with its property classes (/models). The maximum amount of fetched pokemons in one request can be set in the index.tsx.

### Index
The index.tsx holds the List of Pokemons with contains of a custom component named "PokemonItem" and and the "Pagination" component. Filtering by name, changing the side and selecting a Pokemon to show the moves in detail are handled in index.tsx.
	
## Setup
To run this project, install it locally using npm:

```
$ npm install
$ npm run dev
```

## Todo
### Possible Updates
- advanced filtering options (moves, species etc.)
- order by function (weight, stats)
- add additional stats like abilities via https://pokeapi.co/
- detailed page for every Pokemon mit query parameters

### Possible Improvement
- mobile responsiveness is not yet added regarding time limitation of 4h



