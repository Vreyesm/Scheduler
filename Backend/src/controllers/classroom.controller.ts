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
import {Classroom} from '../models';
import {ClassroomRepository} from '../repositories';

export class ClassroomController {
  constructor(
    @repository(ClassroomRepository)
    public classroomRepository : ClassroomRepository,
  ) {}

  @post('/classrooms', {
    responses: {
      '200': {
        description: 'Classroom model instance',
        content: {'application/json': {schema: {'x-ts-type': Classroom}}},
      },
    },
  })
  async create(@requestBody() classroom: Classroom): Promise<Classroom> {
    return await this.classroomRepository.create(classroom);
  }

  @get('/classrooms/count', {
    responses: {
      '200': {
        description: 'Classroom model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Classroom)) where?: Where,
  ): Promise<Count> {
    return await this.classroomRepository.count(where);
  }

  @get('/classrooms', {
    responses: {
      '200': {
        description: 'Array of Classroom model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Classroom}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Classroom)) filter?: Filter,
  ): Promise<Classroom[]> {
    return await this.classroomRepository.find(filter);
  }

  @patch('/classrooms', {
    responses: {
      '200': {
        description: 'Classroom PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() classroom: Classroom,
    @param.query.object('where', getWhereSchemaFor(Classroom)) where?: Where,
  ): Promise<Count> {
    return await this.classroomRepository.updateAll(classroom, where);
  }

  @get('/classrooms/{id}', {
    responses: {
      '200': {
        description: 'Classroom model instance',
        content: {'application/json': {schema: {'x-ts-type': Classroom}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Classroom> {
    return await this.classroomRepository.findById(id);
  }

  @patch('/classrooms/{id}', {
    responses: {
      '204': {
        description: 'Classroom PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() classroom: Classroom,
  ): Promise<void> {
    await this.classroomRepository.updateById(id, classroom);
  }

  @put('/classrooms/{id}', {
    responses: {
      '204': {
        description: 'Classroom PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() classroom: Classroom,
  ): Promise<void> {
    await this.classroomRepository.replaceById(id, classroom);
  }

  @del('/classrooms/{id}', {
    responses: {
      '204': {
        description: 'Classroom DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.classroomRepository.deleteById(id);
  }
}
