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
import {AssignationRequest} from '../models';
import {AssignationRequestRepository} from '../repositories';

export class AssignationRequestController {
  constructor(
    @repository(AssignationRequestRepository)
    public assignationRequestRepository : AssignationRequestRepository,
  ) {}

  @post('/assignation-requests', {
    responses: {
      '200': {
        description: 'AssignationRequest model instance',
        content: {'application/json': {schema: {'x-ts-type': AssignationRequest}}},
      },
    },
  })
  async create(@requestBody() assignationRequest: AssignationRequest): Promise<AssignationRequest> {
    return await this.assignationRequestRepository.create(assignationRequest);
  }

  @get('/assignation-requests/count', {
    responses: {
      '200': {
        description: 'AssignationRequest model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(AssignationRequest)) where?: Where,
  ): Promise<Count> {
    return await this.assignationRequestRepository.count(where);
  }

  @get('/assignation-requests', {
    responses: {
      '200': {
        description: 'Array of AssignationRequest model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': AssignationRequest}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(AssignationRequest)) filter?: Filter,
  ): Promise<AssignationRequest[]> {
    return await this.assignationRequestRepository.find(filter);
  }

  @patch('/assignation-requests', {
    responses: {
      '200': {
        description: 'AssignationRequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() assignationRequest: AssignationRequest,
    @param.query.object('where', getWhereSchemaFor(AssignationRequest)) where?: Where,
  ): Promise<Count> {
    return await this.assignationRequestRepository.updateAll(assignationRequest, where);
  }

  @get('/assignation-requests/{id}', {
    responses: {
      '200': {
        description: 'AssignationRequest model instance',
        content: {'application/json': {schema: {'x-ts-type': AssignationRequest}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<AssignationRequest> {
    return await this.assignationRequestRepository.findById(id);
  }

  @patch('/assignation-requests/{id}', {
    responses: {
      '204': {
        description: 'AssignationRequest PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() assignationRequest: AssignationRequest,
  ): Promise<void> {
    await this.assignationRequestRepository.updateById(id, assignationRequest);
  }

  @put('/assignation-requests/{id}', {
    responses: {
      '204': {
        description: 'AssignationRequest PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() assignationRequest: AssignationRequest,
  ): Promise<void> {
    await this.assignationRequestRepository.replaceById(id, assignationRequest);
  }

  @del('/assignation-requests/{id}', {
    responses: {
      '204': {
        description: 'AssignationRequest DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.assignationRequestRepository.deleteById(id);
  }
}
