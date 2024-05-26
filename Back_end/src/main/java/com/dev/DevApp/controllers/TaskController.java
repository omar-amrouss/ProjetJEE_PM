package com.dev.DevApp.controllers;

import com.dev.DevApp.models.Task;
import com.dev.DevApp.models.User;
import com.dev.DevApp.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }


    @GetMapping("/all")
    public List<Task> getAll_Tasks(){
        return taskService.getAllTasks();
    }
    @PostMapping("/create")
    public ResponseEntity<?> create_Task(@RequestBody Task task){
        taskService.createTask(task);
        return ResponseEntity.ok("{\"success\": true, \"message\": \"Tache enregistré avec succès !\"}");
    }
    @PutMapping("/update/{_id}")
    public ResponseEntity<?> update_User(@RequestBody Task task){
        taskService.updateTask(task);
        return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Tache a été modifié avec succès !\"}");
    }
    @DeleteMapping("/delete/{_id}")
    public ResponseEntity<?> delete_task(@PathVariable("_id") String _id){
        taskService.deleteTask(_id);
        return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Tache a été supprimer avec succès !\"}");
    }
    @PutMapping("/create-subtask/{_id}")
    public String createSubTask(@RequestBody Task.SubTask subTask, @PathVariable("_id") String _id) {
        Task task = taskService.getTaskById(_id);
        task.addSubTask(subTask,_id);
        taskService.saveTask(task);
        return "Subtask created for Task ID " + _id;
    }













}
