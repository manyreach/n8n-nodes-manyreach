import { IExecuteFunctions } from 'n8n-workflow';
import {getList} from '../resources/List/list.getById'
import { createList } from '../resources/List/list.create';
import { updateList } from '../resources/List/list.update';
import { deleteList } from '../resources/List/list.delete';
import { getLists } from '../resources/List/list.getMany';


export async function executeList(this: IExecuteFunctions, operation: string, i: number): Promise<unknown> {
  switch (operation) {
    case 'getMany' :
      return await getLists.call(this,i);
    case 'getById':
      return  await getList.call(this, i);
    case 'create':
      return await createList.call(this, i);
    case 'update':
      return await updateList.call(this, i);
    case 'delete':
      return await deleteList.call(this, i);
    default:
      throw new Error(`Operation "${operation}" not supported for List`);
  }
}