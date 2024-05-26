package com.dev.DevApp.service;

import com.dev.DevApp.models.User;

import java.util.List;

public interface UserService {

     // CRUD FOR USER MODEL

     void createUser(User user);
     void updateUser(User user);
     void deleteUser(String _id);

     // ANOTHER METHODS
     List<User> getAllUsers();
     void registerUser(User user);
     User loginUser(String email,String password);










}
