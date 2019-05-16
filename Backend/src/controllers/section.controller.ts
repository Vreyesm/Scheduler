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
import {Section} from '../models';
import {SectionRepository} from '../repositories';

export class SectionController {
  constructor(
    @repository(SectionRepository)
    public sectionRepository : SectionRepository,
  ) {}

  @post('/sections', {
    responses: {
      '200': {
        description: 'Section model instance',
        content: {'application/json': {schema: {'x-ts-type': Section}}},
      },
    },
  })
  async create(@requestBody() section: Section): Promise<Section> {
    return await this.sectionRepository.create(section);
  }

  @get('/sections/count', {
    responses: {
      '200': {
        description: 'Section model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Section)) where?: Where,
  ): Promise<Count> {
    return await this.sectionRepository.count(where);
  }

  @get('/sections', {
    responses: {
      '200': {
        description: 'Array of Section model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Section}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Section)) filter?: Filter,
  ): Promise<Section[]> {
    return await this.sectionRepository.find(filter);
  }

  @patch('/sections', {
    responses: {
      '200': {
        description: 'Section PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() section: Section,
    @param.query.object('where', getWhereSchemaFor(Section)) where?: Where,
  ): Promise<Count> {
    return await this.sectionRepository.updateAll(section, where);
  }

  @get('/sections/{id}', {
    responses: {
      '200': {
        description: 'Section model instance',
        content: {'application/json': {schema: {'x-ts-type': Section}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Section> {
    return await this.sectionRepository.findById(id);
  }

  @patch('/sections/{id}', {
    responses: {
      '204': {
        description: 'Section PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() section: Section,
  ): Promise<void> {
    await this.sectionRepository.updateById(id, section);
  }

  @put('/sections/{id}', {
    responses: {
      '204': {
        description: 'Section PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() section: Section,
  ): Promise<void> {
    await this.sectionRepository.replaceById(id, section);
  }

  @del('/sections/{id}', {
    responses: {
      '204': {
        description: 'Section DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sectionRepository.deleteById(id);
  }
}
