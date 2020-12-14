export default interface Mapper {
  mapToEntity(model: any): any;
  mapToModel(entity: any): any;
}