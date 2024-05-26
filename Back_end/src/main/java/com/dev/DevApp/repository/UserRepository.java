package com.dev.DevApp.repository;

import com.dev.DevApp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {

    User findByEmail(String email);
    User findByName(String name);

}
