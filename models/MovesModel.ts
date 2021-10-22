class Move{

    move:{name:string, url:string};
    version_group_details: [any];

    constructor(name:string, url: string){
        this.move= {name:name,url:url};
    }
}

export default Move;