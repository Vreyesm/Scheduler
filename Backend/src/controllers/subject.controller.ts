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
import {Subject} from '../models';
import {SubjectRepository} from '../repositories';

export class SubjectController {
  constructor(
    @repository(SubjectRepository)
    public subjectRepository : SubjectRepository,
  ) {}

  @post('/subjects', {
    responses: {
      '200': {
        description: 'Subject model instance',
        content: {'application/json': {schema: {'x-ts-type': Subject}}},
      },
    },
  })
  async create(@requestBody() subject: Subject): Promise<Subject> {
    return await this.subjectRepository.create(subject);
  }

  @get('/subjects/count', {
    responses: {
      '200': {
        description: 'Subject model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Subject)) where?: Where,
  ): Promise<Count> {
    return await this.subjectRepository.count(where);
  }

  @get('/subjects', {
    responses: {
      '200': {
        description: 'Array of Subject model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Subject}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Subject)) filter?: Filter,
  ): Promise<Subject[]> {
    return await this.subjectRepository.find(filter);
  }

  @patch('/subjects', {
    responses: {
      '200': {
        description: 'Subject PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() subject: Subject,
    @param.query.object('where', getWhereSchemaFor(Subject)) where?: Where,
  ): Promise<Count> {
    return await this.subjectRepository.updateAll(subject, where);
  }

  @get('/subjects/{id}', {
    responses: {
      '200': {
        description: 'Subject model instance',
        content: {'application/json': {schema: {'x-ts-type': Subject}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Subject> {
    return await this.subjectRepository.findById(id);
  }

  @patch('/subjects/{id}', {
    responses: {
      '204': {
        description: 'Subject PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() subject: Subject,
  ): Promise<void> {
    await this.subjectRepository.updateById(id, subject);
  }

  @put('/subjects/{id}', {
    responses: {
      '204': {
        description: 'Subject PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() subject: Subject,
  ): Promise<void> {
    await this.subjectRepository.replaceById(id, subject);
  }

  @del('/subjects/{id}', {
    responses: {
      '204': {
        description: 'Subject DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.subjectRepository.deleteById(id);
  }
}
