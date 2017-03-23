/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLList as List } from 'graphql';
import fs from 'fs';
import Promise from 'bluebird';
import TodoType from '../types/TodoType';

const filename = 'todo.json';
const readFile = Promise.promisify(fs.readFile);

const todo = {
  type: new List(TodoType),
  async resolve() {
    const todos = await readFile(filename);
    return JSON.parse(todos);
  },
};

export default todo;
