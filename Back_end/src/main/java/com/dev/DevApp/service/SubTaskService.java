package com.dev.DevApp.service;

import com.dev.DevApp.models.Task;

import java.util.List;

public interface SubTaskService {

    void createSubTask(Task.SubTask subTask);
    List<Task.SubTask> getAllSubTasks();
}