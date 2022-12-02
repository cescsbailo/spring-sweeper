package com.codersdungeon.minesweeper.controller;

import com.codersdungeon.minesweeper.dto.login.LoginResponseDto;
import com.codersdungeon.minesweeper.service.login.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping("/login")
    public LoginResponseDto login(){
        LoginResponseDto success = new LoginResponseDto();
        return success;
    }
    @PostMapping("/exit")
    public LoginResponseDto logout(){
        LoginResponseDto success = new LoginResponseDto();
        return success;
    }

}
