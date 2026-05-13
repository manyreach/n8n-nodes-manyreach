import { IExecuteFunctions } from 'n8n-workflow';
import { getUser } from '../resources/User/user.getById';
import { getUsers } from '../resources/User/user.getMany';
import { createUser } from '../resources/User/user.create';
import { updateUser } from '../resources/User/user.update';
import { deleteUser } from '../resources/User/user.delete';

export async function executeUser(this: IExecuteFunctions, operation: string, i: number): Promise<unknown> {
  switch (operation) {
    case 'getMany' :
      return await getUsers.call(this,i);
    case 'getById':
      return  await getUser.call(this, i);
    case 'create':
      return await createUser.call(this, i);
    case 'update':
      return await updateUser.call(this, i);
    case 'delete':
      return await deleteUser.call(this, i);
    default:
      throw new Error(`Operation "${operation}" not supported for User`);
  }
}