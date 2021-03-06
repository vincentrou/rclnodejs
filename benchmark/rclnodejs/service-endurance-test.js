// Copyright (c) 2018 Intel Corporation. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const rclnodejs = require('../../index.js');

rclnodejs.init().then(() => {
  let node = rclnodejs.createNode('endurance_service_rclnodejs');

  node.createService('std_srvs/srv/SetBool', 'set_flag', (request, response) => {
    let result = response.template;
    result.success = true;
    result.message = 'The flag has been set.';
    response.send(result);
  });
  rclnodejs.spin(node);
}).catch((e) => {
  console.log(`Error: ${e}`);
});
