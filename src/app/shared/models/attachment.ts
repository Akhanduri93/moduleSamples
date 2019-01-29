export class Attachment {
  id: string;
  name: string;
  attributes: {
    type: string;
    url: string;
  };
  body: {
    asByteArray: string;
    inputStream: string; // maybe object
    length: number;
    maxToKeep: number;
  };
}
