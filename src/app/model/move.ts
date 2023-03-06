export class Move {
  constructor(
    public id: number | undefined,

    public inOut: Boolean,

    public creationDate: String,

    public creationUser: String,

    public moveDate: String | undefined,

    public declarationPlace: String,

    public declarationPlaceCode: String,

    //////// different use for In and OUT
    public warehousCode: String,
    public warehousLabel: String,
    /////////

    public customsStatus: String,

    // only for Out Move
    public customsDocType: String | undefined,
    public customsDocRef: String | undefined,
    ///////////////////////

    public refType: String,

    public ref: String,

    public quantity: number,

    public weight: number,

    public totalQuantity: number,

    public totalWeight: number,

    public description: String,

    public msg: String | undefined
  ) {}
}
