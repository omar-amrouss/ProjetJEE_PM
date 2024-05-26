package com.dev.DevApp.controllers;


import com.dev.DevApp.models.User;
import com.dev.DevApp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /* @PostMapping
    public String create_User(@RequestBody User user){
        userService.createUser(user);
        return "l'utilisateur a été crée avec succes !";
    } */


    @PutMapping("/profile")
    public ResponseEntity<?> update_User(@RequestBody User user){
        userService.updateUser(user);
        return ResponseEntity.ok().body("{\"success\": true, \"message\": \"L'utilisateur a été modifié avec succès !\"}");
    }
    @DeleteMapping("{_id}")
    public String delete_User(@PathVariable("_id") String _id){
        userService.deleteUser(_id);
        return "l'utilisateur a été supprimé avec succces !";
    }

    @GetMapping("/get-team")
    public List<User> getAll_Users(){
        return userService.getAllUsers();
    }

    // user register :
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("{\"success\": true, \"message\": \"Utilisateur enregistré avec succès !\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        try {
            User user = userService.loginUser(email, password);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }







}
