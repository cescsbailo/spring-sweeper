package com.codersdungeon.minesweeper.entity;


import javax.persistence.*;
import java.util.List;

@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 16, nullable = false)
    private String password;

    @Column(length = 32, nullable = false, unique = true)
    private String username;

    @OneToMany(mappedBy = "player",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Game> game;

    public Long getId() {
        return id;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setId(Long id) {
    }
}
