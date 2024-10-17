package com.taskify.services.impl;

import com.taskify.dtos.RoleDto;
import com.taskify.dtos.UserDto;
import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.externals.email.EmailServices;
import com.taskify.models.UserModel;
import com.taskify.repositories.UserRepository;
import com.taskify.services.RoleServices;
import com.taskify.services.UserServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleServices roleServices;

    @Autowired
    private EmailServices emailServices;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {
        // Check for user already exist
        if (this.userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            return null;
        }

        UserModel userModel = this.modelMapper.map(userDto, UserModel.class);

        // Encrypt the raw password
        userModel.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));

        // Create a new user
        UserModel savedUser = this.userRepository.save(userModel);

        userDto.setId(savedUser.getId());

        // Add the user's role
        for (RoleDto roleDto : userDto.getRoles()) {
            System.out.println("roleDto: " + roleDto);
            roleDto.setUserId(savedUser.getId());
            this.roleServices.createRole(roleDto);
        }

        return this.getUserById(userDto.getId());
    }

    @Override
    public UserDto addUserWithPasswordAutoGenerated(UserDto userDto) {
        // Check for user already exist
        if (this.userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            return null;
        }

        UserModel userModel = this.modelMapper.map(userDto, UserModel.class);

        // Generate the 7-digit raw password
        String rawPassword = this.generateRandomPassword(7);

        // Encrypt the raw password
        userModel.setPassword(bCryptPasswordEncoder.encode(rawPassword));

        // Create a new user
        UserModel savedUser = this.userRepository.save(userModel);

        userDto.setId(savedUser.getId());

        // Add the user's role
        for (RoleDto roleDto : userDto.getRoles()) {
            roleDto.setUserId(savedUser.getId());
            this.roleServices.createRole(roleDto);
        }

        // Notify the user
        String subject = "Welcome to the Taskify Family!";
        String body = "Dear " + userDto.getName() + ",\n" +
                "We are excited to welcome you to the Taskify family! We're thrilled that you've chosen to manage your tasks with us and can't wait for you to explore all the features our platform has to offer.\n\n"
                +
                "As part of your registration, we have automatically generated a secure password for your account. You can find your password below:\n\n"
                +
                "Your Taskify Login Details:\n" +
                "-Email: " + userDto.getEmail() + "\n" +
                "-Password: " + rawPassword + "\n\n" +
                "Please use these credentials to log in to your account.\n\n" +
                "If you have any questions or need assistance, don't hesitate to reach out to us at office@datachef.in. We are here to help!\n\n"
                +
                "Welcome aboard, and happy tasking!\n\n" +
                "Best regards,\n" +
                "The Taskify Team\n" +
                "http://13.235.168.107:3006";

        this.emailServices.sendSimpleMessage(userDto.getEmail(), subject, body);

        return this.getUserById(userDto.getId());
    }

    private String generateRandomPassword(int length) {
        SecureRandom random = new SecureRandom();
        String allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "abcdefghijklmnopqrstuvwxyz"
                + "0123456789"
                + "!@#$%^&*()-_+=<>?";

        return IntStream.range(0, length)
                .mapToObj(i -> String.valueOf(allowedChars.charAt(random.nextInt(allowedChars.length()))))
                .collect(Collectors.joining());
    }

    @Override
    public List<UserDto> getAllUsers() {
        return this.userModelsToDtos(this.userRepository.findAll());
    }

    @Override
    public UserDto getUserById(Long id) {
        UserModel foundUser = this.userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("No user exist for id: " + id));

        return this.userModelToDto(foundUser);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        UserModel foundUser = this.userRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("No user exist for email: " + email));

        return this.userModelToDto(foundUser);
    }

    @Override
    public List<UserDto> getUsersByDepartment(String department) {
        List<UserModel> userModels = this.userRepository.findByDepartment(department);

        return this.userModelsToDtos(userModels);
    }

    @Override
    public UserDto updateUser(UserDto givenUser) {
        UserModel foundUser = this.userRepository.findById(givenUser.getId()).orElseThrow(
                () -> new ResourceNotFoundException("No user exist for id: " + givenUser.getId()));

        // Update the data
        foundUser.setName(givenUser.getName());
        foundUser.setDepartment(givenUser.getDepartment());
        foundUser.setDisabled(givenUser.isDisabled());
        foundUser.setPhone(givenUser.getPhone());
        // Save the changes
        this.userRepository.save(foundUser);

        return null;
    }

    @Override
    public List<UserDto> filterUsers(String department, String roleType) {
        List<UserModel> userModels = this.userRepository.findByDepartmentAndRole(department, roleType);

        return this.userModelsToDtos(userModels);
    }

    // TODO
    @Override
    public boolean deleteUser(Long id) {
        return false;
    }

    private UserDto userModelToDto(UserModel userModel) {
        if (userModel == null) {
            return null;
        }
        UserDto userDto = this.modelMapper.map(userModel, UserDto.class);
        userDto.setId(userModel.getId());
        userDto.setRoles(this.roleServices.getRolesByUserId(userDto.getId()));

        return userDto;
    }

    private List<UserDto> userModelsToDtos(List<UserModel> userModels) {
        List<UserDto> userDtos = new ArrayList<>();

        if (userModels != null) {
            for (UserModel userModel : userModels) {
                userDtos.add(this.userModelToDto(userModel));
            }
        }

        return userDtos;
    }
}
