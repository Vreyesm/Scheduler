// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


import {Filter, repository} from '@loopback/repository';
import {BuildingRepository} from '../repositories';
import {get, getFilterSchemaFor, param, post, requestBody} from '@loopback/rest';
import {Building, Classroom} from '../models';

export class BuildingToClassroomController {
  constructor(@repository(BuildingRepository) protected buildingRepository: BuildingRepository)
  {}

  @post('/api/buildings/{id}/classrooms')
  async create(@param.path.number('id') id: number, @requestBody() classroom: Classroom ) {
    return await this.buildingRepository.classrooms(id).create(classroom);
  }

  @get('api/buildings/all')
  async getAll(
    @param.query.object('filter', getFilterSchemaFor(Building)) filter?: Filter,
  ): Promise<Building[]> {
    // @ts-ignore
    return await this.buildingRepository.classrooms.(filter);
  }
}
