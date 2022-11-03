package com.codersdungeon.minesweeper.controller;

import com.codersdungeon.minesweeper.dto.LoginRequestDTO;
import com.codersdungeon.minesweeper.dto.LoginResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request){
        LoginResponseDTO response = new LoginResponseDTO();
        response.success = true;
        return response;
    }

    @PostMapping("/logout")
    public ResponseEntity<Boolean> logout(){
        return ResponseEntity.ok(true);
    }
}
