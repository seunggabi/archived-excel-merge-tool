/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import Layout from '../../components/Layout'
import DropZoneDemo from '../../components/DropZoneDemo'
import DropZone from '../../components/DropZone'

export default {
  path: '/',

  async action() { // eslint-disable-line react/prop-types
    return {
      title: 'React Todo',
      description: 'React Todo Example',
      component: <DropZoneDemo />,
    };
  },
};
