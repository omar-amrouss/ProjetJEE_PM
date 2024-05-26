package com.dev.DevApp.repository;

import com.dev.DevApp.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task,String> {

}
