/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import Main from '../../container/Main'

export default {
  path: '/',

  async action() { // eslint-disable-line react/prop-types
    return {
      title: 'Excel Merge Tool',
      component: <Main />,
    };
  },
};
