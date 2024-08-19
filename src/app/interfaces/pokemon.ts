export interface Pokemon {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: [
    {
      type: {
        name: string;
      };
    }
  ];

  sprites: {
    front_default: string;
    back_default: string;
  };
  cries: {
    latest: string;
  };
}

export interface PokemonsPage {
  count: number;
  results: [
    {
      name: string;
      url: string;
    }
  ];
}
