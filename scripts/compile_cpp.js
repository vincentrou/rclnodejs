// Copyright (c) 2017 Intel Corporation. All rights reserved.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const child = require('child_process');

var rootDir = path.dirname(__dirname);
var testCppDir = path.join(rootDir, 'test', 'cpp');

function getExecutable(input) {
  if (os.platform() === 'win32')
    return input + '.exe';

  return input;
}

var publisher = getExecutable('publisher_msg');
var subscription = getExecutable('subscription_msg');
var listener = getExecutable('listener');
var client = getExecutable('add_two_ints_client');

function getExecutablePath(input) {
  var releaseDir = '';
  if (os.platform() === 'win32')
    releaseDir = 'Release';

  return path.join(rootDir, 'build', 'cpp_nodes', releaseDir, input);
}

var publisherPath = getExecutablePath(publisher);
var subscriptionPath = getExecutablePath(subscription);
var listenerPath = getExecutablePath(listener);
var clientPath = getExecutablePath(client);


function copyFile(platform, srcFile, destFile) {
  // eslint-disable-next-line
  if (!fs.existsSync(destFile)) {
    if (os.platform() === 'win32') {
      child.spawn('cmd.exe', ['/c', `copy ${srcFile} ${destFile}`]);
    } else {
      child.spawn('sh', ['-c', `cp ${srcFile} ${destFile}`]);
    }
  }
}

function copyAll(fileList, dest) {
  fileList.forEach((file) => {
    copyFile(os.platform(), file, path.join(dest, path.basename(file)));
  });
}

// eslint-disable-next-line
if (!fs.existsSync(publisherPath) && !fs.existsSync(subscriptionPath) &&
  // eslint-disable-next-line
  !fs.existsSync(listenerPath) && !fs.existsSync(clientPath)) {
  var compileProcess = child.spawn('ament', ['build', testCppDir, '--skip-install']);
  compileProcess.on('close', (code) => {
    copyAll([publisherPath, subscriptionPath, listenerPath, clientPath], testCppDir);
  });
} else {
  copyAll([publisherPath, subscriptionPath, , listenerPath, clientPath], testCppDir);
}
