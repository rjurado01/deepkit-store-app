export const enum AttrType {
  Uuid,
  Integer,
  String,
  Instane,
}

export type Attr = {
  type: AttrType
}

export const METADATA_KEY = 'attributes'
