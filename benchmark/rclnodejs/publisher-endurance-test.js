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

/* eslint-disable camelcase */
const rclnodejs = require('../../index.js');

rclnodejs.init().then(() => {
  const JointState = 'sensor_msgs/msg/JointState';
  const state = {
    header: {
      stamp: {
        sec: 123456,
        nanosec: 789,
      },
      frame_id: 'main_frame',
    },
    name: ['Tom', 'Jerry'],
    position: [1, 2],
    velocity: [2, 3],
    effort: [4, 5, 6],
  };

  console.log('The publisher will publish a JointState topic every 100ms.');
  console.log(`Begin at ${new Date().toString()} and end in about 24 hours.`);

  let node = rclnodejs.createNode('endurance_publisher_rclnodejs');
  let publisher = node.createPublisher(JointState, 'endurance_topic');
  let sentTimes = 0;
  let totalTimes = 864000;

  let timer = setInterval(() => {
    if (sentTimes++ > totalTimes) {
      clearInterval(timer);
      rclnodejs.shutdown();
      console.log(`End at ${new Date().toString()}`);
    } else {
      publisher.publish(state);
    }}, 100);
  rclnodejs.spin(node);
}).catch((err) => {
  console.log(err);
});
