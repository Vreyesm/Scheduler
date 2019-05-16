import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Building} from '../models';
import {BuildingRepository} from '../repositories';

export class BuildingController {
  constructor(
    @repository(BuildingRepository)
    public buildingRepository : BuildingRepository,
  ) {}

  @post('/buildings', {
    responses: {
      '200': {
        description: 'Building model instance',
        content: {'application/json': {schema: {'x-ts-type': Building}}},
      },
    },
  })
  async create(@requestBody() building: Building): Promise<Building> {
    return await this.buildingRepository.create(building);
  }

  @get('/buildings/count', {
    responses: {
      '200': {
        description: 'Building model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Building)) where?: Where,
  ): Promise<Count> {
    return await this.buildingRepository.count(where);
  }

  @get('/buildings', {
    responses: {
      '200': {
        description: 'Array of Building model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Building}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Building)) filter?: Filter,
  ): Promise<Building[]> {
    return await this.buildingRepository.find(filter);
  }

  @patch('/buildings', {
    responses: {
      '200': {
        description: 'Building PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() building: Building,
    @param.query.object('where', getWhereSchemaFor(Building)) where?: Where,
  ): Promise<Count> {
    return await this.buildingRepository.updateAll(building, where);
  }

  @get('/buildings/{id}', {
    responses: {
      '200': {
        description: 'Building model instance',
        content: {'application/json': {schema: {'x-ts-type': Building}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Building> {
    return await this.buildingRepository.findById(id);
  }

  @patch('/buildings/{id}', {
    responses: {
      '204': {
        description: 'Building PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() building: Building,
  ): Promise<void> {
    await this.buildingRepository.updateById(id, building);
  }

  @put('/buildings/{id}', {
    responses: {
      '204': {
        description: 'Building PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() building: Building,
  ): Promise<void> {
    await this.buildingRepository.replaceById(id, building);
  }

  @del('/buildings/{id}', {
    responses: {
      '204': {
        description: 'Building DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.buildingRepository.deleteById(id);
  }
}
