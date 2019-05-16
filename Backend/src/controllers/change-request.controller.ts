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
import {ChangeRequest} from '../models';
import {ChangeRequestRepository} from '../repositories';

export class ChangeRequestController {
  constructor(
    @repository(ChangeRequestRepository)
    public changeRequestRepository : ChangeRequestRepository,
  ) {}

  @post('/change-requests', {
    responses: {
      '200': {
        description: 'ChangeRequest model instance',
        content: {'application/json': {schema: {'x-ts-type': ChangeRequest}}},
      },
    },
  })
  async create(@requestBody() changeRequest: ChangeRequest): Promise<ChangeRequest> {
    return await this.changeRequestRepository.create(changeRequest);
  }

  @get('/change-requests/count', {
    responses: {
      '200': {
        description: 'ChangeRequest model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ChangeRequest)) where?: Where,
  ): Promise<Count> {
    return await this.changeRequestRepository.count(where);
  }

  @get('/change-requests', {
    responses: {
      '200': {
        description: 'Array of ChangeRequest model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ChangeRequest}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ChangeRequest)) filter?: Filter,
  ): Promise<ChangeRequest[]> {
    return await this.changeRequestRepository.find(filter);
  }

  @patch('/change-requests', {
    responses: {
      '200': {
        description: 'ChangeRequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() changeRequest: ChangeRequest,
    @param.query.object('where', getWhereSchemaFor(ChangeRequest)) where?: Where,
  ): Promise<Count> {
    return await this.changeRequestRepository.updateAll(changeRequest, where);
  }

  @get('/change-requests/{id}', {
    responses: {
      '200': {
        description: 'ChangeRequest model instance',
        content: {'application/json': {schema: {'x-ts-type': ChangeRequest}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ChangeRequest> {
    return await this.changeRequestRepository.findById(id);
  }

  @patch('/change-requests/{id}', {
    responses: {
      '204': {
        description: 'ChangeRequest PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() changeRequest: ChangeRequest,
  ): Promise<void> {
    await this.changeRequestRepository.updateById(id, changeRequest);
  }

  @put('/change-requests/{id}', {
    responses: {
      '204': {
        description: 'ChangeRequest PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() changeRequest: ChangeRequest,
  ): Promise<void> {
    await this.changeRequestRepository.replaceById(id, changeRequest);
  }

  @del('/change-requests/{id}', {
    responses: {
      '204': {
        description: 'ChangeRequest DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.changeRequestRepository.deleteById(id);
  }
}
