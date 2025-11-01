#!/bin/bash
sudo systemctl stop exercise.service
sudo systemctl start exercise.service
systemctl status exercise.service
