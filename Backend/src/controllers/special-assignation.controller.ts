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
import {SpecialAssignation} from '../models';
import {SpecialAssignationRepository} from '../repositories';

export class SpecialAssignationController {
  constructor(
    @repository(SpecialAssignationRepository)
    public specialAssignationRepository : SpecialAssignationRepository,
  ) {}

  @post('/special-assignations', {
    responses: {
      '200': {
        description: 'SpecialAssignation model instance',
        content: {'application/json': {schema: {'x-ts-type': SpecialAssignation}}},
      },
    },
  })
  async create(@requestBody() specialAssignation: SpecialAssignation): Promise<SpecialAssignation> {
    return await this.specialAssignationRepository.create(specialAssignation);
  }

  @get('/special-assignations/count', {
    responses: {
      '200': {
        description: 'SpecialAssignation model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(SpecialAssignation)) where?: Where,
  ): Promise<Count> {
    return await this.specialAssignationRepository.count(where);
  }

  @get('/special-assignations', {
    responses: {
      '200': {
        description: 'Array of SpecialAssignation model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': SpecialAssignation}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(SpecialAssignation)) filter?: Filter,
  ): Promise<SpecialAssignation[]> {
    return await this.specialAssignationRepository.find(filter);
  }

  @patch('/special-assignations', {
    responses: {
      '200': {
        description: 'SpecialAssignation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() specialAssignation: SpecialAssignation,
    @param.query.object('where', getWhereSchemaFor(SpecialAssignation)) where?: Where,
  ): Promise<Count> {
    return await this.specialAssignationRepository.updateAll(specialAssignation, where);
  }

  @get('/special-assignations/{id}', {
    responses: {
      '200': {
        description: 'SpecialAssignation model instance',
        content: {'application/json': {schema: {'x-ts-type': SpecialAssignation}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<SpecialAssignation> {
    return await this.specialAssignationRepository.findById(id);
  }

  @patch('/special-assignations/{id}', {
    responses: {
      '204': {
        description: 'SpecialAssignation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() specialAssignation: SpecialAssignation,
  ): Promise<void> {
    await this.specialAssignationRepository.updateById(id, specialAssignation);
  }

  @put('/special-assignations/{id}', {
    responses: {
      '204': {
        description: 'SpecialAssignation PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() specialAssignation: SpecialAssignation,
  ): Promise<void> {
    await this.specialAssignationRepository.replaceById(id, specialAssignation);
  }

  @del('/special-assignations/{id}', {
    responses: {
      '204': {
        description: 'SpecialAssignation DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.specialAssignationRepository.deleteById(id);
  }
}
