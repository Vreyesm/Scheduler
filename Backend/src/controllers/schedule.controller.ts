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
import {Schedule} from '../models';
import {ScheduleRepository} from '../repositories';

export class ScheduleController {
  constructor(
    @repository(ScheduleRepository)
    public scheduleRepository : ScheduleRepository,
  ) {}

  @post('/schedules', {
    responses: {
      '200': {
        description: 'Schedule model instance',
        content: {'application/json': {schema: {'x-ts-type': Schedule}}},
      },
    },
  })
  async create(@requestBody() schedule: Schedule): Promise<Schedule> {
    return await this.scheduleRepository.create(schedule);
  }

  @get('/schedules/count', {
    responses: {
      '200': {
        description: 'Schedule model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Schedule)) where?: Where,
  ): Promise<Count> {
    return await this.scheduleRepository.count(where);
  }

  @get('/schedules', {
    responses: {
      '200': {
        description: 'Array of Schedule model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Schedule}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Schedule)) filter?: Filter,
  ): Promise<Schedule[]> {
    return await this.scheduleRepository.find(filter);
  }

  @patch('/schedules', {
    responses: {
      '200': {
        description: 'Schedule PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() schedule: Schedule,
    @param.query.object('where', getWhereSchemaFor(Schedule)) where?: Where,
  ): Promise<Count> {
    return await this.scheduleRepository.updateAll(schedule, where);
  }

  @get('/schedules/{id}', {
    responses: {
      '200': {
        description: 'Schedule model instance',
        content: {'application/json': {schema: {'x-ts-type': Schedule}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Schedule> {
    return await this.scheduleRepository.findById(id);
  }

  @patch('/schedules/{id}', {
    responses: {
      '204': {
        description: 'Schedule PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() schedule: Schedule,
  ): Promise<void> {
    await this.scheduleRepository.updateById(id, schedule);
  }

  @put('/schedules/{id}', {
    responses: {
      '204': {
        description: 'Schedule PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() schedule: Schedule,
  ): Promise<void> {
    await this.scheduleRepository.replaceById(id, schedule);
  }

  @del('/schedules/{id}', {
    responses: {
      '204': {
        description: 'Schedule DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.scheduleRepository.deleteById(id);
  }
}
