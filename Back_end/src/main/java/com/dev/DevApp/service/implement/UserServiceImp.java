package com.dev.DevApp.service.implement;

import com.dev.DevApp.exceptions.UserNotFoundException;
import com.dev.DevApp.models.User;
import com.dev.DevApp.repository.UserRepository;
import com.dev.DevApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    UserRepository userRepository;

    public UserServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void createUser(@RequestBody User user){
        userRepository.save(user);

    }

    @Override
    public void updateUser(User user){
        userRepository.save(user);
    }
    @Override
    public void deleteUser(String _id){
        userRepository.deleteById(_id);
    }

    @Override
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //montionné dans l'interface repository
    public User findByEmail(String email){
        return  userRepository.findByEmail(email);

    }
    // la redéfinition du méthode de registration:
    @Override
    public void registerUser(User user){
        if(userRepository.findByEmail(user.getEmail())!= null){
            throw new RuntimeException("l'utilisateur est déja existe !");
        }
        userRepository.save(user);
    }
    @Override
    public User loginUser(String email,String password){

        User user = userRepository.findByEmail(email);
        if (user != null && password.equals(user.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Email ou mot de passe incorrect !");
        }





    }








}
