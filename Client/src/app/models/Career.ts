import { Subject } from './Subject';

export class Career {
  id: number;
  name: string;
  subjects: Subject[];
  directorId: string;
  isCompleted: boolean;
}
