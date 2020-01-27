package com.ikozlinskyi.realestatebookingapp.controller;

import com.ikozlinskyi.realestatebookingapp.entity.User;
import com.ikozlinskyi.realestatebookingapp.exception.UsernameAlreadyExistsException;
import com.ikozlinskyi.realestatebookingapp.payload.JWTLoginSucessReponse;
import com.ikozlinskyi.realestatebookingapp.payload.LoginRequest;
import com.ikozlinskyi.realestatebookingapp.security.JwtTokenProvider;
import com.ikozlinskyi.realestatebookingapp.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import static com.ikozlinskyi.realestatebookingapp.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        boolean usernameAvailable = userService.isUsernameAvailable(user.getUsername());

        if (!usernameAvailable) {
            throw new UsernameAlreadyExistsException("Username '" + user.getUsername() + "' already exists");
        }

        User newUser = userService.saveUser(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<?> checkUsernameAvailability(@RequestParam String username) {
        boolean isUsernameAvailable = this.userService.isUsernameAvailable(username);

        HttpStatus responseStatus = isUsernameAvailable ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(responseStatus);
    }
}
