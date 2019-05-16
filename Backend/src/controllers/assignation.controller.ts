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
import {Assignation} from '../models';
import {AssignationRepository} from '../repositories';

export class AssignationController {
  constructor(
    @repository(AssignationRepository)
    public assignationRepository : AssignationRepository,
  ) {}

  @post('/assignations', {
    responses: {
      '200': {
        description: 'Assignation model instance',
        content: {'application/json': {schema: {'x-ts-type': Assignation}}},
      },
    },
  })
  async create(@requestBody() assignation: Assignation): Promise<Assignation> {
    return await this.assignationRepository.create(assignation);
  }

  @get('/assignations/count', {
    responses: {
      '200': {
        description: 'Assignation model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Assignation)) where?: Where,
  ): Promise<Count> {
    return await this.assignationRepository.count(where);
  }

  @get('/assignations', {
    responses: {
      '200': {
        description: 'Array of Assignation model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Assignation}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Assignation)) filter?: Filter,
  ): Promise<Assignation[]> {
    return await this.assignationRepository.find(filter);
  }

  @patch('/assignations', {
    responses: {
      '200': {
        description: 'Assignation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() assignation: Assignation,
    @param.query.object('where', getWhereSchemaFor(Assignation)) where?: Where,
  ): Promise<Count> {
    return await this.assignationRepository.updateAll(assignation, where);
  }

  @get('/assignations/{id}', {
    responses: {
      '200': {
        description: 'Assignation model instance',
        content: {'application/json': {schema: {'x-ts-type': Assignation}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Assignation> {
    return await this.assignationRepository.findById(id);
  }

  @patch('/assignations/{id}', {
    responses: {
      '204': {
        description: 'Assignation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() assignation: Assignation,
  ): Promise<void> {
    await this.assignationRepository.updateById(id, assignation);
  }

  @put('/assignations/{id}', {
    responses: {
      '204': {
        description: 'Assignation PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() assignation: Assignation,
  ): Promise<void> {
    await this.assignationRepository.replaceById(id, assignation);
  }

  @del('/assignations/{id}', {
    responses: {
      '204': {
        description: 'Assignation DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.assignationRepository.deleteById(id);
  }
}
