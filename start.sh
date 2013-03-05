#!/bin/bash

forever start -l ~/node/log/forever.log -o ~/node/log/html5paint.log -e ~/node/log/html5paint_errors.log app.js
