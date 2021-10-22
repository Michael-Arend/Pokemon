class Types {
  slot: number;

  type: {
    name: string;
    url: string;
  };

  constructor(slot: number, name: string, url: string) {
    this.slot = slot;
    this.type = { name: name, url: url };
  }
}
export default Types;
