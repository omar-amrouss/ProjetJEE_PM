package com.dev.DevApp.repository;

import com.dev.DevApp.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Task.Activity,String> {
}
