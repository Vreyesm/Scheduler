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
import {Career} from '../models';
import {CareerRepository} from '../repositories';

export class CareerController {
  constructor(
    @repository(CareerRepository)
    public careerRepository : CareerRepository,
  ) {}

  @post('/careers', {
    responses: {
      '200': {
        description: 'Career model instance',
        content: {'application/json': {schema: {'x-ts-type': Career}}},
      },
    },
  })
  async create(@requestBody() career: Career): Promise<Career> {
    return await this.careerRepository.create(career);
  }

  @get('/careers/count', {
    responses: {
      '200': {
        description: 'Career model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Career)) where?: Where,
  ): Promise<Count> {
    return await this.careerRepository.count(where);
  }

  @get('/careers', {
    responses: {
      '200': {
        description: 'Array of Career model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Career}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Career)) filter?: Filter,
  ): Promise<Career[]> {
    return await this.careerRepository.find(filter);
  }

  @patch('/careers', {
    responses: {
      '200': {
        description: 'Career PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() career: Career,
    @param.query.object('where', getWhereSchemaFor(Career)) where?: Where,
  ): Promise<Count> {
    return await this.careerRepository.updateAll(career, where);
  }

  @get('/careers/{id}', {
    responses: {
      '200': {
        description: 'Career model instance',
        content: {'application/json': {schema: {'x-ts-type': Career}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Career> {
    return await this.careerRepository.findById(id);
  }

  @patch('/careers/{id}', {
    responses: {
      '204': {
        description: 'Career PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() career: Career,
  ): Promise<void> {
    await this.careerRepository.updateById(id, career);
  }

  @put('/careers/{id}', {
    responses: {
      '204': {
        description: 'Career PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() career: Career,
  ): Promise<void> {
    await this.careerRepository.replaceById(id, career);
  }

  @del('/careers/{id}', {
    responses: {
      '204': {
        description: 'Career DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.careerRepository.deleteById(id);
  }
}
